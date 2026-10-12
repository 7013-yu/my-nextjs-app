import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

const GENDERS = ["男", "女", "其他"];
const UNITS = ["metric", "imperial"];

interface ProfileRow extends RowDataPacket {
  nickname: string | null;
  country: string | null;
  postal_code: string | null;
  gender: string | null;
  birth_year: number | null;
  unit_preference: "metric" | "imperial";
  height: string | number | null;
}

function bad(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

// 資料表用 big5 時,big5 存不下的字(表情符號、簡體字、少數罕見字)會讓寫入失敗(錯誤碼 1366)
function isUnsupportedCharError(err: unknown) {
  const e = err as { errno?: number; code?: string } | null;
  return e?.errno === 1366 || e?.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD";
}

// 文字欄位:空字串視為沒填(存成 NULL);型別不對或太長回傳 undefined 代表不合法
function textOrNull(value: unknown, max: number): string | null | undefined {
  if (value === null || value === undefined) return null;
  if (typeof value !== "string") return undefined;
  const text = value.trim();
  if (text === "") return null;
  return text.length > max ? undefined : text;
}

// 取得個人資料
export async function GET(request: Request) {
  try {
    const userId = new URL(request.url).searchParams.get("user_id");
    if (!userId) return bad("缺少使用者代碼");

    const [rows] = await pool.query<ProfileRow[]>(
      `SELECT nickname, country, postal_code, gender,
              YEAR(birth_date) AS birth_year, unit_preference, height
         FROM users WHERE user_id = ?`,
      [userId]
    );
    if (rows.length === 0) return bad("找不到這個使用者", 404);

    const row = rows[0];
    return NextResponse.json({
      success: true,
      profile: {
        nickname: row.nickname,
        country: row.country,
        postal_code: row.postal_code,
        gender: row.gender || null, // 資料庫 ENUM 裡的空字串當作沒填
        birth_year: row.birth_year,
        unit_preference: row.unit_preference,
        height: row.height === null ? null : Number(row.height),
      },
    });
  } catch (err) {
    console.error(err);
    return bad("伺服器錯誤", 500);
  }
}

// 儲存個人資料
export async function PUT(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return bad("資料格式不正確");
    }

    const userId = body.user_id;
    if (typeof userId !== "string" || userId === "") return bad("缺少使用者代碼");

    const nickname = textOrNull(body.nickname, 50);
    const country = textOrNull(body.country, 50);
    const postalCode = textOrNull(body.postal_code, 10);
    if (nickname === undefined) return bad("暱稱格式不正確或超過 50 個字");
    if (country === undefined) return bad("國家格式不正確");
    if (postalCode === undefined) return bad("郵政編碼格式不正確或超過 10 個字");

    const gender = body.gender ?? null;
    if (gender !== null && !(typeof gender === "string" && GENDERS.includes(gender))) {
      return bad("性別選項不正確");
    }

    const unit = body.unit_preference ?? "metric";
    if (typeof unit !== "string" || !UNITS.includes(unit)) {
      return bad("單位偏好選項不正確");
    }

    const birthYear = body.birth_year ?? null;
    if (
      birthYear !== null &&
      !(
        typeof birthYear === "number" &&
        Number.isInteger(birthYear) &&
        birthYear >= 1900 &&
        birthYear <= new Date().getFullYear()
      )
    ) {
      return bad("出生年份不正確");
    }

    let height = body.height ?? null;
    if (height !== null) {
      if (typeof height !== "number" || !Number.isFinite(height) || height < 30 || height > 272) {
        return bad("身高不在合理範圍");
      }
      height = Math.round(height * 100) / 100;
    }

    const [exists] = await pool.query<RowDataPacket[]>(
      "SELECT user_id FROM users WHERE user_id = ?",
      [userId]
    );
    if (exists.length === 0) return bad("找不到這個使用者", 404);

    // 資料庫存的是完整生日,畫面只讓使用者選年份:
    // 沒選年份、或年份沒變 → 保留原本的生日;年份有改 → 存成該年 1 月 1 日
    await pool.query(
      `UPDATE users
          SET nickname = ?, country = ?, postal_code = ?, gender = ?,
              unit_preference = ?, height = ?,
              birth_date = CASE
                WHEN ? IS NULL THEN birth_date
                WHEN YEAR(birth_date) = ? THEN birth_date
                ELSE CONCAT(?, '-01-01')
              END
        WHERE user_id = ?`,
      [nickname, country, postalCode, gender, unit, height, birthYear, birthYear, birthYear, userId]
    );

    return NextResponse.json({ success: true, message: "已儲存" });
  } catch (err) {
    if (isUnsupportedCharError(err)) {
      return bad(
        "暱稱、國家或郵政編碼含有資料庫不支援的字元(例如表情符號、簡體字或罕見字),請改用一般的繁體中文或英數字"
      );
    }
    console.error(err);
    return bad("伺服器錯誤", 500);
  }
}
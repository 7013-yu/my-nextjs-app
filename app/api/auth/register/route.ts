import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  user_id: string;
}

// 通用的 CORS Headers 設定
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// 處理 OPTIONS 預檢請求 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, name, gender, birth_date, phone } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "請輸入帳號與密碼" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 關鍵修正：如果 name 未傳入或為空，預設使用 username，避免資料庫 name 欄位不能為 NULL 而報錯 (Column 'name' cannot be null)
    const safeName = name && name.trim() !== "" ? name : username;
    const safeGender = gender || null;
    const safeBirthDate = birth_date || null;
    const safePhone = phone || null;

    // 檢查帳號是否已存在
    const [existing] = await pool.query<UserRow[]>(
      "SELECT user_id FROM users WHERE username = ?",
      [username]
    );

    if (existing.length > 0) {
      // 同一組帳號重複註冊 → 直接覆蓋更新原本那筆資料(測試用途)
      const userId = existing[0].user_id;

      await pool.query(
        `UPDATE users
         SET password = ?, name = ?, gender = ?, birth_date = ?, phone = ?
         WHERE username = ?`,
        [password, safeName, safeGender, safeBirthDate, safePhone, username]
      );

      return NextResponse.json(
        {
          success: true,
          message: "此帳號已存在,資料已為你更新覆蓋",
          user_id: userId,
          overwritten: true,
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // 帳號不存在 → 依現有資料的 user-001 格式,自動產生下一個 user_id
    const [rows] = await pool.query<UserRow[]>(
      "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1"
    );

    let nextNumber = 1;
    if (rows.length > 0) {
      const lastId = rows[0].user_id; // 例如 user-001
      const num = parseInt(lastId.split("-")[1], 10);
      if (!isNaN(num)) nextNumber = num + 1;
    }
    const newUserId = `user-${String(nextNumber).padStart(3, "0")}`;

    await pool.query(
      `INSERT INTO users (user_id, username, password, name, gender, birth_date, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [newUserId, username, password, safeName, safeGender, safeBirthDate, safePhone]
    );

    return NextResponse.json(
      {
        success: true,
        message: "註冊成功",
        user_id: newUserId,
        overwritten: false,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: "伺服器錯誤",
        debug: err instanceof Error ? err.message : String(err),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
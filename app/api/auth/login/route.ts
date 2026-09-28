import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface UserRow extends RowDataPacket {
  user_id: string;
  username: string;
  name: string | null;
  gender: string | null;
  birth_date: string | null;
  phone: string | null;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "請輸入帳號與密碼" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query<UserRow[]>(
      `SELECT user_id, username, name, gender, birth_date, phone
       FROM users WHERE username = ? AND password = ?`,
      [username, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "帳號或密碼錯誤" },
        { status: 401 }
      );
    }

    // 登入無次數限制,可以重複執行
    return NextResponse.json({
      success: true,
      message: "登入成功",
      user: rows[0],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "伺服器錯誤" },
      { status: 500 }
    );
  }
}
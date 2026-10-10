// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/show-users.mjs
// 列出 Aiven 上 users 表的所有資料(不顯示密碼),用來確認註冊有沒有寫進資料庫

import mysql from "mysql2/promise";

let conn;
try {
  conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    charset: "utf8mb4",
  });

  const [rows] = await conn.query(
    `SELECT user_id, username, name, gender, birth_date, phone,
            nickname, country, postal_code, unit_preference, height
       FROM users ORDER BY user_id`
  );

  console.log(`users 表目前共有 ${rows.length} 筆資料:`);
  if (rows.length > 0) console.table(rows);
} catch (err) {
  console.error("查詢失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

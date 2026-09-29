// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/fix-admin-gender-value.mjs
// 把 admin 這筆資料損毀的 gender 值('?')重新設回正確的「男」

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
  console.log("已連線到 Aiven");

  await conn.query(`UPDATE users SET gender = '男' WHERE username = 'admin'`);
  console.log("已更新 admin 的 gender");

  const [rows] = await conn.query(
    `SELECT user_id, username, gender, HEX(gender) AS gender_hex FROM users`
  );
  console.log("目前所有使用者的 gender 實際內容:");
  console.table(rows);
} catch (err) {
  console.error("修復失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

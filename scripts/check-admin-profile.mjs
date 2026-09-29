// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/check-admin-profile.mjs
// 檢查 admin 這筆資料的 name / phone / birth_date 有沒有跟 gender 一樣壞掉

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

  const [rows] = await conn.query(
    `SELECT user_id, username, name, HEX(name) AS name_hex,
            phone, birth_date
       FROM users WHERE username = 'admin'`
  );
  console.log("admin 目前的個人資料:");
  console.table(rows);
} catch (err) {
  console.error("查詢失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

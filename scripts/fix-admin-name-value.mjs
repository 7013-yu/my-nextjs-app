// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/fix-admin-name-value.mjs
// 把 admin 這筆資料損毀的 name 值('??')重新設回正確的「小明」

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

  await conn.query(`UPDATE users SET name = '小明' WHERE username = 'admin'`);
  console.log("已更新 admin 的 name");

  const [rows] = await conn.query(
    `SELECT user_id, username, name, HEX(name) AS name_hex, gender, phone, birth_date
       FROM users WHERE username = 'admin'`
  );
  console.log("admin 目前完整的個人資料:");
  console.table(rows);
} catch (err) {
  console.error("修復失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/fix-gender-enum.mjs
// 把 gender 從容易損毀的 ENUM 改成普通文字欄位(VARCHAR),並列出目前每一列的實際內容(含底層HEX)方便診斷

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

  const [before] = await conn.query(
    `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'gender'`
  );
  console.log("修復前定義:", before[0]?.COLUMN_TYPE);

  // 改成普通文字欄位,不再限制只能是固定選項,避免 ENUM 選項損毀的問題再發生
  await conn.query(
    `ALTER TABLE users MODIFY COLUMN gender VARCHAR(10) CHARACTER SET utf8mb4 NULL DEFAULT NULL`
  );
  console.log("已改成 VARCHAR(10) 文字欄位");

  const [after] = await conn.query(
    `SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'gender'`
  );
  console.log("修復後定義:", after[0]?.COLUMN_TYPE);

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

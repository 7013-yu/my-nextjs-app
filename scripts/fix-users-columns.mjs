// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/fix-users-columns.mjs
// 檢查 users 表所有欄位:凡是「不可為空、且沒有預設值」的欄位(user_id/username/password 除外),
// 一律改成允許空白,這樣註冊時只送帳號和密碼也不會被擋下來。
// 有預設值的欄位不會動,保留原本的預設值。

import mysql from "mysql2/promise";

const REQUIRED = ["user_id", "username", "password"];

const COLUMN_QUERY = `
  SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_KEY
    FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
   ORDER BY ORDINAL_POSITION`;

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
  console.log("已連線到 Aiven\n");

  const [before] = await conn.query(COLUMN_QUERY);
  if (before.length === 0) {
    console.error("找不到 users 資料表,請確認 .env.aiven 的 DB_NAME");
    process.exit(1);
  }
  console.log("users 表目前的欄位:");
  console.table(before);

  let fixed = 0;
  for (const col of before) {
    const name = col.COLUMN_NAME;
    if (REQUIRED.includes(name)) continue;
    if (col.COLUMN_KEY === "PRI") continue;
    if (col.EXTRA && col.EXTRA.toLowerCase().includes("auto_increment")) continue;
    if (col.IS_NULLABLE === "YES") continue;
    if (col.COLUMN_DEFAULT !== null) continue; // 有預設值,註冊時不會出錯,保留原樣

    await conn.query(
      `ALTER TABLE users MODIFY COLUMN \`${name}\` ${col.COLUMN_TYPE} NULL DEFAULT NULL`
    );
    console.log(`${name} (${col.COLUMN_TYPE}): 已改為允許空白`);
    fixed++;
  }
  console.log(fixed === 0 ? "\n沒有需要修改的欄位" : `\n共修改 ${fixed} 個欄位`);

  const [after] = await conn.query(COLUMN_QUERY);
  console.log("\n修改後狀態:");
  console.table(
    after.map((c) => ({
      欄位: c.COLUMN_NAME,
      型別: c.COLUMN_TYPE,
      可為空: c.IS_NULLABLE,
      預設值: c.COLUMN_DEFAULT,
    }))
  );
} catch (err) {
  console.error("失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

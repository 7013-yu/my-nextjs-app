// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/allow-null-profile.mjs
// 把 users 表的個人資料欄位(姓名、性別、生日、電話)改成允許空白,型別維持原樣

import mysql from "mysql2/promise";

const PROFILE_COLUMNS = ["name", "gender", "birth_date", "phone"];

let conn;
try {
  conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });
  console.log("已連線到 Aiven");

  const [cols] = await conn.query(
    `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'`
  );

  if (cols.length === 0) {
    console.error("找不到 users 資料表,請確認 .env.aiven 的 DB_NAME 是否正確");
    process.exit(1);
  }

  for (const col of cols) {
    const name = col.COLUMN_NAME;
    if (!PROFILE_COLUMNS.includes(name)) continue;

    if (col.IS_NULLABLE === "YES") {
      console.log(`${name}:已經允許空白,略過`);
      continue;
    }

    await conn.query(
      `ALTER TABLE users MODIFY COLUMN \`${name}\` ${col.COLUMN_TYPE} NULL DEFAULT NULL`
    );
    console.log(`${name} (${col.COLUMN_TYPE}):已改為允許空白`);
  }

  console.log("完成");
} catch (err) {
  console.error("修改失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

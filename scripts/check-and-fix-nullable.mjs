// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/check-and-fix-nullable.mjs
// 檢查 name/gender/birth_date/phone 目前是否真的允許空白,不是的話直接修正(型別用寫死的正確值,不依賴讀取舊定義)

import mysql from "mysql2/promise";

const FIXES = {
  name: "VARCHAR(30) CHARACTER SET utf8mb4",
  gender: "VARCHAR(10) CHARACTER SET utf8mb4",
  birth_date: "DATE",
  phone: "VARCHAR(20) CHARACTER SET utf8mb4",
};

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

  const [before] = await conn.query(
    `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
        AND COLUMN_NAME IN ('name','gender','birth_date','phone')`
  );
  console.log("目前狀態:");
  console.table(before);

  for (const row of before) {
    if (row.IS_NULLABLE === "YES") {
      console.log(`${row.COLUMN_NAME}: 已允許空白,略過`);
      continue;
    }
    const typeDef = FIXES[row.COLUMN_NAME];
    await conn.query(
      `ALTER TABLE users MODIFY COLUMN \`${row.COLUMN_NAME}\` ${typeDef} NULL DEFAULT NULL`
    );
    console.log(`${row.COLUMN_NAME}: 已修正為允許空白 (${typeDef})`);
  }

  const [after] = await conn.query(
    `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
        AND COLUMN_NAME IN ('name','gender','birth_date','phone')`
  );
  console.log("\n修正後狀態:");
  console.table(after);
} catch (err) {
  console.error("失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

// 用法(在 Next.js 專案根目錄執行):
// node --env-file=.env.aiven scripts/import-to-aiven.mjs <匯出的.sql檔路徑> --reset
// --reset 會先清空目標資料庫裡所有資料表再匯入(雲端資料庫上的現有資料會被刪掉)

import fs from "node:fs";
import mysql from "mysql2/promise";

const args = process.argv.slice(2);
const reset = args.includes("--reset");
const sqlFile = args.find((a) => !a.startsWith("--"));

if (!sqlFile) {
  console.error("請提供 .sql 檔案路徑,例如:");
  console.error(
    "node --env-file=.env.aiven scripts/import-to-aiven.mjs C:\\Users\\judy9\\Downloads\\medication_db.sql --reset"
  );
  process.exit(1);
}

if (!fs.existsSync(sqlFile)) {
  console.error(`找不到檔案:${sqlFile}`);
  process.exit(1);
}

// 匯出檔如果帶有 CREATE DATABASE / USE,會把資料建到別的資料庫,這裡先拿掉,統一匯入 .env.aiven 指定的資料庫
const sql = fs
  .readFileSync(sqlFile, "utf8")
  .replace(/^\s*CREATE DATABASE[^;]*;\s*$/gim, "")
  .replace(/^\s*USE\s+[^;]*;\s*$/gim, "");

let conn;
try {
  conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }, // Aiven 要求加密連線
    charset: "utf8mb4", // 沒有這行,檔案裡的中文會被存成 ?
    multipleStatements: true,
  });
  console.log("已連線到 Aiven");

  // 明確告訴伺服器這次連線用 utf8mb4 傳輸中文
  await conn.query("SET NAMES utf8mb4");

  if (reset) {
    const [existing] = await conn.query("SHOW TABLES");
    if (existing.length > 0) {
      await conn.query("SET FOREIGN_KEY_CHECKS = 0");
      for (const row of existing) {
        const name = Object.values(row)[0];
        await conn.query(`DROP TABLE \`${name}\``);
      }
      await conn.query("SET FOREIGN_KEY_CHECKS = 1");
      console.log(`已清空 ${existing.length} 張舊資料表`);
    }
  }

  // phpMyAdmin 匯出檔會先建表、之後才補主鍵,Aiven 預設不允許,所以在這次連線中先關掉檢查
  try {
    await conn.query("SET SESSION sql_require_primary_key = 0");
  } catch (e) {
    console.warn("無法在這次連線中關閉主鍵檢查:", e.message);
  }

  console.log("開始匯入...");
  await conn.query(sql);

  const [tables] = await conn.query("SHOW TABLES");
  const names = tables.map((row) => Object.values(row)[0]);
  console.log(`匯入完成,共 ${names.length} 張資料表:`);
  console.log(names.join(", "));

  const [users] = await conn.query("SELECT COUNT(*) AS n FROM users");
  console.log(`users 資料表目前有 ${users[0].n} 筆資料`);

  // 列出使用者資料(不含密碼),肉眼確認中文有沒有變成問號
  const [sample] = await conn.query(
    "SELECT user_id, username, name, gender FROM users LIMIT 5"
  );
  console.table(sample);
} catch (err) {
  console.error("匯入失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

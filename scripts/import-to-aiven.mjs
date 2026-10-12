// 用法(在 Next.js 專案根目錄執行):
//
//   只檢查檔案(不會連線、不會動到資料庫):
//   node scripts/import-to-aiven.mjs <匯出的.sql檔路徑> --check
//
//   正式匯入(會先自動檢查,有問題就停下來):
//   node --env-file=.env.aiven scripts/import-to-aiven.mjs <匯出的.sql檔路徑> --reset
//
//   --reset                 先清空目標資料庫裡所有資料表再匯入(雲端上現有的資料,包含 App 註冊的帳號,都會被刪掉)
//   --file-encoding=big5    .sql 檔案本身是 Big5 編碼時使用(預設當成 UTF-8 讀取)
//   --force                 檢查發現 users 缺少 App 需要的欄位、或資料表字元集不一致時,仍然強行匯入
//
// 關於編碼:資料表可以用 big5 或 utf8mb4,匯入程式自己用 utf8mb4 連線,
// 伺服器會自動在連線編碼和資料表編碼之間轉換,所以資料表用 big5 沒有問題。
// 但 big5 存不下的字(表情符號、簡體字、少數罕見字)會存不進去。

import fs from "node:fs";
import mysql from "mysql2/promise";

const args = process.argv.slice(2);
const reset = args.includes("--reset");
const checkOnly = args.includes("--check");
const force = args.includes("--force");
const encodingArg = (args.find((a) => a.startsWith("--file-encoding=")) ?? "").split("=")[1]?.toLowerCase();
const sqlFile = args.find((a) => !a.startsWith("--"));

// App 的註冊、登入、個人資料 API 會用到的 users 欄位
const REQUIRED_USER_COLUMNS = [
  "user_id", "username", "password", "name", "gender", "phone", "birth_date",
  "nickname", "country", "postal_code", "unit_preference", "height",
];

if (!sqlFile) {
  console.error("請提供 .sql 檔案路徑,例如:");
  console.error("  只檢查:node scripts/import-to-aiven.mjs C:\\Users\\judy9\\Downloads\\medication_db.sql --check");
  console.error("  匯入:  node --env-file=.env.aiven scripts/import-to-aiven.mjs C:\\Users\\judy9\\Downloads\\medication_db.sql --reset");
  process.exit(1);
}
if (!fs.existsSync(sqlFile)) {
  console.error(`找不到檔案:${sqlFile}`);
  process.exit(1);
}
if (encodingArg !== undefined && !["utf8", "utf-8", "big5"].includes(encodingArg)) {
  console.error("--file-encoding 只能是 utf8 或 big5");
  process.exit(1);
}

const fatal = []; // 一定不能匯入
const blocking = []; // 預設不匯入,加 --force 才能蓋過

// ---------- 讀檔 ----------
const raw = fs.readFileSync(sqlFile);
const readAsBig5 = encodingArg === "big5";
let text;
if (readAsBig5) {
  text = new TextDecoder("big5").decode(raw);
} else {
  text = raw.toString("utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1); // 拿掉 UTF-8 BOM
  if (text.includes("\uFFFD")) {
    let looksLikeBig5 = false;
    try {
      new TextDecoder("big5", { fatal: true }).decode(raw);
      looksLikeBig5 = true;
    } catch {
      looksLikeBig5 = false;
    }
    fatal.push(
      looksLikeBig5
        ? "檔案不是 UTF-8,看起來是 Big5 編碼。請在指令最後加上 --file-encoding=big5 再試一次。"
        : "檔案不是 UTF-8 編碼,也不像 Big5,裡面有無法辨識的字元,直接匯入中文會變成亂碼。請組員重新匯出,或用編輯器另存成 UTF-8。"
    );
  }
}

// ---------- 檢查內容 ----------
const tables = [...text.matchAll(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?`([^`]+)`/gi)].map((m) => m[1]);

// 資料表/欄位用的字元集(含 COLLATE 的前綴)。檔案開頭的 SET NAMES 是連線編碼,不算在內
const tableCharsets = new Map();
const addCharset = (name) => {
  const key = name.toLowerCase();
  tableCharsets.set(key, (tableCharsets.get(key) ?? 0) + 1);
};
for (const m of text.matchAll(/(?:CHARSET|CHARACTER\s+SET)\s*=?\s*([A-Za-z0-9_]+)/gi)) addCharset(m[1]);
for (const m of text.matchAll(/COLLATE\s*=?\s*([A-Za-z0-9]+)_[A-Za-z0-9_]+/gi)) addCharset(m[1]);

const family = (c) => (["utf8", "utf8mb3", "utf8mb4"].includes(c) ? "utf8" : c);
const families = new Set([...tableCharsets.keys()].map(family));
const unsupported = [...families].filter((f) => !["utf8", "big5"].includes(f));
if (unsupported.length > 0) {
  blocking.push(`資料表使用了 ${unsupported.join("、")} 字元集,這可能存不下中文。請組員改用 big5 或 utf8mb4。`);
}
if (families.has("utf8") && families.has("big5")) {
  blocking.push("有些資料表用 big5、有些用 utf8mb4,字元集不一致。請組員統一成同一種再匯出。");
}

// users 資料表的欄位
let userColumns = [];
const usersMatch = /CREATE TABLE\s+(?:IF NOT EXISTS\s+)?`users`\s*\(([\s\S]*?)\n\)/i.exec(text);
if (!usersMatch) {
  fatal.push("檔案裡找不到 users 資料表,App 的註冊和登入需要它。");
} else {
  userColumns = [...usersMatch[1].matchAll(/^\s*`([^`]+)`/gm)].map((m) => m[1]);
  const missing = REQUIRED_USER_COLUMNS.filter((c) => !userColumns.includes(c));
  if (missing.length > 0) {
    blocking.push(
      `users 資料表缺少 App 需要的欄位:${missing.join("、")}。這可能是舊版的資料庫檔案,匯入後註冊或個人資料會出錯。`
    );
  }
}
const usersRowCount = (text.match(/INSERT INTO\s+`users`/gi) ?? []).length;

console.log(`檔案:${sqlFile}(${(fs.statSync(sqlFile).size / 1024).toFixed(1)} KB,以 ${readAsBig5 ? "Big5" : "UTF-8"} 讀取)`);
console.log(`資料表(${tables.length}):${tables.join(", ") || "無"}`);
console.log(`users 欄位(${userColumns.length}):${userColumns.join(", ") || "無"}`);
console.log(
  `資料表字元集:${[...tableCharsets.entries()].map(([k, v]) => `${k}×${v}`).join("、") || "檔案裡沒有明確標示"}`
);
console.log(`users 有沒有資料:${usersRowCount > 0 ? "有 INSERT 語句" : "沒有(匯入後需要重新註冊帳號)"}`);
if (families.size === 1 && families.has("big5")) {
  console.log(
    "ℹ️  資料表使用 big5。big5 只能存繁體中文和常用符號,表情符號、簡體字、少數罕見字(例如部分人名用字)存不進去。"
  );
}

for (const msg of fatal) console.log(`❌ ${msg}`);
for (const msg of blocking) console.log(`⚠️  ${msg}`);

const canImport = fatal.length === 0 && (blocking.length === 0 || force);
if (checkOnly) {
  console.log(
    fatal.length === 0 && blocking.length === 0
      ? "\n檢查結果:✅ 這個檔案可以匯入(沒有動到任何資料庫)"
      : "\n檢查結果:❌ 這個檔案不建議直接匯入(沒有動到任何資料庫)"
  );
  process.exit(fatal.length === 0 && blocking.length === 0 ? 0 : 1);
}
if (!canImport) {
  console.error(
    fatal.length > 0 ? "\n已停止匯入。" : "\n已停止匯入。如果你確定要匯入,請在指令最後加上 --force"
  );
  process.exit(1);
}
console.log("");

// ---------- 匯入 ----------
// 要拿掉的語句:
// - CREATE DATABASE / USE:會把資料建到別的資料庫,統一匯入 .env.aiven 指定的資料庫
// - SET NAMES / SET character_set_client = 某字元集:匯入程式自己用 utf8mb4 連線,
//   檔案裡如果寫 SET NAMES big5,後面傳送的中文就會被當成 Big5 解讀而變成亂碼
const sql = text
  .replace(/^\s*CREATE DATABASE[^;]*;\s*$/gim, "")
  .replace(/^\s*USE\s+[^;]*;\s*$/gim, "")
  .replace(/^\s*\/\*!\d+\s+SET\s+NAMES\s+\w+(?:\s+COLLATE\s+\w+)?\s*\*\/\s*;?\s*$/gim, "")
  .replace(/^\s*SET\s+NAMES\s+\w+(?:\s+COLLATE\s+\w+)?\s*;\s*$/gim, "")
  .replace(/^\s*\/\*!\d+\s+SET\s+character_set_client\s*=\s*[A-Za-z0-9_]+\s*\*\/\s*;?\s*$/gim, "")
  .replace(/^\s*SET\s+character_set_client\s*=\s*[A-Za-z0-9_]+\s*;\s*$/gim, "");

// 匯入後 users 的個人資料欄位(姓名、性別、電話…)要允許空白,不然註冊只送帳號密碼會被擋下來。
// 只處理「不可為空、又沒有預設值」的欄位,有預設值的不動;欄位原本的字元集和排序規則會保留。
async function fixUsersColumns(conn) {
  const [cols] = await conn.query(
    `SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT, EXTRA, COLUMN_KEY,
            CHARACTER_SET_NAME, COLLATION_NAME
       FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
      ORDER BY ORDINAL_POSITION`
  );
  const fixed = [];
  for (const col of cols) {
    const name = col.COLUMN_NAME;
    if (["user_id", "username", "password"].includes(name)) continue;
    if (col.COLUMN_KEY === "PRI") continue;
    if (col.EXTRA && col.EXTRA.toLowerCase().includes("auto_increment")) continue;
    if (col.IS_NULLABLE === "YES") continue;
    if (col.COLUMN_DEFAULT !== null) continue;
    const charsetClause = col.CHARACTER_SET_NAME
      ? ` CHARACTER SET ${col.CHARACTER_SET_NAME} COLLATE ${col.COLLATION_NAME}`
      : "";
    await conn.query(
      `ALTER TABLE users MODIFY COLUMN \`${name}\` ${col.COLUMN_TYPE}${charsetClause} NULL DEFAULT NULL`
    );
    fixed.push(name);
  }
  return fixed;
}

let conn;
try {
  conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === "false" ? undefined : { rejectUnauthorized: false }, // Aiven 要求加密連線
    charset: "utf8mb4", // 連線編碼。沒有這行,檔案裡的中文會被存成 ?
    multipleStatements: true,
  });
  console.log("已連線到資料庫");

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
    console.warn("無法在這次連線中關閉主鍵檢查(不是 MySQL 8 的話可以忽略):", e.message);
  }

  console.log("開始匯入...");
  await conn.query(sql);

  const [tableRows] = await conn.query("SHOW TABLES");
  const names = tableRows.map((row) => Object.values(row)[0]);
  console.log(`匯入完成,共 ${names.length} 張資料表:`);
  console.log(names.join(", "));

  // 實際建出來的資料表排序規則(開頭就是字元集),跟上面檢查的結果對照
  const [collations] = await conn.query(
    `SELECT TABLE_COLLATION AS collation, COUNT(*) AS n FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = DATABASE() GROUP BY TABLE_COLLATION`
  );
  console.log(`實際的資料表字元集/排序規則:${collations.map((c) => `${c.collation}×${c.n}`).join("、")}`);

  if (names.includes("users")) {
    const fixed = await fixUsersColumns(conn);
    console.log(
      fixed.length > 0
        ? `已把 users 的 ${fixed.join("、")} 改成允許空白(註冊時只需要帳號和密碼)`
        : "users 的欄位不需要調整"
    );

    const [users] = await conn.query("SELECT COUNT(*) AS n FROM users");
    console.log(`users 資料表目前有 ${users[0].n} 筆資料`);
    if (users[0].n > 0) {
      // 列出使用者資料(不含密碼),肉眼確認中文有沒有變成問號
      const [sample] = await conn.query("SELECT user_id, username, name, gender FROM users LIMIT 5");
      console.table(sample);
    } else {
      console.log("users 是空的,請到 App 重新註冊 admin 帳號。");
    }
  }
} catch (err) {
  console.error("匯入失敗:", err.message);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "medication_db",
  // 雲端資料庫(Aiven)要求加密連線,.env 裡設 DB_SSL=true 就會啟用
  ssl:
    process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 5, // 部署後每個函式實例各有一組連線,數量抓小一點避免佔滿
});

export default pool;
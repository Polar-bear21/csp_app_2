import { createPool } from "mysql2/promise";

//接続プール
const pool = createPool({
  host: process.env.DB_HOST,       // MySQLサーバーのホスト名
  user: process.env.DB_USER,       // MySQLユーザー名
  password: process.env.DB_PASSWORD, // MySQLパスワード
  database: process.env.DB_DATABASE, // 使用するデータベース名
});

export default pool;
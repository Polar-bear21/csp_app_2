// import { createPool } from "mysql2/promise";

// //接続プール
// const pool = createPool({
//   host: process.env.DB_HOST,       // MySQLサーバーのホスト名
//   user: process.env.DB_USER,       // MySQLユーザー名
//   password: process.env.DB_PASSWORD, // MySQLパスワード
//   database: process.env.DB_DATABASE, // 使用するデータベース名
// });

// export default pool;

import { Client } from 'pg';

// Supabaseの接続情報を設定
const client = new Client({
  user: process.env.SUPABASE_USER, // Supabaseのユーザー名
  host: process.env.SUPABASE_HOST, // Supabaseのホスト
  database: process.env.SUPABASE_DATABASE, // Supabaseのデータベース名
  password: process.env.SUPABASE_PASSWORD, // Supabaseのパスワード
  port: parseInt(process.env.SUPABASE_PORT || '5432' ), // 通常のPostgreSQLのポート番号
});

client.connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error', err.stack);
  });

export default client;

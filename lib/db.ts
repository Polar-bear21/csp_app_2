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
  user: 'postgres.fjgngzsgyomzgknfgdzm', // Supabaseのユーザー名
  host: 'aws-0-ap-northeast-1.pooler.supabase.com', // Supabaseのホスト
  database: 'postgres', // Supabaseのデータベース名
  password: 'Nippo24c16_', // Supabaseのパスワード
  port: 6543, // 通常のPostgreSQLのポート番号
});

client.connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error', err.stack);
  });

export default client;

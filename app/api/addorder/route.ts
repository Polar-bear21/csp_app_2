import { NextResponse } from 'next/server';
import pool from "@/lib/db";
// import client from '@/lib/db';

export async function POST(request: Request) {
  try {
    // リクエストボディからデータを取得
    const {
        name,
        code
    } = await request.json();

    console.log(name,code);
    
    // // データベースへの挿入クエリ
    const query = `
      INSERT INTO project (name, code) VALUES (?, ?)
    `;
    // クエリを実行
    await pool.query(query, [name, code]);

    // 成功レスポンスを返す
    return NextResponse.json({ message: 'Report added successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error adding report:', error);
    return NextResponse.json({ message: 'Error adding report' }, { status: 500 });
  }
}

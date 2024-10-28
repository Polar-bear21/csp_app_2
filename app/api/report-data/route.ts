import { NextResponse } from 'next/server';
import pool from '@/lib/db';  // データベースの接続プールをインポート

export async function GET() {
  try {
    //daily_report、worker、projectテーブルを結合してdaily_reportテーブルを取得
    const [rows] = await pool.query(`
      SELECT * FROM daily_report
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('データ取得エラー:', error);
    return NextResponse.json({ error: 'データ取得に失敗しました' }, { status: 500 });
  }
}


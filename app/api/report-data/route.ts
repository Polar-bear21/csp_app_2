import { NextResponse } from "next/server";
import pool from "@/lib/db"; // データベースの接続プールをインポート
// import client from '@/lib/db';

export async function GET() {
  try {
    //daily_report、worker、projectテーブルを結合してdaily_reportテーブルを取得
    const [rows] = await pool.query(`
      SELECT 
        daily_report.id,
        daily_report.date,
        worker.name AS worker_name,
        project.code AS project_name,
        daily_report.start_time,
        daily_report.end_time,
        daily_report.duration,
        daily_report.break_time,
        daily_report.status,
        daily_report.approver_id
      FROM daily_report
      JOIN worker ON daily_report.worker_id = worker.id
      JOIN project ON daily_report.project_id = project.id
      ORDER BY daily_report.id DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("データ取得エラー:", error);
    return NextResponse.json(
      { error: "データ取得に失敗しました" },
      { status: 500 }
    );
  }
}

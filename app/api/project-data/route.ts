import { NextResponse } from "next/server";
import pool from "@/lib/db"; // データベースの接続プールをインポート
// import client from '@/lib/db';

export async function GET() {
  try {
    //daily_report、worker、projectテーブルを結合してdaily_reportテーブルを取得
    const [rows] = await pool.query(`
      SELECT 
        p.id AS project_id,
        p.name AS project_name,
        p.code AS project_code,
        GROUP_CONCAT(w.name SEPARATOR ', ') AS worker_names
      FROM 
        project AS p
      LEFT JOIN 
        worker_project AS wp ON p.id = wp.project_id
      LEFT JOIN 
        worker AS w ON wp.worker_id = w.id
      GROUP BY 
        p.id
      ORDER BY 
        p.id;
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


/*      SELECT 
        p.id AS project_id,
        p.name AS project_name,
        string_agg(w.name, ', ' ORDER BY w.name) AS worker_names
      FROM 
        project AS p
      JOIN 
        worker_project AS wp ON p.id = wp.project_id
      JOIN 
        worker AS w ON wp.worker_id = w.id
      GROUP BY 
        p.id
      ORDER BY 
        p.id;*/

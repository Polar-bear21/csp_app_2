import { NextResponse } from "next/server";
import pool from "@/lib/db"; // データベースの接続プールをインポート
// import client from "@/lib/db";

export async function GET() {
  try {
    //daily_report、worker、projectテーブルを結合してdaily_reportテーブルを取得
    const [rows] = await pool.query(`
      SELECT
        worker.id AS id, 
        worker.name AS worker_name, 
        company.name AS company_name, 
        worker.user_id, 
        GROUP_CONCAT(project.code SEPARATOR ', ') AS project_codes
      FROM worker
      LEFT JOIN worker_project ON worker.id = worker_project.worker_id
      LEFT JOIN project ON worker_project.project_id = project.id
      LEFT JOIN company ON worker.company_id = company.id
      GROUP BY worker.id
      ORDER BY id DESC;  -- 会社id順に並び変え

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

/* SELECT
        worker.id AS id, 
        worker.name AS worker_name, 
        company.name AS company_name, 
        worker.user_id, 
        GROUP_CONCAT(project.name SEPARATOR ', ') AS project_names
      FROM worker
      LEFT JOIN worker_project ON worker.id = worker_project.worker_id
      LEFT JOIN project ON worker_project.project_id = project.id
      LEFT JOIN company ON worker.company_id = company.id
      GROUP BY worker.id
      ORDER BY id DESC;  -- 会社id順に並び変え*/


/*
SELECT
        worker.id AS id, 
        worker.name AS worker_name, 
        company.name AS company_name, 
        worker.user_id, 
        STRING_AGG(project.name, ', ') AS project_names
      FROM worker
      LEFT JOIN worker_project ON worker.id = worker_project.worker_id
      LEFT JOIN project ON worker_project.project_id = project.id
      LEFT JOIN company ON worker.company_id = company.id
      GROUP BY worker.id, worker.name, company.name, worker.user_id
      ORDER BY id DESC;*/
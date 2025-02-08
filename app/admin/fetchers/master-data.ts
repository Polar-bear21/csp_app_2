"use server";
import { NextResponse } from "next/server";
import pool from "@/lib/db"; // データベース接続プールをインポート

export async function getAllWorkers() {
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
    return NextResponse.json(rows, {
      headers: {
        "Cache-Control": "no-store, max-age=0",},
    });
  } catch (error) {
    console.error("データ取得エラー:", error);
    return NextResponse.json(
      { error: "データ取得に失敗しました" },
      { status: 500 , headers:{"Cache-Control": "no-store, max-age=0",} }
    );
  }
}

export async function getAllProjects() {
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

export async function getAllReports() {
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

import pool from "@/lib/db";
import { NextResponse } from "next/server";
export async function PATCH(request: Request) {
  try {
    const { id, date, project_id, status, start_time, end_time, break_time } =
      await request.json();

    // ISOフォーマットの日付をYYYY-MM-DD形式に変換
    const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-'); // 必要に応じて`/`を`-`に置き換え

    // クエリ
    const query = `
      UPDATE daily_report 
      SET 
        date = ?, 
        project_id = ?, 
        status = ?, 
        start_time = ?, 
        end_time = ?, 
        break_time = ?
      WHERE id = ?;
    `;
    // クエリを実行
    await pool.query(query, [formattedDate, project_id, status, start_time, end_time, break_time, id]);

    return NextResponse.json({ message: "データ編集完了"}, { status: 201 });
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
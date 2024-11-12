import { NextResponse } from 'next/server';
import client from '@/lib/db';

export async function POST(request: Request) {
  try {
    // リクエストボディからデータを取得
    const {
      date,
      workerId,
      projectID,
      startHour,
      startMinute,
      endHour,
      endMinute,
      breakHour,
      breakMinute,
      state,
    } = await request.json();


    // ISOフォーマットの日付をYYYY-MM-DD形式に変換
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const worker_id = Number(workerId);
    const project_id = Number(projectID);
    // 休憩時間を分単位で計算（例えば、"1:30"を90分に変換）
    const startTime = `${startHour}:${startMinute}`;
    const endTime = `${endHour}:${endMinute}`;
    const breakTime = `${breakHour}:${breakMinute}`;

    // worker_project テーブルに指定の worker_id と project_id が存在するか確認
    const rows = await client.query(
      `SELECT 1 FROM worker_project WHERE worker_id = ? AND project_id = ?`,
      [worker_id, project_id]
    );

    // 組み合わせが存在しない場合はエラーを返す
    if (Array.isArray(rows) && rows.length === 0) {
      return NextResponse.json(
        { message: `Error: Worker ID ${worker_id} is not assigned to Project ID ${project_id}.`  },
        { status: 400 }
      );
    }
    
    // データベースへの挿入クエリ
    const query = `
      INSERT INTO daily_report (date, worker_id, project_id, start_time, end_time, break_time, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    // クエリを実行
    await client.query(query, [formattedDate, worker_id, project_id, startTime, endTime, breakTime, state]);

    // 成功レスポンスを返す
    return NextResponse.json({ message: 'Report added successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error adding report:', error);
    return NextResponse.json({ message: 'Error adding report' }, { status: 500 });
  }
}

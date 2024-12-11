import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
  try {
    
    // リクエストボディからデータを取得
    const  {worker_name,userID,password,company_id,selectedProjects,}  = await request.json();
    // パスワードをハッシュ化
    const saltRounds = 10; // コストファクター
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // トランザクションを開始
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // workerテーブルにデータを挿入
      const [result] = await connection.query<ResultSetHeader>(
        'INSERT INTO worker (name, company_id, user_id, password) VALUES (?, ?, ?, ?)',
        [worker_name, company_id, userID, hashedPassword]
      );
      // 挿入されたworker_idを取得
      const workerId = result.insertId;

      // worker_projectテーブルにデータを挿入
      for (const projectId of selectedProjects) {
        await connection.query<ResultSetHeader>(
          'INSERT INTO worker_project (worker_id, project_id) VALUES (?, ?)',
          [workerId, projectId]
        );
      }
      await connection.commit();

      // 成功レスポンスを返す
      return NextResponse.json({ 
        message: 'Worker added successfully!', 
        workerId: workerId 
      }, { status: 201 });

    } catch (error) {
      // エラーが発生した場合、トランザクションをロールバック
      await connection.rollback();
      throw error;
    } finally {
      // 接続を解放
      connection.release();
    }
    
  } catch (error) {
    console.error('Error adding worker:', error);
    return NextResponse.json({ message: 'Error adding worker' }, { status: 500 });
  }
}

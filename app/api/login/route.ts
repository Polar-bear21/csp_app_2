// app/api/login/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 環境変数から秘密鍵を取得
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'; // デフォルトは必ず変更する

//POSTメソッドのエンドポイント
export async function POST(request: Request) {
    //リクエストボディからユーザーIDとパスワードを取得
  const { userId, password } = await request.json();

  try {
    // 管理者を検索
    const [adminRows] = await pool.query(
        'SELECT * FROM admin WHERE user_id = ?',
        [userId]
    );
    // 管理者に一致する場合
    if (Array.isArray(adminRows) && adminRows.length > 0) {
      const admin = adminRows[0];
      // パスワードを比較（ハッシュ化されたパスワードを照合）
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch){
        // JWTトークンの生成
        const token = jwt.sign(
          { userId: admin.user_id,
            role: 'admin' // 管理者の場合
          }, JWT_SECRET, { expiresIn: '1h' }); //一時間だけ有効
        return NextResponse.json({
          success: true,
          role: 'admin',
          token,}); //トークンを返す
      }
    }
    
    // 作業者を検索
    const [workerRows] = await pool.query(
        'SELECT * FROM worker WHERE user_id = ?',
        [userId]
    );
    // 作業者に一致する場合
    if (Array.isArray(workerRows) && workerRows.length > 0) {
      const worker = workerRows[0];
      const passwordMatch = await bcrypt.compare(password, worker.password);
      if (passwordMatch){
        // JWTトークンを生成
        const token = jwt.sign(
          { userId: worker.user_id,
            role: 'worker'
          }, JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({
          success: true,
          role: 'worker',
          token });
      }
    }

    // どちらにも一致しない場合
    return NextResponse.json({
        success: false,
        message: 'ユーザーIDまたはパスワードが間違っています。',
    }, { status: 401 }); // Unauthorized

  } catch (error) {
    console.error("Database Error:", error); // データベースエラーを表示
    return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました。' });
  }
}

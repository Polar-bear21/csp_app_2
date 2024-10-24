// app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  // ログインページにリダイレクト
  redirect('/login');
  return null; // 何も表示しない
}


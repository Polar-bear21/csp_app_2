"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ
    console.log("ユーザーID:", userId, "パスワード:", password);

    // サーバーへのリクエスト
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const data = await response.json();
    console.log(data); //レスポンス全体を表示後で消す

    if (data.success) {
      // トークンをlocalStorageに保存
      localStorage.setItem('token', data.token);
      // 管理者か作業者の判別
      router.push(data.role === "admin" ? "/admin" : "/worker");

    } else {
      alert(data.message); // エラーメッセージを表示
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/*アプリのタイトル */}
      <h1 className="text-4xl font-bold mb-8">日報管理</h1>
      
      {/*ログインフォーム */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">ログイン</CardTitle>
          <></>
          <CardDescription></CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="userId">ユーザーID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="例）2021m049"
              required
              value={userId}
              onChange={(e)=>setUserId(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              placeholder="例）2024w1224"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">半角英数字</p>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full">Sign in</Button>
        </CardFooter>
        </form>
      </Card>
    </div>
  );
}

// app/login/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/common/Button";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("demo@sakura-care.example.jp");
  const [pw, setPw] = useState("demo1234");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/student");
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-2xl font-bold text-brand">えん人 LMS</div>
            <div className="text-xs text-text-muted mt-1">受講者ログイン</div>
          </Link>
        </div>

        <div className="bg-surface border border-border-default rounded-lg shadow-sm p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">受講者ID (メールアドレス)</label>
              <input
                type="email"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">パスワード</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <Button type="submit" className="w-full">ログイン</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border-default">
            <div className="text-xs text-text-muted mb-2">デモアカウント(入力済み)</div>
            <div className="text-xs text-text-secondary space-y-0.5">
              <div>ID: demo@sakura-care.example.jp</div>
              <div>PW: demo1234</div>
              <div className="text-text-muted mt-2">※ 本モックアップでは認証は行わず、そのまま受講者画面へ遷移します</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-text-secondary hover:text-brand transition-colors duration-300">
            ← デモトップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

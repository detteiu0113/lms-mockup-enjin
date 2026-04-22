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
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 justify-center mb-10">
          <div className="w-6 h-6 bg-brand rounded" />
          <div className="text-sm font-semibold tracking-tight">Enjin LMS</div>
        </Link>

        <div className="bg-surface border border-border-default rounded-md p-8">
          <h1 className="text-lg font-semibold text-text mb-1">ログイン</h1>
          <p className="text-xs text-text-secondary mb-6">受講者アカウントでサインインしてください。</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">メールアドレス</label>
              <input
                type="email"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full h-9 px-3 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">パスワード</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full h-9 px-3 text-sm border border-border-strong rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <Button type="submit" className="w-full">ログイン</Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border-default">
            <div className="text-[11px] text-text-muted leading-relaxed">
              本モックでは認証を行いません。そのまま受講者画面へ遷移します。
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-text-secondary hover:text-text">
            ← デモトップ
          </Link>
        </div>
      </div>
    </div>
  );
}

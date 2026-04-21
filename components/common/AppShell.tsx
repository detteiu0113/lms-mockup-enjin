// components/common/AppShell.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import type { Role } from "@/types";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navMap: Record<Role, { title: string; subtitle: string; items: NavItem[] }> = {
  student: {
    title: "受講者ポータル",
    subtitle: "Learner Portal",
    items: [
      { href: "/student", label: "マイコース", icon: "📘" },
      { href: "/student/history", label: "学習履歴", icon: "📊" },
      { href: "/student/certificates", label: "修了証", icon: "🏅" },
      { href: "/student/industry", label: "業種変更", icon: "🏷️" },
    ],
  },
  company: {
    title: "企業管理画面",
    subtitle: "Company Admin",
    items: [
      { href: "/company", label: "ダッシュボード", icon: "📈" },
      { href: "/company/learners", label: "受講者管理", icon: "👥" },
      { href: "/company/export", label: "助成金エクスポート", icon: "📤" },
    ],
  },
  admin: {
    title: "NOMIEL運営画面",
    subtitle: "Platform Admin",
    items: [
      { href: "/admin", label: "概要", icon: "🏠" },
      { href: "/admin/industries", label: "業種管理", icon: "🏷️" },
      { href: "/admin/courses", label: "コース・動画", icon: "🎬" },
      { href: "/admin/companies", label: "クライアント企業", icon: "🏢" },
    ],
  },
};

interface Props {
  role: Role;
  children: ReactNode;
  userLabel?: string;
}

export default function AppShell({ role, children, userLabel }: Props) {
  const pathname = usePathname();
  const nav = navMap[role];

  return (
    <div className="min-h-screen flex">
      {/* サイドバー */}
      <aside className="w-64 bg-surface border-r border-border-default flex flex-col">
        <div className="px-6 py-6 border-b border-border-default">
          <Link href="/" className="block">
            <div className="text-lg font-bold text-brand">えん人 LMS</div>
            <div className="text-xs text-text-muted mt-0.5">{nav.subtitle}</div>
          </Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {nav.items.map((item) => {
            const active = pathname === item.href || (item.href !== `/${role}` && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-300 ${
                  active ? "bg-blue-50 text-brand font-medium" : "text-text hover:bg-surface-muted"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-border-default">
          <Link
            href="/"
            className="block text-xs text-text-secondary hover:text-brand transition-colors duration-300"
          >
            ← デモ画面選択に戻る
          </Link>
        </div>
      </aside>

      {/* メインエリア */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-surface border-b border-border-default px-8 h-14 flex items-center justify-between">
          <div className="text-sm font-medium text-text">{nav.title}</div>
          {userLabel && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs">
                {userLabel.charAt(0)}
              </div>
              <span className="text-text-secondary">{userLabel}</span>
            </div>
          )}
        </header>
        <main className="flex-1 overflow-auto bg-bg p-8">{children}</main>
      </div>
    </div>
  );
}

// components/common/AppShell.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import type { Role } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Award,
  Users,
  Building2,
  FileDown,
  LibraryBig,
  Tags,
  Home,
  LogOut,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> };

const navMap: Record<Role, { appName: string; items: NavItem[] }> = {
  student: {
    appName: "Enjin LMS",
    items: [
      { href: "/student", label: "マイコース", icon: BookOpen },
      { href: "/student/history", label: "学習履歴", icon: BarChart3 },
      { href: "/student/certificates", label: "修了証", icon: Award },
    ],
  },
  company: {
    appName: "Enjin LMS / Company",
    items: [
      { href: "/company", label: "ダッシュボード", icon: LayoutDashboard },
      { href: "/company/learners", label: "受講者", icon: Users },
      { href: "/company/export", label: "学習記録エクスポート", icon: FileDown },
    ],
  },
  enjin: {
    appName: "Enjin LMS / 合同会社えん人",
    items: [
      { href: "/enjin", label: "概要", icon: Home },
      { href: "/enjin/companies", label: "クライアント企業", icon: Building2 },
      { href: "/enjin/learners", label: "受講者", icon: Users },
    ],
  },
  nomiel: {
    appName: "Enjin LMS / NOMIEL",
    items: [
      { href: "/nomiel", label: "概要", icon: Home },
      { href: "/nomiel/industries", label: "業種", icon: Tags },
      { href: "/nomiel/courses", label: "コース・動画", icon: LibraryBig },
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
    <div className="min-h-screen flex bg-bg">
      <aside className="w-60 bg-surface border-r border-border-default flex flex-col">
        <div className="h-14 px-5 flex items-center border-b border-border-default">
          <Link href="/" className="text-[15px] font-semibold text-text tracking-tight">
            {nav.appName}
          </Link>
        </div>

        <nav className="flex-1 py-3 px-2">
          {nav.items.map((item) => {
            const Icon = item.icon;
            const isIndex = item.href === `/${role}`;
            const active = isIndex ? pathname === item.href : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-surface-subtle text-text font-medium"
                    : "text-text-secondary hover:bg-surface-subtle hover:text-text"
                }`}
              >
                <Icon size={16} className={active ? "text-accent" : ""} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-border-default">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-xs text-text-muted hover:bg-surface-subtle hover:text-text transition-colors"
          >
            <LogOut size={14} />
            <span>デモ選択に戻る</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 px-8 bg-surface border-b border-border-default flex items-center justify-end">
          {userLabel && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-[11px] font-medium">
                {userLabel.charAt(0)}
              </div>
              <span className="text-text-secondary">{userLabel}</span>
            </div>
          )}
        </header>
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

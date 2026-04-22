// app/page.tsx
// デモ用ランディング - 3ロール選択
import Link from "next/link";
import { GraduationCap, Building2, Settings, ArrowRight } from "lucide-react";

const roles = [
  {
    href: "/login",
    title: "受講者",
    subtitle: "動画視聴・学習履歴・修了証",
    description: "クライアント企業の従業員として動画を視聴する画面",
    Icon: GraduationCap,
  },
  {
    href: "/company",
    title: "クライアント",
    subtitle: "受講者管理・助成金証跡",
    description: "自社従業員の受講状況を管理し、助成金申請用の証跡を出力",
    Icon: Building2,
  },
  {
    href: "/admin",
    title: "管理者",
    subtitle: "業種・コース・契約管理",
    description: "プロセル(開発チーム)がプラットフォーム全体を運用する画面",
    Icon: Settings,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="border-b border-border-default bg-surface">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-brand rounded" />
            <div className="text-sm font-semibold tracking-tight">Enjin LMS</div>
          </div>
          <div className="text-xs text-text-muted tabular-nums">Demo · v0.2</div>
        </div>
      </header>

      <section className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="max-w-2xl mb-14">
            <div className="text-xs font-medium text-accent mb-4 tracking-wide uppercase">Preview</div>
            <h1 className="text-4xl font-semibold text-text tracking-tight leading-tight mb-4">
              業種別カリキュラムと<br />
              助成金証跡を両立するLMS
            </h1>
            <p className="text-text-secondary leading-relaxed">
              合同会社えん人 LMS構築プロジェクトのデモ。以下の3ロールから画面をご確認ください。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {roles.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group bg-surface border border-border-default rounded-md p-6 hover:border-text hover:shadow-sm transition-all"
              >
                <div className="mb-8">
                  <r.Icon size={20} className="text-text-secondary group-hover:text-text transition-colors" strokeWidth={1.5} />
                </div>
                <div className="text-xs text-text-muted mb-1">{r.subtitle}</div>
                <div className="text-base font-semibold text-text mb-3">{r.title}</div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{r.description}</p>
                <div className="text-xs text-text group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  開く
                  <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-border-default">
            <div className="text-xs text-text-muted mb-4 tracking-wide uppercase">本デモの機能範囲</div>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-2 text-sm text-text-secondary">
              <li>動画ストリーミング再生 / レジューム</li>
              <li>秒単位の視聴ログ記録</li>
              <li>累計学習時間 10時間要件トラッキング</li>
              <li>修了証の自動発行 (PDF)</li>
              <li>業種別コース分岐 (4業種 + 拡張可能)</li>
              <li>受講者アカウント管理</li>
              <li>助成金証跡 CSV / PDF エクスポート</li>
              <li>助成金シミュレーション (中小 / 大企業)</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border-default bg-surface">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between text-xs text-text-muted">
          <div>Procell × 合同会社えん人</div>
          <div>Confidential</div>
        </div>
      </footer>
    </div>
  );
}

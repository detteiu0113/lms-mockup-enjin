// app/page.tsx
// デモ用ランディング - 3つのロール画面へ遷移できる入口
import Link from "next/link";

const roles = [
  {
    href: "/login",
    label: "受講者(従業員)としてログイン",
    subtitle: "クライアント企業の従業員が動画を視聴する画面",
    icon: "🎓",
    tone: "受講者ポータル",
  },
  {
    href: "/company",
    label: "クライアント企業管理者",
    subtitle: "自社従業員の受講状況・助成金証跡を管理",
    icon: "🏢",
    tone: "企業管理画面",
  },
  {
    href: "/admin",
    label: "NOMIEL運営者",
    subtitle: "業種・コース・クライアント企業を運営",
    icon: "⚙️",
    tone: "運営画面",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="bg-brand text-white">
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">合同会社えん人 LMS</div>
            <div className="text-xs opacity-80 mt-0.5">Voice整体師メソッド × リスキリング助成金対応LMS</div>
          </div>
          <div className="text-xs opacity-70">モックアップ v0.1 · 2026.04</div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-8 py-12 w-full">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 bg-blue-50 text-brand rounded-full text-xs font-medium mb-3">
            DEMO
          </div>
          <h1 className="text-3xl font-bold text-text mb-3">
            業種別カリキュラム × 助成金証跡を両立するLMS
          </h1>
          <p className="text-text-secondary leading-relaxed">
            本モックアップは、実装予定のシステムの操作感を確認するためのデモです。<br />
            下記の3つのロールから、それぞれの画面をご覧いただけます。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {roles.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group bg-surface border border-border-default rounded-lg p-6 hover:border-brand hover:shadow-md transition-all duration-300"
            >
              <div className="text-4xl mb-4">{r.icon}</div>
              <div className="text-xs text-brand font-medium mb-1">{r.tone}</div>
              <div className="text-base font-bold text-text mb-2">{r.label}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{r.subtitle}</p>
              <div className="mt-4 text-sm text-brand group-hover:translate-x-1 transition-transform duration-300">
                画面を開く →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-surface border border-border-default rounded-lg p-6">
          <div className="text-sm font-bold text-text mb-3">このデモで確認できる基本機能</div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-text-secondary">
            <li>✓ 動画ストリーミング再生 (Zoom録画由来・横画面)</li>
            <li>✓ 秒単位の視聴ログ記録</li>
            <li>✓ 受講進捗の自動管理</li>
            <li>✓ 累計学習時間の自動集計 (10h要件)</li>
            <li>✓ 修了証PDF自動発行</li>
            <li>✓ 業種別コース分岐 (4業種 + 拡張可能)</li>
            <li>✓ 受講者ID発行・アカウント管理</li>
            <li>✓ 助成金証跡CSV / PDFエクスポート</li>
          </ul>
        </div>
      </section>

      <footer className="mt-auto border-t border-border-default bg-surface">
        <div className="max-w-5xl mx-auto px-8 py-4 text-xs text-text-muted flex items-center justify-between">
          <div>© NOMIEL × 合同会社えん人 LMS構築プロジェクト</div>
          <div>CONFIDENTIAL</div>
        </div>
      </footer>
    </div>
  );
}

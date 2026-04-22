// app/admin/page.tsx
import PageHeader from "@/components/common/PageHeader";
import { companies } from "@/mocks/companies";
import { learners } from "@/mocks/learners";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { industries } from "@/mocks/industries";
import { progress } from "@/mocks/progress";
import { formatDurationJP, formatDate } from "@/lib/format";
import { getIndustryName } from "@/lib/selectors";

export default function AdminOverview() {
  const totalSec = progress.reduce((acc, p) => acc + p.watchedSec, 0);
  const completedVideos = progress.filter((p) => p.completed).length;

  return (
    <>
      <PageHeader
        title="プラットフォーム概要"
        description="プロセル運営 ・ 合同会社えん人 LMS 運用状況"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">クライアント企業</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{companies.length}</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">受講者 総数</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{learners.length}</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">業種カテゴリ</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{industries.length}</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">登録動画</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{videos.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-sm font-semibold text-text mb-4">視聴統計</div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">総視聴時間</dt>
              <dd className="font-medium text-text tabular-nums">{formatDurationJP(totalSec)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">視聴完了動画</dt>
              <dd className="font-medium text-text tabular-nums">{completedVideos}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">登録コース</dt>
              <dd className="font-medium text-text tabular-nums">{courses.length}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-sm font-semibold text-text mb-4">業種別 契約企業</div>
          <dl className="space-y-2 text-sm">
            {industries.map((ind) => {
              const count = companies.filter((c) => c.industryId === ind.id).length;
              return (
                <div key={ind.id} className="flex items-center justify-between">
                  <dt className="text-text-secondary">{ind.name}</dt>
                  <dd className="font-medium text-text tabular-nums">{count}<span className="text-text-muted font-normal ml-0.5">社</span></dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">契約企業一覧</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">企業名</th>
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-left px-4 h-10 font-medium">規模</th>
              <th className="text-right px-4 h-10 font-medium">契約枠</th>
              <th className="text-left px-4 h-10 font-medium">契約開始</th>
              <th className="text-left px-4 h-10 font-medium">契約終了</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {companies.map((c) => (
              <tr key={c.id} className="hover:bg-surface-subtle">
                <td className="px-4 py-3 font-medium text-text">{c.name}</td>
                <td className="px-4 py-3 text-text-secondary">{getIndustryName(c.industryId)}</td>
                <td className="px-4 py-3 text-text-secondary">{c.size === "sme" ? "中小" : "大企業"}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.contractedLearners}名</td>
                <td className="px-4 py-3 text-text-secondary tabular-nums">{formatDate(c.contractStart)}</td>
                <td className="px-4 py-3 text-text-secondary tabular-nums">{formatDate(c.contractEnd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

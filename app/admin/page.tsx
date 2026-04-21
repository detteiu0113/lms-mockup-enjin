// app/admin/page.tsx
// NOMIEL運営者 概要画面
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import { companies } from "@/mocks/companies";
import { learners } from "@/mocks/learners";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { industries } from "@/mocks/industries";
import { progress } from "@/mocks/progress";
import { formatDuration, formatDate } from "@/lib/format";
import { getIndustryName } from "@/lib/selectors";

export default function AdminOverview() {
  const totalSec = progress.reduce((acc, p) => acc + p.watchedSec, 0);
  const completedVideos = progress.filter((p) => p.completed).length;

  return (
    <>
      <PageHeader
        title="プラットフォーム概要"
        description="合同会社えん人 LMS の全体運用状況"
      />

      {/* 主要KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-xs text-text-secondary mb-1">クライアント企業</div>
          <div className="text-3xl font-bold text-text">{companies.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">総受講者数</div>
          <div className="text-3xl font-bold text-text">{learners.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">業種カテゴリ</div>
          <div className="text-3xl font-bold text-text">{industries.length}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">登録動画本数</div>
          <div className="text-3xl font-bold text-text">{videos.length}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <div className="text-sm font-bold text-text mb-4">視聴統計</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">総視聴時間</span>
              <span className="font-bold">{formatDuration(totalSec)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">視聴完了動画数</span>
              <span className="font-bold">{completedVideos}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">登録コース数</span>
              <span className="font-bold">{courses.length}</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-sm font-bold text-text mb-4">業種別 契約企業</div>
          <div className="space-y-2 text-sm">
            {industries.map((ind) => {
              const count = companies.filter((c) => c.industryId === ind.id).length;
              return (
                <div key={ind.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{ind.icon}</span>
                    <span>{ind.name}</span>
                  </div>
                  <span className="font-bold">{count}社</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* 契約企業一覧 */}
      <h2 className="text-base font-bold text-text mb-3">契約企業一覧</h2>
      <Card padded={false} className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">企業名</th>
              <th className="text-left px-4 py-3 font-medium">業種</th>
              <th className="text-right px-4 py-3 font-medium">契約枠</th>
              <th className="text-left px-4 py-3 font-medium">契約開始</th>
              <th className="text-left px-4 py-3 font-medium">契約終了</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {companies.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 font-medium text-text">{c.name}</td>
                <td className="px-4 py-3 text-text-secondary">{getIndustryName(c.industryId)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{c.contractedLearners}名</td>
                <td className="px-4 py-3">{formatDate(c.contractStart)}</td>
                <td className="px-4 py-3">{formatDate(c.contractEnd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

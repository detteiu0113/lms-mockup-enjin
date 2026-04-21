// app/company/learners/[learnerId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { progress } from "@/mocks/progress";
import { companies } from "@/mocks/companies";
import { getLearnerById, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDuration, formatDate, formatDateTime } from "@/lib/format";

export default async function LearnerDetail({ params }: { params: Promise<{ learnerId: string }> }) {
  const { learnerId } = await params;
  const learner = getLearnerById(learnerId);
  if (!learner) notFound();
  const company = companies.find((c) => c.id === learner.companyId);

  const totalSec = getTotalWatchedSec(learner.id);
  const tenH = 10 * 3600;
  const pct10h = Math.min(100, Math.round((totalSec / tenH) * 100));

  const learnerCourses = courses.filter((c) => c.industryId === null || c.industryId === learner.industryId);
  const recentProgress = progress
    .filter((p) => p.learnerId === learner.id && p.watchedSec > 0)
    .slice(0, 8);

  return (
    <>
      <div className="mb-4">
        <Link href="/company/learners" className="text-sm text-text-secondary hover:text-brand transition-colors duration-300">
          ← 受講者一覧に戻る
        </Link>
      </div>

      <PageHeader
        title={learner.name}
        description={`${company?.name ?? ""} / ${getIndustryName(learner.industryId)} / ID: ${learner.id}`}
      />

      {/* 基本情報 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-xs text-text-secondary mb-1">受講開始日</div>
          <div className="text-base font-bold text-text">{formatDate(learner.enrolledAt)}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">累計学習時間</div>
          <div className="text-base font-bold text-text">{formatDuration(totalSec)}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">10h要件</div>
          <div className="text-base font-bold">
            {pct10h === 100 ? <span className="text-success">達成 ✓</span> : <span>{pct10h}%</span>}
          </div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">雇用保険被保険者</div>
          <div className="text-base font-bold">{learner.isInsured ? "加入" : "未加入"}</div>
        </Card>
      </div>

      {/* コース別進捗 */}
      <h2 className="text-base font-bold text-text mb-3">コース別進捗</h2>
      <Card padded={false} className="mb-6 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">コース</th>
              <th className="text-left px-4 py-3 font-medium">進捗</th>
              <th className="text-right px-4 py-3 font-medium">視聴時間</th>
              <th className="text-right px-4 py-3 font-medium">修了</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learnerCourses.map((c) => {
              const pg = getCourseProgress(learner.id, c.id);
              return (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium text-text">{c.title}</td>
                  <td className="px-4 py-3 w-64">
                    <ProgressBar percent={pg.percent} size="sm" />
                    <div className="text-xs text-text-muted mt-1">{pg.percent}% ({pg.completed}/{pg.total}本)</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatDuration(pg.watchedSec)}</td>
                  <td className="px-4 py-3 text-right">
                    {pg.percent === 100 ? <Badge tone="success">修了</Badge> : <Badge tone="neutral">未修了</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* 視聴ログ */}
      <h2 className="text-base font-bold text-text mb-3">最近の視聴ログ (助成金証跡)</h2>
      <Card padded={false} className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">動画タイトル</th>
              <th className="text-left px-4 py-3 font-medium">最終視聴日時</th>
              <th className="text-right px-4 py-3 font-medium">視聴秒数</th>
              <th className="text-right px-4 py-3 font-medium">ステータス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {recentProgress.map((p) => {
              const v = videos.find((x) => x.id === p.videoId);
              return (
                <tr key={p.videoId}>
                  <td className="px-4 py-3 text-text">{v?.title}</td>
                  <td className="px-4 py-3 text-text-secondary">{formatDateTime(p.lastWatchedAt)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{p.watchedSec}秒</td>
                  <td className="px-4 py-3 text-right">
                    {p.completed ? <Badge tone="success">完了</Badge> : <Badge tone="info">途中</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

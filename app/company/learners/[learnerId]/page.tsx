// app/company/learners/[learnerId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { progress } from "@/mocks/progress";
import { companies } from "@/mocks/companies";
import { getLearnerById, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDurationJP, formatDate, formatDateTimeSec } from "@/lib/format";

export default async function LearnerDetail({ params }: { params: Promise<{ learnerId: string }> }) {
  const { learnerId } = await params;
  const learner = getLearnerById(learnerId);
  if (!learner) notFound();
  const company = companies.find((c) => c.id === learner.companyId);

  const totalSec = getTotalWatchedSec(learner.id);
  const tenH = 10 * 3600;
  const pct10h = Math.min(100, Math.round((totalSec / tenH) * 100));

  const learnerCourses = courses.filter((c) => c.industryId === null || c.industryId === learner.industryId);

  const sessions = progress
    .filter((p) => p.learnerId === learner.id && p.sessions.length > 0)
    .flatMap((p) => p.sessions.map((s) => ({ videoId: p.videoId, ...s })))
    .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1))
    .slice(0, 12);

  return (
    <>
      <Link href="/company/learners" className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text mb-4">
        <ArrowLeft size={12} />
        受講者
      </Link>

      <PageHeader
        title={learner.name}
        description={`${company?.name ?? ""} ・ ${getIndustryName(learner.industryId)} ・ ${learner.id}`}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">受講開始</div>
          <div className="text-sm font-semibold text-text tabular-nums">{formatDate(learner.enrolledAt)}</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">累計学習</div>
          <div className="text-sm font-semibold text-text tabular-nums">{formatDurationJP(totalSec)}</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">10時間要件</div>
          <div className="text-sm font-semibold">
            {pct10h === 100 ? <Badge tone="success">達成</Badge> : <span className="text-text tabular-nums">{pct10h}%</span>}
          </div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">雇用保険被保険者</div>
          <div className="text-sm font-semibold text-text">{learner.isInsured ? "加入" : "未加入"}</div>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">コース別進捗</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">コース</th>
              <th className="text-left px-4 h-10 font-medium w-64">進捗</th>
              <th className="text-right px-4 h-10 font-medium">視聴時間</th>
              <th className="text-right px-4 h-10 font-medium">ステータス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learnerCourses.map((c) => {
              const pg = getCourseProgress(learner.id, c.id);
              return (
                <tr key={c.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3 font-medium text-text">{c.title}</td>
                  <td className="px-4 py-3">
                    <ProgressBar percent={pg.percent} size="sm" />
                    <div className="text-[11px] text-text-muted mt-1 tabular-nums">{pg.percent}% ({pg.completed}/{pg.total}本)</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatDurationJP(pg.watchedSec)}</td>
                  <td className="px-4 py-3 text-right">
                    {pg.percent === 100 ? <Badge tone="success">修了</Badge> : <Badge tone="neutral">未修了</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="text-sm font-semibold text-text mb-1">視聴セッション(助成金証跡)</h2>
      <div className="text-[11px] text-text-muted mb-3">開始・終了時刻は秒単位で記録されます。</div>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">動画</th>
              <th className="text-left px-4 h-10 font-medium">開始</th>
              <th className="text-left px-4 h-10 font-medium">終了</th>
              <th className="text-right px-4 h-10 font-medium">視聴時間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {sessions.map((s, i) => {
              const v = videos.find((x) => x.id === s.videoId);
              return (
                <tr key={`${s.videoId}-${i}`} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3 text-text">{v?.title}</td>
                  <td className="px-4 py-3 text-text-secondary tabular-nums">{formatDateTimeSec(s.startedAt)}</td>
                  <td className="px-4 py-3 text-text-secondary tabular-nums">{formatDateTimeSec(s.endedAt)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatDurationJP(s.durationSec)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

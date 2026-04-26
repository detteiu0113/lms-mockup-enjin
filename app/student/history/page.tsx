// app/student/history/page.tsx
import PageHeader from "@/components/common/PageHeader";
import Stat from "@/components/common/Stat";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { progress } from "@/mocks/progress";
import { currentLearner } from "@/mocks/learners";
import { getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDurationJP, formatDateTimeSec } from "@/lib/format";

export default function HistoryPage() {
  const totalSec = getTotalWatchedSec(currentLearner.id);
  const myProgress = progress.filter((p) => p.learnerId === currentLearner.id);
  const recentSessions = myProgress
    .filter((p) => p.sessions.length > 0)
    .flatMap((p) => p.sessions.map((s) => ({ videoId: p.videoId, ...s })))
    .sort((a, b) => (a.startedAt < b.startedAt ? 1 : -1))
    .slice(0, 15);

  const courseStats = courses.map((c) => ({ course: c, pg: getCourseProgress(currentLearner.id, c.id) }));
  const tenH = 10 * 3600;
  const pct10h = Math.min(100, Math.round((totalSec / tenH) * 100));

  return (
    <>
      <PageHeader title="学習履歴" description="累計学習時間と視聴記録(秒単位)" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-3 bg-surface border border-border-default rounded-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-text-secondary mb-1">学習目標: 10時間</div>
              <div className="text-xl font-semibold text-text tabular-nums tracking-tight">{formatDurationJP(totalSec)}</div>
            </div>
            <Badge tone={pct10h === 100 ? "success" : "info"}>
              {pct10h === 100 ? "達成" : `${pct10h}%`}
            </Badge>
          </div>
          <ProgressBar percent={pct10h} />
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">コース別</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">コース</th>
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-left px-4 h-10 font-medium w-48">進捗</th>
              <th className="text-right px-4 h-10 font-medium">視聴時間</th>
              <th className="text-right px-4 h-10 font-medium">本数</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {courseStats.map(({ course, pg }) => (
              <tr key={course.id} className="hover:bg-surface-subtle">
                <td className="px-4 py-3 font-medium text-text">{course.title}</td>
                <td className="px-4 py-3 text-text-secondary">{getIndustryName(course.industryId)}</td>
                <td className="px-4 py-3">
                  <ProgressBar percent={pg.percent} size="sm" />
                  <div className="text-[11px] text-text-muted mt-1 tabular-nums">{pg.percent}%</div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{formatDurationJP(pg.watchedSec)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{pg.completed} / {pg.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">最近の視聴セッション</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">動画</th>
              <th className="text-left px-4 h-10 font-medium">視聴開始</th>
              <th className="text-left px-4 h-10 font-medium">視聴終了</th>
              <th className="text-right px-4 h-10 font-medium">視聴時間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {recentSessions.map((s, i) => {
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

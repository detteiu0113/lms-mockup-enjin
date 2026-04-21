// app/student/history/page.tsx
// 学習履歴
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { progress } from "@/mocks/progress";
import { currentLearner } from "@/mocks/learners";
import { getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDuration, formatDateTime } from "@/lib/format";

export default function HistoryPage() {
  const totalSec = getTotalWatchedSec(currentLearner.id);
  const myProgress = progress.filter((p) => p.learnerId === currentLearner.id);
  const watchedVideos = myProgress.filter((p) => p.watchedSec > 0).slice(0, 10);

  const courseStats = courses.map((c) => ({
    course: c,
    pg: getCourseProgress(currentLearner.id, c.id),
  }));

  const tenHoursSec = 10 * 3600;
  const pct10h = Math.min(100, Math.round((totalSec / tenHoursSec) * 100));

  return (
    <>
      <PageHeader
        title="学習履歴"
        description="助成金申請に必要な「累計学習時間」「視聴記録」をここで確認できます。"
      />

      {/* 10時間要件の進捗 */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-text">助成金要件: 標準学習時間 10時間以上</div>
          <Badge tone={pct10h === 100 ? "success" : "info"}>
            {pct10h === 100 ? "達成" : "進行中"}
          </Badge>
        </div>
        <ProgressBar percent={pct10h} />
        <div className="mt-2 text-xs text-text-secondary">
          累計視聴: <span className="font-bold">{formatDuration(totalSec)}</span> / 10時間
        </div>
      </Card>

      {/* コース別集計 */}
      <h2 className="text-base font-bold text-text mb-3">コース別 視聴集計</h2>
      <Card padded={false} className="mb-8 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">コース</th>
              <th className="text-left px-4 py-3 font-medium">業種</th>
              <th className="text-left px-4 py-3 font-medium">進捗</th>
              <th className="text-right px-4 py-3 font-medium">視聴時間</th>
              <th className="text-right px-4 py-3 font-medium">視聴本数</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {courseStats.map(({ course, pg }) => (
              <tr key={course.id} className="hover:bg-surface-muted transition-colors duration-300">
                <td className="px-4 py-3 font-medium text-text">{course.title}</td>
                <td className="px-4 py-3 text-text-secondary">{getIndustryName(course.industryId)}</td>
                <td className="px-4 py-3 w-48">
                  <ProgressBar percent={pg.percent} size="sm" />
                  <div className="text-xs text-text-muted mt-1">{pg.percent}%</div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{formatDuration(pg.watchedSec)}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {pg.completed} / {pg.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* 最新視聴動画 */}
      <h2 className="text-base font-bold text-text mb-3">最近の視聴記録</h2>
      <Card padded={false} className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">動画</th>
              <th className="text-left px-4 py-3 font-medium">最終視聴</th>
              <th className="text-right px-4 py-3 font-medium">視聴秒数</th>
              <th className="text-right px-4 py-3 font-medium">ステータス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {watchedVideos.map((p) => {
              const v = videos.find((x) => x.id === p.videoId);
              return (
                <tr key={p.videoId}>
                  <td className="px-4 py-3 text-text">{v?.title ?? p.videoId}</td>
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

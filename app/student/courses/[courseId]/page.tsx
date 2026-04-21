// app/student/courses/[courseId]/page.tsx
// コース詳細 - 動画一覧
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { courses } from "@/mocks/courses";
import { currentLearner } from "@/mocks/learners";
import {
  getVideosByCourse,
  getProgressForLearnerVideo,
  getCourseProgress,
  getIndustryName,
} from "@/lib/selectors";
import { formatDuration, formatDurationClock } from "@/lib/format";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) notFound();

  const videos = getVideosByCourse(course.id);
  const pg = getCourseProgress(currentLearner.id, course.id);
  const isCompleted = pg.percent === 100;

  return (
    <>
      <div className="mb-4">
        <Link href="/student" className="text-sm text-text-secondary hover:text-brand transition-colors duration-300">
          ← マイコースに戻る
        </Link>
      </div>

      <PageHeader
        title={course.title}
        description={course.description}
        action={
          isCompleted ? (
            <Link href={`/student/certificates/${course.id}`}>
              <Button>🏅 修了証を発行</Button>
            </Link>
          ) : undefined
        }
      />

      <Card className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <Badge tone="brand">{getIndustryName(course.industryId)}</Badge>
          <div className="text-xs text-text-secondary">
            {videos.length}本 · 総尺 {formatDuration(pg.totalSec)}
          </div>
        </div>
        <ProgressBar percent={pg.percent} showLabel />
        <div className="text-xs text-text-muted mt-2">
          {pg.completed} / {pg.total} 本視聴完了 · 視聴時間 {formatDuration(pg.watchedSec)}
        </div>
      </Card>

      <h2 className="text-base font-bold text-text mb-3">動画一覧</h2>
      <div className="space-y-2">
        {videos.map((v, idx) => {
          const vp = getProgressForLearnerVideo(currentLearner.id, v.id);
          const watched = vp?.watchedSec ?? 0;
          const completed = vp?.completed ?? false;
          return (
            <Link
              key={v.id}
              href={`/student/courses/${course.id}/videos/${v.id}`}
              className="flex items-center gap-4 p-4 bg-surface border border-border-default rounded-lg hover:border-brand hover:shadow-sm transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-muted text-sm font-bold text-text-secondary">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-text truncate">{v.title}</span>
                  {completed && <Badge tone="success">視聴済</Badge>}
                  {!completed && watched > 0 && <Badge tone="info">再生中</Badge>}
                </div>
                <p className="text-xs text-text-secondary line-clamp-1">{v.description}</p>
              </div>
              <div className="text-xs text-text-muted tabular-nums">
                {watched > 0 && !completed
                  ? `${formatDurationClock(watched)} / ${formatDurationClock(v.durationSec)}`
                  : formatDurationClock(v.durationSec)}
              </div>
              <div className="text-brand">▶</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

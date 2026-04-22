// app/student/courses/[courseId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play, Check, Award, ArrowLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
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
import { formatDurationJP, formatDurationClock } from "@/lib/format";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) notFound();

  const videos = getVideosByCourse(course.id);
  const pg = getCourseProgress(currentLearner.id, course.id);
  const isCompleted = pg.percent === 100;

  return (
    <>
      <Link href="/student" className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text mb-4">
        <ArrowLeft size={12} />
        マイコース
      </Link>

      <PageHeader
        title={course.title}
        description={course.description}
        action={
          isCompleted ? (
            <Link href={`/student/certificates/${course.id}`}>
              <Button><Award size={14} /> 修了証</Button>
            </Link>
          ) : undefined
        }
      />

      <div className="bg-surface border border-border-default rounded-md p-5 mb-8">
        <div className="flex items-center gap-3 mb-4 text-xs text-text-secondary">
          <Badge tone="neutral">{getIndustryName(course.industryId)}</Badge>
          <span>·</span>
          <span>{videos.length}本</span>
          <span>·</span>
          <span>総尺 {formatDurationJP(pg.totalSec)}</span>
        </div>
        <ProgressBar percent={pg.percent} showLabel />
        <div className="mt-2 text-xs text-text-muted tabular-nums">
          {pg.completed} / {pg.total} 本視聴完了 · 視聴時間 {formatDurationJP(pg.watchedSec)}
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">動画一覧</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        {videos.map((v, idx) => {
          const vp = getProgressForLearnerVideo(currentLearner.id, v.id);
          const watched = vp?.watchedSec ?? 0;
          const completed = vp?.completed ?? false;
          return (
            <Link
              key={v.id}
              href={`/student/courses/${course.id}/videos/${v.id}`}
              className="flex items-center gap-4 p-4 border-b border-border-default last:border-b-0 hover:bg-surface-subtle transition-colors"
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                completed ? "bg-emerald-50 text-emerald-600" : "bg-surface-subtle text-text-secondary"
              }`}>
                {completed ? <Check size={14} /> : <Play size={12} fill="currentColor" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-text truncate font-medium">{v.title}</div>
                <div className="text-[11px] text-text-muted line-clamp-1 mt-0.5">{v.description}</div>
              </div>
              <div className="text-xs text-text-muted tabular-nums flex-shrink-0">
                {watched > 0 && !completed
                  ? `${formatDurationClock(watched)} / ${formatDurationClock(v.durationSec)}`
                  : formatDurationClock(v.durationSec)}
              </div>
              <ChevronRight size={14} className="text-text-muted flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </>
  );
}

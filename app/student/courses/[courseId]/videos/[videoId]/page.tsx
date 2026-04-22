// app/student/courses/[courseId]/videos/[videoId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Stat from "@/components/common/Stat";
import VideoPlayerClient from "./VideoPlayerClient";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { currentLearner } from "@/mocks/learners";
import { getVideosByCourse, getProgressForLearnerVideo } from "@/lib/selectors";
import { formatDurationClock, formatDurationJP } from "@/lib/format";

export default async function VideoPage({
  params,
}: {
  params: Promise<{ courseId: string; videoId: string }>;
}) {
  const { courseId, videoId } = await params;
  const course = courses.find((c) => c.id === courseId);
  const video = videos.find((v) => v.id === videoId);
  if (!course || !video) notFound();

  const pg = getProgressForLearnerVideo(currentLearner.id, video.id);
  const allVideos = getVideosByCourse(course.id);
  const curIdx = allVideos.findIndex((v) => v.id === video.id);
  const prev = curIdx > 0 ? allVideos[curIdx - 1] : null;
  const next = curIdx < allVideos.length - 1 ? allVideos[curIdx + 1] : null;

  return (
    <div>
      <Link
        href={`/student/courses/${course.id}`}
        className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text mb-4"
      >
        <ArrowLeft size={12} />
        {course.title}
      </Link>

      <div className="text-[11px] text-text-muted mb-1 tabular-nums">
        {curIdx + 1} / {allVideos.length}
      </div>
      <h1 className="text-xl font-semibold text-text mb-6 tracking-tight">{video.title}</h1>

      <div className="mb-6">
        <VideoPlayerClient
          src={video.src}
          title={video.title}
          initialSec={pg?.watchedSec && !pg.completed ? pg.watchedSec : 0}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Stat label="動画尺" value={formatDurationClock(video.durationSec)} />
        <Stat label="視聴済み時間" value={formatDurationJP(pg?.watchedSec ?? 0)} />
        <Stat
          label="ステータス"
          value={
            pg?.completed ? (
              <span className="text-success text-[20px]">視聴完了</span>
            ) : pg?.watchedSec ? (
              <span className="text-info text-[20px]">再生中</span>
            ) : (
              <span className="text-text-muted text-[20px]">未視聴</span>
            )
          }
        />
      </div>

      <div className="bg-surface border border-border-default rounded-md p-5 mb-6">
        <div className="text-xs text-text-muted mb-1.5">概要</div>
        <p className="text-sm text-text leading-relaxed">{video.description}</p>
      </div>

      <div className="flex items-center justify-between gap-4 text-sm">
        {prev ? (
          <Link href={`/student/courses/${course.id}/videos/${prev.id}`} className="text-text-secondary hover:text-text">
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/student/courses/${course.id}/videos/${next.id}`} className="text-text-secondary hover:text-text">
            {next.title} →
          </Link>
        ) : (
          <Link href={`/student/certificates/${course.id}`} className="text-text hover:text-accent">
            修了証を確認 →
          </Link>
        )}
      </div>
    </div>
  );
}

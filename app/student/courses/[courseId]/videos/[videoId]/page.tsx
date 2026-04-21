// app/student/courses/[courseId]/videos/[videoId]/page.tsx
// 動画再生ページ
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/common/Card";
import VideoPlayerClient from "./VideoPlayerClient";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { currentLearner } from "@/mocks/learners";
import { getVideosByCourse, getProgressForLearnerVideo } from "@/lib/selectors";
import { formatDurationClock, formatDuration } from "@/lib/format";

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
      <div className="mb-4">
        <Link
          href={`/student/courses/${course.id}`}
          className="text-sm text-text-secondary hover:text-brand transition-colors duration-300"
        >
          ← {course.title}
        </Link>
      </div>

      <div className="mb-2 text-xs text-text-muted">
        第{curIdx + 1}回 / 全{allVideos.length}本
      </div>
      <h1 className="text-xl font-bold text-text mb-4">{video.title}</h1>

      <div className="mb-6">
        <VideoPlayerClient
          src={video.src}
          title={video.title}
          initialSec={pg?.watchedSec && !pg.completed ? pg.watchedSec : 0}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="text-xs text-text-secondary mb-1">動画尺</div>
          <div className="text-lg font-bold text-text">{formatDurationClock(video.durationSec)}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">視聴済み時間</div>
          <div className="text-lg font-bold text-text">{formatDuration(pg?.watchedSec ?? 0)}</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">ステータス</div>
          <div className="text-lg font-bold">
            {pg?.completed ? (
              <span className="text-success">視聴完了 ✓</span>
            ) : (
              <span className="text-info">{pg?.watchedSec ? "再生中" : "未視聴"}</span>
            )}
          </div>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="text-sm font-bold text-text mb-2">この動画について</div>
        <p className="text-sm text-text-secondary leading-relaxed">{video.description}</p>
      </Card>

      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/student/courses/${course.id}/videos/${prev.id}`}
            className="text-sm text-brand hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/student/courses/${course.id}/videos/${next.id}`}
            className="text-sm text-brand hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            href={`/student/certificates/${course.id}`}
            className="text-sm text-brand hover:underline"
          >
            修了証を確認する →
          </Link>
        )}
      </div>
    </div>
  );
}

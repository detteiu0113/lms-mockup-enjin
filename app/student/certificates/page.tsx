// app/student/certificates/page.tsx
// 修了証一覧
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { currentLearner } from "@/mocks/learners";
import { getCourseProgress } from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default function CertificatesListPage() {
  const items = courses.map((c) => {
    const pg = getCourseProgress(currentLearner.id, c.id);
    return { course: c, progress: pg };
  });
  const completed = items.filter((i) => i.progress.percent === 100);
  const inProgress = items.filter((i) => i.progress.percent < 100);

  return (
    <>
      <PageHeader
        title="修了証"
        description="全動画の視聴完了時に自動発行されます。PDFダウンロードで助成金申請に添付できます。"
      />

      <h2 className="text-base font-bold text-text mb-3">発行済み</h2>
      {completed.length === 0 ? (
        <Card className="mb-8">
          <p className="text-sm text-text-secondary">まだ修了証が発行されたコースはありません。</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {completed.map((i) => (
            <Link
              key={i.course.id}
              href={`/student/certificates/${i.course.id}`}
              className="block p-5 bg-surface border border-border-default rounded-lg hover:border-brand hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">🏅</div>
                <Badge tone="success">発行済</Badge>
              </div>
              <div className="font-bold text-text mb-1">{i.course.title}</div>
              <div className="text-xs text-text-muted">発行日: {formatDate("2026-04-18T00:00:00Z")}</div>
            </Link>
          ))}
        </div>
      )}

      <h2 className="text-base font-bold text-text mb-3">受講中</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inProgress.map((i) => (
          <div
            key={i.course.id}
            className="p-5 bg-surface border border-border-default rounded-lg opacity-70"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl grayscale">🏅</div>
              <Badge tone="neutral">未発行</Badge>
            </div>
            <div className="font-bold text-text mb-1">{i.course.title}</div>
            <div className="text-xs text-text-muted">
              視聴完了: {i.progress.completed} / {i.progress.total}本
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

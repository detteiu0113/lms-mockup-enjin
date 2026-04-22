// app/student/certificates/page.tsx
import Link from "next/link";
import { Award } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { currentLearner } from "@/mocks/learners";
import { getCourseProgress } from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default function CertificatesListPage() {
  const items = courses.map((c) => ({ course: c, pg: getCourseProgress(currentLearner.id, c.id) }));
  const completed = items.filter((i) => i.pg.percent === 100);
  const inProgress = items.filter((i) => i.pg.percent < 100);

  return (
    <>
      <PageHeader
        title="修了証"
        description="全動画の視聴完了で自動発行されます。"
      />

      <h2 className="text-sm font-semibold text-text mb-3">発行済み</h2>
      {completed.length === 0 ? (
        <div className="bg-surface border border-border-default rounded-md p-6 mb-10 text-sm text-text-secondary">
          まだ発行された修了証はありません。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {completed.map((i) => (
            <Link
              key={i.course.id}
              href={`/student/certificates/${i.course.id}`}
              className="flex items-center gap-4 p-5 bg-surface border border-border-default rounded-md hover:border-text-secondary transition-colors"
            >
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center flex-shrink-0">
                <Award size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-text truncate">{i.course.title}</div>
                <div className="text-xs text-text-muted mt-0.5">発行日 {formatDate("2026-04-18")}</div>
              </div>
              <Badge tone="success">発行済</Badge>
            </Link>
          ))}
        </div>
      )}

      <h2 className="text-sm font-semibold text-text mb-3">受講中</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {inProgress.map((i) => (
          <div key={i.course.id} className="flex items-center gap-4 p-5 bg-surface border border-border-default rounded-md opacity-70">
            <div className="w-10 h-10 bg-surface-subtle text-text-muted rounded flex items-center justify-center flex-shrink-0">
              <Award size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-text truncate">{i.course.title}</div>
              <div className="text-xs text-text-muted mt-0.5 tabular-nums">
                {i.pg.completed} / {i.pg.total} 本視聴
              </div>
            </div>
            <Badge tone="neutral">未発行</Badge>
          </div>
        ))}
      </div>
    </>
  );
}

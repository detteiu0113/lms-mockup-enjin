// app/student/certificates/[courseId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import CertificatePreview from "@/components/certificate/CertificatePreview";
import PrintButton from "./PrintButton";
import { courses } from "@/mocks/courses";
import { companies } from "@/mocks/companies";
import { currentLearner } from "@/mocks/learners";
import { getCourseProgress } from "@/lib/selectors";
import { formatDate } from "@/lib/format";

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId);
  if (!course) notFound();

  const company = companies.find((c) => c.id === currentLearner.companyId);
  const pg = getCourseProgress(currentLearner.id, course.id);
  const isCompleted = pg.percent === 100;

  return (
    <>
      <div className="mb-4">
        <Link
          href="/student/certificates"
          className="text-sm text-text-secondary hover:text-brand transition-colors duration-300"
        >
          ← 修了証一覧に戻る
        </Link>
      </div>

      <PageHeader
        title="修了証"
        description={course.title}
        action={
          isCompleted ? (
            <PrintButton />
          ) : (
            <Button disabled>コース未修了</Button>
          )
        }
      />

      {!isCompleted && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          まだ全ての動画を視聴完了していません({pg.completed}/{pg.total}本)。
          全動画視聴後に正式な修了証が自動発行されます。以下はプレビュー表示です。
        </div>
      )}

      <CertificatePreview
        learnerName={currentLearner.name}
        companyName={company?.name ?? ""}
        courseTitle={course.title}
        issuedDate={formatDate("2026-04-18T00:00:00Z")}
        certificateNo={`ENJIN-${course.id.toUpperCase()}-${currentLearner.id.toUpperCase()}`}
      />

      <div className="mt-6 text-xs text-text-muted">
        ※ 実サービスではこの画面から直接PDFをダウンロードできます。リスキリング助成金の支給申請書類に添付可能です。
      </div>
    </>
  );
}

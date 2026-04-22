// app/student/certificates/[courseId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
      <Link href="/student/certificates" className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text mb-4">
        <ArrowLeft size={12} />
        修了証一覧
      </Link>

      <PageHeader
        title="修了証"
        description={course.title}
        action={isCompleted ? <PrintButton /> : <Button disabled>コース未修了</Button>}
      />

      {!isCompleted && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-800 leading-relaxed">
          まだ全ての動画を視聴完了していません({pg.completed}/{pg.total}本)。
          以下はプレビュー表示です。全動画視聴後に正式発行されます。
        </div>
      )}

      <CertificatePreview
        learnerName={currentLearner.name}
        companyName={company?.name ?? ""}
        courseTitle={course.title}
        issuedDate={formatDate("2026-04-18")}
        certificateNo={`ENJIN-${course.id.toUpperCase()}-${currentLearner.id.toUpperCase()}`}
      />

      <div className="mt-6 text-[11px] text-text-muted">
        実サービスではこの画面からPDFをダウンロードできます。助成金支給申請に添付可能です。
      </div>
    </>
  );
}

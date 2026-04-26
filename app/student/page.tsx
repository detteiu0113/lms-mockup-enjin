// app/student/page.tsx
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Stat from "@/components/common/Stat";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import Thumbnail from "@/components/common/Thumbnail";
import { currentLearner } from "@/mocks/learners";
import { getCoursesForLearner, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDurationJP } from "@/lib/format";
import type { Course } from "@/types";

function CourseRow({ course }: { course: Course }) {
  const pg = getCourseProgress(currentLearner.id, course.id);
  const status =
    pg.percent === 100 ? (
      <Badge tone="success">修了</Badge>
    ) : pg.percent > 0 ? (
      <Badge tone="info">受講中</Badge>
    ) : (
      <Badge tone="neutral">未着手</Badge>
    );

  return (
    <Link
      href={`/student/courses/${course.id}`}
      className="flex items-center gap-4 p-4 bg-surface border border-border-default rounded-md hover:border-text-secondary transition-colors"
    >
      <Thumbnail label={course.title} seed={course.id} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-medium text-text truncate">{course.title}</div>
          {status}
        </div>
        <p className="text-xs text-text-secondary line-clamp-1">{course.description}</p>
      </div>
      <div className="w-36 flex-shrink-0">
        <ProgressBar percent={pg.percent} size="sm" />
        <div className="mt-1 text-[11px] text-text-muted tabular-nums">
          {pg.completed} / {pg.total} 本
        </div>
      </div>
    </Link>
  );
}

export default function StudentHome() {
  const { common, industry } = getCoursesForLearner(currentLearner);
  const totalSec = getTotalWatchedSec(currentLearner.id);

  return (
    <>
      <PageHeader
        title={`こんにちは、${currentLearner.name}さん`}
        description={`所属業種: ${getIndustryName(currentLearner.industryId)} / 受講開始: ${currentLearner.enrolledAt}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Stat label="累計学習時間" value={formatDurationJP(totalSec)} hint="学習目標: 10時間" />
        <Stat label="受講コース" value={`${common.length + industry.length}`} hint={`共通 ${common.length} / 業種別 ${industry.length}`} />
        <Stat label="ステータス" value={<span className="text-success text-[20px]">受講中</span>} hint="アクティブ" />
      </div>

      <section className="mb-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-text">共通ベース</h2>
          <span className="text-xs text-text-muted">全業種共通</span>
        </div>
        <div className="space-y-2">
          {common.map((c) => <CourseRow key={c.id} course={c} />)}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-text">{getIndustryName(currentLearner.industryId)}向け</h2>
          <span className="text-xs text-text-muted">業種別</span>
        </div>
        <div className="space-y-2">
          {industry.map((c) => <CourseRow key={c.id} course={c} />)}
        </div>
      </section>
    </>
  );
}

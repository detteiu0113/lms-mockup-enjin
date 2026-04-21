// app/student/page.tsx
// 受講者マイコース - 共通ベース + 業種別コースを表示
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { currentLearner } from "@/mocks/learners";
import { getCoursesForLearner, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDuration } from "@/lib/format";
import type { Course } from "@/types";

function CourseCard({ course }: { course: Course }) {
  const pg = getCourseProgress(currentLearner.id, course.id);
  return (
    <Link
      href={`/student/courses/${course.id}`}
      className="block bg-surface border border-border-default rounded-lg p-5 hover:border-brand hover:shadow-sm transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="text-3xl">{course.thumbnail}</div>
        {pg.percent === 100 ? (
          <Badge tone="success">修了</Badge>
        ) : pg.percent > 0 ? (
          <Badge tone="info">受講中</Badge>
        ) : (
          <Badge tone="neutral">未着手</Badge>
        )}
      </div>
      <div className="text-base font-bold text-text mb-1">{course.title}</div>
      <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-2">{course.description}</p>
      <div className="mb-2">
        <ProgressBar percent={pg.percent} showLabel />
      </div>
      <div className="text-xs text-text-muted">
        {pg.completed} / {pg.total} 本視聴済み · 総尺 {formatDuration(pg.totalSec)}
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
        description={`所属業種: ${getIndustryName(currentLearner.industryId)} · 受講開始: ${currentLearner.enrolledAt}`}
      />

      {/* サマリー */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="text-xs text-text-secondary mb-1">累計学習時間</div>
          <div className="text-2xl font-bold text-text">{formatDuration(totalSec)}</div>
          <div className="text-xs text-text-muted mt-1">助成金要件: 10時間以上</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">受講中コース</div>
          <div className="text-2xl font-bold text-text">{common.length + industry.length}</div>
          <div className="text-xs text-text-muted mt-1">共通{common.length}本 + 業種別{industry.length}本</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">ステータス</div>
          <div className="text-2xl font-bold text-success">受講中</div>
          <div className="text-xs text-text-muted mt-1">雇用保険被保険者 ✓</div>
        </Card>
      </div>

      {/* 共通ベースコース */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-text mb-3">
          共通ベースコース
          <span className="ml-2 text-xs font-normal text-text-muted">全業種共通 · 営業・コミュニケーション基礎</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {common.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* 業種別コース */}
      <section>
        <h2 className="text-lg font-bold text-text mb-3">
          {getIndustryName(currentLearner.industryId)}向けコース
          <span className="ml-2 text-xs font-normal text-text-muted">あなたの業種に特化した内容</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industry.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </>
  );
}

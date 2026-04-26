// app/company/page.tsx
import PageHeader from "@/components/common/PageHeader";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDurationJP, formatDate } from "@/lib/format";

const TARGET_HOURS = 10;
const TARGET_SEC = TARGET_HOURS * 3600;

export default function CompanyDashboard() {
  const company = companies.find((c) => c.id === DEMO_COMPANY_ID)!;
  const learners = getLearnersByCompany(company.id);

  const totalAllSec = learners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
  const avgSec = learners.length > 0 ? totalAllSec / learners.length : 0;

  const reachedCount = learners.filter((l) => getTotalWatchedSec(l.id) >= TARGET_SEC).length;

  const industryCourses = courses.filter((c) => c.industryId === null || c.industryId === company.industryId);

  return (
    <>
      <PageHeader
        title="ダッシュボード"
        description={`${company.name} ・ ${getIndustryName(company.industryId)} ・ 契約 ${formatDate(company.contractStart)} 〜 ${formatDate(company.contractEnd)}`}
      />

      {/* 概況 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">受講者数</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {learners.length}<span className="text-sm font-normal text-text-muted ml-1">/ {company.contractedLearners}</span>
          </div>
          <div className="text-[11px] text-text-muted mt-1">契約枠に対する在籍</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">累計学習時間</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {formatDurationJP(totalAllSec)}
          </div>
          <div className="text-[11px] text-text-muted mt-1">平均 {formatDurationJP(Math.floor(avgSec))}/人</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">学習目標 {TARGET_HOURS}h 達成</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {reachedCount}<span className="text-sm font-normal text-text-muted ml-1">/ {learners.length}</span>
          </div>
          <div className="text-[11px] text-text-muted mt-1">累計視聴 {TARGET_HOURS}時間以上</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">修了証 発行</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {learners.reduce((acc, l) => acc + courses.filter((c) => getCourseProgress(l.id, c.id).percent === 100).length, 0)}
          </div>
          <div className="text-[11px] text-text-muted mt-1">全受講者合計</div>
        </div>
      </div>

      {/* 受講者別 */}
      <h2 className="text-sm font-semibold text-text mb-3">受講者別 進捗</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">氏名</th>
              <th className="text-left px-4 h-10 font-medium">累計学習</th>
              <th className="text-left px-4 h-10 font-medium">学習目標 {TARGET_HOURS}h</th>
              <th className="text-left px-4 h-10 font-medium">修了コース</th>
              <th className="text-left px-4 h-10 font-medium w-48">平均進捗</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.map((l) => {
              const sec = getTotalWatchedSec(l.id);
              const learnerCourses = industryCourses;
              const avgPct = Math.round(
                learnerCourses.reduce((acc, c) => acc + getCourseProgress(l.id, c.id).percent, 0) / learnerCourses.length
              );
              const doneCount = learnerCourses.filter((c) => getCourseProgress(l.id, c.id).percent === 100).length;
              const pctTarget = Math.min(100, Math.round((sec / TARGET_SEC) * 100));
              return (
                <tr key={l.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{l.name}</div>
                    <div className="text-[11px] text-text-muted">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-text-secondary">{formatDurationJP(sec)}</td>
                  <td className="px-4 py-3">
                    {sec >= TARGET_SEC ? <Badge tone="success">達成</Badge> : <Badge tone="neutral">{pctTarget}%</Badge>}
                  </td>
                  <td className="px-4 py-3 tabular-nums text-text-secondary">
                    {doneCount} / {learnerCourses.length}
                  </td>
                  <td className="px-4 py-3">
                    <ProgressBar percent={avgPct} size="sm" />
                    <div className="text-[11px] text-text-muted mt-1 tabular-nums">{avgPct}%</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

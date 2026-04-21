// app/company/page.tsx
// 企業管理者ダッシュボード
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDuration, formatDate } from "@/lib/format";

export default function CompanyDashboard() {
  const company = companies.find((c) => c.id === DEMO_COMPANY_ID)!;
  const learners = getLearnersByCompany(company.id);

  // 累計学習時間(全受講者)
  const totalAllSec = learners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
  const avgSec = learners.length > 0 ? totalAllSec / learners.length : 0;

  // 10時間要件達成者数
  const tenH = 10 * 3600;
  const completedLearners = learners.filter((l) => getTotalWatchedSec(l.id) >= tenH).length;

  // 業種に合致するコースの受講者平均進捗
  const industryCourses = courses.filter((c) => c.industryId === null || c.industryId === company.industryId);

  return (
    <>
      <PageHeader
        title="ダッシュボード"
        description={`${company.name} / ${getIndustryName(company.industryId)} / 契約期間: ${formatDate(company.contractStart)} 〜 ${formatDate(company.contractEnd)}`}
      />

      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="text-xs text-text-secondary mb-1">契約受講者数</div>
          <div className="text-2xl font-bold text-text">{learners.length}<span className="text-sm font-normal text-text-secondary ml-1">名</span></div>
          <div className="text-xs text-text-muted mt-1">契約枠 {company.contractedLearners}名</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">累計学習時間(全員)</div>
          <div className="text-2xl font-bold text-text">{formatDuration(totalAllSec)}</div>
          <div className="text-xs text-text-muted mt-1">平均 {formatDuration(Math.floor(avgSec))}/人</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">10時間要件達成</div>
          <div className="text-2xl font-bold text-success">{completedLearners}<span className="text-sm font-normal text-text-secondary ml-1">/ {learners.length}名</span></div>
          <div className="text-xs text-text-muted mt-1">助成金対象候補</div>
        </Card>
        <Card>
          <div className="text-xs text-text-secondary mb-1">発行済み修了証</div>
          <div className="text-2xl font-bold text-text">
            {learners.reduce((acc, l) => acc + courses.filter((c) => getCourseProgress(l.id, c.id).percent === 100).length, 0)}
          </div>
          <div className="text-xs text-text-muted mt-1">全受講者合計</div>
        </Card>
      </div>

      {/* 受講者別 進捗 */}
      <h2 className="text-base font-bold text-text mb-3">受講者別 進捗一覧</h2>
      <Card padded={false} className="mb-8 overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">氏名</th>
              <th className="text-left px-4 py-3 font-medium">累計学習</th>
              <th className="text-left px-4 py-3 font-medium">10h要件</th>
              <th className="text-left px-4 py-3 font-medium">修了コース</th>
              <th className="text-left px-4 py-3 font-medium">平均進捗</th>
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
              return (
                <tr key={l.id} className="hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{l.name}</div>
                    <div className="text-xs text-text-muted">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 tabular-nums">{formatDuration(sec)}</td>
                  <td className="px-4 py-3">
                    {sec >= tenH ? <Badge tone="success">達成</Badge> : <Badge tone="neutral">{Math.round((sec / tenH) * 100)}%</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    {doneCount} / {learnerCourses.length}
                  </td>
                  <td className="px-4 py-3 w-48">
                    <ProgressBar percent={avgPct} size="sm" />
                    <div className="text-xs text-text-muted mt-1">{avgPct}%</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

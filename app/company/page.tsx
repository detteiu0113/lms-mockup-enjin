// app/company/page.tsx
import PageHeader from "@/components/common/PageHeader";
import ProgressBar from "@/components/common/ProgressBar";
import Badge from "@/components/common/Badge";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDurationJP, formatDate, simulateSubsidy, formatYen } from "@/lib/format";

const PRICE_PER_PERSON = 400000;

export default function CompanyDashboard() {
  const company = companies.find((c) => c.id === DEMO_COMPANY_ID)!;
  const learners = getLearnersByCompany(company.id);

  const totalAllSec = learners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
  const avgSec = learners.length > 0 ? totalAllSec / learners.length : 0;

  const tenH = 10 * 3600;
  const eligibleLearners = learners.filter((l) => getTotalWatchedSec(l.id) >= tenH);
  const eligibleCount = eligibleLearners.length;

  const industryCourses = courses.filter((c) => c.industryId === null || c.industryId === company.industryId);

  const sim = simulateSubsidy(PRICE_PER_PERSON, company.size);
  const totalPrice = PRICE_PER_PERSON * learners.length;
  const totalSubsidy = sim.subsidyPerPerson * eligibleCount;
  const totalNet = totalPrice - totalSubsidy;

  return (
    <>
      <PageHeader
        title="ダッシュボード"
        description={`${company.name} ・ ${getIndustryName(company.industryId)} ・ 契約 ${formatDate(company.contractStart)} 〜 ${formatDate(company.contractEnd)}`}
      />

      {/* 概況 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
          <div className="text-xs text-text-secondary mb-1">10時間要件 達成</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {eligibleCount}<span className="text-sm font-normal text-text-muted ml-1">/ {learners.length}</span>
          </div>
          <div className="text-[11px] text-text-muted mt-1">助成金対象候補</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">修了証 発行</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {learners.reduce((acc, l) => acc + courses.filter((c) => getCourseProgress(l.id, c.id).percent === 100).length, 0)}
          </div>
          <div className="text-[11px] text-text-muted mt-1">全受講者合計</div>
        </div>
      </div>

      {/* 助成金シミュレーション */}
      <div className="bg-surface border border-border-default rounded-md mb-10 overflow-hidden">
        <div className="px-5 py-4 border-b border-border-default flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-text">助成金シミュレーション</div>
            <div className="text-[11px] text-text-muted mt-0.5">
              リスキリング・学び直し助成金 / {company.size === "sme" ? "中小企業(経費助成率 75%・上限 30万円/人)" : "大企業(経費助成率 60%・上限 20万円/人)"}
            </div>
          </div>
          <Badge tone="info">10h視聴完了が支給要件</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-default">
          <div className="p-5">
            <div className="text-[11px] text-text-muted">コース単価(想定)</div>
            <div className="text-lg font-semibold text-text tabular-nums mt-1">{formatYen(sim.pricePerPerson)}</div>
            <div className="text-[11px] text-text-muted mt-1">1人あたり</div>
          </div>
          <div className="p-5">
            <div className="text-[11px] text-text-muted">助成率</div>
            <div className="text-lg font-semibold text-text tabular-nums mt-1">{Math.round(sim.subsidyRate * 100)}%</div>
            <div className="text-[11px] text-text-muted mt-1">上限 {formatYen(sim.cap)}/人</div>
          </div>
          <div className="p-5">
            <div className="text-[11px] text-text-muted">想定助成額</div>
            <div className="text-lg font-semibold text-brand tabular-nums mt-1">{formatYen(sim.subsidyPerPerson)}</div>
            <div className="text-[11px] text-text-muted mt-1">1人あたり</div>
          </div>
          <div className="p-5">
            <div className="text-[11px] text-text-muted">実質負担</div>
            <div className="text-lg font-semibold text-text tabular-nums mt-1">{formatYen(sim.netCostPerPerson)}</div>
            <div className="text-[11px] text-text-muted mt-1">1人あたり</div>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-border-default bg-surface-subtle grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-[11px] text-text-muted">支給要件達成者</div>
            <div className="font-semibold text-text tabular-nums mt-0.5">{eligibleCount} / {learners.length}名</div>
          </div>
          <div>
            <div className="text-[11px] text-text-muted">想定受給総額</div>
            <div className="font-semibold text-brand tabular-nums mt-0.5">{formatYen(totalSubsidy)}</div>
          </div>
          <div>
            <div className="text-[11px] text-text-muted">実質負担総額</div>
            <div className="font-semibold text-text tabular-nums mt-0.5">{formatYen(totalNet)} <span className="text-[11px] text-text-muted font-normal">(総額 {formatYen(totalPrice)})</span></div>
          </div>
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
              <th className="text-left px-4 h-10 font-medium">10時間</th>
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
              const pct10h = Math.min(100, Math.round((sec / tenH) * 100));
              return (
                <tr key={l.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{l.name}</div>
                    <div className="text-[11px] text-text-muted">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-text-secondary">{formatDurationJP(sec)}</td>
                  <td className="px-4 py-3">
                    {sec >= tenH ? <Badge tone="success">達成</Badge> : <Badge tone="neutral">{pct10h}%</Badge>}
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

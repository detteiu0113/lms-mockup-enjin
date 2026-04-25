// app/enjin/page.tsx
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import ProgressBar from "@/components/common/ProgressBar";
import { companies } from "@/mocks/companies";
import { learners } from "@/mocks/learners";
import { courses } from "@/mocks/courses";
import { progress } from "@/mocks/progress";
import { industries } from "@/mocks/industries";
import { getIndustryName, getTotalWatchedSec, getCourseProgress } from "@/lib/selectors";
import { formatDurationJP, formatDate } from "@/lib/format";

const TEN_H = 10 * 3600;

export default function EnjinOverview() {
  const totalSec = progress.reduce((acc, p) => acc + p.watchedSec, 0);
  const eligibleCount = learners.filter((l) => getTotalWatchedSec(l.id) >= TEN_H).length;

  return (
    <>
      <PageHeader
        title="全体ダッシュボード"
        description="合同会社えん人 ・ 全クライアント企業 ・ 全受講者の俯瞰"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">クライアント企業</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{companies.length}</div>
          <div className="text-[11px] text-text-muted mt-1">{industries.length}業種</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">受講者 総数</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{learners.length}</div>
          <div className="text-[11px] text-text-muted mt-1">在籍ベース</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">10時間達成</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {eligibleCount}<span className="text-sm font-normal text-text-muted ml-1">/ {learners.length}</span>
          </div>
          <div className="text-[11px] text-text-muted mt-1">支給要件達成者</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">累計学習時間</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{formatDurationJP(totalSec)}</div>
          <div className="text-[11px] text-text-muted mt-1">全クライアント合計</div>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">クライアント企業 進捗一覧</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">企業</th>
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-right px-4 h-10 font-medium">受講者</th>
              <th className="text-right px-4 h-10 font-medium">10時間達成</th>
              <th className="text-right px-4 h-10 font-medium">累計学習</th>
              <th className="text-left px-4 h-10 font-medium w-44">平均進捗</th>
              <th className="text-left px-4 h-10 font-medium">契約期間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {companies.map((c) => {
              const ls = learners.filter((l) => l.companyId === c.id);
              const totalSec = ls.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
              const eligible = ls.filter((l) => getTotalWatchedSec(l.id) >= TEN_H).length;
              const industryCourses = courses.filter((cc) => cc.industryId === null || cc.industryId === c.industryId);
              const avgPct = ls.length === 0 ? 0 : Math.round(
                ls.reduce((acc, l) =>
                  acc + industryCourses.reduce((a, cc) => a + getCourseProgress(l.id, cc.id).percent, 0) / industryCourses.length,
                0) / ls.length
              );
              const active = new Date(c.contractEnd) >= new Date();
              return (
                <tr key={c.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{c.name}</div>
                    <div className="text-[11px] text-text-muted">{c.size === "sme" ? "中小" : "大企業"}</div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{getIndustryName(c.industryId)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{ls.length} / {c.contractedLearners}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{eligible} / {ls.length}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationJP(totalSec)}</td>
                  <td className="px-4 py-3">
                    <ProgressBar percent={avgPct} size="sm" />
                    <div className="text-[11px] text-text-muted mt-1 tabular-nums">{avgPct}%</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-[11px] text-text-secondary tabular-nums">
                      <span>{formatDate(c.contractStart)} 〜 {formatDate(c.contractEnd)}</span>
                      {active ? <Badge tone="success">稼働中</Badge> : <Badge tone="neutral">満了</Badge>}
                    </div>
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

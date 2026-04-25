// app/enjin/learners/page.tsx
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import ProgressBar from "@/components/common/ProgressBar";
import { learners } from "@/mocks/learners";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";
import { getIndustryName, getTotalWatchedSec, getCourseProgress } from "@/lib/selectors";
import { formatDurationJP } from "@/lib/format";

const TEN_H = 10 * 3600;

export default function EnjinLearnersPage() {
  return (
    <>
      <PageHeader
        title="全受講者"
        description="クライアント企業横断の受講者一覧と進捗"
      />

      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">受講者</th>
              <th className="text-left px-4 h-10 font-medium">所属企業</th>
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-right px-4 h-10 font-medium">累計学習</th>
              <th className="text-left px-4 h-10 font-medium">10時間</th>
              <th className="text-left px-4 h-10 font-medium w-44">平均進捗</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.map((l) => {
              const company = companies.find((c) => c.id === l.companyId);
              const sec = getTotalWatchedSec(l.id);
              const learnerCourses = courses.filter((c) => c.industryId === null || c.industryId === l.industryId);
              const avgPct = learnerCourses.length === 0 ? 0 : Math.round(
                learnerCourses.reduce((acc, c) => acc + getCourseProgress(l.id, c.id).percent, 0) / learnerCourses.length
              );
              const pct10h = Math.min(100, Math.round((sec / TEN_H) * 100));
              return (
                <tr key={l.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{l.name}</div>
                    <div className="text-[11px] text-text-muted">{l.email}</div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{company?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-text-secondary">{getIndustryName(l.industryId)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationJP(sec)}</td>
                  <td className="px-4 py-3">
                    {sec >= TEN_H ? <Badge tone="success">達成</Badge> : <Badge tone="neutral">{pct10h}%</Badge>}
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

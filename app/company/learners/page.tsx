// app/company/learners/page.tsx
import Link from "next/link";
import { UserPlus, ArrowRight } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDurationJP, formatDate } from "@/lib/format";

export default function LearnersPage() {
  const learners = getLearnersByCompany(DEMO_COMPANY_ID);

  return (
    <>
      <PageHeader
        title="受講者"
        description="受講者IDの発行・一覧・個別進捗"
        action={<Button><UserPlus size={14} /> 受講者を追加</Button>}
      />

      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">ID</th>
              <th className="text-left px-4 h-10 font-medium">氏名</th>
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-left px-4 h-10 font-medium">受講開始</th>
              <th className="text-left px-4 h-10 font-medium">累計視聴</th>
              <th className="text-right px-4 h-10 font-medium w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.map((l) => (
              <tr key={l.id} className="hover:bg-surface-subtle">
                <td className="px-4 py-3 font-mono text-[11px] text-text-muted">{l.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-text">{l.name}</div>
                  <div className="text-[11px] text-text-muted">{l.email}</div>
                </td>
                <td className="px-4 py-3 text-text-secondary">{getIndustryName(l.industryId)}</td>
                <td className="px-4 py-3 text-text-secondary tabular-nums">{formatDate(l.enrolledAt)}</td>
                <td className="px-4 py-3 tabular-nums text-text-secondary">{formatDurationJP(getTotalWatchedSec(l.id))}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/company/learners/${l.id}`} className="inline-flex items-center gap-1 text-brand text-xs hover:underline">
                    詳細 <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// app/company/learners/page.tsx
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { formatDuration, formatDate } from "@/lib/format";

export default function LearnersPage() {
  const learners = getLearnersByCompany(DEMO_COMPANY_ID);

  return (
    <>
      <PageHeader
        title="受講者管理"
        description="受講者IDの発行・一覧・個別進捗の確認ができます。"
        action={<Button>+ 受講者を追加</Button>}
      />

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">受講者ID</th>
              <th className="text-left px-4 py-3 font-medium">氏名</th>
              <th className="text-left px-4 py-3 font-medium">メール</th>
              <th className="text-left px-4 py-3 font-medium">業種</th>
              <th className="text-left px-4 py-3 font-medium">受講開始</th>
              <th className="text-left px-4 py-3 font-medium">雇用保険</th>
              <th className="text-left px-4 py-3 font-medium">累計視聴</th>
              <th className="text-right px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.map((l) => (
              <tr key={l.id} className="hover:bg-surface-muted">
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">{l.id}</td>
                <td className="px-4 py-3 font-medium text-text">{l.name}</td>
                <td className="px-4 py-3 text-text-secondary">{l.email}</td>
                <td className="px-4 py-3">{getIndustryName(l.industryId)}</td>
                <td className="px-4 py-3">{formatDate(l.enrolledAt)}</td>
                <td className="px-4 py-3">
                  {l.isInsured ? <Badge tone="success">被保険者</Badge> : <Badge tone="warning">未加入</Badge>}
                </td>
                <td className="px-4 py-3 tabular-nums">{formatDuration(getTotalWatchedSec(l.id))}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/company/learners/${l.id}`} className="text-brand text-xs hover:underline">
                    詳細 →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

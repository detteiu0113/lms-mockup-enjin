// app/admin/companies/page.tsx
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { companies } from "@/mocks/companies";
import { learners } from "@/mocks/learners";
import { getIndustryName, getTotalWatchedSec } from "@/lib/selectors";
import { formatDate, formatDuration } from "@/lib/format";

export default function AdminCompaniesPage() {
  return (
    <>
      <PageHeader
        title="クライアント企業管理"
        description="契約中のクライアント企業の一覧と契約情報の管理。"
        action={<Button>+ 企業を追加</Button>}
      />

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-surface-muted text-xs text-text-secondary">
            <tr>
              <th className="text-left px-4 py-3 font-medium">企業名</th>
              <th className="text-left px-4 py-3 font-medium">業種</th>
              <th className="text-right px-4 py-3 font-medium">契約枠</th>
              <th className="text-right px-4 py-3 font-medium">登録受講者</th>
              <th className="text-right px-4 py-3 font-medium">累計学習</th>
              <th className="text-left px-4 py-3 font-medium">契約期間</th>
              <th className="text-right px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {companies.map((c) => {
              const companyLearners = learners.filter((l) => l.companyId === c.id);
              const totalSec = companyLearners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
              const active = new Date(c.contractEnd) >= new Date();
              return (
                <tr key={c.id} className="hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{c.name}</div>
                    <div className="text-xs text-text-muted font-mono">{c.id}</div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{getIndustryName(c.industryId)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{c.contractedLearners}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{companyLearners.length}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatDuration(totalSec)}</td>
                  <td className="px-4 py-3 text-xs text-text-secondary">
                    {formatDate(c.contractStart)} 〜 {formatDate(c.contractEnd)}
                    {active ? (
                      <Badge tone="success">稼働中</Badge>
                    ) : (
                      <Badge tone="neutral">満了</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-xs text-brand hover:underline">詳細</button>
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

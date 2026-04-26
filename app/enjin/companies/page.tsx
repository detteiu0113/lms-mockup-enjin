// app/enjin/companies/page.tsx
import { Plus } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { companies } from "@/mocks/companies";
import { learners } from "@/mocks/learners";
import { getIndustryName, getTotalWatchedSec } from "@/lib/selectors";
import { formatDate, formatDurationJP } from "@/lib/format";

export default function EnjinCompaniesPage() {
  return (
    <>
      <PageHeader
        title="クライアント企業"
        description="契約中のクライアントと契約情報"
        action={<Button><Plus size={14} /> 企業を追加</Button>}
      />

      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">企業名</th>
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-right px-4 h-10 font-medium">契約枠</th>
              <th className="text-right px-4 h-10 font-medium">登録受講者</th>
              <th className="text-right px-4 h-10 font-medium">累計学習</th>
              <th className="text-left px-4 h-10 font-medium">契約期間</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {companies.map((c) => {
              const ls = learners.filter((l) => l.companyId === c.id);
              const totalSec = ls.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
              const active = new Date(c.contractEnd) >= new Date();
              return (
                <tr key={c.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{c.name}</div>
                    <div className="text-[11px] text-text-muted font-mono">{c.id}</div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{getIndustryName(c.industryId)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{c.contractedLearners}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{ls.length}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationJP(totalSec)}</td>
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

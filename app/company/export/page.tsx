// app/company/export/page.tsx
"use client";

import { FileDown, FileText, Check } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";
import { progress } from "@/mocks/progress";
import { videos } from "@/mocks/videos";
import { formatDurationJP, formatDate, formatDateTimeSec, simulateSubsidy, formatYen } from "@/lib/format";

const PRICE_PER_PERSON = 400000;

export default function ExportPage() {
  const company = companies.find((c) => c.id === DEMO_COMPANY_ID)!;
  const learners = getLearnersByCompany(DEMO_COMPANY_ID);
  const sim = simulateSubsidy(PRICE_PER_PERSON, company.size);

  const tenH = 10 * 3600;
  const totalSec = learners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
  const totalSessions = progress.filter((p) => learners.some((l) => l.id === p.learnerId) && p.watchedSec > 0).length;
  const eligibleLearners = learners.filter((l) => getTotalWatchedSec(l.id) >= tenH);

  const handleDownload = (type: "csv" | "pdf") => {
    alert(`${type.toUpperCase()}エクスポート(モック: 本番では実際のファイルを出力)`);
  };

  return (
    <>
      <PageHeader
        title="助成金証跡エクスポート"
        description="厚労省への支給申請に必要なエビデンスをCSV/PDFで出力します。"
      />

      {/* 概要 + 出力ボタン */}
      <div className="bg-surface border border-border-default rounded-md p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-text-secondary mb-1">対象受講者</div>
            <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{learners.length}<span className="text-sm font-normal text-text-muted ml-1">名</span></div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">総視聴時間</div>
            <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{formatDurationJP(totalSec)}</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">視聴セッション</div>
            <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{totalSessions}<span className="text-sm font-normal text-text-muted ml-1">回</span></div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">集計基準日</div>
            <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{formatDate(new Date().toISOString())}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-border-default">
          <Button onClick={() => handleDownload("csv")}><FileDown size={14} /> CSV 一括エクスポート</Button>
          <Button variant="secondary" onClick={() => handleDownload("pdf")}><FileText size={14} /> PDF レポート</Button>
        </div>
      </div>

      {/* 助成金算定根拠 */}
      <h2 className="text-sm font-semibold text-text mb-3">助成金算定根拠</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">受講者</th>
              <th className="text-left px-4 h-10 font-medium">雇用保険</th>
              <th className="text-right px-4 h-10 font-medium">視聴時間</th>
              <th className="text-right px-4 h-10 font-medium">10時間要件</th>
              <th className="text-right px-4 h-10 font-medium">単価</th>
              <th className="text-right px-4 h-10 font-medium">助成額</th>
              <th className="text-right px-4 h-10 font-medium">実質負担</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.map((l) => {
              const sec = getTotalWatchedSec(l.id);
              const eligible = sec >= tenH && l.isInsured;
              const subsidy = eligible ? sim.subsidyPerPerson : 0;
              const net = sim.pricePerPerson - subsidy;
              return (
                <tr key={l.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{l.name}</div>
                    <div className="text-[11px] text-text-muted font-mono">{l.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    {l.isInsured ? <Badge tone="success">加入</Badge> : <Badge tone="warning">未加入</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationJP(sec)}</td>
                  <td className="px-4 py-3 text-right">
                    {sec >= tenH ? <Badge tone="success">達成</Badge> : <Badge tone="neutral">{Math.round((sec / tenH) * 100)}%</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatYen(sim.pricePerPerson)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    <span className={eligible ? "text-brand font-medium" : "text-text-muted"}>{formatYen(subsidy)}</span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">{formatYen(net)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-surface-subtle border-t border-border-default">
              <td className="px-4 py-3 text-xs text-text-muted" colSpan={4}>
                合計({company.size === "sme" ? "中小・助成率75%・上限30万円/人" : "大企業・助成率60%・上限20万円/人"})
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium">{formatYen(sim.pricePerPerson * learners.length)}</td>
              <td className="px-4 py-3 text-right tabular-nums font-medium text-brand">{formatYen(sim.subsidyPerPerson * eligibleLearners.length)}</td>
              <td className="px-4 py-3 text-right tabular-nums font-medium">
                {formatYen(sim.pricePerPerson * learners.length - sim.subsidyPerPerson * eligibleLearners.length)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 視聴ログ(サンプル) */}
      <h2 className="text-sm font-semibold text-text mb-1">視聴ログ サンプル</h2>
      <div className="text-[11px] text-text-muted mb-3">CSVで出力される内容のプレビュー(先頭数件)。</div>
      <div className="bg-surface border border-border-default rounded-md overflow-x-auto mb-6">
        <table className="w-full text-xs">
          <thead className="text-[11px] text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-3 h-9 font-medium">受講者ID</th>
              <th className="text-left px-3 h-9 font-medium">氏名</th>
              <th className="text-left px-3 h-9 font-medium">コース</th>
              <th className="text-left px-3 h-9 font-medium">動画</th>
              <th className="text-left px-3 h-9 font-medium">開始時刻</th>
              <th className="text-left px-3 h-9 font-medium">終了時刻</th>
              <th className="text-right px-3 h-9 font-medium">視聴(秒)</th>
              <th className="text-right px-3 h-9 font-medium">完了</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.slice(0, 3).flatMap((l) =>
              progress
                .filter((p) => p.learnerId === l.id && p.sessions.length > 0)
                .slice(0, 2)
                .flatMap((p) =>
                  p.sessions.map((s, si) => {
                    const v = videos.find((x) => x.id === p.videoId);
                    const c = courses.find((x) => x.id === v?.courseId);
                    return (
                      <tr key={`${l.id}-${p.videoId}-${si}`}>
                        <td className="px-3 py-2 font-mono text-text-muted">{l.id}</td>
                        <td className="px-3 py-2">{l.name}</td>
                        <td className="px-3 py-2 text-text-secondary">{c?.title}</td>
                        <td className="px-3 py-2 text-text-secondary">{v?.title}</td>
                        <td className="px-3 py-2 text-text-secondary tabular-nums">{formatDateTimeSec(s.startedAt)}</td>
                        <td className="px-3 py-2 text-text-secondary tabular-nums">{formatDateTimeSec(s.endedAt)}</td>
                        <td className="px-3 py-2 text-right tabular-nums">{s.durationSec}</td>
                        <td className="px-3 py-2 text-right">
                          {p.completed ? <Badge tone="success">○</Badge> : <Badge tone="neutral">—</Badge>}
                        </td>
                      </tr>
                    );
                  })
                )
            )}
          </tbody>
        </table>
      </div>

      {/* 申請チェックリスト */}
      <div className="bg-surface border border-border-default rounded-md p-5">
        <div className="text-sm font-semibold text-text mb-3">支給申請チェックリスト</div>
        <ul className="space-y-2 text-xs text-text-secondary">
          {[
            "研修開始前の訓練計画届の提出(労働局)",
            "受講者が雇用保険被保険者であること",
            "標準学習時間 10時間以上",
            "学習期間 1ヶ月以上",
            "研修修了後2ヶ月以内の支給申請",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Check size={14} className="mt-0.5 text-brand flex-shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

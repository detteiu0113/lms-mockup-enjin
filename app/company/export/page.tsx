// app/company/export/page.tsx
"use client";

import { FileDown, FileText } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getTotalWatchedSec } from "@/lib/selectors";
import { courses } from "@/mocks/courses";
import { progress } from "@/mocks/progress";
import { videos } from "@/mocks/videos";
import { formatDurationJP, formatDate, formatDateTimeSec } from "@/lib/format";

export default function ExportPage() {
  const learners = getLearnersByCompany(DEMO_COMPANY_ID);

  const totalSec = learners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);
  const totalSessions = progress.filter((p) => learners.some((l) => l.id === p.learnerId) && p.watchedSec > 0).length;

  const handleDownload = (type: "csv" | "pdf") => {
    alert(`${type.toUpperCase()}エクスポート(モック: 本番では実際のファイルを出力)`);
  };

  return (
    <>
      <PageHeader
        title="学習記録エクスポート"
        description="受講者ごとの学習記録(視聴時刻・視聴時間・コース修了状況)をCSV/PDFで出力します。"
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

      {/* 受講者別 サマリ */}
      <h2 className="text-sm font-semibold text-text mb-3">受講者別 学習サマリ</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden mb-10">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">受講者</th>
              <th className="text-right px-4 h-10 font-medium">累計視聴時間</th>
              <th className="text-right px-4 h-10 font-medium">受講中コース</th>
              <th className="text-right px-4 h-10 font-medium">修了コース</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.map((l) => {
              const sec = getTotalWatchedSec(l.id);
              const myCourses = courses.filter((c) => c.industryId === null || c.industryId === l.industryId);
              const inProgress = myCourses.filter((c) => {
                const pgs = progress.filter((p) => p.learnerId === l.id && c.videoIds.includes(p.videoId));
                const done = pgs.filter((p) => p.completed).length;
                return done > 0 && done < c.videoIds.length;
              }).length;
              const completed = myCourses.filter((c) => {
                const pgs = progress.filter((p) => p.learnerId === l.id && c.videoIds.includes(p.videoId));
                return pgs.filter((p) => p.completed).length === c.videoIds.length;
              }).length;
              return (
                <tr key={l.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{l.name}</div>
                    <div className="text-[11px] text-text-muted font-mono">{l.id}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationJP(sec)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{inProgress}</td>
                  <td className="px-4 py-3 text-right">
                    {completed > 0 ? <Badge tone="success">{completed}件</Badge> : <Badge tone="neutral">0</Badge>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 視聴ログ(サンプル) */}
      <h2 className="text-sm font-semibold text-text mb-1">視聴ログ サンプル</h2>
      <div className="text-[11px] text-text-muted mb-3">CSVで出力される内容のプレビュー(先頭数件)。</div>
      <div className="bg-surface border border-border-default rounded-md overflow-x-auto">
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
    </>
  );
}

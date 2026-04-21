// app/company/export/page.tsx
// 助成金証跡エクスポート画面
"use client";

import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { DEMO_COMPANY_ID } from "@/lib/companyDemo";
import { getLearnersByCompany, getCourseProgress, getTotalWatchedSec, getIndustryName } from "@/lib/selectors";
import { courses } from "@/mocks/courses";
import { progress } from "@/mocks/progress";
import { videos } from "@/mocks/videos";
import { formatDuration, formatDate, formatDateTime } from "@/lib/format";

export default function ExportPage() {
  const learners = getLearnersByCompany(DEMO_COMPANY_ID);

  const handleDownload = (type: "csv" | "pdf") => {
    // モックなので実際のダウンロードは行わず通知のみ
    alert(`${type.toUpperCase()}形式でエクスポートします(モック: ダウンロード処理は実装時に追加)`);
  };

  // 総視聴秒数の合計(助成金申請レポート風の数値)
  const totalSessions = progress.filter((p) => learners.some((l) => l.id === p.learnerId) && p.watchedSec > 0).length;
  const totalSec = learners.reduce((acc, l) => acc + getTotalWatchedSec(l.id), 0);

  return (
    <>
      <PageHeader
        title="助成金証跡エクスポート"
        description="厚生労働省への支給申請時に必要なエビデンスを、CSV/PDF形式でまとめて出力します。"
      />

      {/* エクスポート概要 */}
      <Card className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-text-secondary mb-1">対象受講者</div>
            <div className="text-xl font-bold text-text">{learners.length}名</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">総視聴時間</div>
            <div className="text-xl font-bold text-text">{formatDuration(totalSec)}</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">視聴セッション数</div>
            <div className="text-xl font-bold text-text">{totalSessions}回</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary mb-1">集計基準日</div>
            <div className="text-xl font-bold text-text">{formatDate(new Date().toISOString())}</div>
          </div>
        </div>
        <div className="flex gap-3 mt-6 pt-6 border-t border-border-default">
          <Button onClick={() => handleDownload("csv")}>📊 CSV で一括エクスポート</Button>
          <Button variant="secondary" onClick={() => handleDownload("pdf")}>📄 PDF レポート出力</Button>
        </div>
      </Card>

      {/* エクスポート内容プレビュー */}
      <h2 className="text-base font-bold text-text mb-3">エクスポート内容プレビュー</h2>
      <div className="text-xs text-text-secondary mb-2">
        以下のデータが「誰が/何を/いつ/どれだけ/完了したか」の順で出力されます(モック表示)。
      </div>

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full text-xs min-w-[1000px]">
          <thead className="bg-surface-muted text-text-secondary">
            <tr>
              <th className="text-left px-3 py-2 font-medium">受講者ID</th>
              <th className="text-left px-3 py-2 font-medium">氏名</th>
              <th className="text-left px-3 py-2 font-medium">所属企業</th>
              <th className="text-left px-3 py-2 font-medium">業種</th>
              <th className="text-left px-3 py-2 font-medium">コース</th>
              <th className="text-left px-3 py-2 font-medium">動画</th>
              <th className="text-left px-3 py-2 font-medium">視聴開始</th>
              <th className="text-right px-3 py-2 font-medium">視聴秒</th>
              <th className="text-right px-3 py-2 font-medium">完了</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {learners.slice(0, 3).flatMap((l) =>
              progress
                .filter((p) => p.learnerId === l.id && p.watchedSec > 0)
                .slice(0, 3)
                .map((p) => {
                  const v = videos.find((x) => x.id === p.videoId);
                  const c = courses.find((x) => x.id === v?.courseId);
                  return (
                    <tr key={`${l.id}-${p.videoId}`}>
                      <td className="px-3 py-2 font-mono text-text-secondary">{l.id}</td>
                      <td className="px-3 py-2">{l.name}</td>
                      <td className="px-3 py-2 text-text-secondary">株式会社さくらケア</td>
                      <td className="px-3 py-2">{getIndustryName(l.industryId)}</td>
                      <td className="px-3 py-2">{c?.title}</td>
                      <td className="px-3 py-2">{v?.title}</td>
                      <td className="px-3 py-2 text-text-secondary">{formatDateTime(p.lastWatchedAt)}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{p.watchedSec}</td>
                      <td className="px-3 py-2 text-right">
                        {p.completed ? <Badge tone="success">○</Badge> : <Badge tone="neutral">—</Badge>}
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </Card>

      <div className="mt-6 p-4 bg-sky-50 border border-sky-200 rounded-md text-sm text-sky-900">
        <div className="font-bold mb-1">💡 助成金申請時のチェックリスト</div>
        <ul className="text-xs space-y-1 leading-relaxed">
          <li>✓ 研修開始前の訓練計画届の提出(労働局へ)</li>
          <li>✓ 受講者が雇用保険被保険者であること</li>
          <li>✓ 標準学習時間 10時間以上</li>
          <li>✓ 学習期間 1ヶ月以上</li>
          <li>✓ 研修修了後2ヶ月以内の支給申請</li>
        </ul>
      </div>
    </>
  );
}

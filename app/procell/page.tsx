// app/procell/page.tsx
import PageHeader from "@/components/common/PageHeader";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { industries } from "@/mocks/industries";
import { getIndustryName } from "@/lib/selectors";
import { formatDurationClock } from "@/lib/format";

export default function ProcellOverview() {
  const totalSec = videos.reduce((acc, v) => acc + v.durationSec, 0);

  return (
    <>
      <PageHeader
        title="マスターデータ概要"
        description="プロセル(開発・コンテンツ運用)が管理する業種・コース・動画の状況"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">業種</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{industries.length}</div>
          <div className="text-[11px] text-text-muted mt-1">追加・編集はプロセルのみ</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">コース</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{courses.length}</div>
          <div className="text-[11px] text-text-muted mt-1">共通ベース + 業種別の2階層</div>
        </div>
        <div className="bg-surface border border-border-default rounded-md p-5">
          <div className="text-xs text-text-secondary mb-1">動画 / 総尺</div>
          <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">
            {videos.length}<span className="text-sm font-normal text-text-muted ml-1">本</span>
          </div>
          <div className="text-[11px] text-text-muted mt-1 tabular-nums">{formatDurationClock(totalSec)}</div>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-text mb-3">業種別 コース構成</h2>
      <div className="bg-surface border border-border-default rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-text-muted bg-surface-subtle">
            <tr className="border-b border-border-default">
              <th className="text-left px-4 h-10 font-medium">業種</th>
              <th className="text-right px-4 h-10 font-medium">コース数</th>
              <th className="text-right px-4 h-10 font-medium">動画数</th>
              <th className="text-right px-4 h-10 font-medium">総尺</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            <tr className="hover:bg-surface-subtle">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text">共通ベース</span>
                  <Badge tone="neutral">全業種共通</Badge>
                </div>
              </td>
              {(() => {
                const cs = courses.filter((c) => c.industryId === null);
                const vs = videos.filter((v) => cs.some((c) => c.id === v.courseId));
                const sec = vs.reduce((a, v) => a + v.durationSec, 0);
                return (
                  <>
                    <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{cs.length}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{vs.length}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationClock(sec)}</td>
                  </>
                );
              })()}
            </tr>
            {industries.map((ind) => {
              const cs = courses.filter((c) => c.industryId === ind.id);
              const vs = videos.filter((v) => cs.some((c) => c.id === v.courseId));
              const sec = vs.reduce((a, v) => a + v.durationSec, 0);
              return (
                <tr key={ind.id} className="hover:bg-surface-subtle">
                  <td className="px-4 py-3">
                    <div className="font-medium text-text">{getIndustryName(ind.id)}</div>
                    <div className="text-[11px] text-text-muted font-mono">{ind.id}</div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{cs.length}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{vs.length}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-text-secondary">{formatDurationClock(sec)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

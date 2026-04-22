// app/admin/courses/page.tsx
import { Plus, Upload } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import Thumbnail from "@/components/common/Thumbnail";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { getIndustryName } from "@/lib/selectors";
import { formatDurationClock } from "@/lib/format";

export default function AdminCoursesPage() {
  return (
    <>
      <PageHeader
        title="コース・動画"
        description="カリキュラム編集、動画(mp4)のアップロードと紐付け"
        action={<Button><Plus size={14} /> コースを作成</Button>}
      />

      <div className="space-y-3">
        {courses.map((c) => {
          const courseVideos = videos.filter((v) => v.courseId === c.id);
          return (
            <div key={c.id} className="bg-surface border border-border-default rounded-md p-5">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Thumbnail label={c.title} seed={c.id} size="md" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-text">{c.title}</span>
                      <Badge tone={c.industryId === null ? "neutral" : "info"}>{getIndustryName(c.industryId)}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{c.description}</p>
                    <div className="text-[11px] text-text-muted mt-2 font-mono">{c.id}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="ghost" size="sm">編集</Button>
                  <Button variant="ghost" size="sm"><Upload size={12} /> 動画追加</Button>
                </div>
              </div>

              <div className="border-t border-border-default pt-3">
                <div className="text-[11px] text-text-muted mb-2">動画 {courseVideos.length}本</div>
                <div className="space-y-1">
                  {courseVideos.map((v, idx) => (
                    <div key={v.id} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-subtle">
                      <div className="text-[11px] text-text-muted w-6 text-right tabular-nums">{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text truncate">{v.title}</div>
                        <div className="text-[11px] text-text-muted font-mono truncate">{v.id}</div>
                      </div>
                      <div className="text-[11px] text-text-muted tabular-nums">{formatDurationClock(v.durationSec)}</div>
                      <button className="text-[11px] text-text-secondary hover:text-brand">差替</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

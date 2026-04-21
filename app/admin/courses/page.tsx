// app/admin/courses/page.tsx
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { courses } from "@/mocks/courses";
import { videos } from "@/mocks/videos";
import { getIndustryName } from "@/lib/selectors";
import { formatDurationClock } from "@/lib/format";

export default function AdminCoursesPage() {
  return (
    <>
      <PageHeader
        title="コース・動画管理"
        description="カリキュラムの編集、動画ファイル(mp4)のアップロードと紐付けができます。"
        action={<Button>+ コースを新規作成</Button>}
      />

      <div className="space-y-4">
        {courses.map((c) => {
          const courseVideos = videos.filter((v) => v.courseId === c.id);
          return (
            <Card key={c.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{c.thumbnail}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-text">{c.title}</span>
                      <Badge tone={c.industryId === null ? "neutral" : "brand"}>{getIndustryName(c.industryId)}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary">{c.description}</p>
                    <div className="text-xs text-text-muted mt-2 font-mono">{c.id}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">編集</Button>
                  <Button variant="ghost" size="sm">+ 動画追加</Button>
                </div>
              </div>

              <div className="border-t border-border-default pt-4">
                <div className="text-xs text-text-secondary mb-2">動画一覧 ({courseVideos.length}本)</div>
                <div className="space-y-1">
                  {courseVideos.map((v, idx) => (
                    <div key={v.id} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-muted">
                      <div className="text-xs text-text-muted w-6 text-right">{idx + 1}.</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text truncate">{v.title}</div>
                        <div className="text-xs text-text-muted font-mono truncate">{v.id}</div>
                      </div>
                      <div className="text-xs text-text-muted tabular-nums">{formatDurationClock(v.durationSec)}</div>
                      <button className="text-xs text-text-secondary hover:text-brand">差替</button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

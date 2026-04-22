// mocks/progress.ts
import type { VideoProgress, Certificate } from "@/types";
import { videos } from "./videos";

/** 受講者ごとに決定論的な進捗データを生成 */
function makeProgress(learnerId: string, completedRate: number): VideoProgress[] {
  return videos.map((v, idx) => {
    const seed = learnerId.charCodeAt(learnerId.length - 1) + idx * 7;
    const rnd = (seed % 100) / 100;
    const done = rnd < completedRate;
    const partial = !done && rnd < completedRate + 0.25;
    const watched = done ? v.durationSec : partial ? Math.floor(v.durationSec * 0.4) : 0;

    // 視聴開始・終了時刻を決定論的に生成(秒単位)
    const baseDay = 10 + (idx % 12); // 2026/04/10〜
    const hour = 9 + (seed % 8);
    const minute = (seed * 13) % 60;
    const second = (seed * 29) % 60;
    const startedAt = watched > 0 ? `2026-04-${String(baseDay).padStart(2, "0")}T${pad(hour)}:${pad(minute)}:${pad(second)}Z` : "";
    const endedAt =
      watched > 0
        ? addSeconds(startedAt, watched)
        : "";

    return {
      learnerId,
      videoId: v.id,
      watchedSec: watched,
      completed: done,
      lastWatchedAt: endedAt || startedAt,
      sessions:
        watched > 0
          ? [{ startedAt, endedAt, durationSec: watched }]
          : [],
    };
  });
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function addSeconds(iso: string, sec: number): string {
  const d = new Date(iso);
  d.setSeconds(d.getSeconds() + sec);
  return d.toISOString();
}

export const progress: VideoProgress[] = [
  ...makeProgress("lrn-001", 0.7),
  ...makeProgress("lrn-002", 0.5),
  ...makeProgress("lrn-003", 0.3),
  ...makeProgress("lrn-004", 0.9),
  ...makeProgress("lrn-005", 0.4),
  ...makeProgress("lrn-006", 0.6),
  ...makeProgress("lrn-007", 0.2),
];

export const certificates: Certificate[] = [
  { id: "cert-001", learnerId: "lrn-004", courseId: "crs-common-sales", issuedAt: "2026-04-10T15:32:18Z" },
  { id: "cert-002", learnerId: "lrn-004", courseId: "crs-juku-01", issuedAt: "2026-04-18T11:05:42Z" },
];

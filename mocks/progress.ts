// mocks/progress.ts
import type { VideoProgress, Certificate } from "@/types";
import { videos } from "./videos";

/** 初期進捗を生成（受講者ごとに適当な進捗を割り当て） */
function makeProgress(learnerId: string, completedRate: number): VideoProgress[] {
  return videos.map((v, idx) => {
    // learnerIdとindexから決定論的に決める
    const rnd = ((learnerId.charCodeAt(learnerId.length - 1) + idx * 7) % 100) / 100;
    const done = rnd < completedRate;
    const partial = !done && rnd < completedRate + 0.25;
    const watched = done ? v.durationSec : partial ? Math.floor(v.durationSec * 0.4) : 0;
    return {
      learnerId,
      videoId: v.id,
      watchedSec: watched,
      completed: done,
      lastWatchedAt: watched > 0 ? "2026-04-15T10:00:00Z" : "",
      sessions:
        watched > 0
          ? [
              {
                startedAt: "2026-04-15T10:00:00Z",
                endedAt: "2026-04-15T10:30:00Z",
                durationSec: watched,
              },
            ]
          : [],
    };
  });
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
  {
    id: "cert-001",
    learnerId: "lrn-004",
    courseId: "crs-common-sales",
    issuedAt: "2026-04-10",
  },
  {
    id: "cert-002",
    learnerId: "lrn-004",
    courseId: "crs-juku-01",
    issuedAt: "2026-04-18",
  },
];

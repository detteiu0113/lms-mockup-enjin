// types/index.ts
export type Role = "student" | "company" | "enjin" | "nomiel";

/** 業種カテゴリ */
export interface Industry {
  id: string;
  name: string;
  description: string;
}

/** クライアント企業 */
export interface Company {
  id: string;
  name: string;
  industryId: string;
  contractedLearners: number;
  contractStart: string;
  contractEnd: string;
}

/** 受講者 */
export interface Learner {
  id: string;
  companyId: string;
  name: string;
  email: string;
  industryId: string;
  enrolledAt: string;
}

/** コース */
export interface Course {
  id: string;
  title: string;
  description: string;
  industryId: string | null;
  videoIds: string[];
}

/** 動画 */
export interface Video {
  id: string;
  courseId: string;
  title: string;
  description: string;
  durationSec: number;
  src: string;
}

/** 視聴進捗 */
export interface VideoProgress {
  learnerId: string;
  videoId: string;
  watchedSec: number;
  completed: boolean;
  lastWatchedAt: string;
  sessions: { startedAt: string; endedAt: string; durationSec: number }[];
}

/** 修了証 */
export interface Certificate {
  id: string;
  learnerId: string;
  courseId: string;
  issuedAt: string;
}

// types/index.ts
// LMSモックアップ用の型定義

export type Role = "student" | "company" | "admin";

/** 業種カテゴリ */
export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string; // 絵文字またはアイコン名
}

/** クライアント企業 */
export interface Company {
  id: string;
  name: string;
  industryId: string;
  contractedLearners: number;
  contractStart: string; // ISO
  contractEnd: string;
}

/** 受講者（エンドユーザー） */
export interface Learner {
  id: string;
  companyId: string;
  name: string;
  email: string;
  industryId: string;
  enrolledAt: string;
  isInsured: boolean; // 雇用保険被保険者
}

/** コース（業種ごと or 共通） */
export interface Course {
  id: string;
  title: string;
  description: string;
  industryId: string | null; // null = 共通ベース
  videoIds: string[];
  thumbnail: string;
}

/** 動画 */
export interface Video {
  id: string;
  courseId: string;
  title: string;
  description: string;
  durationSec: number; // 尺（秒）
  thumbnail: string;
  src: string;
}

/** 視聴進捗（受講者×動画） */
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

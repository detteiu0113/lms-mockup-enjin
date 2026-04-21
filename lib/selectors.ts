// lib/selectors.ts
// モックデータから集計値を取り出すヘルパー

import { videos, courses, progress, learners, certificates, industries } from "@/mocks";
import type { Course, Video, VideoProgress, Learner } from "@/types";

export function getVideosByCourse(courseId: string): Video[] {
  return videos.filter((v) => v.courseId === courseId);
}

export function getProgressForLearnerVideo(learnerId: string, videoId: string): VideoProgress | undefined {
  return progress.find((p) => p.learnerId === learnerId && p.videoId === videoId);
}

export function getCourseProgress(learnerId: string, courseId: string) {
  const courseVideos = getVideosByCourse(courseId);
  const completed = courseVideos.filter((v) => getProgressForLearnerVideo(learnerId, v.id)?.completed).length;
  const total = courseVideos.length;
  const watchedSec = courseVideos.reduce((acc, v) => acc + (getProgressForLearnerVideo(learnerId, v.id)?.watchedSec ?? 0), 0);
  const totalSec = courseVideos.reduce((acc, v) => acc + v.durationSec, 0);
  return { completed, total, watchedSec, totalSec, percent: total === 0 ? 0 : Math.round((completed / total) * 100) };
}

export function getCoursesForLearner(learner: Learner): { common: Course[]; industry: Course[] } {
  return {
    common: courses.filter((c) => c.industryId === null),
    industry: courses.filter((c) => c.industryId === learner.industryId),
  };
}

export function getLearnersByCompany(companyId: string): Learner[] {
  return learners.filter((l) => l.companyId === companyId);
}

export function getLearnerById(id: string): Learner | undefined {
  return learners.find((l) => l.id === id);
}

export function getTotalWatchedSec(learnerId: string): number {
  return progress.filter((p) => p.learnerId === learnerId).reduce((acc, p) => acc + p.watchedSec, 0);
}

export function getCertificatesForLearner(learnerId: string) {
  return certificates.filter((c) => c.learnerId === learnerId);
}

export function getIndustryName(id: string | null): string {
  if (!id) return "共通";
  return industries.find((i) => i.id === id)?.name ?? id;
}

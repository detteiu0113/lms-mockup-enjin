// mocks/learners.ts
import type { Learner } from "@/types";

export const learners: Learner[] = [
  {
    id: "lrn-001",
    companyId: "comp-001",
    name: "佐藤 美咲",
    email: "sato.misaki@sakura-care.example.jp",
    industryId: "ind-homecare",
    enrolledAt: "2026-03-05",
  },
  {
    id: "lrn-002",
    companyId: "comp-001",
    name: "田中 健一",
    email: "tanaka.ken@sakura-care.example.jp",
    industryId: "ind-homecare",
    enrolledAt: "2026-03-05",
  },
  {
    id: "lrn-003",
    companyId: "comp-001",
    name: "鈴木 由美",
    email: "suzuki.yumi@sakura-care.example.jp",
    industryId: "ind-homecare",
    enrolledAt: "2026-03-10",
  },
  {
    id: "lrn-004",
    companyId: "comp-002",
    name: "高橋 拓也",
    email: "takahashi@manabi.example.jp",
    industryId: "ind-juku",
    enrolledAt: "2026-04-03",
  },
  {
    id: "lrn-005",
    companyId: "comp-002",
    name: "渡辺 優子",
    email: "watanabe@manabi.example.jp",
    industryId: "ind-juku",
    enrolledAt: "2026-04-03",
  },
  {
    id: "lrn-006",
    companyId: "comp-003",
    name: "山本 あかり",
    email: "yamamoto@beauty-lab.example.jp",
    industryId: "ind-esthe",
    enrolledAt: "2026-02-20",
  },
  {
    id: "lrn-007",
    companyId: "comp-004",
    name: "中村 真理",
    email: "nakamura@grace-clinic.example.jp",
    industryId: "ind-clinic",
    enrolledAt: "2026-04-05",
  },
];

/** 現在ログイン中の受講者（デモ用固定） */
export const currentLearner: Learner = learners[0];

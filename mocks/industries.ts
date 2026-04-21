// mocks/industries.ts
import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    id: "ind-homecare",
    name: "訪問看護",
    description: "訪問看護ステーション向けの営業・コミュニケーション研修",
    icon: "🏥",
  },
  {
    id: "ind-juku",
    name: "学習塾",
    description: "学習塾の講師・運営者向け保護者対応・集客研修",
    icon: "📚",
  },
  {
    id: "ind-esthe",
    name: "エステ",
    description: "エステティックサロンのカウンセリング・リピート率向上研修",
    icon: "💆",
  },
  {
    id: "ind-clinic",
    name: "美容クリニック",
    description: "美容クリニックのカウンセラー向け信頼構築・成約研修",
    icon: "💊",
  },
];

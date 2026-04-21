// mocks/courses.ts
import type { Course } from "@/types";

export const courses: Course[] = [
  // ===== 共通ベース（全業種共通） =====
  {
    id: "crs-common-sales",
    title: "【共通】営業の基礎",
    description: "BtoC営業の根幹となる信頼構築・ヒアリング・クロージングの基礎を学ぶ全8回コース",
    industryId: null,
    videoIds: ["vid-cs-01", "vid-cs-02", "vid-cs-03", "vid-cs-04"],
    thumbnail: "🎯",
  },
  {
    id: "crs-common-comm",
    title: "【共通】声のコミュニケーション(3000Hz活用)",
    description: "Voice整体メソッドに基づく発声と周波数コントロールで顧客の信頼を得る技術",
    industryId: null,
    videoIds: ["vid-cc-01", "vid-cc-02", "vid-cc-03"],
    thumbnail: "🎙️",
  },

  // ===== 訪問看護 =====
  {
    id: "crs-homecare-01",
    title: "訪問看護の顧客折衝",
    description: "利用者・ご家族・ケアマネジャーとの関係構築に特化した営業研修",
    industryId: "ind-homecare",
    videoIds: ["vid-hc-01", "vid-hc-02", "vid-hc-03"],
    thumbnail: "🏥",
  },

  // ===== 学習塾 =====
  {
    id: "crs-juku-01",
    title: "学習塾の保護者面談術",
    description: "入塾・継続・紹介につなげる面談設計とトーク例",
    industryId: "ind-juku",
    videoIds: ["vid-jk-01", "vid-jk-02", "vid-jk-03"],
    thumbnail: "📚",
  },

  // ===== エステ =====
  {
    id: "crs-esthe-01",
    title: "エステのカウンセリング実践",
    description: "初回来店の悩み抽出から回数券契約までのカウンセリング設計",
    industryId: "ind-esthe",
    videoIds: ["vid-es-01", "vid-es-02", "vid-es-03"],
    thumbnail: "💆",
  },

  // ===== 美容クリニック =====
  {
    id: "crs-clinic-01",
    title: "美容クリニックのカウンセラー講座",
    description: "医療広告ガイドラインを踏まえた信頼構築と高単価成約",
    industryId: "ind-clinic",
    videoIds: ["vid-cl-01", "vid-cl-02", "vid-cl-03"],
    thumbnail: "💊",
  },
];

// mocks/courses.ts
import type { Course } from "@/types";

export const courses: Course[] = [
  // 共通ベース
  {
    id: "crs-common-sales",
    title: "営業の基礎",
    description: "BtoC営業の根幹となる信頼構築・ヒアリング・クロージングの基礎",
    industryId: null,
    videoIds: ["vid-cs-01", "vid-cs-02", "vid-cs-03", "vid-cs-04"],
  },
  {
    id: "crs-common-comm",
    title: "声のコミュニケーション",
    description: "Voice整体メソッドに基づく発声と周波数コントロール",
    industryId: null,
    videoIds: ["vid-cc-01", "vid-cc-02", "vid-cc-03"],
  },

  // 訪問看護
  {
    id: "crs-homecare-01",
    title: "訪問看護の顧客折衝",
    description: "利用者・ご家族・ケアマネジャーとの関係構築",
    industryId: "ind-homecare",
    videoIds: ["vid-hc-01", "vid-hc-02", "vid-hc-03"],
  },

  // 学習塾
  {
    id: "crs-juku-01",
    title: "保護者面談術",
    description: "入塾・継続・紹介につなげる面談設計とトーク例",
    industryId: "ind-juku",
    videoIds: ["vid-jk-01", "vid-jk-02", "vid-jk-03"],
  },

  // エステ
  {
    id: "crs-esthe-01",
    title: "カウンセリング実践",
    description: "初回来店から回数券契約までの設計",
    industryId: "ind-esthe",
    videoIds: ["vid-es-01", "vid-es-02", "vid-es-03"],
  },

  // 美容クリニック
  {
    id: "crs-clinic-01",
    title: "カウンセラー講座",
    description: "医療広告ガイドラインを踏まえた信頼構築と成約",
    industryId: "ind-clinic",
    videoIds: ["vid-cl-01", "vid-cl-02", "vid-cl-03"],
  },
];

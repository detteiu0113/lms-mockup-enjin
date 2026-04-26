// mocks/videos.ts
import type { Video } from "@/types";

const SAMPLE_MP4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const videos: Video[] = [
  // 共通: 営業の基礎
  { id: "vid-cs-01", courseId: "crs-common-sales", title: "第1回 BtoB営業の全体像", description: "営業プロセスの全体像とサービス業での活用イメージ", durationSec: 2100, src: SAMPLE_MP4 },
  { id: "vid-cs-02", courseId: "crs-common-sales", title: "第2回 信頼構築の3原則", description: "初対面で信頼されるための姿勢・発声・傾聴", durationSec: 1980, src: SAMPLE_MP4 },
  { id: "vid-cs-03", courseId: "crs-common-sales", title: "第3回 ヒアリングフレーム", description: "SPIN法をベースにした顧客ヒアリングの型", durationSec: 2400, src: SAMPLE_MP4 },
  { id: "vid-cs-04", courseId: "crs-common-sales", title: "第4回 クロージング技法", description: "意思決定を促すクロージングの言語化", durationSec: 2250, src: SAMPLE_MP4 },

  // 共通: 声のコミュニケーション
  { id: "vid-cc-01", courseId: "crs-common-comm", title: "第1回 声の周波数入門", description: "3000Hz帯の声が顧客心理に与える影響", durationSec: 1800, src: SAMPLE_MP4 },
  { id: "vid-cc-02", courseId: "crs-common-comm", title: "第2回 発声トレーニング", description: "毎朝5分の発声ルーティン", durationSec: 1500, src: SAMPLE_MP4 },
  { id: "vid-cc-03", courseId: "crs-common-comm", title: "第3回 Zoom商談での声の使い方", description: "オンライン特有の音質劣化を踏まえた話し方", durationSec: 2100, src: SAMPLE_MP4 },

  // 訪問看護
  { id: "vid-hc-01", courseId: "crs-homecare-01", title: "訪問看護ステーションの営業対象", description: "ケアマネ・病院退院支援室・利用者家族の構造理解", durationSec: 2400, src: SAMPLE_MP4 },
  { id: "vid-hc-02", courseId: "crs-homecare-01", title: "ケアマネ営業のトーク例", description: "担当者会議での発言・資料設計", durationSec: 2100, src: SAMPLE_MP4 },
  { id: "vid-hc-03", courseId: "crs-homecare-01", title: "利用者家族との信頼構築", description: "ご家族の不安を引き出し寄り添う対話法", durationSec: 1980, src: SAMPLE_MP4 },

  // 学習塾
  { id: "vid-jk-01", courseId: "crs-juku-01", title: "体験授業後の保護者面談", description: "入塾率を上げる面談スクリプト", durationSec: 2250, src: SAMPLE_MP4 },
  { id: "vid-jk-02", courseId: "crs-juku-01", title: "定期面談での継続提案", description: "成績報告から次年度継続への自然な導線", durationSec: 1980, src: SAMPLE_MP4 },
  { id: "vid-jk-03", courseId: "crs-juku-01", title: "紹介が生まれる保護者対応", description: "口コミ・紹介が発生する関係性の作り方", durationSec: 1800, src: SAMPLE_MP4 },

  // エステ
  { id: "vid-es-01", courseId: "crs-esthe-01", title: "初回カウンセリングの流れ", description: "60分の時間配分と質問設計", durationSec: 2400, src: SAMPLE_MP4 },
  { id: "vid-es-02", courseId: "crs-esthe-01", title: "悩みの深掘り技術", description: "表面的な要望の奥にある本質を引き出す", durationSec: 2100, src: SAMPLE_MP4 },
  { id: "vid-es-03", courseId: "crs-esthe-01", title: "回数券提案の自然な流れ", description: "押し売り感なく継続契約を獲得する話法", durationSec: 2250, src: SAMPLE_MP4 },

  // 美容クリニック
  { id: "vid-cl-01", courseId: "crs-clinic-01", title: "医療広告ガイドライン概要", description: "カウンセラーが押さえるべき法規制", durationSec: 1800, src: SAMPLE_MP4 },
  { id: "vid-cl-02", courseId: "crs-clinic-01", title: "高単価施術の説明技法", description: "医師との連携と患者理解促進", durationSec: 2400, src: SAMPLE_MP4 },
  { id: "vid-cl-03", courseId: "crs-clinic-01", title: "不安解消とアフターフォロー", description: "リピート・紹介につながるアフター設計", durationSec: 2100, src: SAMPLE_MP4 },
];

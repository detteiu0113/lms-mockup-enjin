// mocks/companies.ts
import type { Company } from "@/types";

export const companies: Company[] = [
  {
    id: "comp-001",
    name: "株式会社さくらケア",
    industryId: "ind-homecare",
    contractedLearners: 12,
    contractStart: "2026-03-01",
    contractEnd: "2027-02-28",
  },
  {
    id: "comp-002",
    name: "まなび学舎",
    industryId: "ind-juku",
    contractedLearners: 8,
    contractStart: "2026-04-01",
    contractEnd: "2027-03-31",
  },
  {
    id: "comp-003",
    name: "ビューティーラボ渋谷",
    industryId: "ind-esthe",
    contractedLearners: 15,
    contractStart: "2026-02-15",
    contractEnd: "2027-02-14",
  },
  {
    id: "comp-004",
    name: "グレイス美容クリニック",
    industryId: "ind-clinic",
    contractedLearners: 6,
    contractStart: "2026-04-01",
    contractEnd: "2027-03-31",
  },
];

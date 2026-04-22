// lib/format.ts
// 時間・日時フォーマットのユーティリティ

/** 「1時間23分45秒」「23分45秒」「45秒」 */
export function formatDurationJP(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}時間${m}分${s}秒`;
  if (m > 0) return `${m}分${s}秒`;
  return `${s}秒`;
}

/** 「01:23:45」「23:45」 */
export function formatDurationClock(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${String(h).padStart(2, "0")}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** 「2026/04/22」 */
export function formatDate(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
}

/** 「2026/04/22 13:45:09」(秒単位) */
export function formatDateTimeSec(iso: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${formatDate(iso)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** 助成金シミュレーション */
export type CompanySize = "sme" | "large";
export interface SubsidySim {
  pricePerPerson: number; // えん人単価(円)
  subsidyRate: number; // 助成率
  cap: number; // 1人上限
  subsidyPerPerson: number; // 1人あたり助成額
  netCostPerPerson: number; // 実質負担
}

export function simulateSubsidy(pricePerPerson: number, size: CompanySize): SubsidySim {
  const rate = size === "sme" ? 0.75 : 0.6;
  const cap = size === "sme" ? 300000 : 200000;
  const raw = pricePerPerson * rate;
  const subsidy = Math.min(raw, cap);
  return {
    pricePerPerson,
    subsidyRate: rate,
    cap,
    subsidyPerPerson: subsidy,
    netCostPerPerson: pricePerPerson - subsidy,
  };
}

export function formatYen(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

// components/common/Badge.tsx
import { ReactNode } from "react";

type Tone = "brand" | "success" | "warning" | "neutral" | "info";

interface Props {
  tone?: Tone;
  children: ReactNode;
}

const toneStyles: Record<Tone, string> = {
  brand: "bg-slate-100 text-slate-900",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  neutral: "bg-slate-100 text-text-secondary",
  info: "bg-sky-50 text-sky-700",
};

export default function Badge({ tone = "neutral", children }: Props) {
  return (
    <span className={`inline-flex items-center px-2 h-5 text-[11px] font-medium rounded ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}

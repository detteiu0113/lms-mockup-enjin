// components/common/Badge.tsx
import { ReactNode } from "react";

type Tone = "brand" | "success" | "warning" | "neutral" | "info";

interface Props {
  tone?: Tone;
  children: ReactNode;
}

const toneStyles: Record<Tone, string> = {
  brand: "bg-blue-50 text-brand border border-blue-200",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  neutral: "bg-gray-100 text-text-secondary border border-border-default",
  info: "bg-sky-50 text-sky-700 border border-sky-200",
};

export default function Badge({ tone = "neutral", children }: Props) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}

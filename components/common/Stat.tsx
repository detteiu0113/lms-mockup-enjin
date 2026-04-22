// components/common/Stat.tsx
import { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
  hint?: string;
}

export default function Stat({ label, value, hint }: Props) {
  return (
    <div className="bg-surface border border-border-default rounded-md p-5">
      <div className="text-xs text-text-secondary mb-1.5">{label}</div>
      <div className="text-[22px] font-semibold text-text tabular-nums tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-text-muted">{hint}</div>}
    </div>
  );
}

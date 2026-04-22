// components/common/ProgressBar.tsx

interface Props {
  percent: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ProgressBar({ percent, showLabel = false, size = "md" }: Props) {
  const h = size === "sm" ? "h-1" : "h-1.5";
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1.5 text-[11px] text-text-muted tabular-nums">
          <span>進捗</span>
          <span className="font-medium text-text">{clamped}%</span>
        </div>
      )}
      <div className={`w-full ${h} bg-surface-subtle rounded-full overflow-hidden`}>
        <div className={`${h} bg-accent transition-all duration-500`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

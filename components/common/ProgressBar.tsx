// components/common/ProgressBar.tsx

interface Props {
  percent: number; // 0-100
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ProgressBar({ percent, showLabel = false, size = "md" }: Props) {
  const h = size === "sm" ? "h-1.5" : "h-2";
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs text-text-secondary">
          <span>進捗</span>
          <span className="font-medium">{clamped}%</span>
        </div>
      )}
      <div className={`w-full ${h} bg-border-default rounded-full overflow-hidden`}>
        <div
          className={`${h} bg-brand transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

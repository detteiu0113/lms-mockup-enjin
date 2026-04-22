// components/common/Thumbnail.tsx
// 絵文字を使わずに、タイトル頭文字 + 決定論的な薄色背景で視覚的識別子を作る

interface Props {
  label: string;
  seed: string;
  size?: "sm" | "md" | "lg";
}

const palettes = [
  "bg-slate-100 text-slate-700",
  "bg-blue-50 text-blue-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-rose-50 text-rose-700",
  "bg-violet-50 text-violet-700",
  "bg-cyan-50 text-cyan-700",
];

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export default function Thumbnail({ label, seed, size = "md" }: Props) {
  const color = palettes[hashSeed(seed) % palettes.length];
  const initial = label.slice(0, 1);
  return (
    <div className={`${sizeStyles[size]} ${color} rounded flex items-center justify-center font-semibold tracking-tight`}>
      {initial}
    </div>
  );
}

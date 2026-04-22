// components/common/Card.tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export default function Card({ children, className = "", padded = true }: Props) {
  return (
    <div className={`bg-surface border border-border-default rounded-md ${padded ? "p-5" : ""} ${className}`}>
      {children}
    </div>
  );
}

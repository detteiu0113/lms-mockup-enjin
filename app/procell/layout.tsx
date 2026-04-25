// app/procell/layout.tsx
import AppShell from "@/components/common/AppShell";

export default function ProcellLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="procell" userLabel="開発・運用 / プロセル">
      {children}
    </AppShell>
  );
}

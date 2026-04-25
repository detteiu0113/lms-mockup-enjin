// app/enjin/layout.tsx
import AppShell from "@/components/common/AppShell";

export default function EnjinLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="enjin" userLabel="運営 / 合同会社えん人">
      {children}
    </AppShell>
  );
}

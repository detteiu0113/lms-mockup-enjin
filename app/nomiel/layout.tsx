// app/nomiel/layout.tsx
import AppShell from "@/components/common/AppShell";

export default function NomielLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="nomiel" userLabel="開発・運用 / NOMIEL">
      {children}
    </AppShell>
  );
}

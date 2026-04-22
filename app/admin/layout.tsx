// app/admin/layout.tsx
import AppShell from "@/components/common/AppShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="admin" userLabel="運営 / プロセル">
      {children}
    </AppShell>
  );
}

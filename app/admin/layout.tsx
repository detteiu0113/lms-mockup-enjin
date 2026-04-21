// app/admin/layout.tsx
import AppShell from "@/components/common/AppShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell role="admin" userLabel="押田 裕亮 / NOMIEL">
      {children}
    </AppShell>
  );
}

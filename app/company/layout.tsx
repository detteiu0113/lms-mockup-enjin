// app/company/layout.tsx
import AppShell from "@/components/common/AppShell";
import { companies } from "@/mocks/companies";

// デモ用の企業管理者（comp-001 株式会社さくらケア）
const DEMO_COMPANY_ID = "comp-001";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const company = companies.find((c) => c.id === DEMO_COMPANY_ID);
  return (
    <AppShell role="company" userLabel={`管理者 / ${company?.name ?? ""}`}>
      {children}
    </AppShell>
  );
}

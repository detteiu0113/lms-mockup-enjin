// app/student/layout.tsx
import AppShell from "@/components/common/AppShell";
import { currentLearner } from "@/mocks/learners";
import { companies } from "@/mocks/companies";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const company = companies.find((c) => c.id === currentLearner.companyId);
  return (
    <AppShell role="student" userLabel={`${currentLearner.name} / ${company?.name ?? ""}`}>
      {children}
    </AppShell>
  );
}

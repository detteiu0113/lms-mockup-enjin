// app/student/certificates/[courseId]/PrintButton.tsx
"use client";

import Button from "@/components/common/Button";

export default function PrintButton() {
  return <Button onClick={() => window.print()}>📥 PDFでダウンロード</Button>;
}

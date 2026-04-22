// app/student/certificates/[courseId]/PrintButton.tsx
"use client";

import { Download } from "lucide-react";
import Button from "@/components/common/Button";

export default function PrintButton() {
  return (
    <Button onClick={() => window.print()}>
      <Download size={14} /> PDFをダウンロード
    </Button>
  );
}

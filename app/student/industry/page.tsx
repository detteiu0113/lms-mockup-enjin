// app/student/industry/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import { industries } from "@/mocks/industries";
import { currentLearner } from "@/mocks/learners";

export default function IndustrySelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(currentLearner.industryId);

  return (
    <div className="max-w-2xl">
      <PageHeader
        title="所属業種を選択"
        description="業種に合わせたカリキュラムが表示されます。"
      />

      <div className="space-y-2 mb-8">
        {industries.map((ind) => {
          const isSel = selected === ind.id;
          return (
            <button
              key={ind.id}
              onClick={() => setSelected(ind.id)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-md border transition-colors ${
                isSel
                  ? "border-text bg-surface"
                  : "border-border-default bg-surface hover:border-text-secondary"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSel ? "border-text bg-text" : "border-border-strong"
              }`}>
                {isSel && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <div className="font-medium text-text">{ind.name}</div>
                <p className="text-xs text-text-secondary mt-0.5">{ind.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => router.push("/student")}>確定</Button>
        <Button variant="ghost" onClick={() => router.push("/student")}>キャンセル</Button>
      </div>
    </div>
  );
}

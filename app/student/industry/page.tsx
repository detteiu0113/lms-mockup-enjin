// app/student/industry/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import { industries } from "@/mocks/industries";
import { currentLearner } from "@/mocks/learners";

export default function IndustrySelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(currentLearner.industryId);

  const onSubmit = () => {
    // モックなので遷移のみ
    router.push("/student");
  };

  return (
    <div className="max-w-3xl">
      <PageHeader
        title="所属業種の選択"
        description="あなたの業種に合わせて、最適なカリキュラムが表示されます。通常は初回ログイン時に選択します。"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {industries.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setSelected(ind.id)}
            className={`text-left p-5 rounded-lg border-2 transition-all duration-300 ${
              selected === ind.id
                ? "border-brand bg-blue-50"
                : "border-border-default bg-surface hover:border-brand hover:shadow-sm"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{ind.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-text">{ind.name}</div>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{ind.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={onSubmit}>この業種で続ける</Button>
        <Button variant="ghost" onClick={() => router.push("/student")}>
          キャンセル
        </Button>
      </div>
    </div>
  );
}

// app/procell/industries/page.tsx
"use client";

import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { industries as initialIndustries } from "@/mocks/industries";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";

export default function IndustriesPage() {
  const [list, setList] = useState(initialIndustries);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", description: "" });

  const addIndustry = () => {
    if (!draft.name) return;
    setList([
      ...list,
      {
        id: `ind-${Date.now()}`,
        name: draft.name,
        description: draft.description,
      },
    ]);
    setDraft({ name: "", description: "" });
    setShowForm(false);
  };

  return (
    <>
      <PageHeader
        title="業種"
        description="業種カテゴリの追加・編集はプロセル(コンテンツ運用)が担当します。"
        action={
          <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "secondary" : "primary"}>
            {showForm ? "キャンセル" : (<><Plus size={14} /> 業種を追加</>)}
          </Button>
        }
      />

      {showForm && (
        <div className="bg-surface border border-border-default rounded-md p-5 mb-6">
          <div className="text-sm font-semibold text-text mb-4">新規業種の追加</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-[11px] text-text-secondary mb-1">業種名</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="例: 飲食店"
                className="w-full h-9 px-3 text-sm bg-surface border border-border-default rounded-md focus:outline-none focus:border-brand"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px] text-text-secondary mb-1">説明</label>
              <input
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="研修対象や特徴"
                className="w-full h-9 px-3 text-sm bg-surface border border-border-default rounded-md focus:outline-none focus:border-brand"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={addIndustry}>追加する</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>キャンセル</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {list.map((ind) => {
          const compCount = companies.filter((c) => c.industryId === ind.id).length;
          const courseCount = courses.filter((c) => c.industryId === ind.id).length;
          return (
            <div key={ind.id} className="bg-surface border border-border-default rounded-md p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-text-muted" />
                  <div className="font-medium text-text">{ind.name}</div>
                </div>
                <div className="flex gap-1.5">
                  <Badge tone="neutral">{compCount}社</Badge>
                  <Badge tone="info">{courseCount}コース</Badge>
                </div>
              </div>
              <div className="text-[11px] text-text-muted font-mono mb-2">{ind.id}</div>
              <p className="text-sm text-text-secondary leading-relaxed">{ind.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

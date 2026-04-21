// app/admin/industries/page.tsx
// 業種管理 - 要件「業種追加時にコンテンツ運用側だけで追加可能な管理画面」
"use client";

import { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { industries as initialIndustries } from "@/mocks/industries";
import { companies } from "@/mocks/companies";
import { courses } from "@/mocks/courses";

export default function IndustriesPage() {
  const [list, setList] = useState(initialIndustries);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", description: "", icon: "🏷️" });

  const addIndustry = () => {
    if (!draft.name) return;
    setList([
      ...list,
      {
        id: `ind-${Date.now()}`,
        name: draft.name,
        description: draft.description,
        icon: draft.icon,
      },
    ]);
    setDraft({ name: "", description: "", icon: "🏷️" });
    setShowForm(false);
  };

  return (
    <>
      <PageHeader
        title="業種管理"
        description="業種カテゴリの追加・編集ができます。新業種を追加すると、受講者側の業種選択画面にも反映されます。"
        action={<Button onClick={() => setShowForm(!showForm)}>{showForm ? "キャンセル" : "+ 業種を追加"}</Button>}
      />

      {showForm && (
        <Card className="mb-6">
          <div className="text-sm font-bold text-text mb-4">新規業種の追加</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-text-secondary mb-1">アイコン(絵文字)</label>
              <input
                value={draft.icon}
                onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-text-secondary mb-1">業種名</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                placeholder="例: 飲食店、整骨院など"
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs text-text-secondary mb-1">説明</label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={addIndustry}>追加する</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>キャンセル</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((ind) => {
          const compCount = companies.filter((c) => c.industryId === ind.id).length;
          const courseCount = courses.filter((c) => c.industryId === ind.id).length;
          return (
            <Card key={ind.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{ind.icon}</div>
                  <div>
                    <div className="font-bold text-text">{ind.name}</div>
                    <div className="text-xs text-text-muted font-mono">{ind.id}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge tone="info">{compCount}社</Badge>
                  <Badge tone="brand">{courseCount}コース</Badge>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">{ind.description}</p>
              <div className="flex gap-2 pt-3 border-t border-border-default">
                <Button variant="ghost" size="sm">編集</Button>
                <Button variant="ghost" size="sm">コース割当</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

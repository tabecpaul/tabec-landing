"use client";

import { useTransition } from "react";
import { deleteCardNews } from "@/app/card-news/actions";
import type { CardNews } from "@/lib/card-news";

const STATUS_LABELS: Record<CardNews["status"], string> = {
  draft: "검토중 (미발행)",
  published: "블로그에 발행됨",
};

const STATUS_CLASSES: Record<CardNews["status"], string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
};

export default function CardNewsDeckControls({ deck }: { deck: CardNews }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("이 카드뉴스와 모든 카드/이미지를 삭제할까요? 되돌릴 수 없습니다.")) return;
    startTransition(async () => {
      await deleteCardNews(deck.id);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`rounded-full px-3 py-1.5 text-sm font-semibold ${STATUS_CLASSES[deck.status]}`}
      >
        {STATUS_LABELS[deck.status]}
      </span>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-40"
      >
        카드뉴스 삭제
      </button>
    </div>
  );
}

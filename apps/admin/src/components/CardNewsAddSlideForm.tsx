"use client";

import { useState, useTransition } from "react";
import { createSlide } from "@/app/card-news/actions";

const PLACEHOLDER = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; width: 1080px; height: 1350px; }
      body { background: #52433d; color: #fff; font-family: "Noto Sans KR", sans-serif; }
    </style>
  </head>
  <body>
    <!-- 카드 1장 전체를 그리는 self-contained 마크업 -->
  </body>
</html>`;

export default function CardNewsAddSlideForm({ cardNewsId }: { cardNewsId: string }) {
  const [html, setHtml] = useState("");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded border border-dashed border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-50"
      >
        + 새 카드 추가
      </button>
    );
  }

  function handleAdd() {
    setError("");
    if (!html.trim()) {
      setError("HTML을 입력해주세요.");
      return;
    }
    startTransition(async () => {
      try {
        await createSlide(cardNewsId, html);
        setHtml("");
        setOpen(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "카드 추가에 실패했습니다.");
      }
    });
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <p className="mb-2 text-sm font-semibold text-zinc-800">새 카드 추가</p>
      <textarea
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        rows={10}
        spellCheck={false}
        placeholder={PLACEHOLDER}
        className="w-full rounded border border-zinc-300 bg-zinc-50 p-2 font-mono text-xs"
      />
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={isPending}
          className="rounded bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
        >
          추가
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError("");
          }}
          className="rounded border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-600"
        >
          취소
        </button>
      </div>
    </div>
  );
}

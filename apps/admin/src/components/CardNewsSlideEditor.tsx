"use client";

import { useState, useTransition } from "react";
import { deleteSlide, moveSlide, setSlideStatus, updateSlideHtml } from "@/app/card-news/actions";
import type { CardNewsSlide } from "@/lib/card-news";

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
const PREVIEW_SCALE = 0.28;

export default function CardNewsSlideEditor({
  cardNewsId,
  slide,
  index,
  isFirst,
  isLast,
}: {
  cardNewsId: string;
  slide: CardNewsSlide;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [html, setHtml] = useState(slide.html);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const isApproved = slide.status === "approved";

  function handleSave() {
    setError("");
    startTransition(async () => {
      try {
        await updateSlideHtml(cardNewsId, slide.id, html);
        setIsDirty(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : "저장에 실패했습니다.");
      }
    });
  }

  function handleToggleApprove() {
    setError("");
    startTransition(async () => {
      try {
        await setSlideStatus(cardNewsId, slide.id, isApproved ? "draft" : "approved");
      } catch (e) {
        setError(e instanceof Error ? e.message : "상태 변경에 실패했습니다.");
      }
    });
  }

  function handleMove(direction: "up" | "down") {
    startTransition(async () => {
      await moveSlide(cardNewsId, slide.id, direction);
    });
  }

  function handleDelete() {
    if (!confirm(`${index + 1}번 카드를 삭제할까요?`)) return;
    startTransition(async () => {
      await deleteSlide(cardNewsId, slide.id, slide.image_path);
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div
          className="overflow-hidden rounded border border-zinc-300 bg-white"
          style={{ width: CARD_WIDTH * PREVIEW_SCALE, height: CARD_HEIGHT * PREVIEW_SCALE }}
        >
          <iframe
            title={`card-${index}`}
            srcDoc={html}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              border: 0,
              transform: `scale(${PREVIEW_SCALE})`,
              transformOrigin: "top left",
            }}
          />
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => handleMove("up")}
            disabled={isFirst || isPending}
            className="rounded border border-zinc-300 px-2 py-1 text-xs disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => handleMove("down")}
            disabled={isLast || isPending}
            className="rounded border border-zinc-300 px-2 py-1 text-xs disabled:opacity-30"
          >
            ↓
          </button>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-zinc-800">카드 {index + 1}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              isApproved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {isApproved ? "승인됨" : "검토중"}
          </span>
          {slide.image_url && (
            <a
              href={slide.image_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-zinc-500 underline"
            >
              변환된 이미지 보기
            </a>
          )}
        </div>

        <textarea
          value={html}
          onChange={(e) => {
            setHtml(e.target.value);
            setIsDirty(true);
          }}
          rows={10}
          spellCheck={false}
          className="w-full rounded border border-zinc-300 bg-zinc-50 p-2 font-mono text-xs"
          placeholder="1080x1350 카드 전체를 그리는 self-contained HTML (내부 <style> 포함)"
        />

        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty || isPending}
            className="rounded bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
          >
            저장
          </button>
          <button
            type="button"
            onClick={handleToggleApprove}
            disabled={isDirty || isPending}
            title={isDirty ? "먼저 저장해주세요" : undefined}
            className="rounded bg-green-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
          >
            {isApproved ? "승인 취소" : "검토 승인"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="ml-auto rounded border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 disabled:opacity-40"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

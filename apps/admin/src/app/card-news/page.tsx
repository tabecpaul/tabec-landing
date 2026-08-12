import Link from "next/link";
import { listCardNews } from "@/lib/card-news";
import { createCardNews } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  draft: "검토중",
  published: "발행됨",
};

const STATUS_CLASSES: Record<string, string> = {
  draft: "bg-amber-100 text-amber-700",
  published: "bg-green-100 text-green-700",
};

const BRAND_SWATCHES = [
  { name: "--navy", hex: "#52433d", usage: "메인 텍스트 / 배경" },
  { name: "--navy-light", hex: "#6b5c4a", usage: "그라디언트 보조" },
  { name: "--gold", hex: "#ec5a38", usage: "포인트 컬러 / CTA" },
  { name: "--gold-light", hex: "#ebb991", usage: "포인트 밝은 톤" },
  { name: "--cream", hex: "#fbf3ec", usage: "배경" },
  { name: "--line", hex: "#e8d6c8", usage: "구분선 / 테두리" },
  { name: "--gray", hex: "#6b7280", usage: "보조 텍스트" },
  { name: "--brand-red", hex: "#c4122d", usage: "강조(선택적)" },
];

export default async function CardNewsListPage() {
  const decks = await listCardNews();

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900">
            ← 견적 요청 목록
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-zinc-900">카드뉴스</h1>
          <p className="mt-1 text-sm text-zinc-500">
            블로그 글 기반 인스타그램 카드뉴스(1080×1350)를 검토하고 이미지로 발행합니다.
          </p>
        </div>
      </div>

      <details className="mb-6 rounded-lg border border-zinc-200 bg-white p-4 text-sm">
        <summary className="cursor-pointer font-semibold text-zinc-800">
          브랜드 디자인 시스템 참고 (카드 제작 시 이 팔레트/폰트를 사용)
        </summary>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BRAND_SWATCHES.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded border border-zinc-100 p-2">
              <span
                className="h-8 w-8 shrink-0 rounded border border-zinc-200"
                style={{ background: s.hex }}
              />
              <div className="min-w-0">
                <div className="truncate font-mono text-xs text-zinc-700">{s.name}</div>
                <div className="text-xs text-zinc-400">{s.hex}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          폰트: Noto Sans KR. 카드 크기: 1080×1350px (인스타그램 4:5). 참고:
          apps/www/src/app/globals.css
        </p>
      </details>

      <form
        action={createCardNews}
        className="mb-8 flex flex-wrap items-end gap-3 rounded-lg border border-zinc-200 bg-white p-4"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-600">블로그 slug</label>
          <input
            name="blog_slug"
            required
            placeholder="예: welcome"
            className="rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-zinc-600">카드뉴스 제목</label>
          <input
            name="title"
            required
            placeholder="내부 관리용 제목"
            className="w-64 rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          새 카드뉴스 만들기
        </button>
      </form>

      {decks.length === 0 ? (
        <p className="text-zinc-500">아직 만들어진 카드뉴스가 없습니다.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-100 text-zinc-600">
              <tr>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">제목</th>
                <th className="px-4 py-3">블로그 slug</th>
                <th className="px-4 py-3">카드 수</th>
                <th className="px-4 py-3">승인된 카드</th>
                <th className="px-4 py-3">생성일</th>
              </tr>
            </thead>
            <tbody>
              {decks.map((deck) => (
                <tr key={deck.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_CLASSES[deck.status]}`}
                    >
                      {STATUS_LABELS[deck.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    <Link href={`/card-news/${deck.id}`} className="hover:underline">
                      {deck.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">/blog/{deck.blog_slug}</td>
                  <td className="px-4 py-3">{deck.slide_count}</td>
                  <td className="px-4 py-3">
                    {deck.approved_count} / {deck.slide_count}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                    {new Date(deck.created_at).toLocaleString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

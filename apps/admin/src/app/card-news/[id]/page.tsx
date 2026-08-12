import Link from "next/link";
import { notFound } from "next/navigation";
import { getCardNews, listSlides } from "@/lib/card-news";
import CardNewsSlideEditor from "@/components/CardNewsSlideEditor";
import CardNewsAddSlideForm from "@/components/CardNewsAddSlideForm";
import CardNewsDeckControls from "@/components/CardNewsDeckControls";

export const dynamic = "force-dynamic";

export default async function CardNewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await getCardNews(id);
  if (!deck) notFound();

  const slides = await listSlides(id);
  const approvedCount = slides.filter((s) => s.status === "approved").length;

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mb-6">
        <Link href="/card-news" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← 카드뉴스 목록
        </Link>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">{deck.title}</h1>
            <p className="mt-1 font-mono text-xs text-zinc-500">/blog/{deck.blog_slug}</p>
          </div>
          <CardNewsDeckControls deck={deck} />
        </div>
        <p className="mt-2 text-sm text-zinc-500">
          {slides.length}개 카드 중 {approvedCount}개 승인됨. 여기서는 검토·승인까지만 진행하고,
          이미지 변환과 블로그 발행은 Claude Code에게 요청해주세요.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {slides.map((slide, index) => (
          <CardNewsSlideEditor
            key={slide.id}
            cardNewsId={id}
            slide={slide}
            index={index}
            isFirst={index === 0}
            isLast={index === slides.length - 1}
          />
        ))}
        <CardNewsAddSlideForm cardNewsId={id} />
      </div>
    </main>
  );
}

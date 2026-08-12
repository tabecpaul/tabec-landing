import "server-only";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type CardNewsStatus = "draft" | "published";
export type CardNewsSlideStatus = "draft" | "approved";

export type CardNews = {
  id: string;
  blog_slug: string;
  title: string;
  status: CardNewsStatus;
  created_at: string;
  updated_at: string;
};

export type CardNewsSlide = {
  id: string;
  card_news_id: string;
  position: number;
  html: string;
  status: CardNewsSlideStatus;
  image_path: string | null;
  image_url: string | null;
  rendered_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CardNewsWithCounts = CardNews & {
  slide_count: number;
  approved_count: number;
};

export async function listCardNews(): Promise<CardNewsWithCounts[]> {
  const { data, error } = await supabaseAdmin
    .from("card_news")
    .select("*, card_news_slides(status)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((deck) => {
    const slides = (deck.card_news_slides ?? []) as { status: CardNewsSlideStatus }[];
    const rest: CardNews = {
      id: deck.id,
      blog_slug: deck.blog_slug,
      title: deck.title,
      status: deck.status,
      created_at: deck.created_at,
      updated_at: deck.updated_at,
    };
    return {
      ...rest,
      slide_count: slides.length,
      approved_count: slides.filter((s) => s.status === "approved").length,
    };
  });
}

export async function getCardNews(id: string): Promise<CardNews | null> {
  const { data, error } = await supabaseAdmin.from("card_news").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data as CardNews;
}

export async function listSlides(cardNewsId: string): Promise<CardNewsSlide[]> {
  const { data, error } = await supabaseAdmin
    .from("card_news_slides")
    .select("*")
    .eq("card_news_id", cardNewsId)
    .order("position", { ascending: true });

  if (error || !data) return [];
  return data as CardNewsSlide[];
}

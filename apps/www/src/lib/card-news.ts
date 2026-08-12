import { supabase } from "@/lib/supabase";

export type PublishedCardNewsSlide = {
  id: string;
  position: number;
  image_url: string;
};

export async function getCardNewsForSlug(slug: string): Promise<PublishedCardNewsSlide[]> {
  const { data: deck } = await supabase
    .from("card_news")
    .select("id")
    .eq("blog_slug", slug)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!deck) return [];

  const { data: slides } = await supabase
    .from("card_news_slides")
    .select("id, position, image_url")
    .eq("card_news_id", deck.id)
    .eq("status", "approved")
    .order("position", { ascending: true });

  return (slides ?? []).filter((s) => Boolean(s.image_url)) as PublishedCardNewsSlide[];
}

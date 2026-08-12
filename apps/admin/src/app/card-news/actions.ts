"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { listSlides } from "@/lib/card-news";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function createCardNews(formData: FormData) {
  await requireUser();

  const blog_slug = String(formData.get("blog_slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!blog_slug || !title) {
    throw new Error("블로그 slug와 제목을 입력해주세요.");
  }

  const { data, error } = await supabaseAdmin
    .from("card_news")
    .insert({ blog_slug, title })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "카드뉴스 생성에 실패했습니다.");
  }

  revalidatePath("/card-news");
  redirect(`/card-news/${data.id}`);
}

export async function deleteCardNews(id: string) {
  await requireUser();

  const slides = await listSlides(id);
  const paths = slides.map((s) => s.image_path).filter((p): p is string => Boolean(p));
  if (paths.length > 0) {
    await supabaseAdmin.storage.from("card-news").remove(paths);
  }

  const { error } = await supabaseAdmin.from("card_news").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/card-news");
  redirect("/card-news");
}

export async function createSlide(cardNewsId: string, html: string) {
  await requireUser();

  const existing = await listSlides(cardNewsId);
  const nextPosition = existing.length > 0 ? Math.max(...existing.map((s) => s.position)) + 1 : 0;

  const { error } = await supabaseAdmin.from("card_news_slides").insert({
    card_news_id: cardNewsId,
    position: nextPosition,
    html,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/card-news/${cardNewsId}`);
}

export async function updateSlideHtml(cardNewsId: string, slideId: string, html: string) {
  await requireUser();

  const { error } = await supabaseAdmin
    .from("card_news_slides")
    .update({
      html,
      status: "draft",
      image_path: null,
      image_url: null,
      rendered_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", slideId);

  if (error) throw new Error(error.message);

  revalidatePath(`/card-news/${cardNewsId}`);
}

export async function deleteSlide(cardNewsId: string, slideId: string, imagePath: string | null) {
  await requireUser();

  if (imagePath) {
    await supabaseAdmin.storage.from("card-news").remove([imagePath]);
  }

  const { error } = await supabaseAdmin.from("card_news_slides").delete().eq("id", slideId);
  if (error) throw new Error(error.message);

  revalidatePath(`/card-news/${cardNewsId}`);
}

export async function moveSlide(cardNewsId: string, slideId: string, direction: "up" | "down") {
  await requireUser();

  const slides = await listSlides(cardNewsId);
  const index = slides.findIndex((s) => s.id === slideId);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= slides.length) return;

  const a = slides[index];
  const b = slides[swapIndex];

  await supabaseAdmin.from("card_news_slides").update({ position: b.position }).eq("id", a.id);
  await supabaseAdmin.from("card_news_slides").update({ position: a.position }).eq("id", b.id);

  revalidatePath(`/card-news/${cardNewsId}`);
}

export async function setSlideStatus(
  cardNewsId: string,
  slideId: string,
  status: "draft" | "approved"
) {
  await requireUser();

  const { error } = await supabaseAdmin
    .from("card_news_slides")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", slideId);

  if (error) throw new Error(error.message);

  revalidatePath(`/card-news/${cardNewsId}`);
}

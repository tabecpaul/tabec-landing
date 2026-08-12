"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { submitUrlsToIndexNow } from "@/lib/indexnow";
import { SITE_URL } from "@/lib/site";

const VALID_STATUSES = ["new", "in_progress", "done"] as const;
type Status = (typeof VALID_STATUSES)[number];

export async function updateQuoteStatus(id: string, status: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!VALID_STATUSES.includes(status as Status)) {
    throw new Error("Invalid status");
  }

  const { error } = await supabaseAdmin.from("quote_requests").update({ status }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function submitSitemapToIndexNow() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`sitemap 조회에 실패했습니다: ${res.status}`);
  }

  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1]);

  await submitUrlsToIndexNow(urls);
}

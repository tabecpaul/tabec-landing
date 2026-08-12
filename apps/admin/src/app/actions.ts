"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

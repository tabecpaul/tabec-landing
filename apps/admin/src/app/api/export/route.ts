import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function csvCell(value: unknown): string {
  const str = String(value ?? "").replace(/\r?\n/g, " ");
  return `"${str.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const status = request.nextUrl.searchParams.get("status") ?? "";

  let query = supabaseAdmin
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }
  if (q) {
    query = query.or(`name.ilike.%${q}%,organization.ilike.%${q}%,email.ilike.%${q}%`);
  }

  const { data, error } = await query;

  if (error || !data) {
    return new Response("Export failed", { status: 500 });
  }

  const headers = [
    "접수일",
    "담당자",
    "교회/기관",
    "연락처",
    "이메일",
    "품목",
    "수량",
    "납기",
    "예산",
    "상태",
    "요청사항",
  ];

  const rows = data.map((row) => [
    row.created_at,
    row.name,
    row.organization,
    row.phone,
    row.email,
    row.category,
    row.quantity,
    row.deadline ?? "",
    row.budget ?? "",
    row.status,
    row.message ?? "",
  ]);

  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const bom = "﻿";

  return new Response(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="quote_requests_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

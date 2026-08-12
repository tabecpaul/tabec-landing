import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";
import SignOutButton from "@/components/SignOutButton";
import StatusSelect from "@/components/StatusSelect";

export const dynamic = "force-dynamic";

type QuoteRequest = {
  id: string;
  created_at: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  category: string;
  quantity: number;
  deadline: string | null;
  budget: string | null;
  file_note: string | null;
  message: string | null;
  status: string;
};

const STATUS_OPTIONS = [
  { value: "", label: "전체 상태" },
  { value: "new", label: "신규" },
  { value: "in_progress", label: "처리중" },
  { value: "done", label: "완료" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  const exportHref = `/api/export?${new URLSearchParams({ q, status }).toString()}`;

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">견적 요청 목록</h1>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <span>{user?.email}</span>
          <SignOutButton />
        </div>
      </div>

      <form className="mb-4 flex flex-wrap items-center gap-2" action="/">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="담당자·교회명·이메일 검색"
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded border border-zinc-300 px-3 py-2 text-sm"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
        >
          검색
        </button>
        <a
          href={exportHref}
          className="ml-auto rounded border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          CSV 다운로드
        </a>
      </form>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          목록을 불러오지 못했습니다: {error.message}
        </p>
      )}

      {!error && data && data.length === 0 && (
        <p className="text-zinc-500">조건에 맞는 견적 요청이 없습니다.</p>
      )}

      {!error && data && data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-100 text-zinc-600">
              <tr>
                <th className="px-4 py-3">상태</th>
                <th className="px-4 py-3">접수일</th>
                <th className="px-4 py-3">담당자</th>
                <th className="px-4 py-3">교회/기관</th>
                <th className="px-4 py-3">연락처</th>
                <th className="px-4 py-3">이메일</th>
                <th className="px-4 py-3">품목</th>
                <th className="px-4 py-3">수량</th>
                <th className="px-4 py-3">납기</th>
                <th className="px-4 py-3">예산</th>
                <th className="px-4 py-3">요청사항</th>
              </tr>
            </thead>
            <tbody>
              {(data as QuoteRequest[]).map((row) => (
                <tr key={row.id} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-3">
                    <StatusSelect id={row.id} status={row.status} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                    {new Date(row.created_at).toLocaleString("ko-KR")}
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{row.name}</td>
                  <td className="px-4 py-3">{row.organization}</td>
                  <td className="px-4 py-3">{row.phone}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">{row.quantity.toLocaleString()}개</td>
                  <td className="px-4 py-3">{row.deadline ?? "미정"}</td>
                  <td className="px-4 py-3">{row.budget ?? "미정"}</td>
                  <td className="max-w-xs truncate px-4 py-3">{row.message ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

"use client";

import { useTransition } from "react";
import { updateQuoteStatus } from "@/app/actions";

const STATUS_LABELS: Record<string, string> = {
  new: "신규",
  in_progress: "처리중",
  done: "완료",
};

const STATUS_CLASSES: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  done: "bg-green-100 text-green-700",
};

export default function StatusSelect({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateQuoteStatus(id, e.target.value))}
      className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${STATUS_CLASSES[status] ?? "bg-zinc-100 text-zinc-700"} disabled:opacity-50`}
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

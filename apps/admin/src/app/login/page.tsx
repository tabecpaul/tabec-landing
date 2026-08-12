"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

type Mode = "sign-in" | "forgot-password";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    router.replace("/");
    router.refresh();
  }

  async function handleForgotPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setNotice("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError("메일 발송에 실패했습니다: " + error.message);
      return;
    }

    setNotice("입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.");
  }

  if (mode === "forgot-password") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <form
          onSubmit={handleForgotPassword}
          className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-8 shadow-sm"
        >
          <h1 className="mb-6 text-xl font-bold text-zinc-900">비밀번호 재설정</h1>
          <div className="mb-6">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
              이메일
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          {notice && <p className="mb-4 text-sm text-green-600">{notice}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-zinc-900 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "발송 중..." : "재설정 링크 받기"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("sign-in");
              setError("");
              setNotice("");
            }}
            className="mt-4 w-full text-center text-sm text-zinc-500 hover:text-zinc-900"
          >
            로그인으로 돌아가기
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-xl font-bold text-zinc-900">타베크 Admin 로그인</h1>
        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-700">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setMode("forgot-password");
            setError("");
            setNotice("");
          }}
          className="mb-6 text-xs text-zinc-500 hover:text-zinc-900"
        >
          비밀번호를 잊으셨나요?
        </button>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-zinc-900 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </main>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const org = data.get("org") as string;
    const phone = data.get("phone") as string;
    const email = data.get("email") as string;
    const category = data.get("category") as string;
    const qty = data.get("qty") as string;
    const deadline = data.get("deadline") as string;
    const budget = data.get("budget") as string;
    const filenote = data.get("filenote") as string;
    const message = data.get("message") as string;

    const { error } = await supabase.from("quote_requests").insert({
      name,
      organization: org,
      phone,
      email,
      category,
      quantity: Number(qty),
      deadline: deadline || null,
      budget: budget || null,
      file_note: filenote || null,
      message: message || null,
      privacy_consent: true,
    });

    if (error) {
      setStatus("error");
      setErrorMessage("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주시거나, 아래 메일 앱으로 직접 보내주세요.");
      return;
    }

    const subject = encodeURIComponent(`[견적요청] ${org} - ${category}`);
    const body = encodeURIComponent(
      `담당자 성함: ${name}
교회/기관명: ${org}
연락처: ${phone}
이메일: ${email}
희망 제작 품목: ${category}
희망 수량: ${qty}개
희망 납기일: ${deadline || "미정"}
예산 범위: ${budget || "미정"}
디자인 파일 안내: ${filenote || "없음"}

[요청사항]
${message}`
    );

    form.reset();
    setStatus("idle");
    window.location.href = `mailto:tabec@naver.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label htmlFor="name">담당자 성함 *</label>
          <input type="text" id="name" name="name" required placeholder="홍길동" />
        </div>
        <div>
          <label htmlFor="org">교회 / 기관명 *</label>
          <input type="text" id="org" name="org" required placeholder="○○교회 / ○○노회" />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="phone">연락처 *</label>
          <input type="tel" id="phone" name="phone" required placeholder="010-0000-0000" />
        </div>
        <div>
          <label htmlFor="email">이메일 *</label>
          <input type="email" id="email" name="email" required placeholder="example@email.com" />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="category">희망 제작 품목</label>
          <select id="category" name="category" defaultValue="나무 십자가">
            <option>나무 십자가</option>
            <option>레진 십자가</option>
            <option>조각상 / 예배당</option>
            <option>성찬 컵 / 전병</option>
            <option>말씀장식</option>
            <option>기타 (직접 입력)</option>
          </select>
        </div>
        <div>
          <label htmlFor="qty">희망 수량 (1,000개 이상) *</label>
          <input type="number" id="qty" name="qty" min={1000} required placeholder="예: 1500" />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="deadline">희망 납기일</label>
          <input type="date" id="deadline" name="deadline" />
        </div>
        <div>
          <label htmlFor="budget">예산 범위</label>
          <input type="text" id="budget" name="budget" placeholder="예: 1,000만원 내외" />
        </div>
      </div>
      <div className="form-row full">
        <div>
          <label htmlFor="filenote">디자인 파일 안내</label>
          <input
            type="text"
            id="filenote"
            name="filenote"
            placeholder="첨부 파일명 또는 시안 설명 (전송 시 회신 이메일에 파일을 첨부해 주세요)"
          />
        </div>
      </div>
      <div className="form-row full">
        <div>
          <label htmlFor="message">요청사항</label>
          <textarea
            id="message"
            name="message"
            placeholder="디자인 컨셉, 문구, 로고 사용 여부 등 자유롭게 작성해 주세요."
          />
        </div>
      </div>
      <div className="privacy-consent">
        <p className="privacy-consent-title">개인정보 수집 및 이용 동의</p>
        <ul>
          <li>수집 항목: 담당자 성함, 연락처, 이메일, 교회/기관명</li>
          <li>수집 목적: 맞춤 제작 견적 상담 및 안내</li>
          <li>보유 및 이용 기간: 상담 완료일로부터 1년 (관계 법령에 따라 보존이 필요한 경우 해당 기간까지)</li>
        </ul>
        <p>귀하는 개인정보 수집·이용에 동의하지 않을 권리가 있으며, 동의를 거부할 경우 견적 상담이 제한될 수 있습니다.</p>
        <label className="privacy-consent-check">
          <input type="checkbox" name="privacyConsent" required />
          위 개인정보 수집 및 이용에 동의합니다. (필수)
        </label>
      </div>
      {status === "error" && <p className="form-error">{errorMessage}</p>}
      <button type="submit" className="submit-btn" disabled={status === "submitting"}>
        {status === "submitting" ? "전송 중..." : "견적 요청 보내기"}
      </button>
    </form>
  );
}

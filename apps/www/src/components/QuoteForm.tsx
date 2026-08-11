"use client";

import { FormEvent } from "react";

export default function QuoteForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
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
          <select id="category" name="category" defaultValue="십자가">
            <option>십자가</option>
            <option>컵 / 머그</option>
            <option>기념접시</option>
            <option>미니어처 예배당</option>
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
      <button type="submit" className="submit-btn">
        견적 요청 이메일 보내기
      </button>
    </form>
  );
}

-- 타베크 견적 요청 테이블
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  organization text not null,
  phone text not null,
  email text not null,
  category text not null,
  quantity integer not null check (quantity >= 1000),
  deadline date,
  budget text,
  file_note text,
  message text,
  status text not null default 'new'
);

alter table public.quote_requests enable row level security;

-- 홈페이지 방문자(anon)는 견적 요청을 등록(insert)만 가능, 조회/수정/삭제는 불가
create policy "Anyone can submit a quote request"
  on public.quote_requests
  for insert
  to anon
  with check (true);

-- service_role(관리자 백엔드)은 RLS를 우회하므로 별도 정책 불필요

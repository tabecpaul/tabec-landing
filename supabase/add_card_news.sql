-- 카드뉴스(인스타그램용 1080x1350) 검토/발행 시스템
-- card_news: 블로그 글 하나에 대응하는 카드뉴스 "묶음"
-- card_news_slides: 묶음에 속한 개별 카드(슬라이드). 카드마다 html이 통째로 새로 생성됨.

create table if not exists public.card_news (
  id uuid primary key default gen_random_uuid(),
  blog_slug text not null,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists card_news_blog_slug_idx on public.card_news (blog_slug);

create table if not exists public.card_news_slides (
  id uuid primary key default gen_random_uuid(),
  card_news_id uuid not null references public.card_news (id) on delete cascade,
  position integer not null default 0,
  html text not null,
  status text not null default 'draft' check (status in ('draft', 'approved')),
  image_path text,
  image_url text,
  rendered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists card_news_slides_deck_idx on public.card_news_slides (card_news_id, position);

alter table public.card_news enable row level security;
alter table public.card_news_slides enable row level security;

-- 홈페이지(anon)는 발행(published)된 카드뉴스 묶음과, 그 안에서 승인(approved)된 카드만 읽을 수 있음
create policy "Public can read published card news"
  on public.card_news
  for select
  to anon
  using (status = 'published');

create policy "Public can read approved slides of published card news"
  on public.card_news_slides
  for select
  to anon
  using (
    status = 'approved'
    and exists (
      select 1
      from public.card_news
      where card_news.id = card_news_slides.card_news_id
        and card_news.status = 'published'
    )
  );

-- service_role(관리자 백엔드)은 RLS를 우회하므로 별도 정책 불필요

-- 카드 이미지를 저장할 공개 버킷
insert into storage.buckets (id, name, public)
values ('card-news', 'card-news', true)
on conflict (id) do nothing;

-- 로그인한 관리자(admin 앱)가 브라우저에서 직접 이미지를 업로드할 수 있도록 허용
create policy "Authenticated users can upload card news images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'card-news');

create policy "Authenticated users can update card news images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'card-news');

create policy "Authenticated users can delete card news images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'card-news');

alter table public.quote_requests
  add column if not exists privacy_consent boolean not null default false;

alter table public.quote_requests
  add constraint privacy_consent_required check (privacy_consent = true);

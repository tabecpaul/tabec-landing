alter table public.quote_requests
  add constraint status_valid check (status in ('new', 'in_progress', 'done'));

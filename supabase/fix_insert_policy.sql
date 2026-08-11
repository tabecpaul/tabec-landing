drop policy if exists "Anyone can submit a quote request" on public.quote_requests;

create policy "Anyone can submit a quote request"
  on public.quote_requests
  for insert
  to public
  with check (true);

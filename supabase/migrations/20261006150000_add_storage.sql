-- Create storage bucket for product thumbnails
insert into storage.buckets (id, name, public)
values ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

-- Allow public read access to thumbnails
create policy "Thumbnails are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'thumbnails');

-- Allow admins (service role) to insert/update/delete thumbnails
-- We don't add authenticated/anon policies because uploads will be done via server API with service role.

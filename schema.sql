-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profile Table
create table public.profile (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  role text not null,
  bio text,
  hero_image_url text,
  cv_url text,
  email text,
  phone text,
  location text,
  github_link text,
  linkedin_link text,
  twitter_link text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Skills Table
create table public.skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  percentage integer not null check (percentage >= 0 and percentage <= 100),
  icon text, -- Lucide icon name
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Services Table
create table public.services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  icon text, -- Lucide icon name
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Projects Table
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null,
  image_url text,
  description text,
  technologies text[], -- Array of strings
  demo_link text,
  repo_link text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Testimonials Table
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Messages Table (Contact Form)
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
alter table public.profile enable row level security;
alter table public.skills enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.messages enable row level security;

-- Policies: Public Read Access (Everyone can see content)
create policy "Public items are visible to everyone" on public.profile for select using (true);
create policy "Public items are visible to everyone" on public.skills for select using (true);
create policy "Public items are visible to everyone" on public.services for select using (true);
create policy "Public items are visible to everyone" on public.projects for select using (true);
create policy "Public items are visible to everyone" on public.testimonials for select using (true);

-- Messages are NOT public (Only admin can see)
create policy "Admins can view messages" on public.messages for select using (auth.role() = 'authenticated');

-- Policies: Authenticated Insert/Update/Delete (Only Admin)
create policy "Admins can insert profile" on public.profile for insert with check (auth.role() = 'authenticated');
create policy "Admins can update profile" on public.profile for update using (auth.role() = 'authenticated');

create policy "Admins can insert skills" on public.skills for insert with check (auth.role() = 'authenticated');
create policy "Admins can update skills" on public.skills for update using (auth.role() = 'authenticated');
create policy "Admins can delete skills" on public.skills for delete using (auth.role() = 'authenticated');

create policy "Admins can insert services" on public.services for insert with check (auth.role() = 'authenticated');
create policy "Admins can update services" on public.services for update using (auth.role() = 'authenticated');
create policy "Admins can delete services" on public.services for delete using (auth.role() = 'authenticated');

create policy "Admins can insert projects" on public.projects for insert with check (auth.role() = 'authenticated');
create policy "Admins can update projects" on public.projects for update using (auth.role() = 'authenticated');
create policy "Admins can delete projects" on public.projects for delete using (auth.role() = 'authenticated');

create policy "Admins can insert testimonials" on public.testimonials for insert with check (auth.role() = 'authenticated');
create policy "Admins can update testimonials" on public.testimonials for update using (auth.role() = 'authenticated');
create policy "Admins can delete testimonials" on public.testimonials for delete using (auth.role() = 'authenticated');

-- Anyone can insert messages (Contact Form)
create policy "Everyone can insert messages" on public.messages for insert with check (true);

-- Insert Default Profile Data (Placeholder)
insert into public.profile (full_name, role, bio, email, location)
values ('iqooow', 'Full-Stack Developer', 'I build accessible, pixel-perfect, secure, and performant web applications.', 'hello@iqooow.dev', 'Tashkent, Uzbekistan');

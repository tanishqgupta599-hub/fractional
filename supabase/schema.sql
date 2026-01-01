-- Users are managed by Supabase Auth; profiles stores extra fields

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  city text,
  investor_type text check (investor_type in ('Retail','HNI','Institutional')),
  kyc_status text default 'Pending' check (kyc_status in ('Pending','Approved','Rejected')),
  role text default 'user' check (role in ('user','admin')),
  created_at timestamp with time zone default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  city text,
  budget_range text,
  message text,
  status text default 'New' check (status in ('New','Contacted','Converted')),
  created_at timestamp with time zone default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  description text,
  expected_roi text,
  timeline text,
  risk_disclosure text,
  status text check (status in ('Open','Fully Sold','Coming Soon')) not null,
  price_per_fraction numeric,
  total_units integer,
  units_available integer,
  created_at timestamp with time zone default now()
);

create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  property_id uuid references public.properties(id),
  property_name text,
  units_bought integer,
  amount_invested numeric,
  status text default 'Active',
  created_at timestamp with time zone default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text, -- Allotment, Agreement, Receipt
  title text,
  file_path text, -- Supabase Storage path
  created_at timestamp with time zone default now()
);

create table if not exists public.kyc_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  status text default 'Pending' check (status in ('Pending','Approved','Rejected')),
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id),
  action text not null,
  target text,
  created_at timestamp with time zone default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.investments enable row level security;
alter table public.documents enable row level security;
alter table public.kyc_requests enable row level security;

create policy "Users can read own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Admins can read all profiles"
on public.profiles
for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "Users update own profile"
on public.profiles
for update
using (auth.uid() = id);

create policy "Users read own investments"
on public.investments
for select
using (auth.uid() = user_id);

create policy "Users read own documents"
on public.documents
for select
using (auth.uid() = user_id);

create policy "Users read own kyc"
on public.kyc_requests
for select
using (auth.uid() = user_id);


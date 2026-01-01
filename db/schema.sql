-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE (Public user data)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  email text,
  phone text,
  city text,
  investor_type text,
  role text default 'user',
  kyc_status text default 'Pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROPERTIES TABLE
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  location text not null,
  description text,
  type text not null, -- e.g. 'Residential Project', 'Industrial Land'
  category text not null, -- 'Residential', 'Commercial', 'Industrial'
  price_per_fraction numeric not null,
  total_valuation numeric not null,
  target_irr numeric not null, -- stored as percentage e.g. 18.5
  risk text default 'Medium', -- 'Low', 'Medium', 'High'
  funding_status numeric default 0, -- percentage 0-100
  status text default 'Upcoming', -- 'Open', 'Upcoming', 'Closed', 'Sold Out'
  image_url text,
  highlights text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- INVESTMENTS TABLE
create table public.investments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  property_id uuid references public.properties(id) not null,
  amount numeric not null,
  fractions numeric not null,
  status text default 'pending', -- 'pending', 'completed', 'cancelled'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LEADS TABLE
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  city text,
  budget_range text,
  message text,
  status text default 'New', -- 'New', 'Contacted', 'Converted', 'Rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS)

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.investments enable row level security;
alter table public.leads enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Properties Policies
create policy "Properties are viewable by everyone"
  on properties for select
  using ( true );

create policy "Only admins can insert/update properties"
  on properties for all
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Investments Policies
create policy "Users can view own investments"
  on investments for select
  using ( auth.uid() = user_id );

create policy "Users can create investments"
  on investments for insert
  with check ( auth.uid() = user_id );

-- Leads Policies
create policy "Anyone can create leads"
  on leads for insert
  with check ( true );

create policy "Only admins can view leads"
  on leads for select
  using ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- SEED DATA (Properties)
insert into public.properties (slug, name, location, type, category, price_per_fraction, total_valuation, target_irr, funding_status, status, image_url, highlights, description)
values
(
  'Otariya',
  'Otariya - Phase 1',
  'TP 3A , Dholera, Gujarat',
  'Residential Project',
  'Residential',
  5000,
  4000000,
  100,
  45,
  'Open',
  'https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Residential Zone', 'Secure Title', 'Growth Corridor', 'Proximity to Infrastructure'],
  'Residential project in the Otariya locality of Dholera with strong appreciation potential and secure title.'
),
(
  'bavliyari-phase-1',
  'Bavliyari Investment Zone',
  'Bavliyari, Gujarat',
  'Industrial Land',
  'Industrial',
  10000,
  8500000,
  100,
  20,
  'Upcoming',
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop',
  ARRAY['Industrial Zone', 'Logistics Hub', 'High Demand', 'Strategic Location'],
  'Industrial Land opportunity near key logistic corridors.'
),
(
  'panchi-greens',
  'Panchi Greens',
  'Panchi, Gujarat',
  'Ultra Premium Plotting',
  'Residential',
  2500,
  2500000,
  93,
  10,
  'Upcoming',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
  ARRAY['Premium Location', 'High Appreciation', 'Secure Title', 'Green Surroundings'],
  'Ultra Premium Plotting opportunity in a rapidly developing area.'
),
(
  'hebatpur-hac',
  'Hebatpur HAC',
  'Hebatpur, Ahmedabad',
  'Premium Plotting',
  'Residential',
  25000,
  25000000,
  106,
  5,
  'Upcoming',
  'https://images.unsplash.com/photo-1626178793926-22b28830aa30?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Prime City Location', 'Established Neighborhood', 'High Value Asset', 'Excellent Connectivity'],
  'Premium Plotting in one of Ahmedabad''s most sought-after locations.'
),
(
  'zhanki-reserves',
  'Zhanki Reserves',
  'Zhanki, Gujarat',
  'Future Development',
  'Commercial',
  7500,
  6000000,
  88,
  15,
  'Upcoming',
  'https://images.unsplash.com/photo-1513584685908-2274653dbf29?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Strategic Investment', 'Long-term Growth', 'Emerging Zone', 'Low Entry Point'],
  'Future Development zone with massive long-term potential.'
),
(
  'dholera-sir-phase-1',
  'Dholera SIR - Phase 1',
  'TP 2 West, Dholera Special Investment Region, Gujarat',
  'Commercial Zone',
  'Commercial',
  5000,
  4000000,
  100,
  65,
  'Upcoming',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Adjacent to 250m wide expressway', '2km from Tata Semiconductor Fab plant', 'International Airport operational by 2026', 'Complete underground infrastructure ready'],
  'A prime resedential land parcel located in the heart of India''s first Platinum Rated Green Field Smart City.'
);

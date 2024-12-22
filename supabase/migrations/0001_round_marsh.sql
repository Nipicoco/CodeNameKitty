/*
  # Initial Schema Setup

  1. Tables
    - profiles: User profiles with roles
    - invite_codes: Invitation system
    - licenses: License management

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Enable RLS
alter table auth.users enable row level security;

-- Create tables
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.invite_codes (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  used boolean default false,
  created_by uuid references auth.users(id),
  used_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.licenses (
  id uuid default uuid_generate_v4() primary key,
  hwid text,
  username text references profiles(username),
  expires_at timestamp with time zone not null,
  status text default 'active' check (status in ('active', 'expired')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on tables
alter table public.profiles enable row level security;
alter table public.invite_codes enable row level security;
alter table public.licenses enable row level security;

-- Create RLS policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Admins can view all invite codes"
  on invite_codes for select
  using ( exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  ));

create policy "Users can view their own invite codes"
  on invite_codes for select
  using ( created_by = auth.uid() or used_by = auth.uid() );

create policy "Admins can create invite codes"
  on invite_codes for insert
  with check ( exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  ));

create policy "Users can view their licenses"
  on licenses for select
  using (
    username = (
      select username from profiles
      where profiles.id = auth.uid()
    )
  );

create policy "Admins can view all licenses"
  on licenses for select
  using ( exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  ));
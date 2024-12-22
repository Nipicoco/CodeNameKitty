/*
  # Create Initial Admin User

  1. Changes
    - Creates initial admin user with specified email and username
    - Sets up admin role and permissions
*/

-- Create the initial admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(),
  'pholios@icloud.com',
  crypt('temppass123', gen_salt('bf')), -- Temporary password that needs to be changed
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"username":"Json"}',
  now(),
  now(),
  'authenticated'
);

-- Create admin profile
INSERT INTO public.profiles (
  id,
  username,
  role,
  created_at
)
SELECT 
  id,
  'Json',
  'admin',
  now()
FROM auth.users
WHERE email = 'pholios@icloud.com';
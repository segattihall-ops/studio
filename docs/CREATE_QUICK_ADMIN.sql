-- =============================================
-- CREATE QUICK ADMIN USER
-- =============================================
-- This script creates a test admin user quickly
-- CHANGE THE EMAIL AND PASSWORD before running!
-- =============================================

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Create user in auth.users
  -- ⚠️ CHANGE THESE VALUES:
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@masseurmatch.com',  -- ⚠️ MUDE ESTE EMAIL
    crypt('Admin123!', gen_salt('bf')),  -- ⚠️ MUDE ESTA SENHA
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW(),
    '',
    ''
  )
  RETURNING id INTO new_user_id;

  -- Create admin record
  INSERT INTO public.admins (user_id, role)
  VALUES (new_user_id, 'superadmin');

  RAISE NOTICE '✅ Admin created successfully!';
  RAISE NOTICE 'Email: admin@masseurmatch.com';
  RAISE NOTICE 'Password: Admin123!';
  RAISE NOTICE 'User ID: %', new_user_id;

EXCEPTION
  WHEN unique_violation THEN
    RAISE NOTICE '⚠️ User already exists with this email';
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating admin: %', SQLERRM;
END $$;

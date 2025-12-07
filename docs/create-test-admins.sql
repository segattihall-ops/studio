-- Script para criar usuários admin de teste no Supabase
-- Execute este script no Supabase Dashboard > SQL Editor

-- IMPORTANTE: Troque as senhas antes de usar em produção!

-- Primeiro, vamos criar uma função helper para criar usuários com segurança
CREATE OR REPLACE FUNCTION create_user_if_not_exists(
  p_email TEXT,
  p_password TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Verificar se usuário já existe
  SELECT id INTO v_user_id FROM auth.users WHERE email = p_email;

  IF v_user_id IS NULL THEN
    -- Criar novo usuário
    v_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role
    )
    VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      p_email,
      crypt(p_password, gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      'authenticated',
      'authenticated'
    );
  END IF;

  RETURN v_user_id;
END;
$$;

-- 1. Criar usuário SUPERADMIN
-- Email: superadmin@example.com
-- Senha: SuperAdmin123!
DO $$
DECLARE
  v_superadmin_id UUID;
BEGIN
  v_superadmin_id := create_user_if_not_exists('superadmin@example.com', 'SuperAdmin123!');

  -- Adicionar/atualizar na tabela admins (created_by NULL para o primeiro admin)
  INSERT INTO public.admins (user_id, role, permissions, created_by)
  VALUES (v_superadmin_id, 'superadmin', '{}'::jsonb, NULL)
  ON CONFLICT (user_id) DO UPDATE SET role = 'superadmin';

  RAISE NOTICE 'Superadmin criado com ID: %', v_superadmin_id;
END $$;

-- 2. Criar usuário MANAGER
-- Email: manager@example.com
-- Senha: Manager123!
DO $$
DECLARE
  v_manager_id UUID;
  v_superadmin_id UUID;
BEGIN
  -- Buscar ID do superadmin
  SELECT id INTO v_superadmin_id FROM auth.users WHERE email = 'superadmin@example.com';

  v_manager_id := create_user_if_not_exists('manager@example.com', 'Manager123!');

  -- Adicionar/atualizar na tabela admins
  INSERT INTO public.admins (user_id, role, permissions, created_by)
  VALUES (v_manager_id, 'manager', '{}'::jsonb, v_superadmin_id)
  ON CONFLICT (user_id) DO UPDATE SET role = 'manager';

  RAISE NOTICE 'Manager criado com ID: %', v_manager_id;
END $$;

-- 3. Criar usuário VIEWER
-- Email: viewer@example.com
-- Senha: Viewer123!
DO $$
DECLARE
  v_viewer_id UUID;
  v_superadmin_id UUID;
BEGIN
  -- Buscar ID do superadmin
  SELECT id INTO v_superadmin_id FROM auth.users WHERE email = 'superadmin@example.com';

  v_viewer_id := create_user_if_not_exists('viewer@example.com', 'Viewer123!');

  -- Adicionar/atualizar na tabela admins
  INSERT INTO public.admins (user_id, role, permissions, created_by)
  VALUES (v_viewer_id, 'viewer', '{}'::jsonb, v_superadmin_id)
  ON CONFLICT (user_id) DO UPDATE SET role = 'viewer';

  RAISE NOTICE 'Viewer criado com ID: %', v_viewer_id;
END $$;

-- Verificar usuários criados
SELECT
  u.email,
  a.role,
  u.created_at,
  u.email_confirmed_at IS NOT NULL as email_confirmed
FROM auth.users u
LEFT JOIN public.admins a ON a.user_id = u.id
WHERE u.email IN ('superadmin@example.com', 'manager@example.com', 'viewer@example.com')
ORDER BY
  CASE a.role
    WHEN 'superadmin' THEN 1
    WHEN 'manager' THEN 2
    WHEN 'viewer' THEN 3
  END;

-- (Opcional) Remover a função helper após uso
-- DROP FUNCTION IF EXISTS create_user_if_not_exists(TEXT, TEXT);

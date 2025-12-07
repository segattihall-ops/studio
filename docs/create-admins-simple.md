# Criar Usuários Admin - Método Simplificado

Como inserir diretamente na tabela `auth.users` pode causar problemas de permissão, vamos usar o painel do Supabase para criar os usuários.

## Passo 1: Criar Usuários no Painel

1. Acesse **Supabase Dashboard** → Seu projeto
2. Vá em **Authentication** → **Users**
3. Clique em **Add User** → **Create new user**

### Criar 3 usuários:

#### 1️⃣ Superadmin
- **Email**: `superadmin@example.com`
- **Password**: `SuperAdmin123!`
- ✅ Marque: **Auto Confirm User**
- Clique em **Create User**
- **Copie o UUID** do usuário criado

#### 2️⃣ Manager
- **Email**: `manager@example.com`
- **Password**: `Manager123!`
- ✅ Marque: **Auto Confirm User**
- Clique em **Create User**
- **Copie o UUID** do usuário criado

#### 3️⃣ Viewer
- **Email**: `viewer@example.com`
- **Password**: `Viewer123!`
- ✅ Marque: **Auto Confirm User**
- Clique em **Create User**
- **Copie o UUID** do usuário criado

---

## Passo 2: Adicionar na Tabela `admins`

Agora execute este script SQL no **SQL Editor** substituindo os UUIDs:

```sql
-- Adicionar os usuários na tabela admins
-- IMPORTANTE: Substitua os UUIDs pelos valores reais copiados acima!

-- 1. Superadmin (substitua SUPERADMIN_UUID)
INSERT INTO public.admins (user_id, role, permissions, created_by)
VALUES ('SUPERADMIN_UUID', 'superadmin', '{}'::jsonb, NULL)
ON CONFLICT (user_id) DO UPDATE SET role = 'superadmin';

-- 2. Manager (substitua MANAGER_UUID e SUPERADMIN_UUID)
INSERT INTO public.admins (user_id, role, permissions, created_by)
SELECT 'MANAGER_UUID', 'manager', '{}'::jsonb, id
FROM public.admins
WHERE role = 'superadmin'
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET role = 'manager';

-- 3. Viewer (substitua VIEWER_UUID e SUPERADMIN_UUID)
INSERT INTO public.admins (user_id, role, permissions, created_by)
SELECT 'VIEWER_UUID', 'viewer', '{}'::jsonb, id
FROM public.admins
WHERE role = 'superadmin'
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET role = 'viewer';

-- Verificar usuários criados
SELECT
  u.id,
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
```

---

## Exemplo com UUIDs reais:

Se você copiou estes UUIDs:
- Superadmin: `123e4567-e89b-12d3-a456-426614174000`
- Manager: `223e4567-e89b-12d3-a456-426614174001`
- Viewer: `323e4567-e89b-12d3-a456-426614174002`

O script ficaria:

```sql
-- 1. Superadmin
INSERT INTO public.admins (user_id, role, permissions, created_by)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'superadmin', '{}'::jsonb, NULL)
ON CONFLICT (user_id) DO UPDATE SET role = 'superadmin';

-- 2. Manager
INSERT INTO public.admins (user_id, role, permissions, created_by)
SELECT '223e4567-e89b-12d3-a456-426614174001', 'manager', '{}'::jsonb, id
FROM public.admins
WHERE role = 'superadmin'
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET role = 'manager';

-- 3. Viewer
INSERT INTO public.admins (user_id, role, permissions, created_by)
SELECT '323e4567-e89b-12d3-a456-426614174002', 'viewer', '{}'::jsonb, id
FROM public.admins
WHERE role = 'superadmin'
LIMIT 1
ON CONFLICT (user_id) DO UPDATE SET role = 'viewer';
```

---

## Testar Login

Acesse: `http://localhost:9002/login`

Teste com cada usuário:
- ✅ `superadmin@example.com` / `SuperAdmin123!`
- ✅ `manager@example.com` / `Manager123!`
- ✅ `viewer@example.com` / `Viewer123!`

---

## ⚠️ Importante

Em produção, **troque essas senhas** imediatamente após o primeiro login!

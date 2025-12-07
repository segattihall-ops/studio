# Configuração de Usuários Admin

Este guia explica como criar os três tipos de usuários admin no sistema.

## Tipos de Usuários (Roles)

### 🔴 Superadmin
- **Permissões**: Acesso total ao sistema
- Pode criar, editar e deletar outros admins
- Pode aprovar/rejeitar terapeutas
- Pode gerenciar usuários
- Acesso a todas as funcionalidades

### 🔵 Manager
- **Permissões**: Gerenciamento operacional
- Pode aprovar/rejeitar terapeutas
- Pode atualizar e deletar usuários
- Visualizar logs e pagamentos
- **NÃO** pode criar outros admins

### ⚪ Viewer
- **Permissões**: Apenas visualização
- Pode visualizar usuários
- Pode visualizar terapeutas
- Pode visualizar pagamentos
- Pode visualizar logs
- **NÃO** pode fazer modificações no sistema

---

## Método 1: Via SQL (Recomendado)

1. Acesse o **Supabase Dashboard**: https://app.supabase.com
2. Vá para seu projeto
3. Clique em **SQL Editor** no menu lateral
4. Cole o conteúdo do arquivo `create-test-admins.sql`
5. Clique em **Run** (ou pressione `Ctrl+Enter`)

### Credenciais padrão criadas:

| Role | Email | Senha |
|------|-------|-------|
| Superadmin | superadmin@example.com | SuperAdmin123! |
| Manager | manager@example.com | Manager123! |
| Viewer | viewer@example.com | Viewer123! |

⚠️ **IMPORTANTE**: Troque essas senhas após o primeiro login em produção!

---

## Método 2: Via Supabase Dashboard (Manual)

### Passo 1: Criar Usuários no Auth

1. Vá para **Authentication** > **Users**
2. Clique em **Add User**
3. Para cada usuário:
   - Email: `superadmin@example.com`, `manager@example.com`, `viewer@example.com`
   - Password: Escolha uma senha segura
   - Auto Confirm User: ✅ Marcado

### Passo 2: Adicionar na Tabela `admins`

1. Vá para **Table Editor** > `admins`
2. Clique em **Insert** > **Insert row**
3. Para cada usuário criado:
   - `user_id`: Selecione o UUID do usuário (copie da tabela auth.users)
   - `role`: Escolha `superadmin`, `manager` ou `viewer`
   - `permissions`: `{}`
   - `created_by`: UUID do superadmin (ou deixe NULL na primeira vez)

---

## Método 3: Criar Função RPC (Avançado)

Você pode criar uma função SQL que permita criar admins via API:

```sql
CREATE OR REPLACE FUNCTION create_admin_user(
  p_email TEXT,
  p_password TEXT,
  p_role TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Validar role
  IF p_role NOT IN ('superadmin', 'manager', 'viewer') THEN
    RAISE EXCEPTION 'Invalid role. Must be superadmin, manager, or viewer';
  END IF;

  -- Criar usuário no auth
  INSERT INTO auth.users (
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
    '00000000-0000-0000-0000-000000000000',
    p_email,
    crypt(p_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated'
  )
  RETURNING id INTO v_user_id;

  -- Adicionar na tabela admins
  INSERT INTO public.admins (user_id, role, permissions, created_by)
  VALUES (
    v_user_id,
    p_role,
    '{}'::jsonb,
    auth.uid()
  );

  RETURN json_build_object(
    'success', true,
    'user_id', v_user_id,
    'email', p_email,
    'role', p_role
  );
EXCEPTION
  WHEN unique_violation THEN
    RETURN json_build_object('success', false, 'error', 'User already exists');
  WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;
```

Depois, você pode chamar via API:

```typescript
const { data, error } = await supabase.rpc('create_admin_user', {
  p_email: 'newadmin@example.com',
  p_password: 'SecurePassword123!',
  p_role: 'manager'
});
```

---

## Testar Login

Após criar os usuários, teste o login em:
```
http://localhost:9002/login
```

Use as credenciais criadas para verificar se cada tipo de usuário tem as permissões corretas.

---

## Solução de Problemas

### Erro: "User is not an admin"
- Verifique se o usuário foi adicionado na tabela `public.admins`
- Confirme que o `user_id` corresponde ao ID do usuário em `auth.users`

### Erro: "Invalid admin role"
- Verifique se o role está correto: `superadmin`, `manager` ou `viewer`
- Roles são case-sensitive!

### Não consegue fazer login
- Verifique se `email_confirmed_at` está preenchido em `auth.users`
- Confirme que a senha está correta
- Verifique os logs do console do navegador

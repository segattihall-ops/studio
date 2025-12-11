-- =====================================================
-- CLEANUP SCRIPT - DROP ALL TABLES
-- =====================================================
-- ATENÇÃO: Este script vai DELETAR todas as tabelas existentes!
-- Use apenas se quiser começar do zero.
-- =====================================================

-- Desabilitar RLS temporariamente
ALTER TABLE IF EXISTS public.audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.profile_edits DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.therapist_edits DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.legal_acceptances DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.verification_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.therapists DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop functions first (dependências)
DROP FUNCTION IF EXISTS public.approve_therapist(uuid, uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.reject_therapist(uuid, uuid, text) CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at() CASCADE;

-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_therapists_updated_at ON public.therapists;

-- Drop policies (se existirem)
DROP POLICY IF EXISTS "Service role has full access" ON public.profiles;
DROP POLICY IF EXISTS "Service role has full access" ON public.admins;
DROP POLICY IF EXISTS "Service role has full access" ON public.therapists;
DROP POLICY IF EXISTS "Service role has full access" ON public.verification_data;
DROP POLICY IF EXISTS "Service role has full access" ON public.payments;
DROP POLICY IF EXISTS "Service role has full access" ON public.subscriptions;
DROP POLICY IF EXISTS "Service role has full access" ON public.applications;
DROP POLICY IF EXISTS "Service role has full access" ON public.legal_acceptances;
DROP POLICY IF EXISTS "Service role has full access" ON public.therapist_edits;
DROP POLICY IF EXISTS "Service role has full access" ON public.profile_edits;
DROP POLICY IF EXISTS "Service role has full access" ON public.audit_logs;

-- Drop tables in reverse order (respeitando foreign keys)
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.profile_edits CASCADE;
DROP TABLE IF EXISTS public.therapist_edits CASCADE;
DROP TABLE IF EXISTS public.legal_acceptances CASCADE;
DROP TABLE IF EXISTS public.applications CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.verification_data CASCADE;
DROP TABLE IF EXISTS public.therapists CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Confirmar limpeza
SELECT 'Database cleanup completed! All tables dropped.' AS status;

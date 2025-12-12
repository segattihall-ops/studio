-- =============================================
-- MIGRATION: Fix Settings Table Column Name
-- =============================================
-- Issue: Settings table uses 'value' but code expects 'metadata'
-- Solution: Rename column from 'value' to 'metadata'
-- Date: 2025
-- =============================================

-- Check if the column needs to be renamed
DO $$
BEGIN
  -- Check if 'value' column exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'settings'
    AND column_name = 'value'
  ) THEN
    -- Rename 'value' to 'metadata'
    ALTER TABLE public.settings RENAME COLUMN value TO metadata;
    RAISE NOTICE 'Column renamed from value to metadata';
  ELSE
    RAISE NOTICE 'Column already named metadata or table does not exist';
  END IF;
END $$;

-- Ensure metadata has a default value
ALTER TABLE public.settings
  ALTER COLUMN metadata SET DEFAULT '{}'::jsonb;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Migration completed successfully!';
  RAISE NOTICE 'Settings table now uses "metadata" column';
END $$;

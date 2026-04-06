-- Migration: Security Hardening - Hide quiz answers from API
-- Fixes vulnerability where quiz_options.is_correct is exposed via public SELECT policy
-- Solution: Drop public SELECT, add admin-only SELECT, create secure RPC function

-- Step 1: Drop the vulnerable public select policy
DROP POLICY IF EXISTS "quiz_options_select" ON quiz_options;

-- Step 2: Create admin-only select policy
-- Only admins can SELECT quiz_options (including is_correct column)
CREATE POLICY "quiz_options_select_admin" ON quiz_options
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = (SELECT auth.uid()) AND role = 'admin'
    )
  );

-- Step 3: Create secure RPC function to check answer correctness
-- SECURITY DEFINER allows function to bypass RLS and read is_correct
-- But function only returns boolean, never exposes the answer key
CREATE OR REPLACE FUNCTION check_quiz_answer(
  p_selected_option_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_correct BOOLEAN;
BEGIN
  -- Query is_correct for the given option (bypasses RLS via SECURITY DEFINER)
  SELECT is_correct INTO v_is_correct
  FROM quiz_options
  WHERE id = p_selected_option_id;

  -- Return boolean only (COALESCE handles NULL if option doesn't exist)
  RETURN COALESCE(v_is_correct, FALSE);
END;
$$;

-- Step 4: Grant EXECUTE permission to authenticated users
-- This allows logged-in users to call the RPC function
GRANT EXECUTE ON FUNCTION check_quiz_answer TO authenticated;

-- Step 5: Add comment for documentation
COMMENT ON FUNCTION check_quiz_answer IS
  'Securely checks if a quiz option is correct without exposing the answer key. ' ||
  'Returns TRUE if option is correct, FALSE otherwise. ' ||
  'Used by quiz submission flow to calculate scores server-side.';

-- Function to check if email exists in auth.users
-- This runs with SECURITY DEFINER to bypass RLS for auth.users table
CREATE OR REPLACE FUNCTION public.check_email_exists(email_to_check TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  exists_flag BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM auth.users WHERE email = email_to_check
  ) INTO exists_flag;
  RETURN exists_flag;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

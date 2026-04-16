-- Security: Revoke anonymous access to check_email_exists
-- Unauthenticated visitors were able to call this RPC to enumerate registered emails.
-- Server-side signupAction now calls this via service role client instead.
REVOKE EXECUTE ON FUNCTION public.check_email_exists(TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.check_email_exists(TEXT) TO authenticated;

-- Security: Fix lessons RLS — hide content of unpublished courses
-- Old policy USING (TRUE) exposed lesson titles/video URLs for unpublished courses.
DROP POLICY IF EXISTS "Anyone can view lessons" ON lessons;

CREATE POLICY "Anyone can view lessons of published courses"
  ON lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
        AND courses.is_published = TRUE
    )
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

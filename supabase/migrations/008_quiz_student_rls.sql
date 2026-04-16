-- Security: Allow students to read quiz_options for quiz display
--
-- Migration 005 locked quiz_options to admin-only SELECT (to hide is_correct).
-- Students now get empty quiz options and cannot take quizzes at all.
--
-- Fix: Add a student-facing SELECT policy.
-- The application query explicitly selects only (id, question_id, option_text, sort_order),
-- so is_correct is never fetched by student-role clients.
-- The check_quiz_answer() SECURITY DEFINER RPC still bypasses RLS to validate answers.

CREATE POLICY "quiz_options_select_student"
  ON quiz_options FOR SELECT
  TO authenticated
  USING (TRUE);

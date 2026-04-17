-- Migration: Quiz system tables
-- Adds quiz questions, options, attempts, and scores to support per-lesson quizzes.

-- Add is_final_exam flag to lessons
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS is_final_exam BOOLEAN NOT NULL DEFAULT FALSE;

-- quiz_questions: One question belongs to one lesson
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  explanation TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- quiz_options: Multiple choice options per question
CREATE TABLE IF NOT EXISTS quiz_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- quiz_attempts: Each answer a user submits
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_id UUID NOT NULL REFERENCES quiz_options(id) ON DELETE CASCADE,
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ DEFAULT NOW()
);

-- quiz_scores: Final score per user per lesson (upserted after quiz completion)
CREATE TABLE IF NOT EXISTS quiz_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  score_percent INT NOT NULL CHECK (score_percent >= 0 AND score_percent <= 100),
  passed BOOLEAN NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_quiz_questions_lesson_id ON quiz_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_options_question_id ON quiz_options(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_question ON quiz_attempts(user_id, question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_user_lesson ON quiz_scores(user_id, lesson_id);

-- Enable Row Level Security
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- quiz_questions: anyone can read, admins can manage
CREATE POLICY "quiz_questions_select" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "quiz_questions_admin" ON quiz_questions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
);

-- quiz_options: anyone can read, admins can manage
CREATE POLICY "quiz_options_select" ON quiz_options FOR SELECT USING (true);
CREATE POLICY "quiz_options_admin" ON quiz_options FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
);

-- quiz_attempts: users own their data, admins can manage all
CREATE POLICY "quiz_attempts_own_select" ON quiz_attempts FOR SELECT USING (user_id = (SELECT auth.uid()));
CREATE POLICY "quiz_attempts_own_insert" ON quiz_attempts FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "quiz_attempts_admin" ON quiz_attempts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
);

-- quiz_scores: users own their data, admins can manage all
CREATE POLICY "quiz_scores_own_select" ON quiz_scores FOR SELECT USING (user_id = (SELECT auth.uid()));
CREATE POLICY "quiz_scores_own_insert" ON quiz_scores FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));
CREATE POLICY "quiz_scores_own_update" ON quiz_scores FOR UPDATE USING (user_id = (SELECT auth.uid()));
CREATE POLICY "quiz_scores_admin" ON quiz_scores FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = (SELECT auth.uid()) AND role = 'admin')
);

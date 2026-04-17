-- Migration: Performance and integrity fixes

-- D-M2: Prevent duplicate quiz submissions (score inflation vulnerability)
-- Add UNIQUE constraint to quiz_attempts table to enforce one attempt per user per question
ALTER TABLE quiz_attempts ADD CONSTRAINT IF NOT EXISTS unique_user_question UNIQUE(user_id, question_id);

-- D-M3: Add missing index on enrollments.course_id
-- Admin queries filtering by course_id will full-scan without this
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON enrollments(course_id);

-- D-M4: Add missing index on progress.lesson_id
-- getCourseProgress uses .in('lesson_id', lessonIds) which full-scans without this
CREATE INDEX IF NOT EXISTS idx_progress_lesson_id ON progress(lesson_id);

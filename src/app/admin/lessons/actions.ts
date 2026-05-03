'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createLessonSchema, updateLessonSchema, quizQuestionSchema } from '@/lib/validations/admin';
import { requireAdmin } from '@/lib/auth/require-admin';

/** Create a new lesson from form data with Zod validation */
export async function createLessonAction(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  // Parse and validate with Zod
  const data = Object.fromEntries(formData);
  const parsed = createLessonSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const { course_id, title, video_url, duration_minutes, sort_order, is_preview } = parsed.data;

  const { error } = await supabase.from('lessons').insert({
    course_id,
    title,
    video_url: video_url || null,
    duration_minutes: duration_minutes || 0,
    sort_order,
    is_preview,
  });

  if (error) {
    console.error('createLessonAction error:', error.message);
    throw new Error('Không thể tạo bài học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/lessons');
  revalidatePath('/dashboard/course');
  redirect('/admin/lessons');
}

/** Update an existing lesson with Zod validation */
export async function updateLessonAction(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  // Parse and validate with Zod
  const data = Object.fromEntries(formData);
  const parsed = updateLessonSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const { title, video_url, duration_minutes, sort_order, is_preview } = parsed.data;

  const { error } = await supabase.from('lessons').update({
    title,
    video_url: video_url || null,
    duration_minutes: duration_minutes || 0,
    sort_order,
    is_preview,
  }).eq('id', id);

  if (error) {
    console.error('updateLessonAction error:', error.message);
    throw new Error('Không thể cập nhật bài học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/lessons');
  revalidatePath('/dashboard/course');
  redirect('/admin/lessons');
}

/** Delete a lesson by id */
export async function deleteLessonAction(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('lessons').delete().eq('id', id);

  if (error) {
    console.error('deleteLessonAction error:', error.message);
    throw new Error('Không thể xóa bài học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/lessons');
}

// ------------------- Quiz Question Actions -------------------

interface QuizOptionInput {
  option_text: string;
  is_correct: boolean;
}

interface QuizQuestionInput {
  lesson_id: string;
  question_text: string;
  explanation?: string;
  sort_order?: number;
  options: QuizOptionInput[];
}

/** Create a quiz question with its options (transactional via 2 inserts). */
export async function createQuizQuestionAction(input: QuizQuestionInput) {
  await requireAdmin();
  const parsed = quizQuestionSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const supabase = await createClient();
  const { data: question, error: qErr } = await supabase
    .from('quiz_questions')
    .insert({
      lesson_id: parsed.data.lesson_id,
      question_text: parsed.data.question_text,
      explanation: parsed.data.explanation || null,
      sort_order: parsed.data.sort_order ?? 0,
    })
    .select('id')
    .single();

  if (qErr || !question) {
    console.error('createQuizQuestionAction:', qErr?.message);
    throw new Error('Không thể tạo câu hỏi.');
  }

  const optionRows = parsed.data.options.map((o, idx) => ({
    question_id: question.id,
    option_text: o.option_text,
    is_correct: o.is_correct,
    sort_order: idx,
  }));

  const { error: oErr } = await supabase.from('quiz_options').insert(optionRows);
  if (oErr) {
    await supabase.from('quiz_questions').delete().eq('id', question.id);
    console.error('createQuizQuestionAction options:', oErr.message);
    throw new Error('Không thể lưu đáp án.');
  }

  revalidatePath(`/admin/lessons/${parsed.data.lesson_id}`);
}

/** Update a question + replace all its options. */
export async function updateQuizQuestionAction(questionId: string, input: QuizQuestionInput) {
  await requireAdmin();
  const parsed = quizQuestionSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const supabase = await createClient();
  const { error: qErr } = await supabase
    .from('quiz_questions')
    .update({
      question_text: parsed.data.question_text,
      explanation: parsed.data.explanation || null,
      sort_order: parsed.data.sort_order ?? 0,
    })
    .eq('id', questionId);

  if (qErr) throw new Error('Không thể cập nhật câu hỏi.');

  // Replace options: delete all then insert
  const { error: dErr } = await supabase.from('quiz_options').delete().eq('question_id', questionId);
  if (dErr) throw new Error('Không thể cập nhật đáp án.');

  const optionRows = parsed.data.options.map((o, idx) => ({
    question_id: questionId,
    option_text: o.option_text,
    is_correct: o.is_correct,
    sort_order: idx,
  }));
  const { error: oErr } = await supabase.from('quiz_options').insert(optionRows);
  if (oErr) throw new Error('Không thể lưu đáp án mới.');

  revalidatePath(`/admin/lessons/${parsed.data.lesson_id}`);
}

/** Delete a quiz question (options cascade via FK). */
export async function deleteQuizQuestionAction(questionId: string, lessonId: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('quiz_questions').delete().eq('id', questionId);
  if (error) throw new Error('Không thể xóa câu hỏi.');
  revalidatePath(`/admin/lessons/${lessonId}`);
}

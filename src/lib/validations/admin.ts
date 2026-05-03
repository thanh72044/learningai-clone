import { z } from 'zod';

/**
 * Course Creation Validation Schema
 */
export const createCourseSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug không được để trống')
    .regex(/^[a-z0-9-]+$/, 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'),
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  description: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'developer']).optional(),
  price: z.coerce.number().int().nonnegative('Giá phải là số không âm'),
  originalPrice: z.coerce.number().int().nonnegative('Giá gốc phải là số không âm').optional(),
  thumbnailUrl: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')),
  isPublished: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .or(z.boolean()),
  isFeatured: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .or(z.boolean()),
});

export type CreateCourseFormValues = z.infer<typeof createCourseSchema>;

/**
 * Course Update Validation Schema (slug not required — edit form uses hidden input or disabled field)
 */
export const updateCourseSchema = createCourseSchema.omit({ slug: true });

export type UpdateCourseFormValues = z.infer<typeof updateCourseSchema>;

/**
 * Lesson Creation Validation Schema
 */
export const createLessonSchema = z.object({
  course_id: z.string().uuid('Course ID không hợp lệ'),
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  video_url: z.string().url('URL video không hợp lệ').optional().or(z.literal('')),
  duration_minutes: z.coerce.number().int().nonnegative('Thời lượng phải là số không âm').optional(),
  sort_order: z.coerce.number().int().nonnegative('Thứ tự phải là số không âm'),
  is_preview: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .or(z.boolean()),
});

export type CreateLessonFormValues = z.infer<typeof createLessonSchema>;

/**
 * Lesson Update Validation Schema (same as create without course_id)
 */
export const updateLessonSchema = createLessonSchema.omit({ course_id: true });

export type UpdateLessonFormValues = z.infer<typeof updateLessonSchema>;

/** Quiz option (client-submitted) */
export const quizOptionSchema = z.object({
  option_text: z.string().min(1, 'Đáp án không được để trống'),
  is_correct: z.boolean(),
});

/** Quiz question with inline options — min 2 options, at least 1 correct */
export const quizQuestionSchema = z.object({
  lesson_id: z.string().uuid('Lesson ID không hợp lệ'),
  question_text: z.string().min(1, 'Câu hỏi không được để trống'),
  explanation: z.string().optional().or(z.literal('')),
  sort_order: z.coerce.number().int().nonnegative().default(0),
  options: z
    .array(quizOptionSchema)
    .min(2, 'Phải có ít nhất 2 đáp án')
    .refine((opts) => opts.some((o) => o.is_correct), 'Phải có ít nhất 1 đáp án đúng'),
});

export type QuizQuestionFormValues = z.infer<typeof quizQuestionSchema>;

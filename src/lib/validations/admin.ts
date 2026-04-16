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

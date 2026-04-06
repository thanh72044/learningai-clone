/**
 * TypeScript types generated from Supabase schema.
 * Re-run: npx supabase gen types typescript --project-id YOUR_ID > src/types/database.types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'student' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'student' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'student' | 'admin';
          created_at?: string;
        };
      };
      instructors: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          avatar_url: string | null;
          expertise: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio?: string | null;
          avatar_url?: string | null;
          expertise?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio?: string | null;
          avatar_url?: string | null;
          expertise?: string[] | null;
          created_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          thumbnail_url: string | null;
          level: 'beginner' | 'intermediate' | 'advanced' | 'developer' | null;
          price: number;
          original_price: number | null;
          instructor_id: string | null;
          is_featured: boolean;
          is_published: boolean;
          student_count: number;
          rating: number;
          rating_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          thumbnail_url?: string | null;
          level?: 'beginner' | 'intermediate' | 'advanced' | 'developer' | null;
          price?: number;
          original_price?: number | null;
          instructor_id?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          student_count?: number;
          rating?: number;
          rating_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          thumbnail_url?: string | null;
          level?: 'beginner' | 'intermediate' | 'advanced' | 'developer' | null;
          price?: number;
          original_price?: number | null;
          instructor_id?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          student_count?: number;
          rating?: number;
          rating_count?: number;
          created_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          video_url: string | null;
          duration_minutes: number | null;
          sort_order: number;
          is_preview: boolean;
          is_final_exam: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          video_url?: string | null;
          duration_minutes?: number | null;
          sort_order: number;
          is_preview?: boolean;
          is_final_exam?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          video_url?: string | null;
          duration_minutes?: number | null;
          sort_order?: number;
          is_preview?: boolean;
          is_final_exam?: boolean;
          created_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
        };
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          completed_at?: string;
        };
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          issued_at: string;
          pdf_url: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          issued_at?: string;
          pdf_url?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          issued_at?: string;
          pdf_url?: string | null;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          company: string | null;
          avatar_url: string | null;
          content: string;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          company?: string | null;
          avatar_url?: string | null;
          content: string;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          company?: string | null;
          avatar_url?: string | null;
          content?: string;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      free_resources: {
        Row: {
          id: string;
          title: string;
          provider: string | null;
          url: string;
          duration: string | null;
          has_certificate: boolean;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          provider?: string | null;
          url: string;
          duration?: string | null;
          has_certificate?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          provider?: string | null;
          url?: string;
          duration?: string | null;
          has_certificate?: boolean;
          is_featured?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      quiz_questions: {
        Row: {
          id: string;
          lesson_id: string;
          question_text: string;
          explanation: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          question_text: string;
          explanation?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          question_text?: string;
          explanation?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      quiz_options: {
        Row: {
          id: string;
          question_id: string;
          option_text: string;
          is_correct: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          option_text: string;
          is_correct?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_id?: string;
          option_text?: string;
          is_correct?: boolean;
          sort_order?: number;
          created_at?: string;
        };
      };
      quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          selected_option_id: string;
          is_correct: boolean;
          attempted_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          selected_option_id: string;
          is_correct: boolean;
          attempted_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          question_id?: string;
          selected_option_id?: string;
          is_correct?: boolean;
          attempted_at?: string;
        };
      };
      quiz_scores: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          score_percent: number;
          passed: boolean;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lesson_id: string;
          score_percent: number;
          passed: boolean;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lesson_id?: string;
          score_percent?: number;
          passed?: boolean;
          completed_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

/** Convenience row type aliases */
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Course = Database['public']['Tables']['courses']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type Enrollment = Database['public']['Tables']['enrollments']['Row'];
export type Progress = Database['public']['Tables']['progress']['Row'];
export type Certificate = Database['public']['Tables']['certificates']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
export type FreeResource = Database['public']['Tables']['free_resources']['Row'];
export type Instructor = Database['public']['Tables']['instructors']['Row'];
export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row'];
export type QuizOption = Database['public']['Tables']['quiz_options']['Row'];
export type QuizAttempt = Database['public']['Tables']['quiz_attempts']['Row'];
export type QuizScore = Database['public']['Tables']['quiz_scores']['Row'];

/** Quiz question with its options (used when rendering the quiz UI) */
export type QuizQuestionWithOptions = QuizQuestion & {
  quiz_options: QuizOption[];
};

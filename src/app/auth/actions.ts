'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

/**
 * Handles user sign up with email existence check
 * @param formData - Form data containing full_name, email, password
 */
export async function signupAction(formData: FormData) {
  const adminClient = await createAdminClient();
  const origin = (await headers()).get('origin');

  const fullName = formData.get('full_name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !fullName) {
    return { error: 'Vui lòng điền đầy đủ thông tin.' };
  }

  if (password.length < 6) {
    return { error: 'Mật khẩu phải có ít nhất 6 ký tự.' };
  }

  // Check if user already exists using the RPC function
  // We use the regular createClient (anon) because RPC security is handled by 'SECURITY DEFINER'
  const supabase = await createClient();
  const { data: userExists, error: checkError } = await supabase.rpc('check_email_exists', {
    email_to_check: email
  });

  if (checkError) {
    console.error('signupAction check_email_exists error:', checkError.message);
    // If RPC fails (e.g. not created yet), we fallback to regular signUp
  } else if (userExists) {
    return { error: 'EMAIL_EXISTS' };
  }

  // If not exists or RPC check skipped, proceed with signup
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    console.error('signupAction signUp error:', error.message);
    return { error: 'Không thể đăng ký. Vui lòng thử lại sau.' };
  }

  return { success: true };
}

/**
 * Triggers password reset email
 * @param email - User's email address
 */
export async function forgotPasswordAction(email: string) {
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email) {
    return { error: 'Vui lòng nhập email.' };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/reset-password`,
  });

  if (error) {
    console.error('forgotPasswordAction error:', error.message);
    return { error: 'Không thể gửi email khôi phục. Vui lòng thử lại sau.' };
  }

  return { success: true };
}

/**
 * Updates user's password
 * @param password - New password
 * @param confirmPassword - Confirmation of new password
 */
export async function resetPasswordAction(password: string, confirmPassword: string) {
  const supabase = await createClient();

  if (!password || !confirmPassword) {
    return { error: 'Vui lòng nhập đầy đủ thông tin.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Mật khẩu xác nhận không khớp.' };
  }

  if (password.length < 6) {
    return { error: 'Mật khẩu phải có ít nhất 6 ký tự.' };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error('resetPasswordAction error:', error.message);
    return { error: 'Không thể cập nhật mật khẩu. Có thể link đã hết hạn.' };
  }

  revalidatePath('/', 'layout');
  return { success: true };
}

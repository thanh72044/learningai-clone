'use server';

import { createClient } from '@/lib/supabase/server';

export type ContactFormState = {
  status: 'idle' | 'sent' | 'error';
  error?: string;
};

export async function submitContactAction(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get('name') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  if (!name || !email || !message) {
    return { status: 'error', error: 'Vui lòng điền đầy đủ thông tin.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').insert({ name, email, message });

  if (error) {
    console.error('submitContactAction error:', error.message);
    return { status: 'error', error: 'Gửi thất bại. Vui lòng thử lại sau.' };
  }

  return { status: 'sent' };
}

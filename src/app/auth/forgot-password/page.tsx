'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { forgotPasswordAction } from '../actions';

/**
 * Forgot Password Page
 * Allows users to request a password reset email
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await forgotPasswordAction(email);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10">
            <p className="text-5xl mb-4">📧</p>
            <h2 className="text-xl font-bold text-white mb-3">Kiểm tra email của bạn</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Chúng tôi đã gửi link khôi phục mật khẩu đến <strong className="text-white">{email}</strong>.
              Vui lòng kiểm tra hộp thư (bao gồm cả thư rác) và nhấp vào link để tiếp tục.
            </p>
            <Link href="/auth/login" className="inline-block mt-6 text-emerald-400 text-sm hover:underline">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Quên Mật Khẩu</h1>
            <p className="text-white/50 text-sm mt-1">
              Nhập email để nhận link khôi phục mật khẩu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button type="submit" variant="primary" size="md" disabled={loading} className="w-full mt-1">
              {loading ? 'Đang gửi...' : 'Gửi Link Khôi Phục'}
            </Button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Quay lại{' '}
            <Link href="/auth/login" className="text-emerald-400 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

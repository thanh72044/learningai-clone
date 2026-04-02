'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CONTACT_INFO = [
  { icon: '📧', label: 'Email', value: 'contact@learning.ai.vn' },
  { icon: '📍', label: 'Địa chỉ', value: 'TP. Hồ Chí Minh, Việt Nam' },
  { icon: '⏰', label: 'Hỗ trợ', value: '24/7 qua Discord & Email' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    // TODO: wire to Supabase insert or email service
    await new Promise((r) => setTimeout(r, 800));
    setStatus('sent');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Liên Hệ</h1>
        <div className="h-1 w-16 bg-emerald-400 rounded-full mb-4" />
        <p className="text-white/60">Có câu hỏi? Chúng tôi luôn sẵn sàng hỗ trợ bạn.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-white">Thông Tin Liên Hệ</h2>
          <div className="space-y-4">
            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="flex items-start gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-emerald-400 font-semibold mb-2">💬 Tham gia Discord</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Cộng đồng 2000+ học viên — hỏi đáp, chia sẻ, và cùng phát triển.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div>
          {status === 'sent' ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
              <p className="text-5xl mb-4">✅</p>
              <h3 className="text-white font-semibold text-lg mb-2">Gửi thành công!</h3>
              <p className="text-white/60 text-sm">Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-emerald-400 text-sm hover:underline"
              >
                Gửi tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nguyễn Văn A"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@example.com"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Tin nhắn</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Bạn cần hỗ trợ gì?"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              </div>
              <Button type="submit" variant="primary" size="md" disabled={status === 'sending'}>
                {status === 'sending' ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

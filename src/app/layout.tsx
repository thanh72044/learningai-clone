import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: {
    default: 'LearningAI — Làm Chủ AI, Dẫn Đầu Tương Lai',
    template: '%s | LearningAI',
  },
  description:
    'Khám phá 50+ khóa học AI thực chiến từ cơ bản đến nâng cao. Học GenAI, Agentic AI, và tích hợp AI vào công việc.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://learningai.vn',
    siteName: 'LearningAI',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-emerald-950 text-white antialiased">
        <SiteHeader />
        <main className="flex-1 page-enter">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

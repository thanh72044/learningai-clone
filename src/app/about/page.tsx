import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description: 'LearningAI — Nền tảng học AI thực chiến số 1 Việt Nam.',
};

const TEAM = [
  { name: 'Nguyễn Minh Tuấn', role: 'Co-founder & AI Lead', bio: 'AI/ML Engineer với 8+ năm kinh nghiệm tại các công ty công nghệ lớn.' },
  { name: 'Trần Thị Lan', role: 'Co-founder & Growth Lead', bio: 'Digital Marketing chuyên gia, ứng dụng AI trong marketing và sales 5+ năm.' },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Về Chúng Tôi</h1>
        <div className="h-1 w-16 bg-emerald-400 rounded-full" />
      </div>

      {/* Mission */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Sứ Mệnh</h2>
        <p className="text-white/70 leading-relaxed text-lg">
          LearningAI được thành lập với sứ mệnh giúp người Việt Nam làm chủ công nghệ AI —
          không chỉ biết lý thuyết, mà thực sự ứng dụng AI để thay đổi sự nghiệp và cuộc sống.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        {[
          { value: '2000+', label: 'Học viên' },
          { value: '50+', label: 'Khóa học' },
          { value: '98%', label: 'Hài lòng' },
          { value: '2023', label: 'Thành lập' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{s.value}</p>
            <p className="text-sm text-white/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-xl font-bold text-white mb-6">Đội Ngũ Sáng Lập</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {TEAM.map((member) => (
          <div key={member.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xl shrink-0">
              {member.name[0]}
            </div>
            <div>
              <p className="text-white font-semibold">{member.name}</p>
              <p className="text-emerald-400 text-sm mb-2">{member.role}</p>
              <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Company info */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/50 space-y-1">
        <p><span className="text-white/70">Công ty:</span> AI ECOSYSTEM Technology Company</p>
        <p><span className="text-white/70">MST:</span> 0319083201</p>
        <p><span className="text-white/70">Địa chỉ:</span> TP. Hồ Chí Minh, Việt Nam</p>
        <p><span className="text-white/70">Email:</span> contact@learning.ai.vn</p>
      </div>
    </div>
  );
}

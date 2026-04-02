import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';

const REASONS = [
  { icon: '🎯', title: 'Học Từ Chuyên Gia', desc: 'Giảng viên là AI practitioners với 5-10 năm kinh nghiệm thực tế tại các công ty lớn.' },
  { icon: '⚡', title: 'Thực Hành Ngay', desc: 'Mỗi bài học đều có project thực tế. Học xong là áp dụng được vào công việc ngay hôm đó.' },
  { icon: '🗺️', title: 'Lộ Trình Rõ Ràng', desc: 'Từ AI cơ bản đến Agentic AI — lộ trình 4 cấp độ được thiết kế bởi chuyên gia.' },
  { icon: '👥', title: 'Cộng Đồng Sôi Động', desc: '2000+ học viên trong cộng đồng Discord, hỗ trợ nhau 24/7 và cùng phát triển.' },
  { icon: '🏆', title: 'Chứng Chỉ Được Công Nhận', desc: 'Chứng chỉ hoàn thành được doanh nghiệp Việt Nam và quốc tế ghi nhận.' },
  { icon: '📱', title: 'Học Mọi Lúc, Mọi Nơi', desc: 'Truy cập mọi thiết bị, học theo tốc độ của bạn, không giới hạn thời gian.' },
];

/** 6 value proposition cards */
export function WhyChooseSection() {
  return (
    <section className="py-20 bg-emerald-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Tại Sao Chọn LearningAI?"
          subtitle="Chúng tôi không chỉ dạy lý thuyết — chúng tôi giúp bạn làm chủ AI trong thực tế"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r) => (
            <Card key={r.title} glass className="p-6 flex flex-col gap-3">
              <span className="text-4xl">{r.icon}</span>
              <h3 className="text-white font-semibold text-lg">{r.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{r.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

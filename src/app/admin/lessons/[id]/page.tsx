import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateLessonAction } from '../actions';

const FIELD_CLASS = 'w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50';
const LABEL_CLASS = 'block text-sm text-white/60 mb-1.5';

interface Props {
  params: Promise<{ id: string }>;
}

async function getLesson(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('lessons')
    .select('*, courses(id, title)')
    .eq('id', id)
    .single();
  return data;
}

export default async function EditLessonPage({ params }: Props) {
  const { id } = await params;
  const lesson = await getLesson(id);
  if (!lesson) notFound();

  const course = lesson.courses as { id: string; title: string } | null;
  const updateWithId = updateLessonAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-8">Chỉnh Sửa Bài Học</h1>

      <form action={updateWithId} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Khóa Học</label>
            <input
              value={course?.title ?? '—'}
              disabled
              className={FIELD_CLASS + ' opacity-40 cursor-not-allowed'}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Tên Bài Học *</label>
            <input name="title" required defaultValue={lesson.title} className={FIELD_CLASS} />
          </div>

          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>URL Video</label>
            <input
              name="video_url"
              type="url"
              defaultValue={lesson.video_url ?? ''}
              placeholder="https://youtube.com/..."
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Thời Lượng (giây)</label>
            <input
              name="duration"
              type="number"
              defaultValue={lesson.duration ?? 0}
              min={0}
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Thứ Tự</label>
            <input
              name="sort_order"
              type="number"
              defaultValue={lesson.sort_order ?? 1}
              min={1}
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="is_preview"
              type="checkbox"
              defaultChecked={lesson.is_preview ?? false}
              className="w-4 h-4 accent-emerald-500"
            />
            <span className="text-sm text-white/70">Cho xem thử miễn phí</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
            Lưu Thay Đổi
          </button>
          <a href="/admin/lessons" className="px-6 py-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white text-sm transition-colors">
            Hủy
          </a>
        </div>
      </form>
    </div>
  );
}

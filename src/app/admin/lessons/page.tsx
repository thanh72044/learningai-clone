import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { deleteLessonAction } from './actions';

async function getLessonsWithCourse() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('lessons')
    .select('id, title, sort_order, duration, is_preview, course_id, courses(title, slug)')
    .order('course_id')
    .order('sort_order');
  return data ?? [];
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default async function AdminLessonsPage() {
  const lessons = await getLessonsWithCourse();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Quản Lý Bài Học</h1>
        <Link href="/admin/lessons/new">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
            + Thêm Mới
          </span>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left px-4 py-3 text-white/50 font-medium">#</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium">Tên Bài Học</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium hidden md:table-cell">Khóa Học</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium hidden sm:table-cell">Thời Lượng</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium hidden sm:table-cell">Xem Thử</th>
              <th className="text-right px-4 py-3 text-white/50 font-medium">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {lessons.map((lesson) => {
              const course = lesson.courses as unknown as { title: string; slug: string } | null;
              return (
                <tr key={lesson.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white/40 text-xs">{lesson.sort_order}</td>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium line-clamp-1">{lesson.title}</p>
                  </td>
                  <td className="px-4 py-3 text-white/50 text-xs hidden md:table-cell line-clamp-1">
                    {course?.title ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-white/60 hidden sm:table-cell">
                    {lesson.duration ? formatDuration(lesson.duration) : '—'}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {lesson.is_preview ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400">Có</span>
                    ) : (
                      <span className="text-white/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/lessons/${lesson.id}`} className="text-xs text-emerald-400 hover:underline">
                        Sửa
                      </Link>
                      <form action={deleteLessonAction.bind(null, lesson.id)}>
                        <button type="submit" className="text-xs text-red-400 hover:underline">
                          Xóa
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {lessons.length === 0 && (
          <p className="text-center text-white/40 py-10">Chưa có bài học nào.</p>
        )}
      </div>
    </div>
  );
}

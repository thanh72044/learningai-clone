import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { LevelBadge } from '@/components/ui/level-badge';
import { deleteCourseAction } from './actions';

async function getCourses() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('courses')
    .select('id, slug, title, level, price, is_published, student_count')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Quản Lý Khóa Học</h1>
        <Link href="/admin/courses/new">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
            + Thêm Mới
          </span>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left px-4 py-3 text-white/50 font-medium">Tên Khóa Học</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium hidden sm:table-cell">Cấp Độ</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium hidden md:table-cell">Học Viên</th>
              <th className="text-left px-4 py-3 text-white/50 font-medium">Trạng Thái</th>
              <th className="text-right px-4 py-3 text-white/50 font-medium">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-white font-medium line-clamp-1">{course.title}</p>
                  <p className="text-white/30 text-xs mt-0.5">{course.slug}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <LevelBadge level={course.level} />
                </td>
                <td className="px-4 py-3 text-white/60 hidden md:table-cell">
                  {(course.student_count ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    course.is_published
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {course.is_published ? 'Đã xuất bản' : 'Nháp'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/courses/${course.id}`} className="text-xs text-emerald-400 hover:underline">
                      Sửa
                    </Link>
                    <form action={deleteCourseAction.bind(null, course.id)}>
                      <button type="submit" className="text-xs text-red-400 hover:underline">
                        Xóa
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <p className="text-center text-white/40 py-10">Chưa có khóa học nào.</p>
        )}
      </div>
    </div>
  );
}

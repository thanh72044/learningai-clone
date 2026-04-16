import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateCourseAction } from '../actions';

const FIELD_CLASS = 'w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50';
const LABEL_CLASS = 'block text-sm text-white/60 mb-1.5';

interface Props {
  params: Promise<{ id: string }>;
}

async function getCourse(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('courses').select('*').eq('id', id).single();
  return data;
}

export default async function EditCoursePage({ params }: Props) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  const updateWithId = updateCourseAction.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-8">Chỉnh Sửa Khóa Học</h1>

      <form action={updateWithId} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Tên Khóa Học *</label>
            <input name="title" required defaultValue={course.title} className={FIELD_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Slug</label>
            <input value={course.slug} disabled className={FIELD_CLASS + ' opacity-40 cursor-not-allowed'} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Cấp Độ</label>
            <select name="level" defaultValue={course.level ?? ''} className={FIELD_CLASS + ' bg-emerald-950'}>
              <option value="">-- Chọn --</option>
              <option value="beginner">Cơ Bản</option>
              <option value="intermediate">Trung Cấp</option>
              <option value="advanced">Chuyên Sâu</option>
              <option value="developer">Developer</option>
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Giá (VNĐ)</label>
            <input name="price" type="number" defaultValue={course.price} min={0} className={FIELD_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Giá Gốc (VNĐ)</label>
            <input name="originalPrice" type="number" defaultValue={course.original_price ?? ''} min={0} className={FIELD_CLASS} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>URL Thumbnail</label>
            <input name="thumbnailUrl" type="url" defaultValue={course.thumbnail_url ?? ''} className={FIELD_CLASS} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Mô Tả</label>
            <textarea name="description" rows={4} defaultValue={course.description ?? ''} className={FIELD_CLASS + ' resize-none'} />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="hidden" name="isPublished" value="false" />
            <input name="isPublished" type="checkbox" value="true" defaultChecked={course.is_published} className="w-4 h-4 accent-emerald-500" />
            <span className="text-sm text-white/70">Xuất bản</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="hidden" name="isFeatured" value="false" />
            <input name="isFeatured" type="checkbox" value="true" defaultChecked={course.is_featured} className="w-4 h-4 accent-emerald-500" />
            <span className="text-sm text-white/70">Nổi bật</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
            Lưu Thay Đổi
          </button>
          <a href="/admin/courses" className="px-6 py-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white text-sm transition-colors">
            Hủy
          </a>
        </div>
      </form>
    </div>
  );
}

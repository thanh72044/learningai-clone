import { createCourseAction } from '../actions';

const FIELD_CLASS = 'w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50';
const LABEL_CLASS = 'block text-sm text-white/60 mb-1.5';

export default function NewCoursePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-8">Thêm Khóa Học Mới</h1>

      <form action={createCourseAction} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Tên Khóa Học *</label>
            <input name="title" required placeholder="[AI101] AI Foundation..." className={FIELD_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Slug (URL) *</label>
            <input name="slug" required placeholder="ai101" className={FIELD_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Cấp Độ</label>
            <select name="level" className={FIELD_CLASS + ' bg-emerald-950'}>
              <option value="">-- Chọn --</option>
              <option value="beginner">Cơ Bản</option>
              <option value="intermediate">Trung Cấp</option>
              <option value="advanced">Chuyên Sâu</option>
              <option value="developer">Developer</option>
            </select>
          </div>
          <div>
            <label className={LABEL_CLASS}>Giá (VNĐ)</label>
            <input name="price" type="number" defaultValue={0} min={0} className={FIELD_CLASS} />
          </div>
          <div>
            <label className={LABEL_CLASS}>Giá Gốc (VNĐ)</label>
            <input name="original_price" type="number" min={0} className={FIELD_CLASS} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>URL Thumbnail</label>
            <input name="thumbnail_url" type="url" placeholder="https://..." className={FIELD_CLASS} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Mô Tả</label>
            <textarea name="description" rows={4} placeholder="Mô tả ngắn về khóa học..." className={FIELD_CLASS + ' resize-none'} />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="is_published" type="checkbox" value="on" className="w-4 h-4 accent-emerald-500" />
            <span className="text-sm text-white/70">Xuất bản ngay</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="is_featured" type="checkbox" value="on" className="w-4 h-4 accent-emerald-500" />
            <span className="text-sm text-white/70">Nổi bật (homepage)</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors">
            Tạo Khóa Học
          </button>
          <a href="/admin/courses" className="px-6 py-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white text-sm transition-colors">
            Hủy
          </a>
        </div>
      </form>
    </div>
  );
}

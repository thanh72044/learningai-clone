-- Seed data for LearningAI clone
-- Run AFTER 001_initial_schema.sql

-- Instructors
INSERT INTO instructors (id, name, bio, expertise) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Nguyễn Minh Tuấn', 'AI/ML Engineer với 8+ năm kinh nghiệm, chuyên gia GenAI và Agentic AI.', ARRAY['GenAI', 'Agentic AI', 'LLM']),
  ('11111111-0000-0000-0000-000000000002', 'Trần Thị Lan', 'Digital Marketing chuyên gia, ứng dụng AI trong marketing 5+ năm.', ARRAY['AI Marketing', 'Automation', 'ChatGPT'])
ON CONFLICT DO NOTHING;

-- Courses
INSERT INTO courses (slug, title, description, level, price, original_price, instructor_id, is_featured, is_published, student_count, rating, rating_count) VALUES
  ('ai101', '[AI101] AI Foundation: Tư Duy & Công Cụ Nền Tảng', 'Khóa học nền tảng giúp bạn hiểu AI, prompt engineering cơ bản và sử dụng ChatGPT hiệu quả trong công việc.', 'beginner', 1990000, 2900000, '11111111-0000-0000-0000-000000000001', true, true, 1250, 4.8, 320),
  ('ai201', '[AI201] GenAI Express: Bùng Nổ Sáng Tạo & Hiệu Suất', 'Khóa học 12 giờ thực chiến giúp bạn biến ý tưởng thành sản phẩm bằng Generative AI.', 'intermediate', 2000000, 3500000, '11111111-0000-0000-0000-000000000001', true, true, 127, 4.9, 45),
  ('ai301', '[AI301] AI cho Sales & Customer Service', 'Xây dựng hệ thống AI hỗ trợ bán hàng và chăm sóc khách hàng tự động 24/7.', 'advanced', 3200000, 4800000, '11111111-0000-0000-0000-000000000002', true, true, 98, 4.7, 38),
  ('ai302', '[AI302] Agentic AI for Sales: Bùng Nổ Doanh Số', 'Xây dựng đội AI Sales Agent làm việc 24/7, tự động phân tích khách hàng và chốt deals.', 'advanced', 3500000, 5500000, '11111111-0000-0000-0000-000000000002', true, true, 89, 4.8, 29),
  ('ai303', '[AI303] Agentic AI for Marketing: Xây dựng Cỗ Máy Marketing', 'Tạo hệ thống marketing AI thông minh: content, ads, email automation chạy tự động.', 'advanced', 3500000, 5500000, '11111111-0000-0000-0000-000000000002', true, true, 156, 4.9, 67),
  ('ai401', '[AI401] AI for Developers: Tích hợp AI vào App', 'Học cách tích hợp LLM, OpenAI API, và xây dựng AI-powered applications từ đầu.', 'developer', 4500000, 6500000, '11111111-0000-0000-0000-000000000001', true, true, 320, 4.9, 95)
ON CONFLICT (slug) DO NOTHING;

-- Sample lessons for AI101
INSERT INTO lessons (course_id, title, sort_order, is_preview, duration_minutes)
SELECT c.id, 'Bài 1: AI là gì? Tại sao AI quan trọng?', 1, true, 15
FROM courses c WHERE c.slug = 'ai101' ON CONFLICT DO NOTHING;

INSERT INTO lessons (course_id, title, sort_order, is_preview, duration_minutes)
SELECT c.id, 'Bài 2: ChatGPT và các công cụ AI phổ biến', 2, true, 20
FROM courses c WHERE c.slug = 'ai101' ON CONFLICT DO NOTHING;

INSERT INTO lessons (course_id, title, sort_order, is_preview, duration_minutes)
SELECT c.id, 'Bài 3: Prompt Engineering cơ bản', 3, false, 25
FROM courses c WHERE c.slug = 'ai101' ON CONFLICT DO NOTHING;

INSERT INTO lessons (course_id, title, sort_order, is_preview, duration_minutes)
SELECT c.id, 'Bài 4: Ứng dụng AI trong công việc hàng ngày', 4, false, 30
FROM courses c WHERE c.slug = 'ai101' ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO testimonials (name, role, company, content, is_featured, sort_order) VALUES
  ('Nguyễn Hoàng Lâm Duy', 'AI Marketing Specialist', 'StartupVN', 'Khóa học thực chiến, áp dụng được ngay vào công việc. Tôi đã tăng năng suất 3x sau 1 tháng học.', true, 1),
  ('Trần Bình Tường', 'Sales Executive', 'SIHUB', 'Nhờ LearningAI, tôi đã xây dựng được AI agent tự động follow-up khách hàng, doanh số tăng 40%.', true, 2),
  ('Yumi Tran', 'Content Creator', 'Freelancer', 'Học xong là làm được luôn! Giảng viên nhiệt tình, cộng đồng hỗ trợ tuyệt vời.', true, 3),
  ('Hà Ngọc Bảo Phúc', 'Student', 'AIOV Institute', 'Lộ trình học rõ ràng từ cơ bản đến nâng cao. Tôi từ zero đến có thể tự build AI agent chỉ trong 2 tháng.', true, 4),
  ('Pão Báo', 'Marketing Manager', 'DIGISO', 'Đầu tư xứng đáng nhất trong năm 2025. ROI từ khóa học này gấp 10 lần học phí.', true, 5),
  ('Tuyết Lan', 'Marketing Specialist', 'Startup', 'Community của LearningAI rất chất lượng. Được hỗ trợ 24/7, hỏi là có người trả lời ngay.', true, 6)
ON CONFLICT DO NOTHING;

-- Free Resources
INSERT INTO free_resources (title, provider, url, duration, has_certificate, is_featured, sort_order) VALUES
  ('Generative AI Learning Path', 'Google', 'https://cloud.google.com/learn/training/machinelearning-ai', '5-10 giờ', true, true, 1),
  ('18 Free AI Courses', 'Microsoft', 'https://learn.microsoft.com/en-us/ai/', '20+ giờ', false, true, 2),
  ('AI For Everyone', 'DeepLearning.AI', 'https://www.coursera.org/learn/ai-for-everyone', '6 giờ', true, true, 3),
  ('CS50''s Introduction to AI with Python', 'Harvard', 'https://cs50.harvard.edu/ai/2024/', '25 giờ', true, true, 4),
  ('5-Day Gen AI Intensive', 'Google', 'https://rsvp.withgoogle.com/events/google-generativeai-intensive', '5 ngày', true, true, 5),
  ('Generative AI for Everyone', 'DeepLearning.AI', 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/', '5 giờ', true, true, 6)
ON CONFLICT DO NOTHING;

---
name: Phase 1 - Landing Page Preparation & Deployment
description: Check/fix errors, optimize images & speed, SEO setup, .gitignore, GitHub, push to Vercel
type: phase
status: in-progress
priority: critical
effort: 1-2 days
---

# Phase 1: Landing Page Preparation & Deployment

## Overview

**Goal**: Prepare learningai-clone project for internet deployment on Vercel with optimized performance and SEO.

**Deliverables**:
- ✅ Build succeeds with no errors
- ✅ Images optimized with Vercel Image Optimization
- ✅ Page speed optimized (Lighthouse > 80)
- ✅ SEO metadata correct (titles, descriptions, og tags)
- ✅ .gitignore properly configured
- ✅ GitHub repository ready
- ✅ Deployed to Vercel with working domain

---

## Phase Breakdown

| Step | Task | Status | Effort |
|------|------|--------|--------|
| 1 | Build testing & error checking | Pending | 30m |
| 2 | Image optimization (Vercel Image) | Pending | 1h |
| 3 | Speed optimization (Lighthouse) | Pending | 1h |
| 4 | SEO setup (meta tags, robots.txt) | Pending | 1h |
| 5 | .gitignore verification | Pending | 15m |
| 6 | GitHub repository status | Pending | 15m |
| 7 | Commit & push to GitHub | Pending | 15m |
| 8 | Vercel deployment verification | Pending | 30m |

---

## Step 1: Build Testing & Error Checking

### Actions
```bash
cd C:/Users/ASUS/learningai-clone

# Clean build
npm run build

# Check for errors/warnings
npm run type-check  # TypeScript

# Run linting
npm run lint        # If configured
```

### Success Criteria
- [ ] `npm run build` completes with 0 errors
- [ ] TypeScript types check passes
- [ ] No console warnings about missing dependencies
- [ ] Build output size reasonable

### Expected Issues & Fixes
| Issue | Fix |
|-------|-----|
| Missing env vars | Use .env.local for local testing |
| TypeScript errors | Fix type definitions |
| Missing packages | npm install |

---

## Step 2: Image Optimization

### Current Status
**Need to check**: Which images are used on landing page?

**Images typically in**:
- `public/` → Static images
- `public/images/` → Hero images
- Course thumbnails → From URL/Supabase

### Optimization Strategy

**A. Static Images** (in `/public`)
- Use WebP format (next/image auto-converts)
- Compress with ImageOptim or similar
- Size: < 100KB per image

**B. Dynamic Images** (from URLs)
- Already handled by Vercel Image Optimization
- Just use `<Image>` component from Next.js

**C. Next.js Image Component**
Current code check: Are we using `<Image>` for all images?

```tsx
// Good ✓
import Image from 'next/image';
<Image src="/hero.jpg" alt="Hero" width={1200} height={600} />

// Bad ✗
<img src="/hero.jpg" alt="Hero" />
```

### Todo
- [ ] Audit all images in landing page
- [ ] Convert `<img>` → `<Image>` component
- [ ] Compress static images (< 100KB)
- [ ] Verify responsive images (sizes prop)

---

## Step 3: Speed Optimization

### Measurement Tools
```bash
# Local testing
npm run build
npx next start
# Then use Lighthouse in Chrome DevTools
```

### Optimization Checklist
- [ ] Remove unused CSS
- [ ] Defer non-critical JavaScript
- [ ] Lazy-load images below fold
- [ ] Code splitting optimized
- [ ] Font loading optimized

### Key Files to Check
- `next.config.ts` - Build config
- `src/app/layout.tsx` - Fonts, scripts
- `src/components/home/*` - Component sizes
- CSS files - Unused styles

---

## Step 4: SEO Setup

### Metadata Check

**Homepage** (`src/app/page.tsx`)
```tsx
export const metadata: Metadata = {
  title: "Learning AI | Khóa Học AI Thực Chiến",
  description: "Khám phá 50+ khóa học AI từ cơ bản đến nâng cao",
  openGraph: {
    title: "Learning AI",
    description: "Khám phá 50+ khóa học AI",
    url: "https://learningai-clone.vercel.app",
    siteName: "Learning AI",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
    }],
  },
};
```

**Other Pages** (courses, landing)
- [ ] Each page has unique title
- [ ] Description under 160 chars
- [ ] Open Graph image set
- [ ] og:url points to Vercel domain

### robots.txt & sitemap
Already exist in `/src/app/robots.ts` and `/src/app/sitemap.ts`
- [ ] Verify `NEXT_PUBLIC_SITE_URL` is set to Vercel domain
- [ ] robots.txt allows `/` and `/auth/`
- [ ] sitemap.xml includes all public routes

---

## Step 5: .gitignore Verification

### Check Status
```bash
cd C:/Users/ASUS/learningai-clone
cat .gitignore | head -30
```

### Must Exclude
- [ ] `.env.local` - local secrets
- [ ] `.env.*.local` - environment-specific
- [ ] `node_modules/`
- [ ] `.next/`
- [ ] `out/`
- [ ] `.vercel/`

### Already Committed?
```bash
# Check git history for sensitive files
git log --all --name-status | grep -E "\.env|secret"
```

If found → history is compromised (rotate keys)

---

## Step 6: GitHub Repository Status

### Check
```bash
git remote -v
# Should show: origin https://github.com/thanh72044/learningai-clone.git
```

### Requirements
- [ ] Repository exists (public or private)
- [ ] No secrets in git history
- [ ] Latest code pushed to main
- [ ] Collaborators setup (if needed)

---

## Step 7: Commit & Push

### Pre-commit Checklist
- [ ] Build passes locally
- [ ] No TypeScript errors
- [ ] .gitignore correct (no .env.local)
- [ ] Changes are meaningful

### Commit Message
```
feat(landing): prepare project for Vercel deployment

- Optimize images with next/image component
- Improve page speed (Lighthouse optimization)
- Setup SEO metadata for all pages
- Verify .gitignore configuration
- Ensure GitHub repository ready

Closes: deployment preparation task
```

### Push
```bash
git push origin main
```

---

## Step 8: Vercel Deployment Verification

### After Deployment
- [ ] Vercel build succeeds (< 5min)
- [ ] No build errors in logs
- [ ] Homepage accessible: https://learningai-clone.vercel.app
- [ ] All pages load (200 OK)
- [ ] No 404 errors
- [ ] Auth flow works

### Performance Check
1. Open DevTools → Lighthouse
2. Run audit for "Mobile"
3. Check scores:
   - Performance: > 80
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90

---

## Related Code Files

**Need to check/modify**:
- `src/app/layout.tsx` - Metadata, fonts
- `src/app/page.tsx` - Homepage metadata
- `src/app/courses/page.tsx` - Courses page metadata
- `src/components/home/*` - Image components
- `next.config.ts` - Image optimization config
- `src/app/robots.ts` - robots.txt
- `src/app/sitemap.ts` - Sitemap

**Not to modify**:
- `.gitignore` - Already correct
- `package.json` - Already correct
- Database files - Not affected

---

## Success Criteria

✓ Build passes without errors
✓ All images use `<Image>` component
✓ Lighthouse score > 80 for all metrics
✓ SEO metadata complete (title, description, og:image)
✓ robots.txt & sitemap valid
✓ .gitignore excludes secrets
✓ GitHub repo up-to-date
✓ Vercel deployment successful (200 OK on all pages)
✓ No console errors in production
✓ Auth flow works on Vercel domain

---

## Next Steps

→ Execute each step in order
→ Report progress after each step
→ Finalize with commit & push
→ Verify Vercel deployment

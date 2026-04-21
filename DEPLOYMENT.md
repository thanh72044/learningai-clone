# Deployment Guide - LearningAI Clone

## 🚀 Deployment Options

This project can be deployed to multiple platforms. Below are the primary deployment options.

---

## Option 1: Cloudflare Pages (Recommended)

### Prerequisites
- Cloudflare account (free tier available)
- GitHub account (repository already set up at `github.com/thanh72044/learningai-clone`)

### Step 1: Connect GitHub Repository to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select **Pages** from the left sidebar
3. Click **Create a project** → **Connect to Git**
4. Authenticate with GitHub
5. Select repository: `thanh72044/learningai-clone`
6. Click **Begin setup**

### Step 2: Configure Build Settings

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
.next
```

**Environment Variables:** Add the following in Cloudflare Pages settings:

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | From Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | From Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key | From Supabase Settings → API (server-side only) |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Your Cloudflare domain (optional, default: learningai.vn) |

### Step 3: Connect Custom Domain (Optional)

1. In Cloudflare Pages, go to **Custom domains**
2. Add your domain (e.g., `learningai.vn`)
3. Update DNS records as instructed
4. Wait for SSL certificate (usually 5-10 minutes)

### Step 4: Deploy

1. Click **Save and Deploy**
2. Cloudflare will build and deploy automatically
3. View deployment progress in the **Deployments** tab
4. Once complete, access your site at the provided URL

---

## Option 2: Vercel (Alternative)

If you prefer to continue using Vercel:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. Redeploy from the Deployments tab

---

## ⚙️ Environment Variables Setup

### Supabase Configuration

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings → API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### Verifying Environment Variables

Test that env vars are properly set:

```bash
# Local testing
npm run dev

# Check build
npm run build
```

---

## 🔍 Monitoring & Debugging

### Cloudflare Pages Logs

1. Go to **Deployments** → Select your deployment
2. Click **View build logs** for build-time errors
3. Click **View function logs** for runtime errors

### Common Issues

| Issue | Solution |
|-------|----------|
| 404 on homepage | Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set |
| Supabase connection fails | Verify IP whitelist in Supabase: Settings → Network |
| RLS policy errors | Check Supabase migrations were applied (run migration 003, 009) |
| Slow page load | Check image optimization in `/dashboard/course/[slug]/page.tsx` |

---

## 📊 SEO & Performance

### sitemap.xml & robots.txt

These are automatically generated:
- `sitemap.xml` - Updated based on published courses
- `robots.txt` - Configured to block `/admin`, `/dashboard`, `/auth`

The base URL is determined by:
1. `NEXT_PUBLIC_SITE_URL` environment variable (if set)
2. Fallback: `https://learningai.vn`

**Update for your domain:**
```bash
# Set in Cloudflare Pages environment variables:
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain
3. Upload `sitemap.xml` (path: `/sitemap.xml`)
4. Monitor indexing status

---

## 🔐 Security Checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set server-side only (not in browser)
- [ ] Database migrations (003_quiz_system.sql, 009_performance-and-integrity-fixes.sql) are applied
- [ ] RLS policies are enabled on all tables
- [ ] `.env.local` is in `.gitignore` and never committed
- [ ] All API keys are from Supabase (not hardcoded)

---

## 🚢 Deployment Checklist

Before deploying:

- [ ] Run `npm run build` locally - succeeds without errors
- [ ] TypeScript check: `npx tsc --noEmit` - no errors
- [ ] All environment variables are set in deployment platform
- [ ] Database migrations are applied
- [ ] Supabase project is accessible from the deployment region
- [ ] Custom domain is configured (if applicable)

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated:** 2026-04-21  
**Project:** LearningAI Clone  
**Framework:** Next.js 16 + React 19 + TypeScript  
**Database:** Supabase PostgreSQL

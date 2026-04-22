---
name: QA Audit + Deployment + Features Master Plan
description: Comprehensive plan to fix QA audit issues, resolve deployment (Cloudflare->Vercel), optimize performance/SEO, and implement quiz & landing page features
type: implementation
status: in-progress
priority: critical
blockedBy: []
blocks: []
created: 2026-04-22
updated: 2026-04-22
---

# Master Implementation Plan: QA Audit + Deployment + Features

## Overview

Comprehensive roadmap to complete all pending work for learningai-clone project. Organized into 4 sequential phases with clear priorities and dependencies.

**Timeline**: 1-2 weeks  
**Priority**: Deployment (blocker) → QA Audit → Performance/SEO → Features

---

## Phase Breakdown

| Phase | Area | Status | Priority | Est. Effort |
|-------|------|--------|----------|-------------|
| **1** | [Deployment & Infrastructure](./phase-01-deployment-infrastructure.md) | BLOCKED (Architectural) | 🔴 CRITICAL | 2-3 days |
| **2** | [QA Audit Fixes](./phase-02-qa-audit-fixes.md) | In Progress | 🟠 HIGH | 1-2 days |
| **3** | [Performance & SEO](./phase-03-performance-seo.md) | Pending | 🟡 MEDIUM | 1 day |
| **4** | [Quiz & Landing Page Features](./phase-04-features-quiz-landing.md) | Not Started | 🟡 MEDIUM | 3-4 days |

---

## Key Blockers & Dependencies

### Current Blocker: Cloudflare Pages Incompatibility

**Issue**: App architecture incompatible with Cloudflare Pages edge-only runtime
- Client components ('use client') with React hooks (useState, useRouter) unsupported
- Supabase middleware needs full Node.js runtime
- Requires complete architectural redesign to work with edge runtime

**Decision**: Recommend Vercel (native Next.js support, full Node.js runtime)

**Impact**: Must resolve Phase 1 before proceeding with any other work

---

## Quick Status Check

### ✅ Already Completed
- M6: Null crash fix in admin courses page
- M7: revalidatePath fix in lessons actions
- Migration 003: Quiz system RLS policies (fixed SQL syntax)
- Migration 009: Performance fixes & UNIQUE constraint (fixed SQL syntax)

### 🔄 In Progress / Pending
- D-M2: Quiz duplicate submission prevention
- D-M3/M4: Database indexes for query optimization
- Phase 1: Deployment to Vercel + GitHub setup
- Phase 3: Image & performance optimization
- Phase 4: Quiz & Landing Page features

---

## Implementation Order

1. **Phase 1: Deployment** ← START HERE (blocks everything)
   - Resolve Cloudflare vs Vercel decision
   - Setup Vercel project & environment
   - Configure GitHub repository
   - Create .gitignore for Next.js
   - Verify successful deployment

2. **Phase 2: QA Audit Fixes** (can start once Phase 1 decided)
   - Verify M6 & M7 are working correctly
   - Fix D-M2: Quiz duplicate submission UNIQUE constraint
   - Implement D-M3/M4: Database indexes for performance
   - Run full test suite

3. **Phase 3: Performance & SEO**
   - Image optimization with Vercel Image Optimization
   - Page speed optimization & metrics
   - SEO metadata (titles, descriptions, og tags)
   - robots.txt & sitemap verification

4. **Phase 4: Features** (after Phase 1-3 stable)
   - Quiz system implementation
   - Landing page enhancement
   - Testing & deployment

---

## File References

- **Deployment Guide**: [docs/deployment-guide.md](../../docs/deployment-guide.md)
- **Code Standards**: [docs/code-standards.md](../../docs/code-standards.md)
- **System Architecture**: [docs/system-architecture.md](../../docs/system-architecture.md)

---

## Success Criteria (Master Level)

✓ Vercel deployment successful with stable 200 responses  
✓ All QA audit Medium/High items fixed  
✓ Page load time < 3s on Lighthouse  
✓ SEO Core Web Vitals passing  
✓ Quiz & Landing Page features deployed  
✓ Test suite at 80%+ coverage  
✓ Zero production errors for 48 hours  

---

## Next Steps

→ Proceed to **Phase 1: Deployment & Infrastructure**  
→ Read [phase-01-deployment-infrastructure.md](./phase-01-deployment-infrastructure.md)

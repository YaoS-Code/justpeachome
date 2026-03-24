# JUST PEAC HOMES - Development Standards

**Status**: Official Protocol  
**Last Updated**: 2026-01-22

---

## 1. Technical Stack

### 1.1 Frontend
- **Framework**: Next.js 15 (App Router)
- **Deployment**: Cloudflare Pages (Edge Runtime)
- **Email**: Resend API
- **State/Data**: Sanity GROQ API

### 1.2 Infrastructure
- **Cloudflare Workers**: Used for edge-side logic and API routes.
- **Sanity Studio**: Managed content backend (`studio-borui`).

---

## 2. Coding Rules

### 2.1 UI & Styling
- **Zero Hardcoding**: All colors must use CSS variables from `globals.css`.
- **Component Limit**: Maximum 300 lines per file. Split if exceeded.
- **Mobile First**: Default styles are mobile; use `md:` and `lg:` for larger screens.

### 2.2 Type Safety (TypeScript)
- **No `any`**: Explicit interfaces required for all data objects (Sanity, API responses).
- **Import Aliases**: Use `@/components`, `@/lib`, etc.

---

## 3. Tech Integrations

### 3.1 Cloudflare Pages
- **Runtime**: `export const runtime = 'edge'`
- **Revalidation**: Use ISR (`export const revalidate = 60`) for dynamic Sanity content.

### 3.2 Resend Email
- **Endpoint**: `/api/contact` handles form submissions via Resend.
- **Rules**: Validate email and rate-limit to prevent spam.

---

## 4. Pre-Deployment Checklist

### SEO & AI
- [ ] Meta title (50-60 chars) & Description (150-160 chars).
- [ ] Canonical URL present.
- [ ] Exactly one H1 tag with primary keywords.
- [ ] Schema.org JSON-LD graph implemented.
- [ ] Alt text on all images.

### Quality & Performance
- [ ] `npm run build` succeeds locally.
- [ ] Zero TypeScript errors.
- [ ] Lighthouse scores > 90 across all categories.
- [ ] All buttons have touch targets ≥ 44px.

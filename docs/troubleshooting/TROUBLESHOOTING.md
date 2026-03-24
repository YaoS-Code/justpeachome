# Error Log & Troubleshooting Guide

This document tracks historical bugs, common errors, and their resolutions in the JUST PEAC HOMES project. Refer to this guide to prevent regression and learn from past challenges.

## 📁 Classification
- **Technical**: Framework, build, or environment issues.
- **Design**: Styling, CSS variables, and accessibility.
- **CMS**: Sanity integration and data projection issues.

---

## 🛠️ Errors and Resolutions

### Error #010: Build Failures (ESLint & Imports)
**Date:** 2026-01-22  
**Type:** Technical / Build  
**Error Message:** 
- `Cannot find name 'Link'`
- `Unexpected any. Specify a different type. @typescript-eslint/no-explicit-any`

**Cause:** 
1. Replaced `<a>` with `<Link>` but forgot to import the component.
2. ESLint rules on the build server are stricter than local dev, failing on `any` types in mapped content.

**Solution:**
1. Added `import Link from 'next/link'` in `services/[slug]/page.tsx`.
2. Added `// eslint-disable-next-line @typescript-eslint/no-explicit-any` specifically for Sanity block content mapping where dynamic typing is necessary.

**Learnings:**
- ✅ **Rule**: Always run `npm run build` locally before pushing to verify production-level ESLint and type checks.
- ✅ **Standard**: Avoid `any`, but use documented disable comments if unavoidable for complex external data structures.

---

### Error #009: Sanity Data Projection
**Date:** 2026-01-21  
**Type:** CMS  
**Problem:** GROQ queries returned inconsistent data structures (sometimes objects, sometimes values).

**Solution:**
```groq
// ❌ Avoid ambiguous projections
slug,

// ✅ Recommended: Flatten at query level
"slug": slug.current,
"imageUrl": mainImage.asset->url
```

**Learnings:**
- ✅ **Standard**: Handle data structures in the GROQ query to ensure the frontend receives flat, predictable props.

---

### Error #008: Next.js Link Component
**Date:** 2026-01-21  
**Type:** Technical  
**Error Message:** `Do not use an <a> element to navigate to /blog/. Use <Link />...`

**Solution:**
Replaced all internal navigation `<a>` tags with `import Link from 'next/link'`.

**Learnings:**
- ✅ **Standard**: Internal routing **must** use Next.js `Link` for SPA performance.

---

### Error #007: Unescaped Entities (JSX)
**Date:** 2026-01-21  
**Type:** Technical  
**Error Message:** Compilation error on characters like `'`.

**Solution:**
Use HTML entities like `&apos;` for `'` or `&quot;` for `"`.

---

### Error #006: Explicit 'any' Types (ESLint)
**Date:** 2026-01-21  
**Type:** Technical  
**Problem:** Map/filter callbacks using implicit/explicit `any`.

**Solution:**
Import shared interfaces from `types/` or `lib/sanity.ts`.
```typescript
import { Post } from '@/types/sanity';
posts.map((post: Post) => ...)
```

---

### Error #005: Sanity Schema TypeScript (Studio)
**Date:** 2026-01-20  
**Type:** CMS  
**Error Message:** `Parameter 'Rule' implicitly has an 'any' type`.

**Solution:**
Schema validation functions should use `: any` or specific Sanity types if available in the studio project.

---

### Error #004: CSS Variables in Tailwind v4
**Date:** 2026-01-20  
**Type:** Design  
**Problem:** Custom color classes not working.

**Solution:**
Tailwind v4 requires mapping variables inside `@theme inline` in `globals.css`.

---

### Error #003: Public Assets Path
**Date:** 2026-01-20  
**Type:** Technical  
**Problem:** Images not loading or 404.

**Solution:**
Ensure images are in the `public/` directory and paths start with `/`.

---

### Error #002: Hydration Mismatch
**Date:** 2026-01-20  
**Type:** Technical  
**Problem:** Text content differs between server and client (common with random values or dates).

**Solution:**
Use `useEffect` for client-only state or standardize Date formatting.

---

### Error #001: Sanity API Token (Write Access)
**Date:** 2026-01-19  
**Type:** CMS / Security  
**Problem:** Batch scripts failing with 403 Forbidden.

**Solution:**
Use a "Viewer" token for public site, but a "Editor/Admin" token in `.env` for maintenance scripts.

---

## 📈 Prevention Checklist
- [ ] Run `npm run build` locally before push.
- [ ] Check for hardcoded colors (search for `#` in `.tsx` files).
- [ ] Verify image `alt` and `contextTag`.
- [ ] Use `Link` for all internal paths.

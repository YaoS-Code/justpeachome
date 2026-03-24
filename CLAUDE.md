# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Just Peac Homes — a Calgary-based renovation and custom home builder website. Production domain: `justpeachome.ca`. Monorepo with two independent apps: a Next.js frontend and a Sanity Studio.

## Repository Structure

```
/                        Monorepo root (minimal package.json for build/deploy shortcuts)
├── frontend/            Next.js 15 app (App Router, React 18, TypeScript, Tailwind v4)
├── studio-borui/        Sanity Studio v5
├── scripts/             Utility scripts (hardcoding checks, debug, migrations)
├── docs/                Project documentation (standards, strategies, features, troubleshooting)
├── generated-assets/    AI-generated hero images
└── deploy.sh            Full deployment script (studio + frontend)
```

## Commands

### Frontend (`cd frontend`)
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run pages:build` — Cloudflare Pages build via `@cloudflare/next-on-pages`
- `npm run pages:deploy` — build + deploy to Cloudflare Pages via wrangler

### Sanity Studio (`cd studio-borui`)
- `npm run dev` — local studio dev server
- `npm run build` — build studio
- `npm run deploy` — deploy studio to Sanity hosting

### Root
- `npm run build` — builds frontend
- `npm run deploy` — deploys frontend to Cloudflare Pages
- `./deploy.sh` — deploys both studio and frontend

## Architecture

### Data Flow
All pages are async server components that fetch from Sanity via GROQ queries defined in `frontend/lib/sanity.ts`. No client-side data fetching. The root layout (`app/layout.tsx`) fetches services, projects, communities, and site settings in parallel to populate the global navigation and footer.

### Caching & Revalidation
ISR with `revalidate = 60` on most pages. On-demand revalidation via `/api/revalidate` webhook endpoint (Edge Runtime) triggered by Sanity document changes.

### Sanity Integration
- Project ID: `yoxfbvg1`, Dataset: `production`, API version: `2025-01-20`
- Client config, image URL builder, all TypeScript interfaces, and all GROQ query functions live in `frontend/lib/sanity.ts`
- Singleton document types for page-level settings: `homePage`, `aboutPage`, `contactPage`, `siteSettings`, `designSystem`, `blogPage`, `servicesPage`, `projectsPage`
- `DesignSystemProvider` component injects Sanity-managed design tokens (colors, typography) as CSS custom properties at runtime

### Routing
- `/` `/about` `/contact` `/portfolio` — static pages
- `/blog` `/blog/[slug]` — blog listing + detail
- `/services` `/services/[slug]` — services listing + detail
- `/projects` `/project/[slug]` — projects listing + detail (note: listing is plural, detail is singular)
- `/communities` `/communities/[slug]` — communities listing + detail
- `/[slug]` — legal pages (privacy, terms)
- `/api/revalidate` — Sanity webhook endpoint

### Styling
"Organic Modern" theme using Tailwind v4 with `@theme inline` blocks in `globals.css`. CSS custom properties define the color palette (warm whites/creams, clay/rust accents, olive text). Fonts: Cormorant Garamond (headings), Manrope (body). Custom utility classes: `.btn-primary`, `.btn-secondary`, `.texture-paper`, `.texture-wood`.

### SEO
Every page implements `generateMetadata()` and JSON-LD structured data via helpers in `frontend/lib/schema.ts`. Dynamic `sitemap.ts` and `robots.ts` at app root. Canonical URLs point to `justpeachome.ca`.

### Contact Form
Server Action in `app/actions.ts` sends email via Resend API.

### Deployment
Primary target is Cloudflare Pages (`wrangler.toml`). Images are unoptimized (`next.config.ts`) for Cloudflare compatibility. Vercel config exists as alternative (`vercel.json`).

## Environment Variables

- `RESEND_API_KEY` — contact form email
- `SANITY_API_TOKEN` — Sanity API access
- `SANITY_REVALIDATE_SECRET` — webhook revalidation auth

## Key Conventions

- Path alias: `@/*` maps to `frontend/*`
- TypeScript strict mode; build currently ignores TS and ESLint errors (`next.config.ts`)
- Types split between `frontend/lib/sanity.ts` (main interfaces) and `frontend/types/` (project/blog/portable text types)
- Interactive components use `"use client"` directive; everything else is server-rendered
- Projects use a dual-path content strategy (investment vs. luxury) with different UI treatments
- Megamenu navigation data is statically defined in `frontend/lib/menu-data.ts`
- Sanity schema types are in `studio-borui/schemaTypes/`

# JUST PEAC HOMES - Styling Guide & Design System

**Status**: Official Design Reference  
**Last Updated**: 2026-01-22

---

## 1. Design Philosophy

### Core Principles
1. **Warmth over Sterility**: Use warm, organic colors instead of cold grays.
2. **Craftsmanship Focus**: Highlight details, natural materials, and textures.
3. **Local Excellence**: Emphasize Calgary-specific knowledge (R-CG zoning, climate adaptation).
4. **Organic Modern**: A harmonious blend of contemporary lines with natural elements (wood, stone, clay).

---

## 2. Color System (Design Tokens)

All colors are defined as CSS variables in `frontend/app/globals.css`. **Hardcoded hex/rgb values are strictly forbidden in components.**

### 2.1 Text Colors
| Variable | Value | Purpose |
|----------|-------|---------|
| `--text-primary` | `#1A1A1A` | Main body text, high contrast |
| `--text-secondary` | `#2D3748` | Subtitles, metadata, minor sections |
| `--text-muted` | `#4A5568` | Captions, auxiliary info |
| `--text-olive` | `#2C3E2D` | Display headings, brand marks |
| `--text-white` | `#FFFFFF` | Text on dark backgrounds/buttons |

### 2.2 Background Colors
| Variable | Value | Purpose |
|----------|-------|---------|
| `--background-warm` | `#FAF8F5` | Primary site background |
| `--background-cream` | `#F5F3EF` | Section backgrounds, offsets |
| `--surface-white` | `#FFFFFF` | Cards, navigation bars |
| `--surface-warm` | `#FFFCF8` | Alternative card/section background |
| `--surface-stone` | `#F0EBE5` | Texture/Secondary section background |

### 2.3 Accent Colors
| Variable | Value | Purpose |
|----------|-------|---------|
| `--accent-clay` | `#B8653E` | Primary CTA, links, focus states |
| `--accent-clay-dark` | `#9A5528`| Hover states for clay elements |
| `--accent-taupe` | `#8B7355` | Secondary actions, muted accents |
| `--accent-wood` | `#6B5D4F` | Hover states for taupe/wood elements |

---

## 3. Typography

### 3.1 Font Families
- **Display (Headings)**: `'Cormorant Garamond', serif`
- **Body (Text/UI)**: `'Manrope', sans-serif`

### 3.2 Type Scale
| Level | Font Size | Weight | Line Height |
|-------|-----------|--------|-------------|
| Display/Hero | 3.5rem (56px) | 700 | 1.1 |
| H1 (Page Title) | 3rem (48px) | 600 | 1.2 |
| H2 (Section) | 2.5rem (40px) | 600 | 1.2 |
| H3 (Subsection) | 2rem (32px) | 600 | 1.3 |
| Body (Base) | 1rem (16px) | 400 | 1.6 |
| Nav/Button | 0.9375rem (15px) | 500 | 1.2 |

---

## 4. Spacing System (8px Base)

Use multiples of `0.25rem` (4px).

| Token | Rem | Px | Usage |
|-------|-----|----|-------|
| `--space-xs` | 0.5 | 8 | Gaps, small margins |
| `--space-sm` | 1.0 | 16 | Base component padding |
| `--space-md` | 1.5 | 24 | Card content padding |
| `--space-lg` | 2.0 | 32 | Grid gaps, medium sections |
| `--space-xl` | 3.0 | 48 | Large section vertical spacing |
| `--space-2xl`| 4.0 | 64 | Hero/Major section spacing |

---

## 5. UI Components

### 5.1 Buttons

**Primary (Clay)**:
- Background: `var(--accent-clay)`
- Text: `var(--text-white)`
- Hover: `-1px` transform + `var(--accent-clay-dark)`

**Secondary (Taupe)**:
- Background: `var(--accent-taupe)`
- Text: `var(--text-white)`
- Hover: `-1px` transform + `var(--accent-wood)`

**Outline**:
- Border: `2px solid var(--accent-clay)`
- Text: `var(--accent-clay)`

### 5.2 Cards
- Background: `var(--surface-white)`
- Radius: `0.75rem`
- Shadow: `0 4px 12px rgba(0,0,0,0.05)`
- Hover: `translateY(-4px)` + Shadow increase

---

## 6. Implementation Rules

1. **Mobile First**: Always design and code for mobile (`375px`) before expanding to tablet or desktop.
2. **Standardized Icons**: Use `Lucide React` with `2px` stroke weight.
3. **Responsive Images**: Use Next.js `<Image>` with proper `sizes` and `priority` for above-fold content.
4. **Interactive States**: Every interactive element must have a visible `:hover` and `:focus` state.

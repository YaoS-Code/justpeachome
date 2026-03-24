# Service Page Standard (SPS)

**Status**: Official Template  
**Reference Implementation**: `backyard-suites`

---

## 1. Content Structure

Every service page must contain the following modular sections in this order:

### 1.1 Hero Section
- **Visual**: High-resolution, photorealistic render or photo (dimmed 30% for text readability).
- **Heading (H1)**: Clear Service Name (e.g., "Custom Homes", "Backyard Suites").
- **Subheading**: Value proposition summary (e.g., "Sustainable luxury living...").

### 1.2 Features Grid (`service-features.tsx`)
- **Quantity**: Exactly 3 items.
- **Format**: Icon + Title + 2-3 line description.
- **Content Strategy**:
    - Item 1: **Financial/Value** (ROI, Rental Income, Market Value).
    - Item 2: **Lifestyle/Grant** (Multigenerational, specific Govt Grants like HAF).
    - Item 3: **Process/Quality** (Asset reliability, expertise).

### 1.3 Main Content (Portable Text)
- **Introduction**: "The Problem/Opportunity" header.
- **Paragraphs**: Informative, local context (mentioning Calgary, specific bylaws).
- **Bullet Points**: "End-to-End Service" list.

### 1.4 Gallery Grid (`service-gallery.tsx`)
- **Quantity**: 3-6 Images.
- **Mix**:
    - Exterior Front (Context)
    - Interior Hero (Living/Kitchen)
    - Detail Shot (Materials/Texture)
    - Aerial/Context (Relationship to lot)

### 1.5 FAQ Accordion (`service-faq.tsx`)
- **Quantity**: 4 Questions.
- **Mandatory Topics**:
    - **Permits/Zoning**: Mention specific Calgary bylaws (R-CG, DP/BP).
    - **Cost**: "Transparent Pricing" with realistic ranges.
    - **Timeline**: Conservative estimates (5-12 months).
    - **Technical**: Specifics (Utility connections, Panel upgrades, Foundation types).

### 1.6 CTA Section
- **Head**: Action-oriented ("Ready to start...?").
- **Button**: Primary Clay color, white text (forced `!text-white`).

---

## 2. Technical Implementation

### 2.1 Sanity ID Strategy
- **Slug**: Kebab-case (e.g., `custom-homes`, `renovations`).
- **Seed Scripts**: localized in `frontend/scripts/seed-[service-slug].mjs`.
- **Image Scripts**: localized in `frontend/scripts/upload-[service-slug]-gallery.mjs`.

### 2.2 SEO Checklist
- **Meta Title**: `[Service Name] Calgary | [USP Keyword]`
- **Meta Desc**: Include price range, timeline, or specific zoning keywords.
- **JSON-LD**: `Service` + `LocalBusiness` schema.

---

## 3. Aesthetic Guidelines (Organic Modern)
- **Palette**: Warm wood, stone, clay, white oaks, black detailing.
- **Vibe**: Peaceful, high-end, clean lines but texture-rich.
- **Lighting**: Golden hour, soft daylight, warm interior glows.

# JUST PEAC HOMES - Sanity CMS Guidelines

**Status**: Operational Guide  
**Last Updated**: 2026-01-22

---

## 1. Data Structure Levels

### Level 1: Schema Design
Every document type (Project, Service, Post) must include:
- **SEO Object**: `metaTitle` (60 chars), `metaDescription` (160 chars), `ogImage`.
- **Accessible Image**: Custom image object with mandatory `alt`, `caption`, and `contextTag`.

### Level 2: Content Entry
- **Conclusion First**: First sentence of text blocks should summarize the content.
- **Specific Headings**: Use H2/H3 for specific search intents (e.g., "Why choose wood vs tile?").

---

## 2. Image Management

### 2.1 Context Tags
This selection determines how the frontend logic renders metadata and JSON-LD.

- **`product`**: High-value work. Mandatory Alt + Caption. Included in rich snippets.
- **`mood`**: Background/Emotional. Requires Alt.
- **`decorative`**: Purely aesthetic. Hidden from screen readers (`aria-hidden`).

### 2.2 Image Attributes
- **Dimensions**: Desktop Hero (1920x1080), Card (1200x800), Blog (1200x630).
- **Format**: Upload high-quality JPEG/PNG; Sanity CDN converts to WebP/AVIF automatically.

---

## 3. Core Schemas Reference

### 3.1 Home Page
- **Hero**: Headline, Subheadline, Background Image, CTA.
- **Sections**: Dynamic array of section objects (e.g., Stats, Testimonials).

### 3.2 Services
- **Slug**: Must be unique and hyphenated.
- **Short Description**: Used for meta description and card previews.

---

## 4. Technical Implementation

### 4.1 GROQ Queries
Always use projection for clean object structures.
```groq
*[_type == "project"] {
  title,
  "slug": slug.current,
  "imageUrl": coverImage.asset->url
}
```

### 4.2 Portable Text
Map Sanity blocks to semantic HTML:
- `normal` -> `p`
- `h2` -> `h2`
- `bullet` -> `ul/li`
- `image` -> `<SanityImage>` component

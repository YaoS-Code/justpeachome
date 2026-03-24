# Consultation Service Page Standard (CSPS)

**Status**: Official Template
**Reference Implementation**: `architectural-feasibility-study`

---

## 1. Content Structure

Every consultation service page must contain the following modular sections in this order:

### 1.1 Hero Section (Standard)
- **Visual**: High-quality, abstract or process-focused image (e.g., blueprints, site meeting, textures).
- **Heading (H1)**: Professional Service Name (e.g., "Architectural Feasibility Study").
- **Subheading**: Benefit-driven summary (e.g., "Minimize risk and maximize ROI before you build.").

### 1.2 Problem/Solution (Portable Text)
- **Introduction**: Briefly articulate the client's pain point (e.g., "Uncertainty about zoning...").
- **Solution**: How our expertise solves it.

### 1.3 The Process (New Section)
- **Format**: Vertical or Horizontal Step-by-Step guide.
- **Content**: 3-5 distinct steps.
    - Example: "1. Site Review -> 2. Zoning Analysis -> 3. Massing Models -> 4. Financial Report".
- **Purpose**: Demystify the intangible service and show concrete value.

### 1.4 Deliverables / What You Get (Features Grid)
- **Quantity**: 3-4 items.
- **Format**: detailed list or cards.
- **Content**:
    - **Report**: "Comprehensive PDF Report".
    - **Visuals**: "3D Massing Models".
    - **Financials**: "Budget Estimate".

### 1.5 FAQ Accordion
- **Focus**: Timeline, Cost, Prerequisites.

### 1.6 CTA Section
- **Head**: "Ready to clarify your project?"
- **Button**: "Book Consultation".

---

## 2. Technical Implementation

### 2.1 Sanity Schema Updates
- **New Field**: `process` (Array of objects).
    - `title`: Step Name.
    - `description`: Details.
    - `order`: Number.

### 2.2 SEO Checklist
- **Meta Title**: `Calgary [Service Name] | Just Peach Homes`
- **Keywords**: "Feasibility Study", "Project Management", "Infill Design".

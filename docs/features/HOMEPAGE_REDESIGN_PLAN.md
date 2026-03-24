# Homepage Dual Path Strategy - Implementation Summary

## 🎯 Strategy Overview

The homepage has been redesigned to implement a **"Dual Path Strategy"** that separates two distinct customer types:

1. **"For Living"** - Luxury/self-use customers (dream home, high-end finishes)
2. **"For Investing"** - Rental/ROI customers (legal suites, durable, cost-effective)

This addresses the business reality that many renovation requests are for rental properties (出租), while others are for self-use (自用).

---

## ✅ Completed: Sanity Schema Updates

### 1. Hero Type Selection
Added `heroType` field to choose between:
- **Single Hero** (Traditional) - One unified message
- **Split Hero** (Dual Path) - Separate paths for Living vs Investing

### 2. Split Hero Section
New `splitHero` object with:
- **Main Headline**: "Renovations Tailored to Your Purpose"
- **Main Subheadline**: "Whether it's your forever home or your next income property..."
- **Left Side** (For Living):
  - Image, Headline ("Elevate Your Lifestyle"), Subheadline, CTA
  - Keywords: Custom Design • Premium Materials • Luxury Finish
- **Right Side** (For Investing):
  - Image, Headline ("Maximize Your ROI"), Subheadline, CTA
  - Keywords: Legal Suite • Durable • Cost-Effective

### 3. Value Proposition Section
Comparison table showing:
- **Premium Standard** (For Living)
  - Focus: Unique aesthetics, smart home, high-end appliances
  - Materials: Hardwood, quartz, custom cabinetry
  - Design: Personalized to your taste
- **Investment Standard** (For Investing)
  - Focus: Durability, easy maintenance, code compliance
  - Materials: Vinyl plank (LVP), laminate, pre-fab cabinets
  - Design: Neutral tones for mass market appeal

### 4. Grant Program Hook Section
Highlights the **$10,000 Calgary Secondary Suite Incentive**:
- Title: "Get Paid to Build Your Rental Suite"
- Description: Grant details and eligibility
- CTA: "Check My Eligibility"
- Customizable highlight color (default: clay #B8653E)

### 5. Featured Projects with Tabs
Enhanced to support tabbed view:
- **Tab 1**: Luxury Living (high-end renovations)
- **Tab 2**: Income Suites (rental properties with ROI potential)

---

## 📋 Next Steps

### 1. Populate Data in Sanity Studio
1. Open Sanity Studio: `cd studio-borui && npm run dev`
2. Navigate to "Home Page"
3. Select **"Split Hero (Dual Path)"** for Hero Type
4. Fill in the Split Hero fields:
   - Upload images for left (luxury kitchen) and right (basement suite)
   - Customize headlines and CTAs
5. Enable and configure the Grant Program section
6. Publish changes

### 2. Update Frontend Components
Need to update `frontend/app/page.tsx` to:
- Check `heroType` field
- Conditionally render `HeroSplit` component when `heroType === 'split'`
- Add new sections for Value Proposition and Grant Program
- Update Featured Projects to support tabs

### 3. Create New Components (if needed)
- `ValuePropositionSection` - Comparison table
- `GrantProgramHook` - Highlighted grant information
- `FeaturedProjectsTabs` - Tabbed project showcase

---

## 🎨 Design Principles

1. **Clear Separation**: Visitors immediately see two distinct paths
2. **Visual Contrast**: Left (warm, luxurious) vs Right (bright, practical)
3. **Grant as Hook**: $10,000 incentive as powerful conversion tool for investors
4. **Professional Positioning**: Shows expertise in both luxury and investment renovations
5. **ROI Focus**: Income Suites tab can show "Monthly Rental Potential"

---

## 📊 Expected Benefits

1. **Higher Conversion**: Visitors self-select into the right path
2. **Reduced Confusion**: No more mixing luxury and budget messaging
3. **Grant Leverage**: $10,000 incentive attracts investment customers
4. **Professional Image**: Demonstrates understanding of different customer needs
5. **Better Targeting**: Can track which path gets more engagement

---

## 🔧 Technical Details

**Files Modified:**
- `studio-borui/schemaTypes/homePage.ts` - Added new fields

**Files to Update:**
- `frontend/app/page.tsx` - Add conditional rendering
- `frontend/components/hero-split.tsx` - Already exists, ready to use
- Create new components for Value Proposition and Grant sections

**Data Added:**
- Grant program information already added to "Basement & Secondary Suites" service
- Ready to be referenced in the Grant Program Hook section


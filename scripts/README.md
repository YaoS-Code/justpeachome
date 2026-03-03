# JUST PEAC HOMES - Scripts Directory

This directory contains utility scripts for managing Sanity CMS content, optimizing assets, and performing historical data migrations.

## 📂 Structure

### 🛠️ [maintenance/](maintenance/)
Ongoing tools for keeping the site healthy and optimized.
- **`sanity-audit.mjs`**: Checks for missing metadata, alt text, and broken asset references across all Sanity document types.

### 🔍 [debug/](debug/)
Ad-hoc tools for inspecting data and testing queries.
- **`sanity-playground.mjs`**: A generic script for running GROQ queries against the Sanity production dataset.
- **`list-all-assets.mjs`**: Dumps all image assets currently stored in Sanity with their IDs and filenames.

### 📦 [migrations/](migrations/)
Historical scripts used for batch updates. Referenced here for record-keeping and potential reuse.
- **`migrate-seo-metadata.mjs`**: Performs batch updates of SEO meta tags and AI summaries for Projects, Services, and Posts.
- **`migrate-image-metadata.mjs`**: Standardizes image alt text and context tags based on project design rules.
- **`restore-image-assets.mjs`**: Re-links orphan image objects to their corresponding assets in Sanity.

## 🚀 How to Run

Most scripts require a Sanity API Token with write access.

1. Ensure your `.env` file contains `SANITY_API_TOKEN`.
2. Run from the project root using `node`:

```bash
# Example: Running a maintenance audit
node scripts/maintenance/sanity-audit.mjs
```

## ⚠️ Safety Warning
Scripts in `migrations/` perform write operations. Always verify the data in a development or staging dataset before committing to production.

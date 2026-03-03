import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

async function ensureGalleryImages() {
    console.log('🔍 Checking for projects with empty galleries...\n')

    // Fetch all projects with their gallery and coverImage
    const projects = await client.fetch(`
    *[_type == "project"] {
      _id,
      title,
      coverImage,
      gallery
    }
  `)

    let updatedCount = 0

    for (const project of projects) {
        const hasGallery = project.gallery && project.gallery.length > 0

        if (!hasGallery) {
            if (project.coverImage && project.coverImage.asset) {
                console.log(`📸 Populating gallery for: ${project.title}`)

                // Create a new gallery item based on the cover image
                const galleryItem = {
                    _type: 'accessibleImage',
                    _key: `gallery-${Math.random().toString(36).substr(2, 9)}`,
                    asset: {
                        _type: 'reference',
                        _ref: project.coverImage.asset._ref || project.coverImage.asset._id
                    },
                    alt: `${project.title} - Detail View`,
                    usageType: 'all',
                    contextTag: 'mood'
                }

                try {
                    await client
                        .patch(project._id)
                        .setIfMissing({ gallery: [] })
                        .append('gallery', [galleryItem])
                        .commit()

                    console.log(`✅ Added 1 image to ${project.title}`)
                    updatedCount++
                } catch (err) {
                    console.error(`❌ Failed to update ${project.title}:`, err)
                }
            } else {
                console.warn(`⚠️  Skipping ${project.title}: No cover image available to use as fallback.`)
            }
        } else {
            console.log(`✓ ${project.title} already has ${project.gallery.length} images`)
        }
    }

    console.log(`\n✨ Update complete! Added gallery images to ${updatedCount} projects.`)
}

ensureGalleryImages().catch(console.error)


import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

// Configure the client
const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

const ARTIFACTS_DIR = '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8'

// Map of image filenames (prefixes) to their intended use in the Seton project
const imageMapping = {
    'legal_suite_living_room': { field: 'coverImage', title: 'Legal Suite Living Room' },
    'rental_suite_kitchen': { field: 'gallery', title: 'Modern Rental Kitchen' },
    'legal_basement_bedroom': { field: 'gallery', title: 'Bedroom with Egress Window' },
    'compact_basement_bathroom': { field: 'gallery', title: 'Efficient Bathroom Design' },
    'egress_window_detail': { field: 'gallery', title: 'Code-Compliant Egress Window' },
    'backyard_suite_exterior': { field: 'gallery', title: 'Backyard Suite Exterior' }, // Adding to gallery for now
    // 'calgary_community_street' is for community headers, will handle separately or add to gallery
}

// Actual full filenames found in the directory
const files = [
    'backyard_suite_exterior_1769819407833.png',
    'compact_basement_bathroom_1769819454645.png',
    'egress_window_detail_1769819430344.png',
    'legal_basement_bedroom_1769819380476.png',
    'legal_suite_living_room_1769819443771.png',
    'rental_suite_kitchen_1769819394058.png'
]

async function uploadImages() {
    console.log('🚀 Starting image upload process...')

    // find the demo project
    const projectSlug = 'seton-legal-suite-investment'
    const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug: projectSlug })

    if (!project) {
        console.error(`❌ Project with slug "${projectSlug}" not found. Run seed script first.`)
        return
    }

    console.log(`Found project: ${project.title} (${project._id})`)

    const galleryImages = []
    let coverImageAssetId = null

    for (const filename of files) {
        const filePath = path.join(ARTIFACTS_DIR, filename)
        console.log(`Uploading ${filename}...`)

        try {
            const asset = await client.assets.upload('image', createReadStream(filePath), {
                filename: filename
            })

            console.log(`✅ Uploaded asset: ${asset._id}`)

            // Determine where this image goes
            const key = Object.keys(imageMapping).find(k => filename.startsWith(k))

            if (key) {
                const mapping = imageMapping[key]
                const imageObject = {
                    _type: 'accessibleImage',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    },
                    alt: mapping.title,
                    caption: mapping.title
                }

                if (mapping.field === 'coverImage') {
                    coverImageAssetId = imageObject
                } else if (mapping.field === 'gallery') {
                    galleryImages.push({
                        ...imageObject,
                        _key: Math.random().toString(36).substring(7)
                    })
                }
            }

        } catch (err) {
            console.error(`❌ Failed to upload ${filename}:`, err.message)
        }
    }

    // Update the project
    const patch = client.patch(project._id)

    if (coverImageAssetId) {
        console.log('Setting cover image...')
        patch.set({ coverImage: coverImageAssetId })
    }

    if (galleryImages.length > 0) {
        console.log(`Adding ${galleryImages.length} images to gallery...`)
        // Append to existing gallery or create new
        patch.setIfMissing({ gallery: [] })
        patch.append('gallery', galleryImages)

        // Also use the first gallery image (likely kitchen or bedroom) as the hoverImage/secondary image
        // Note: our frontend logic takes the first gallery image as hover image automatically if not set, 
        // but the schema doesn't have an explicit hoverImage field, it uses gallery[0].

        // We can also set 'heroImage' to one of them, maybe the kitchen
        const kitchenImg = galleryImages.find(img => img.alt.includes('Kitchen'))
        if (kitchenImg) {
            patch.set({ heroImage: kitchenImg })
        }
    }

    await patch.commit()
    console.log('🎉 Project images updated successfully!')
}

uploadImages().catch(err => {
    console.error('Fatal error:', err)
})

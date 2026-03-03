import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const infillUpdate = {
    slug: 'infill-development',
    imagePath: '/Users/borui/.gemini/antigravity/brain/2c418e2f-52c8-400f-b31c-848dc13a78d6/modern_infill_semi_detached_calgary_1769197371992.png',
    altText: 'JUST PEAC HOMES modern R-CG semi-detached infill development in Calgary with white stucco and wood accents.',
}

async function updateInfill() {
    console.log('🚀 Updating Infill Development image...')

    try {
        console.log(`  - Fetching Infill Development document...`)
        const doc = await client.fetch(`*[_type == "service" && slug.current == $slug][0]`, { slug: infillUpdate.slug })

        if (!doc) {
            console.error('❌ Document not found!')
            return
        }

        console.log(`  - Uploading new image...`)
        const imageAsset = await client.assets.upload('image', readFileSync(infillUpdate.imagePath), {
            filename: `infill-development-v2.png`
        })

        console.log(`  - Patching document...`)
        await client.patch(doc._id)
            .set({
                coverImage: {
                    _type: 'accessibleImage',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id
                    },
                    alt: infillUpdate.altText,
                    contextTag: 'product'
                }
            })
            .commit()

        console.log(`    ✅ Success: Updated Infill Development image`)
    } catch (error) {
        console.error(`    ❌ Failed: ${error.message}`)
    }
}

updateInfill()

import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// Load environment variables from .env
dotenv.config({ path: '.env' })

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN,
})

const SERVICE_SLUG = 'backyard-suites'
const IMAGES = [
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/backyard_suite_exterior_front_1769273821075.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/backyard_suite_interior_living_1769273840078.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/backyard_suite_detail_evening_1769273859767.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/backyard_suite_context_aerial_1769273878586.png',
]

async function uploadGallery() {
    console.log(`🚀 Uploading ${IMAGES.length} images to gallery...`)

    try {
        // 1. Find the service
        const service = await client.fetch('*[_type == "service" && slug.current == $slug][0]', { slug: SERVICE_SLUG })

        if (!service) {
            throw new Error(`Service "${SERVICE_SLUG}" not found. Seed content first.`)
        }

        const galleryAssets = []

        // 2. Upload images
        for (const imagePath of IMAGES) {
            if (!fs.existsSync(imagePath)) {
                console.warn(`⚠️ File not found: ${imagePath}, skipping...`)
                continue
            }

            console.log(`Uploading ${path.basename(imagePath)}...`)
            const buffer = fs.readFileSync(imagePath)
            const asset = await client.assets.upload('image', buffer, {
                filename: path.basename(imagePath)
            })

            galleryAssets.push({
                _key: asset._id, // Use asset ID as key for simplicity
                _type: 'accessibleImage',
                alt: `Gallery image for ${SERVICE_SLUG}`,
                contextTag: 'product',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                }
            })
        }

        // 3. Patch the service with the new gallery
        await client.patch(service._id)
            .set({ gallery: galleryAssets })
            .commit()

        console.log(`✅ Service "${SERVICE_SLUG}" updated with ${galleryAssets.length} gallery images!`)

    } catch (error) {
        console.error('❌ Upload failed:', error.message)
        process.exit(1)
    }
}

uploadGallery()

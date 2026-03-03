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

const SERVICE_SLUG = 'basement-development'
const IMAGES = [
    // Rental Standard (Hero Candidate)
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_rental_clean_bright_1769276543063.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_bedroom_egress_1769276561938.png',

    // Luxury Options
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_hero_lounge_1769276424555.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_gym_glass_1769276446217.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_theater_cozy_1769276465021.png',
    '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_bathroom_spa_1769276484424.png',
]

async function uploadGallery() {
    console.log(`🚀 Uploading ${IMAGES.length} images for Basement Service...`)

    try {
        // 1. Find the service
        const service = await client.fetch('*[_type == "service" && slug.current == $slug][0]', { slug: SERVICE_SLUG })

        if (!service) {
            throw new Error(`Service "${SERVICE_SLUG}" not found. Seed content first.`)
        }

        const galleryAssets = []
        let heroAssetId = null

        // 2. Upload images
        for (const [index, imagePath] of IMAGES.entries()) {
            if (!fs.existsSync(imagePath)) {
                console.warn(`⚠️ File not found: ${imagePath}, skipping...`)
                continue
            }

            console.log(`Uploading ${path.basename(imagePath)}...`)
            const buffer = fs.readFileSync(imagePath)
            const asset = await client.assets.upload('image', buffer, {
                filename: path.basename(imagePath)
            })

            // First image (Clean Rental) becomes the Hero
            if (index === 0) heroAssetId = asset._id

            galleryAssets.push({
                _key: asset._id,
                _type: 'accessibleImage',
                alt: index < 2 ? 'Modern legal basement rental suite in Calgary' : 'Luxury basement renovation detail',
                contextTag: 'product',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                }
            })
        }

        // 3. Patch the service with new gallery AND new cover image
        await client.patch(service._id)
            .set({
                gallery: galleryAssets,
                coverImage: {
                    _type: 'accessibleImage',
                    alt: 'Bright and modern legal basement rental suite with LVP flooring',
                    contextTag: 'product',
                    asset: {
                        _type: 'reference',
                        _ref: heroAssetId
                    }
                }
            })
            .commit()

        console.log(`✅ Service "${SERVICE_SLUG}" updated with new Hero + ${galleryAssets.length} gallery images!`)

    } catch (error) {
        console.error('❌ Upload failed:', error.message)
        process.exit(1)
    }
}

uploadGallery()

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
const IMAGE_PATH = '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/backyard_suite_modern_1769273438154.png'

async function uploadImage() {
    console.log(`🚀 Uploading image from ${IMAGE_PATH}...`)

    try {
        if (!fs.existsSync(IMAGE_PATH)) {
            throw new Error(`File not found at ${IMAGE_PATH}`)
        }

        // 1. Upload the image asset
        const buffer = fs.readFileSync(IMAGE_PATH)
        const asset = await client.assets.upload('image', buffer, {
            filename: path.basename(IMAGE_PATH)
        })

        console.log(`✅ Image uploaded! Asset ID: ${asset._id}`)

        // 2. Find the service
        const service = await client.fetch('*[_type == "service" && slug.current == $slug][0]', { slug: SERVICE_SLUG })

        if (!service) {
            throw new Error(`Service "${SERVICE_SLUG}" not found. Seed content first.`)
        }

        // 3. Patch the service with the new image
        await client.patch(service._id)
            .set({
                coverImage: {
                    _type: 'accessibleImage',
                    alt: 'Modern architectural backyard garden suite in Calgary with wood siding',
                    contextTag: 'product',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id
                    }
                }
            })
            .commit()

        console.log(`✅ Service "${SERVICE_SLUG}" updated with new cover image!`)

    } catch (error) {
        console.error('❌ Upload failed:', error.message)
        process.exit(1)
    }
}

uploadImage()

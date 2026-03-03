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
const IMAGE_LEFT = '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_split_lifestyle_1769276951456.png'
const IMAGE_RIGHT = '/Users/borui/.gemini/antigravity/brain/dddb9d64-96a4-4780-88de-5cb437505a81/basement_split_income_1769276936147.png'

async function setupSplitHero() {
    console.log(`🚀 Setting up Split Hero for ${SERVICE_SLUG}...`)

    try {
        // 1. Find the service
        const service = await client.fetch('*[_type == "service" && slug.current == $slug][0]', { slug: SERVICE_SLUG })

        if (!service) {
            throw new Error(`Service "${SERVICE_SLUG}" not found. Seed content first.`)
        }

        // 2. Upload Left Image (Lifestyle)
        console.log(`Uploading Lifestyle Image...`)
        const bufferLeft = fs.readFileSync(IMAGE_LEFT)
        const assetLeft = await client.assets.upload('image', bufferLeft, { filename: 'basement-lifestyle.png' })

        // 3. Upload Right Image (Income)
        console.log(`Uploading Income Image...`)
        const bufferRight = fs.readFileSync(IMAGE_RIGHT)
        const assetRight = await client.assets.upload('image', bufferRight, { filename: 'basement-income.png' })

        // 4. Patch Service
        const splitHeroConfig = {
            left: {
                image: {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: assetLeft._id }
                },
                headline: 'Expand Your Living',
                subheadline: 'Create the ultimate family sanctuary with a custom home theater, gym, or luxury lounge.',
                ctaText: 'View Lifestyle Packages',
                ctaLink: '/contact?type=lifestyle'
            },
            right: {
                image: {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: assetRight._id }
                },
                headline: 'Expand Your Income',
                subheadline: 'Generate $20k+/year with a legal secondary suite. Durable finishes, maximum ROI.',
                ctaText: 'Calculate ROI',
                ctaLink: '/contact?type=investment'
            }
        }

        await client.patch(service._id)
            .set({
                heroStyle: 'split',
                splitHero: splitHeroConfig
            })
            .commit()

        console.log(`✅ Service "${SERVICE_SLUG}" successfully updated with Split Hero!`)

    } catch (error) {
        console.error('❌ Setup failed:', error.message)
        process.exit(1)
    }
}

setupSplitHero()

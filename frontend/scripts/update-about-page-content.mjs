
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is missing from .env file')
    process.exit(1)
}

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2025-01-20',
})

async function uploadImage(filePath) {
    try {
        const fileBuffer = fs.readFileSync(filePath)
        const asset = await client.assets.upload('image', fileBuffer, {
            filename: path.basename(filePath),
        })
        console.log(`Image uploaded: ${asset._id}`)
        return asset._id
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error
    }
}

async function updateAboutPage() {
    try {
        // 1. Upload the hero image
        const imagePath = '/Users/borui/.gemini/antigravity/brain/90cda553-bf16-4cd3-ae1f-92403fb168b8/about_page_hero_1769548897812.png'
        console.log('Uploading hero image...')
        const imageId = await uploadImage(imagePath)

        // 2. Define FAQ content
        const faqs = [
            {
                _key: 'faq1',
                question: 'What is your typical project timeline?',
                answer: 'Each project is unique, but a typical whole-home renovation ranges from 4-6 months, whereas custom home builds can take 10-14 months. We provide a detailed schedule during our initial consultation so you know exactly what to expect.'
            },
            {
                _key: 'faq2',
                question: 'Do you handle all the permits and inspections?',
                answer: 'Yes, absolutely. We manage the entire permitting process with the City of Calgary, including development permits and building permits. We also coordinate all necessary inspections throughout the build to ensure code compliance.'
            },
            {
                _key: 'faq3',
                question: 'Can I live in my home during the renovation?',
                answer: 'For smaller renovations like a basement development or a single bathroom, it is often possible. However, for major main-floor renovations or whole-home projects, we highly recommend finding temporary accommodation to ensure your safety and comfort, and to allow our team to work efficiently.'
            },
            {
                _key: 'faq4',
                question: 'Do you offer a warranty on your work?',
                answer: 'We stand behind our craftsmanship. We offer a comprehensive 2-year warranty on all workmanship and materials we supply, which exceeds the industry standard. We also ensure all third-party manufacturer warranties are transferred to you.'
            },
            {
                _key: 'faq5',
                question: 'How do you handle budget changes or "extras"?',
                answer: 'We believe in transparency. Our initial quote is very detailed to minimize surprises. If you request changes or if unforeseen conditions arise, we use a formal Change Order process. You will always know the cost impact and must approve it in writing before we proceed.'
            }
        ]

        // 3. Patch the About Page
        // 3. Ensure document exists and update it
        // 3. Patch the active About Page document (ID: 'aboutPage')
        console.log('Updating About Page document (ID: aboutPage)...')
        await client.patch('aboutPage')
            .set({
                'hero.backgroundImage': {
                    _type: 'accessibleImage',
                    asset: {
                        _type: 'reference',
                        _ref: imageId
                    },
                    alt: 'Modern luxury living room interior with large windows'
                },
                'faqs': faqs
            })
            .commit()

        console.log('About Page updated successfully (ID: aboutPage)!')

    } catch (error) {
        console.error('Error updating About Page:', error)
    }
}

updateAboutPage()

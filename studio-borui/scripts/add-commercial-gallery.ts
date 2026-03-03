
import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

// Hardcoded paths to the generated artifact images
const GALLERY_IMAGES = [
    {
        path: '/Users/borui/.gemini/antigravity/brain/7ce0ad7c-a806-491f-bfcb-871569cede8b/commercial_portfolio_retail_boutique_1769967448763.png',
        alt: 'High-end custom retail boutique interior in Calgary'
    },
    {
        path: '/Users/borui/.gemini/antigravity/brain/7ce0ad7c-a806-491f-bfcb-871569cede8b/commercial_portfolio_tech_office_1769967461872.png',
        alt: 'Modern downtown Calgary tech office with open concept design'
    },
    {
        path: '/Users/borui/.gemini/antigravity/brain/7ce0ad7c-a806-491f-bfcb-871569cede8b/commercial_portfolio_medical_clinic_1769967474450.png',
        alt: 'Pristine modern medical clinic waiting area'
    }
]

async function addCommercialGallery() {
    console.log('Starting Commercial Gallery update...')

    // 1. Find the service
    const service = await client.fetch(`*[_type == "service" && slug.current == "commercial-renovations"][0]`)

    if (!service) {
        console.error('Service "commercial-renovations" not found!')
        return
    }

    console.log(`Found service: ${service.title}`)
    const uploadedImages = []

    // 2. Upload Images
    for (const img of GALLERY_IMAGES) {
        console.log(`Uploading: ${path.basename(img.path)}...`)
        try {
            const asset = await client.assets.upload('image', createReadStream(img.path), {
                filename: path.basename(img.path)
            })

            uploadedImages.push({
                _type: 'accessibleImage',
                _key: Math.random().toString(36).substring(7),
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                },
                alt: img.alt
            })
            console.log(`Uploaded ${asset._id}`)
        } catch (err) {
            console.error(`Failed to upload ${img.path}:`, err)
        }
    }

    // 3. Patch the document
    if (uploadedImages.length > 0) {
        console.log('Updating service gallery...')
        await client
            .patch(service._id)
            .setIfMissing({ gallery: [] })
            .append('gallery', uploadedImages)
            .commit()
        console.log('✅ Gallery successfully updated!')
    } else {
        console.warn('No images were uploaded.')
    }
}

addCommercialGallery()

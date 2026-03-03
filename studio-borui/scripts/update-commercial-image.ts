
import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

// Using strict createClient pattern as per skill rules
const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

const IMAGE_PATH = '/Users/borui/.gemini/antigravity/brain/7ce0ad7c-a806-491f-bfcb-871569cede8b/modern_commercial_office_interior_1769966830620.png'

async function updateServiceImage() {
    console.log('Uploading new commercial image...')

    // Upload the image asset
    const asset = await client.assets.upload('image', createReadStream(IMAGE_PATH), {
        filename: path.basename(IMAGE_PATH)
    })

    console.log(`Image uploaded: ${asset._id}`)

    // Find the service
    const service = await client.fetch(`*[_type == "service" && slug.current == "commercial-renovations"][0]`)

    if (!service) {
        console.error('Service not found!')
        return
    }

    console.log('Patching service...')

    // Patch the document
    await client
        .patch(service._id)
        .set({
            coverImage: {
                _type: 'accessibleImage',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                },
                alt: 'Modern minimalist commercial office interior'
            }
        })
        .commit()

    console.log('Done!')
}

updateServiceImage()

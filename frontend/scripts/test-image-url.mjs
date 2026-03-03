import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Configuration from frontend/lib/sanity.ts
const config = {
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-01-20',
}

const client = createClient(config)
const builder = imageUrlBuilder(client)

function urlForImage(source) {
    return builder.image(source).auto('format').quality(80)
}

async function testImageUrls() {
    console.log('🚀 Testing Sanity Image URL Generation...')
    console.log('Configuration:', config)

    try {
        console.log('Fetching services...')
        const services = await client.fetch(`*[_type == "service"]{
            title,
            coverImage
        }`)

        console.log(`Found ${services.length} services.`)

        services.forEach((service, index) => {
            console.log(`\n--- Service ${index + 1}: ${service.title} ---`)
            if (service.coverImage) {
                console.log('Cover Image Object:', JSON.stringify(service.coverImage, null, 2))

                try {
                    const url = urlForImage(service.coverImage).url()
                    console.log('Generated URL:', url)
                } catch (err) {
                    console.error('❌ Failed to generate URL:', err.message)
                }
            } else {
                console.log('⚠️ No cover image found.')
            }
        })

    } catch (err) {
        console.error('❌ Fetch failed:', err.message)
    }
}

testImageUrls()

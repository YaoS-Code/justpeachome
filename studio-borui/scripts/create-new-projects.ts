import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

const BRAIN_DIR = '/Users/borui/.gemini/antigravity/brain/669ff08b-6f8b-47a2-a63e-a70437dcdb7d'

async function uploadImageAndCreateAsset(imagePath: string, altText: string) {
    const filename = path.basename(imagePath)
    console.log(`📤 Uploading ${filename}...`)

    const asset = await client.assets.upload('image', createReadStream(imagePath), {
        filename: filename,
    })

    console.log(`✅ Uploaded: ${asset._id}`)

    return {
        _type: 'accessibleImage',
        asset: {
            _type: 'reference',
            _ref: asset._id
        },
        alt: altText,
        title: altText
    }
}

async function createNewProjects() {
    console.log('🚀 Starting new project creation...\n')

    // Upload images first
    const spaBathroomImage = await uploadImageAndCreateAsset(
        path.join(BRAIN_DIR, 'spa_bathroom_retreat_1769875648022.png'),
        'Luxury spa bathroom with freestanding tub and walk-in shower'
    )

    const garageSuiteImage = await uploadImageAndCreateAsset(
        path.join(BRAIN_DIR, 'garage_suite_exterior_1769875662243.png'),
        'Modern garage suite conversion exterior with living space above'
    )

    // Create Spa Bathroom project
    console.log('\n📝 Creating Spa Bathroom Retreat project...')
    const spaBathroom = await client.create({
        _type: 'project',
        _id: 'spa-bathroom-retreat',
        title: 'Elbow Park Spa Bathroom',
        slug: {
            _type: 'slug',
            current: 'elbow-park-spa-bathroom'
        },
        projectCategory: 'kitchen-bath',
        coverImage: spaBathroomImage,
        shortDescription: 'Luxury bathroom transformation with natural stone, freestanding soaking tub, and custom vanity.',
        tags: ['Bathroom', 'Spa', 'Luxury Bath', 'Stone', 'Elbow Park'],
        completionDate: '2025-10-15',
        featured: false
    })
    console.log(`✅ Created: ${spaBathroom.title}`)

    // Create Garage Suite project
    console.log('\n📝 Creating Modern Garage Suite project...')
    const garageSuite = await client.create({
        _type: 'project',
        _id: 'modern-garage-suite',
        title: 'Britannia Garage Suite Conversion',
        slug: {
            _type: 'slug',
            current: 'britannia-garage-suite'
        },
        projectCategory: 'backyard-suite',
        coverImage: garageSuiteImage,
        shortDescription: 'Detached garage conversion to modern living suite with full kitchen and bathroom.',
        tags: ['Garage Suite', 'Backyard', 'ADU', 'Conversion', 'Britannia'],
        completionDate: '2025-09-20',
        featured: false
    })
    console.log(`✅ Created: ${garageSuite.title}`)

    console.log('\n✨ New projects created successfully!')
}

createNewProjects().catch(console.error)

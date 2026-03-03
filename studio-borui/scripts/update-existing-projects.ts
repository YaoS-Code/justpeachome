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

async function uploadImage(imagePath: string, altText: string) {
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

async function updateExistingProjects() {
    console.log('🔄 Updating existing project images and content...\n')

    // Upload new images
    const legalSuiteImage = await uploadImage(
        path.join(BRAIN_DIR, 'legal_suite_living_1769875605835.png'),
        'Modern legal basement suite living room with egress windows'
    )

    const backyardSuiteImage = await uploadImage(
        path.join(BRAIN_DIR, 'backyard_garden_suite_1769875620686.png'),
        'Modern detached backyard garden suite exterior'
    )

    const kitchenImage = await uploadImage(
        path.join(BRAIN_DIR, 'modern_kitchen_design_1769875634575.png'),
        'Contemporary kitchen with white cabinets and quartz countertops'
    )

    // Update Seton Legal Basement Suite
    console.log('\n📝 Updating Seton Legal Basement Suite...')
    await client
        .patch('O7YtP3U9ZmUnyBia7ftUiq')
        .set({
            coverImage: legalSuiteImage,
            shortDescription: 'Income-generating legal basement suite with separate entrance, egress windows, and modern finishes. Fully code-compliant rental unit.',
            tags: ['Legal Suite', 'Basement', 'Investment', 'Seton', 'Rental Income'],
            completionDate: '2025-11-15'
        })
        .commit()
    console.log('✅ Updated')

    // Update Concept: Garden Suite
    console.log('\n📝 Updating Concept: Garden Suite...')
    await client
        .patch('concept-backyard-suite')
        .set({
            coverImage: backyardSuiteImage,
            shortDescription: 'Detached backyard garden suite (H-GO/R-CG compliant). Modern laneway home for family or rental income.',
            tags: ['Backyard Suite', 'Garden Suite', 'Laneway', 'H-GO Compliant', 'ADU'],
            title: 'Modern Garden Suite / Laneway House'
        })
        .commit()
    console.log('✅ Updated')

    // Update Killarney Kitchen
    console.log('\n📝 Updating Killarney Kitchen...')
    await client
        .patch('ksBd7J2rUVbRXaXvOwgeMt')
        .set({
            coverImage: kitchenImage,
            shortDescription: 'Contemporary kitchen renovation with custom shaker cabinets, quartz countertops, and premium appliances.',
            tags: ['Kitchen', 'Modern Design', 'Killarney', 'Renovation', 'White Cabinets'],
            completionDate: '2025-08-10'
        })
        .commit()
    console.log('✅ Updated')

    // Update Concept Legal Suite with better description
    console.log('\n📝 Updating Concept: Legal Basement Suite...')
    await client
        .patch('concept-legal-basement-suite')
        .set({
            shortDescription: 'Standard compliant legal basement suite design maximizing rental income potential with code-approved egress and separate utilities.',
            tags: ['Legal Suite', 'Concept', 'Investment', 'Basement', 'Code Compliant']
        })
        .commit()
    console.log('✅ Updated')

    console.log('\n✨ All project updates complete!')
}

updateExistingProjects().catch(console.error)

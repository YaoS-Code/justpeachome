import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const client = createClient({
    projectId: 'yoxfbvg1', // Hardcoded from SKILL.md
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN,
})

const IMAGES = [
    {
        name: 'legal_basement_bedroom',
        path: '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/legal_basement_bedroom_1769819380476.png',
        title: 'Legal Basement Bedroom',
        alt: 'Bright legal basement bedroom with large egress window'
    },
    {
        name: 'rental_suite_kitchen',
        path: '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/rental_suite_kitchen_1769819394058.png',
        title: 'Rental Suite Kitchen',
        alt: 'Modern and durable rental suite kitchen with quartz countertops'
    },
    {
        name: 'backyard_suite_exterior',
        path: '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/backyard_suite_exterior_1769819407833.png',
        title: 'Backyard Suite Exterior',
        alt: 'Modern detached backyard suite in Calgary'
    },
    {
        name: 'egress_window_detail',
        path: '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/egress_window_detail_1769819430344.png',
        title: 'Egress Window Detail',
        alt: 'Close-up of legal egress window with window well'
    },
    {
        name: 'legal_suite_living_room',
        path: '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/legal_suite_living_room_1769819443771.png',
        title: 'Legal Suite Living Room',
        alt: 'Bright and airy legal basement suite living room'
    },
    {
        name: 'compact_basement_bathroom',
        path: '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/compact_basement_bathroom_1769819454645.png',
        title: 'Compact Basement Bathroom',
        alt: 'Modern compact basement bathroom with subway tile'
    }
]

async function uploadImages() {
    console.log('Starting image upload...')
    const uploadedAssets: Record<string, any> = {}

    for (const img of IMAGES) {
        try {
            console.log(`Uploading ${img.name}...`)
            const asset = await client.assets.upload('image', createReadStream(img.path), {
                filename: path.basename(img.path)
            })

            uploadedAssets[img.name] = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                },
                alt: img.alt
            }
            console.log(`Uploaded ${img.name}: ${asset._id}`)
        } catch (error) {
            console.error(`Failed to upload ${img.name}:`, error)
        }
    }

    return uploadedAssets
}

async function createConceptProject(assets: Record<string, any>) {
    console.log('Creating Concept Investment Project...')

    const project = {
        _type: 'project',
        title: 'Concept: Legal Basement Suite (Standard)',
        slug: { current: 'concept-legal-basement-suite-standard' },
        shortDescription: 'Example of a standard compliant legal basement suite renovation maximizing ROI.',
        projectCategory: 'investment',
        coverImage: assets['legal_suite_living_room'],
        gallery: [
            assets['legal_basement_bedroom'],
            assets['rental_suite_kitchen'],
            assets['compact_basement_bathroom'],
            assets['egress_window_detail']
        ],
        tags: ['Legal Suite', 'Concept', 'Investment', 'Basement'],
        completionDate: new Date().toISOString().split('T')[0],
        description: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'This is a concept project demonstrating our standard specification for legal basement suites designed for maximum rental ROI.' }]
            }
        ]
    }

    try {
        const res = await client.createOrReplace({
            _id: 'concept-legal-basement-suite',
            ...project
        })
        console.log('Created project:', res._id)
    } catch (err) {
        console.error('Error creating project:', err)
    }

    // Also create a Backyard Suite concept if we have the image
    if (assets['backyard_suite_exterior']) {
        console.log('Creating Concept Backyard Suite Project...')
        const backyardProject = {
            _type: 'project',
            title: 'Concept: Garden Suite / Laneway House',
            slug: { current: 'concept-backyard-suite' },
            shortDescription: 'Modern detached backyard suite (H-GO / R-CG compliant).',
            projectCategory: 'investment',
            coverImage: assets['backyard_suite_exterior'],
            tags: ['Backyard Suite', 'Laneway', 'Investment'],
            completionDate: new Date().toISOString().split('T')[0],
            description: [
                {
                    _type: 'block',
                    children: [{ _type: 'span', text: 'Concept visualization for a detached backyard suite.' }]
                }
            ]
        }
        try {
            const res = await client.createOrReplace({
                _id: 'concept-backyard-suite',
                ...backyardProject
            })
            console.log('Created backyard project:', res._id)
        } catch (err) {
            console.error('Error creating backyard project:', err)
        }
    }
}

async function main() {
    const assets = await uploadImages()
    await createConceptProject(assets)
    console.log('Done!')
}

main().catch(console.error)

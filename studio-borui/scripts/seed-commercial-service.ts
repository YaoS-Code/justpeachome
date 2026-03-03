
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

const commercialService = {
    _type: 'service',
    title: 'Commercial Renovations',
    slug: { _type: 'slug', current: 'commercial-renovations' },
    heroStyle: 'standard',
    serviceCategory: 'commercial',
    shortDescription: 'Elevate Your Business Space. From chic retail boutiques to functional office layouts.',
    // Using a placeholder image reference (Legal Suite Living Room) until user uploads a real one
    coverImage: {
        _type: 'accessibleImage',
        asset: {
            _type: 'reference',
            _ref: 'image-7b76f14fd03abac4da4372cb89d0fd18287c741b-1024x1024-jpg'
        },
        alt: 'Modern commercial office space'
    },
    content: [
        {
            _type: 'block',
            children: [
                {
                    _type: 'span',
                    text: "From chic retail boutiques to functional office layouts, we bring our signature precision and aesthetic to Calgary's commercial sector.",
                    marks: []
                }
            ],
            style: 'normal'
        }
    ],
    features: [
        {
            _key: 'feat1',
            title: 'Retail & Boutiques',
            description: 'Create high-converting shopping environments with strategic lighting and layout.',
            icon: 'Store'
        },
        {
            _key: 'feat2',
            title: 'Office Improvements',
            description: 'Boost productivity with modern workspaces, partitions, and functional design.',
            icon: 'Briefcase'
        },
        {
            _key: 'feat3',
            title: 'Medical & Wellness',
            description: 'Hygienic, compliant, and beautiful spaces for clinics and spas.',
            icon: 'HeartPulse'
        }
    ],
    process: [
        {
            _key: 'step1',
            title: 'Consultation',
            description: 'We align with your business goals, budget, and timeline.',
            order: 1
        },
        {
            _key: 'step2',
            title: 'Design & Permitting',
            description: 'We handle 3D visualization and all municipal approvals.',
            order: 2
        },
        {
            _key: 'step3',
            title: 'Construction',
            description: 'Efficient build-out to minimize business disruption.',
            order: 3
        }
    ]
}

async function seed() {
    console.log('Seeding Commercial Renovations service...')

    // Check if exists
    const query = `*[_type == "service" && slug.current == "commercial-renovations"][0]`
    const existing = await client.fetch(query)

    if (existing) {
        console.log('Service already exists, updating...')
        await client.patch(existing._id).set(commercialService).commit()
    } else {
        console.log('Creating new commercial service...')
        await client.create(commercialService)
    }
    console.log('Done!')
}

seed()

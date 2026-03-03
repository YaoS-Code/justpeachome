
import { createClient } from '@sanity/client'

// Configure the client
const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

async function seedData() {
    console.log('🌱 Starting portfolio data migration...')

    // 1. Update existing projects to be 'luxury' category if undefined
    const existingProjects = await client.fetch(`*[_type == "project" && !defined(projectCategory)]`)

    console.log(`Found ${existingProjects.length} projects without category. Updating to 'luxury'...`)

    const transaction = client.transaction()

    existingProjects.forEach((project) => {
        transaction.patch(project._id, (p) =>
            p.set({
                projectCategory: 'luxury',
                // Set some default values for new fields to avoid UI gaps
                materialFocus: 'Custom Millwork • Natural Stone',
                tags: [...(project.tags || []), 'Luxury', 'Renovation']
            })
        )
    })

    // 2. Create a new "Investment" project to demonstrate the dual-mode
    const investmentProject = {
        _type: 'project',
        title: 'Seton Legal Basement Suite',
        slug: { current: 'seton-legal-suite-investment' },
        shortDescription: 'Conversion of an unfinished basement into a high-yield legal secondary suite. Designed for maximum durability and tenant appeal.',
        projectCategory: 'investment',
        role: 'General Contractor',
        completionDate: '2025-11-15',
        rentalIncome: '$1,650/mo',
        roi: '14.5% ROI',
        materialFocus: 'LVP Flooring • Quartz • Soundproofing',
        complianceBadges: ['legal-registered', 'city-approved', 'egress-windows', 'fire-separation'],
        tags: ['Investment', 'Legal Suite', 'Basement', 'Seton'],
        // Use an existing image if available, or a placeholder
        // We'll trust the user to upload a real image later, for now we can try to use one from the artifacts if possible, 
        // but easier to just let it be empty or use a placeholder ref if we knew one.
        // For now, we'll omit image and let the UI handle the fallback or user add it.
        description: [
            {
                _type: 'block',
                children: [
                    {
                        _type: 'span',
                        text: 'This project focused on maximizing rental returns while ensuring full compliance with the new 2025 Safety Codes.',
                    },
                ],
            },
        ],
        features: [
            'Separate Side Entrance',
            'Independent HVAC System',
            'Sound-dampening Resilient Channel',
            'Quartz Countertops (Stain Resistant)'
        ],
        materialSpecs: [
            { category: 'Flooring', material: '20mil Wear Layer LVP', reason: 'Maximum durability for tenants' },
            { category: 'Countertops', material: 'Quartz', reason: 'Stain and scratch resistant' },
            { category: 'Paint', material: 'Scuff-X High Traffic', reason: 'Easy maintenance' }
        ]
    }

    // Check if it already exists
    const existingInvestment = await client.fetch(`*[_type == "project" && slug.current == "seton-legal-suite-investment"][0]`)

    if (!existingInvestment) {
        console.log('Creating demo Investment project...')
        transaction.create(investmentProject)
    }

    await transaction.commit()
    console.log('✅ Migration complete!')
}

seedData().catch((err) => {
    console.error('❌ Migration failed:', err.message)
})

import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN,
})

async function categorizeExistingProjects() {
    console.log('🏗️  Categorizing existing projects for dual-audience strategy...\n')

    // Fetch all projects
    const projects = await client.fetch(`*[_type == "project"]{ _id, title, slug }`)

    console.log(`Found ${projects.length} projects to categorize\n`)

    // Define categorization rules based on project titles/slugs
    const investmentKeywords = ['basement', 'suite', 'rental', 'legal', 'backyard', 'laneway', 'secondary', 'income']
    const luxuryKeywords = ['luxury', 'custom', 'heritage', 'restoration', 'whole home', 'kitchen', 'bathroom', 'spa']

    for (const project of projects) {
        const titleLower = project.title.toLowerCase()
        const slugLower = project.slug?.current?.toLowerCase() || ''

        // Determine category
        const hasInvestmentKeyword = investmentKeywords.some(kw =>
            titleLower.includes(kw) || slugLower.includes(kw)
        )
        const hasLuxuryKeyword = luxuryKeywords.some(kw =>
            titleLower.includes(kw) || slugLower.includes(kw)
        )

        let category = 'both'
        let complianceBadges: string[] = []
        let rentalIncome = ''
        let roi = ''
        let materialFocus = ''
        let permitInfo = {}

        if (hasInvestmentKeyword && !hasLuxuryKeyword) {
            category = 'investment'
            complianceBadges = ['legal-registered', 'city-approved', 'code-compliant']
            rentalIncome = '$1,500-1,800/mo'
            roi = '10-15% Annual ROI'
            materialFocus = 'LVP • Quartz • Egress Windows'
            permitInfo = {
                developmentPermit: true,
                buildingPermit: true,
                notes: 'All Calgary building code requirements met'
            }
        } else if (hasLuxuryKeyword && !hasInvestmentKeyword) {
            category = 'luxury'
            materialFocus = 'Hardwood • Marble • Custom Cabinetry'
        } else if (hasInvestmentKeyword && hasLuxuryKeyword) {
            category = 'both'
            materialFocus = 'Premium Materials • Durable Finishes'
        }

        // Update project
        try {
            await client
                .patch(project._id)
                .set({
                    projectCategory: category,
                    ...(complianceBadges.length > 0 && { complianceBadges }),
                    ...(rentalIncome && { rentalIncome }),
                    ...(roi && { roi }),
                    ...(materialFocus && { materialFocus }),
                    ...(Object.keys(permitInfo).length > 0 && { permitInfo }),
                })
                .commit()

            console.log(`✅ ${project.title}: ${category}`)
        } catch (error) {
            console.error(`❌ Error updating ${project.title}:`, error)
        }
    }

    console.log('\n✨ Project categorization complete!')
}

async function categorizeExistingServices() {
    console.log('\n🛠️  Categorizing existing services for dual-audience strategy...\n')

    // Fetch all services
    const services = await client.fetch(`*[_type == "service"]{ _id, title, slug }`)

    console.log(`Found ${services.length} services to categorize\n`)

    // Define service categorization
    const serviceCategories: Record<string, {
        category: 'investment' | 'luxury' | 'both'
        typicalROI?: string
        tags: string[]
    }> = {
        'basement-secondary-suites': {
            category: 'investment',
            typicalROI: '7-15% annual return, +$50k-100k property value',
            tags: ['Legal Suite', 'Income Property', 'Calgary Code Compliant', 'ROI']
        },
        'backyard-suites': {
            category: 'investment',
            typicalROI: '15-20% property value increase',
            tags: ['Backyard Suite', 'Laneway Home', 'Investment', 'Rental Income']
        },
        'whole-home-renovation': {
            category: 'both',
            tags: ['Custom Design', 'Full Renovation', 'Luxury', 'Investment']
        },
        'kitchen': {
            category: 'luxury',
            tags: ['Kitchen Remodel', 'Custom Cabinetry', 'Luxury', 'High-End']
        },
        'bathroom': {
            category: 'luxury',
            tags: ['Bathroom Remodel', 'Spa-Like', 'Luxury', 'Premium Finishes']
        },
        'heritage-restoration': {
            category: 'luxury',
            tags: ['Heritage', 'Restoration', 'Custom', 'Preservation']
        },
        'infill-development': {
            category: 'both',
            tags: ['Infill', 'R-CG', 'New Build', 'Investment', 'Custom']
        }
    }

    for (const service of services) {
        const slugKey = service.slug?.current || ''
        const config = serviceCategories[slugKey]

        if (!config) {
            console.log(`⚠️  No categorization rule for: ${service.title}`)
            continue
        }

        try {
            await client
                .patch(service._id)
                .set({
                    serviceCategory: config.category,
                    ...(config.typicalROI && { typicalROI: config.typicalROI }),
                    ...(config.tags && { tags: config.tags }),
                })
                .commit()

            console.log(`✅ ${service.title}: ${config.category}`)
        } catch (error) {
            console.error(`❌ Error updating ${service.title}:`, error)
        }
    }

    console.log('\n✨ Service categorization complete!')
}

async function addLegalRequirementsToBasementSuite() {
    console.log('\n📋 Adding legal requirements to Basement Suite service...\n')

    const service = await client.fetch(`*[_type == "service" && slug.current == "basement-secondary-suites"][0]{ _id }`)

    if (!service) {
        console.log('⚠️  Basement suite service not found')
        return
    }

    const legalRequirements = [
        {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Calgary Building Code Requirements' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'All legal basement suites in Calgary must meet the following requirements:' }]
        },
        {
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Egress Windows: Minimum 0.35 m² (3.8 sq ft) opening, no dimension less than 380mm (15")' }]
        },
        {
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Ceiling Height: Minimum 1.95m (6\'5") throughout, can drop to 1.8m (5\'11") under beams' }]
        },
        {
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Fire Separation: 1/2" drywall on ceiling and shared walls, smoke-tight construction' }]
        },
        {
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Smoke Alarms: Hard-wired, interconnected throughout entire home' }]
        },
        {
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Independent HVAC: Separate heating system or HRV to prevent smoke transfer' }]
        },
        {
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Separate Entrance: Independent access from main dwelling unit' }]
        }
    ]

    try {
        await client
            .patch(service._id)
            .set({ legalRequirements })
            .commit()

        console.log('✅ Legal requirements added to Basement Suite service')
    } catch (error) {
        console.error('❌ Error adding legal requirements:', error)
    }
}

async function main() {
    try {
        await categorizeExistingProjects()
        await categorizeExistingServices()
        await addLegalRequirementsToBasementSuite()

        console.log('\n🎉 All categorization complete! Schema updates are now populated with content.')
        console.log('\nNext steps:')
        console.log('1. Restart Sanity Studio to see new fields')
        console.log('2. Review categorizations in Sanity Studio')
        console.log('3. Manually adjust any miscategorized items')
        console.log('4. Add material specifications to key projects')
    } catch (error) {
        console.error('❌ Error:', error)
        process.exit(1)
    }
}

main()

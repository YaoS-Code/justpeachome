import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const services = [
    {
        title: 'Architectural Feasibility Study',
        description: 'Minimize risk and maximize ROI before you build. Our feasibility studies provide clarity on zoning, costs, and design potential.',
        image: 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80', // Blueprints/Planning
        features: [
            {
                title: 'Zoning & Bylaw Analysis',
                description: 'Deep dive into R-CG, HAF, and local constraints.',
                icon: 'Map'
            },
            {
                title: 'Financial Projections',
                description: 'Realistic construction budgets and ROI estimates.',
                icon: 'DollarSign'
            },
            {
                title: 'Massing Models',
                description: '3D block models to visualize volume and setbacks.',
                icon: 'Box'
            }
        ],
        process: [
            {
                order: 1,
                title: 'Site Analysis',
                description: 'We visit your lot to assess topography, context, and solar orientation.'
            },
            {
                order: 2,
                title: 'Regulatory Review',
                description: 'We check land use bylaws to determine exactly what can be built.'
            },
            {
                order: 3,
                title: 'Concept Development',
                description: 'We create preliminary massing options to explore density and layout.'
            },
            {
                order: 4,
                title: 'Feasibility Report',
                description: 'You receive a comprehensive PDF with budget, timeline, and design recommendations.'
            }
        ]
    },
    {
        title: 'Construction Project Management',
        description: 'Expert oversight for your self-build or investment project. We handle the complexity so you can focus on the vision.',
        image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80', // Site meeting
        features: [
            {
                title: 'Schedule Management',
                description: 'Keep trades on track and timelines realistic.',
                icon: 'Calendar'
            },
            {
                title: 'Quality Control',
                description: 'Regular site visits to ensure specs are met.',
                icon: 'CheckSquare'
            },
            {
                title: 'Budget Tracking',
                description: 'Real-time cost monitoring to prevent overruns.',
                icon: 'PieChart'
            }
        ],
        process: [
            {
                order: 1,
                title: 'Pre-Construction Planning',
                description: 'Tendering trades, finalizing schedules, and setting up site logistics.'
            },
            {
                order: 2,
                title: 'Active Management',
                description: 'Daily coordination of trades, materials, and inspections.'
            },
            {
                order: 3,
                title: 'Cost Control',
                description: 'Reviewing invoices and managing change orders transparently.'
            },
            {
                order: 4,
                title: 'Handover',
                description: 'Deficiency walkthroughs, warranty documentation, and occupancy.'
            }
        ]
    }
]

async function seed() {
    console.log('Seeding consultation services...')
    for (const service of services) {
        const slug = service.title.toLowerCase().replace(/ /g, '-').replace(/'/g, '')

        // Check if exists
        const query = `*[_type == "service" && slug.current == "${slug}"][0]`
        const exists = await client.fetch(query)

        if (!exists) {
            console.log(`Creating ${service.title}...`)

            const doc = {
                _type: 'service',
                title: service.title,
                slug: { _type: 'slug', current: slug },
                shortDescription: service.description,
                features: service.features,
                process: service.process,
                // Note: Real image upload would require fetching blob. 
                // Creating without image for now, user can upload in Studio.
            }

            await client.create(doc)
        } else {
            console.log(`Updating ${service.title} (exists)`)
            const doc = {
                _type: 'service',
                title: service.title,
                slug: { _type: 'slug', current: slug },
                shortDescription: service.description,
                features: service.features,
                process: service.process,
            }
            await client.patch(exists._id).set(doc).commit()
        }
    }
    console.log('Done!')
}

seed()

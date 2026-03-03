import { createClient } from 'next-sanity'
import dotenv from 'dotenv'

// Load environment variables from .env
dotenv.config({ path: '.env' })

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN,
})

const backyardService = {
    _type: 'service',
    title: 'Backyard & Garage Suites',
    slug: { current: 'backyard-suites' },
    shortDescription: 'Unlock the potential of your property with a custom-designed garage suite (laneway house) or garden suite. Perfect for rental income, family flexibility, or personal workspace.',
    coverImage: {
        _type: 'accessibleImage',
        alt: 'Modern backyard garden suite in Calgary with wood siding and large windows',
        contextTag: 'product'
    },
    features: [
        {
            _key: 'feat1',
            title: 'Passive Income ($1,800+)',
            description: 'With current Calgary rental rates, a 1-bedroom suite in neighbourhoods like Killarney or Altadore can generate $1,800 - $2,200+ per month, significantly subsidizing your main mortgage.',
            icon: 'TrendingUp'
        },
        {
            _key: 'feat2',
            title: 'Up to $10k in Grants',
            description: 'We help you navigate the City of Calgary\'s Secondary Suite Incentive Program (HAF) to potentially qualify for up to $10,000 in government grants for safety and energy upgrades.',
            icon: 'Award'
        },
        {
            _key: 'feat3',
            title: 'Property Value Increase',
            description: 'A legal, permitted garage suite significantly increases resale value. It adds finished square footage and a revenue stream without sacrificing your main living space.',
            icon: 'Home'
        }
    ],
    faqs: [
        {
            _key: 'faq1',
            question: 'Do I need a special permit for a garage suite in Calgary?',
            answer: 'Yes, a Development Permit (DP) and Building Permit (BP) are required. Since 2021, rules have been relaxed (e.g., removing council approval for many R-C1/R-C2 lots). We handle the entire process, including the specific rules for "Class 1" (contextual) vs "Class 2" (discretionary) suites.'
        },
        {
            _key: 'faq2',
            question: 'How much does a backyard suite cost to build?',
            answer: 'Costs typically range from $250,000 to $400,000+. This "Transparent Pricing" includes the most complex variables: utility trenching, ENMAX coordination, and high-quality finishing. Beware of lower quotes that often exclude these essential site costs.'
        },
        {
            _key: 'faq3',
            question: 'How long does the construction process take?',
            answer: 'Construction typically takes 5-7 months after permits are approved. While we aim for speed, we build realistic schedules that account for City inspections and utility queues (ENMAX). Prefabricated elements can sometimes accelerate this timeline.'
        },
        {
            _key: 'faq4',
            question: 'Can I use my existing electrical panel?',
            answer: 'It depends. Garage suites require their own sub-panel. We assess early on if your main house has a 100 Amp or 200 Amp service to determine if a service upgrade is needed—a critical step often missed in initial estimates.'
        }
    ],
    content: [
        {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: 'Garage Suites: Maximizing Your Lot' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'Backyard suites—widely known in Calgary as Garage Suites, Garden Suites, or Laneway Houses—are self-contained living units located on the same lot as a detached house. Most commonly built above a detached garage, they maximize land use without compromising your backyard garden space.' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'At JUST PEAC HOMES, we specialize in high-performance custom suites that feel like luxury apartments, not "granny flats." We prioritize privacy, placing windows strategically to avoid overlooking neighbors while capturing natural light.' }]
        },
        {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'The "Hidden Density" & Grants Solution' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'Whether you want to generate rental income or provide a home for aging parents, the financial case is stronger than ever. The City of Calgary currently offers a Secondary Suite Incentive Program, providing up to $10,000 in qualifying grants. We guide you through the eligibility requirements as part of our design process.' }]
        },
        {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Our End-to-End Service' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'Building a garage suite involves complex logistics, from utility trenching to frost-protected foundations. We manage it all:' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Feasibility Analysis (Zoning R-C1, R-C2, R-CG)' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Electrical Load Assessment (100A vs 200A)' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'ENMAX & City Permit Coordination' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Custom Design & Full Construction' }]
        }
    ],
    seo: {
        _type: 'seo',
        metaTitle: 'Garage Suites & Backyard Homes Calgary | Custom Builder',
        metaDescription: 'Expert builder for Garage Suites & Garden Suites in Calgary. Maximize income ($1800+/mo) and property value. We navigate permits, grants ($10k), and zoning.'
    }
}

async function seed() {
    console.log('🚀 Seeding "Backyard Suites" Service...')
    try {
        // Use createOrReplace based on a deterministic query or ID if possible,
        // but since we want to match by slug, we'll fetch first or just upsert by a known ID if we had one.
        // For now, we will query for existing to get ID, or create new.
        const existing = await client.fetch('*[_type == "service" && slug.current == "backyard-suites"][0]._id')

        if (existing) {
            console.log(`Found existing service (${existing}), updating...`)
            await client.patch(existing).set(backyardService).commit()
        } else {
            console.log('Creating new service...')
            await client.create(backyardService)
        }

        console.log('✅ Successfully seeded Backyard Suites service!')
    } catch (error) {
        console.error('❌ Seeding failed:', error.message)
        process.exit(1)
    }
}

seed()

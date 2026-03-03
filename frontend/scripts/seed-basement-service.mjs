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

const basementService = {
    _type: 'service',
    title: 'Basement & Secondary Suites',
    slug: { current: 'basement-development' },
    shortDescription: 'From high-ROI legal rental suites to durable family rec rooms. We build cost-effective, code-compliant basements designed for income generation and long-term durability.',
    features: [
        {
            _key: 'feat1',
            title: 'Legal Rental Income',
            description: 'Turn your basement into a mortgage-helper. A standard 2-bedroom legal suite in Calgary can generate $1,600 - $2,000/month. We handle all City permitting and amnesty program compliance.',
            icon: 'TrendingUp'
        },
        {
            _key: 'feat2',
            title: 'Up to $10k in Grants',
            description: 'Maximize your ROI by accessing the Secondary Suite Incentive Program (HAF). We guide investors through the requirements to qualify for up to $10,000 in government funding.',
            icon: 'Award'
        },
        {
            _key: 'feat3',
            title: 'Built for Durability',
            description: '"Tenant-proof" finishes that look great and last. We spec heavy-duty commercial-grade Vinyl Plank (LVP), quartz countertops, and moisture-resistant drywall to minimize maintenance costs.',
            icon: 'ShieldCheck'
        }
    ],
    faqs: [
        {
            _key: 'faq1',
            question: 'What is included in a "Standard Rental Package"?',
            answer: 'Our investor-focused package typically includes a durable open-concept kitchen with shaker cabinets and quartz, luxury vinyl plank flooring (waterproof and scratch-resistant), LED pot lighting, and a functional 3-piece bathroom. We prioritize neutral "Sherwin Williams Alabaster" walls to appeal to the widest tenant market.'
        },
        {
            _key: 'faq2',
            question: 'What makes a suite "Legal" in Calgary?',
            answer: 'Legality is non-negotiable for insurance and resale. It requires a separate heating source (or quantified HRV/dampers), fire-rated drywall separation (5/8" Type X), interconnected smoke alarms, and bedroom egress windows that meet specifically sized opening requirements. We handle all drawings and inspections.'
        },
        {
            _key: 'faq3',
            question: 'How long does a typical rental suite build take?',
            answer: 'A standard 2-bedroom rental suite usually takes 10-12 weeks from framing to final cleaning, depending on permit processing speeds. We work efficiently to get your tenant moving in faster.'
        },
        {
            _key: 'faq4',
            question: 'Do I need soundproofing?',
            answer: 'For rental suites, yes. We highly recommend resilient channel (bar) and Roxul Safe\'n\'Sound insulation in the ceiling to minimize noise transfer between the main floor and the basement tenant, keeping everyone happy.'
        }
    ],
    content: [
        {
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: 'Maximize ROI with a Legal Secondary Suite' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'In Calgary\'s competitive rental market, a legal basement suite is one of the smartest investments a homeowner can make. Whether you need a simple "mortgage helper" or a high-end Airbnb unit, we focus on designs that maximize rental income while minimizing upfront construction costs.' }]
        },
        {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'The "Investor Standard" Approach' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'You don\'t always need luxury marble to attract great tenants. Our "Investor Standard" package focuses on clean, bright, and bomb-proof materials:' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Waterproof Luxury Vinyl Plank (LVP) flooring throughout' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Durable Quartz countertops (stain/scratch resistant)' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'High-efficiency LED lighting to brighten windowless areas' }]
        },
        {
            _type: 'block',
            listItem: 'bullet',
            children: [{ _type: 'span', text: 'Neutral, modern paint palettes (Whites & light Greys)' }]
        },
        {
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: 'Permit & Grant Experts' }]
        },
        {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: 'We have extensive experience with the City of Calgary\'s Secondary Suite Registry. We guarantee our work meets all fire and safety codes, ensuring your family—and your tenants—are safe. Plus, we help you apply for the Housing Accelerator Fund (HAF) grant to get up to $10,000 back on your renovation.' }]
        }
    ],
    seo: {
        _type: 'seo',
        metaTitle: 'Legal Basement Suites Calgary | Rental Income Renovations',
        metaDescription: 'Maximize rental income with legal basement suites in Calgary. We build durable, efficient 2-bedroom rental units. Experts in permits & HAF grants ($10k).'
    }
}

async function seed() {
    console.log('🚀 Seeding "Basement Development" Service...')
    try {
        const existing = await client.fetch('*[_type == "service" && slug.current == "basement-development"][0]._id')

        if (existing) {
            console.log(`Found existing service (${existing}), updating...`)
            await client.patch(existing).set(basementService).commit()
        } else {
            console.log('Creating new service...')
            await client.create(basementService)
        }

        console.log('✅ Successfully seeded Basement Development service!')
    } catch (error) {
        console.error('❌ Seeding failed:', error.message)
        process.exit(1)
    }
}

seed()

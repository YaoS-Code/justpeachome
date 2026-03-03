
import { createClient } from '@sanity/client'

// Using strict createClient pattern as per skill rules
const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

// Helper to create unique blocks
const createBlock = (text: string, style = 'normal', marks = []) => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: style,
    children: [{
        _type: 'span',
        _key: Math.random().toString(36).substring(7),
        text: text,
        marks: marks || []
    }]
})

async function overhaulServiceContent() {
    console.log('Overhauling Commercial Renovations content...')

    // Find the service by its original slug (or future slug if changed)
    const service = await client.fetch(`*[_type == "service" && slug.current == "commercial-renovations"][0]`)

    if (!service) {
        console.error('Service not found! (Checking for alternate slug not implemented, assuming "commercial-renovations")')
        return
    }

    // New Content based on "User Instructions"
    const specializedContent = {
        // 1. Core Terminology Updates
        title: 'Calgary Commercial Renovations & Tenant Improvements',

        // H1 Alternative (controlled by title usually, but let's ensure SEO matches)
        seo: {
            metaTitle: 'Calgary Commercial Renovations & Tenant Improvements | Just Peac Homes',
            metaDescription: 'Specializing in office tenant improvements, retail build-outs, and leasehold upgrades. BBB A+ Accredited. On-time delivery and full permit handling.',
            keywords: [
                'Calgary Commercial Renovations',
                'Tenant Improvements Calgary',
                'Office Remodeling',
                'Retail Build-outs',
                'Commercial Contractor',
                'Leasehold Improvements'
            ]
        },

        // 2. Sub-headline / Short Description
        shortDescription: 'Elevating business environments with precision craftsmanship, modern aesthetics, and a commitment to on-time delivery.',

        // 3. Main Content (The Professional Edge + Footer SEO Block)
        content: [
            createBlock("The Professional Edge", "h2"),
            createBlock("BBB A+ Accredited Excellence", "h3"),
            createBlock("As an A+ rated business with the Better Business Bureau, Just Peac Woodwork Ltd. upholds the highest standards of integrity and transparent pricing in the Calgary construction market."),

            createBlock("Commercial Compliance & Safety", "h3"),
            createBlock("We are fully licensed, insured, and WCB-covered. Every project adheres strictly to the National Building Code – Alberta Edition and City of Calgary fire safety regulations."),

            createBlock("Minimal Business Disruption", "h3"),
            createBlock("Time is money. We offer flexible project scheduling, including after-hours and weekend shifts, to minimize downtime and keep your operations running smoothly."),

            // Footer SEO Block (Appended to content as requested)
            createBlock("---", "normal"), // Visual separator
            createBlock("Looking for a reliable commercial renovation contractor in Calgary? Just Peac Woodwork Ltd. (Just Peach Home) specializes in high-end office remodeling, retail tenant improvements, and commercial leasehold upgrades. Whether you need an office refresh in the Beltline or a new boutique build-out in Northwest Calgary, our BBB A+ accredited team delivers excellence on every square foot.", "blockquote")
        ],

        // 4. Industry Sectors (Mapped to Features)
        features: [
            {
                _key: 'sect_office',
                title: 'Office Tenant Improvements (TI)',
                description: 'Modernizing corporate workspaces to boost productivity. Ergonomic layouts, acoustic optimization, and glass partitions.',
                icon: 'Briefcase'
            },
            {
                _key: 'sect_retail',
                title: 'Retail & Boutique Build-Outs',
                description: 'High-impact commercial interiors designed to drive foot traffic. We translate your brand identity into a physical space.',
                icon: 'Store'
            },
            {
                _key: 'sect_lease',
                title: 'Leasehold Improvements',
                description: 'Fast-track renovations for new tenants. From structural changes to cosmetic refreshes, ensuring you open on schedule.',
                icon: 'Hammer'
            },
            {
                _key: 'sect_compliance',
                title: 'Peace of Mind Compliance',
                description: 'Full handling of City of Calgary Building & Development Permits. Fully Licensed & WCB Covered.',
                icon: 'ShieldCheck'
            }
        ],

        // 5. Strategic Workflow
        process: [
            {
                _key: 'step1',
                title: 'Consultation & Estimating',
                description: 'Detailed site assessment and transparent, competitive bidding aligned with your ROI goals.',
                order: 1
            },
            {
                _key: 'step2',
                title: 'Permits & Planning',
                description: 'Expert management of City of Calgary Building and Development Permits to ensure 100% legal compliance.',
                order: 2
            },
            {
                _key: 'step3',
                title: 'Managed Construction',
                description: 'Rigorous project management with real-time updates, focusing on safety, cleanliness, and precision. Night/Weekend shifts available.',
                order: 3
            },
            {
                _key: 'step4',
                title: 'Inspection & Handover',
                description: 'Comprehensive final walkthrough and documentation to ensure every commercial standard is met before you move in.',
                order: 4
            }
        ],

        // 6. Commercial FAQ
        faqs: [
            {
                _key: 'faq_c_1',
                question: 'How do you handle building permits for commercial projects in Calgary?',
                answer: 'We provide full-service permit management. Our team coordinates with the City of Calgary to secure necessary Building and Development permits, ensuring your space meets all safety and zoning codes.'
            },
            {
                _key: 'faq_c_2',
                question: 'Can you renovate my retail store while it remains open?',
                answer: 'Yes. We specialize in phased renovations and after-hours work to minimize disruption to your staff and customers, maintaining a clean and safe job site at all times.'
            },
            {
                _key: 'faq_c_3',
                question: 'What areas do you serve?',
                answer: 'Just Peach Home provides commercial renovation services throughout Calgary and surrounding areas, including Airdrie, Chestermere, Okotoks, and Cochrane.'
            },
            {
                _key: 'faq_c_4',
                question: 'Can you work within tight deadlines for new lease openings?',
                answer: 'Yes. We understand that every day your doors are closed is lost revenue. We provide a guaranteed project schedule.'
            }
        ]
    }

    console.log('Patching service document...')

    // Patch the document
    await client
        .patch(service._id)
        .set(specializedContent)
        .commit()

    console.log('✅ Commercial Content Overhauled Successfully!')
}

overhaulServiceContent()

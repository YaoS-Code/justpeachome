
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
const createBlock = (text: string, style = 'normal') => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: style,
    children: [{
        _type: 'span',
        _key: Math.random().toString(36).substring(7),
        text: text,
        marks: []
    }]
})

async function updateServiceContent() {
    console.log('Enriching Commercial Renovations content...')

    // Find the service
    const service = await client.fetch(`*[_type == "service" && slug.current == "commercial-renovations"][0]`)

    if (!service) {
        console.error('Service not found!')
        return
    }

    // New Rich Content based on competitor analysis + BBB Rating
    const updatedData = {
        // 1. Enhanced Short Description
        shortDescription: 'From minimalist office upgrades to code-compliant retail build-outs. We are a BBB A+ Accredited Business delivering on-time, on-budget commercial transformations.',

        // 2. Main Content (Intro + Value Prop)
        content: [
            createBlock("Elevate Your Business Environment", "h2"),
            createBlock("Your physical space is a direct reflection of your brand. Whether you are modernizing a corporate office to boost employee productivity or launching a boutique retail store to captivate customers, Just Peac Homes delivers precision craftsmanship tailored to your business goals."),
            createBlock("Renovations for Business Owners", "h3"),
            createBlock("We understand that time is money. Our commercial renovation process is built around speed, efficiency, and minimal disruption to your daily operations. From obtaining the necessary City of Calgary building permits to the final quality inspection, we handle every detail so you can focus on running your business."),
            createBlock("Why Choose a BBB A+ Rated Contractor?", "h3"),
            createBlock("As a BBB Accredited Business with an A+ rating, Just Peac Woodwork Ltd. is committed to the highest standards of trust and integrity. We provide transparent pricing, clear timelines, and a warranty on all our workmanship.")
        ],

        // 3. Expanded Features (Including BBB)
        features: [
            {
                _key: 'feat_bbb',
                title: 'BBB A+ Accredited',
                description: 'Trust and integrity guaranteed. We hold an A+ rating with the Better Business Bureau.',
                icon: 'Award' // Changed to Award to represent certification
            },
            {
                _key: 'feat_retail',
                title: 'Retail & Boutiques',
                description: 'High-impact designs that drive foot traffic and enhance customer experience.',
                icon: 'Store'
            },
            {
                _key: 'feat_office',
                title: 'Office Optimization',
                description: 'Modern workspaces designed for collaboration, acoustics, and productivity.',
                icon: 'Briefcase'
            },
            {
                _key: 'feat_permit',
                title: 'Permit Handling',
                description: 'Full management of development and building permits with the City of Calgary.',
                icon: 'FileText'
            }
        ],

        // 4. Detailed Process (Competitor inspired)
        process: [
            {
                _key: 'proc1',
                title: 'Consultation & Strategy',
                description: 'We meet to understand your operational needs, brand guidelines, and budget constraints.',
                order: 1
            },
            {
                _key: 'proc2',
                title: 'Design & Permitting',
                description: 'Our team prepares architectural drawings and manages the entire permit application process to ensure code compliance.',
                order: 2
            },
            {
                _key: 'proc3',
                title: 'Construction Management',
                description: 'We execute the build with a focus on timeline adherence. We can schedule noisy work outside of peak business hours.',
                order: 3
            },
            {
                _key: 'proc4',
                title: 'Final Walkthrough',
                description: 'A comprehensive review to ensure every detail meets our A+ standards before handover.',
                order: 4
            }
        ],

        // 5. FAQs (Competitor inspired)
        faqs: [
            {
                _key: 'faq1',
                question: 'Can you work while my business is open?',
                answer: 'Yes. We often work in phases or after-hours to minimize disruption to your staff and customers. We prioritize safety and cleanliness to keep your business operational.'
            },
            {
                _key: 'faq2',
                question: 'Do I need a building permit for commercial renovations?',
                answer: 'Most likely, yes. Any structural changes, or alterations to plumbing, electrical, or HVAC systems require a City of Calgary permit. We handle the entire application process for you.'
            },
            {
                _key: 'faq3',
                question: 'How long does a typical office renovation take?',
                answer: 'Timelines vary by scope. A cosmetic refresh (paint, flooring, fixtures) might take 2-3 weeks, while a full tenant improvement project can take 2-4 months. We provide a guaranteed schedule before starting.'
            },
            {
                _key: 'faq4',
                question: 'Are you licensed and insured?',
                answer: 'Absolutely. Just Peac Woodwork Ltd. is fully licensed, insured, and WCB covered. Plus, we are a BBB Accredited Business with an A+ rating.'
            }
        ]
    }

    console.log('Patching service document...')

    // Patch the document
    await client
        .patch(service._id)
        .set(updatedData)
        .commit()

    console.log('✅ Commercial Content Updated Successfully!')
}

updateServiceContent()

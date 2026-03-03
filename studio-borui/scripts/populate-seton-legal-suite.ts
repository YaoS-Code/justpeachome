import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

// Helper to create properly formatted PortableText blocks
function createBlock(text: string) {
    return {
        _type: 'block',
        _key: `block-${Math.random().toString(36).substr(2, 9)}`,
        style: 'normal',
        markDefs: [],
        children: [{
            _type: 'span',
            _key: `span-${Math.random().toString(36).substr(2, 9)}`,
            text: text,
            marks: []
        }]
    }
}

async function populateSetonLegalSuite() {
    console.log('📝 Populating Seton Legal Suite case study...\n')

    const caseStudyData = {
        projectStory: {
            vision: [
                createBlock('The homeowners of this new-build property in Seton wanted to maximize their investment by transforming the unfinished basement into a fully legal, income-generating secondary suite. With mortgage rates rising, their primary goal was to create a high-quality rental unit that would command top market dollar and attract reliable tenants.'),
                createBlock('The vision was "bright, safe, and indistinguishable from an apartment." They wanted to avoid the typical "dungeon basement" feel by prioritizing large windows, 9-foot ceilings, and premium soundproofing to ensure privacy for both the main floor family and the future tenants.')
            ],
            process: [
                createBlock('We navigated the City of Calgary\'s secondary suite registry process from the start. Since this was a new build, we optimized the mechanical room layout early for independent heating systems—a key requirement for modern tenant comfort and code compliance.'),
                createBlock('To maximize rental value, we chose durable but high-end finishes: luxury vinyl plank (LVP) flooring for waterproofing and longevity, and quartz countertops in the kitchen. We installed a separate side entry with a concrete walkway, giving tenants a completely private arrival experience.'),
                createBlock('Soundproofing was a major priority. We utilized ROXUL Safe\'n\'Sound insulation in the ceiling joists and installed resilient channel (bar) with Type X drywall to achieve an STC rating well above code requirements, ensuring the owners upstairs would barely hear the tenants below.')
            ],
            outcome: [
                createBlock('The result is a stunning 2-bedroom legal suite that rented immediately for $1,750/month—significantly higher than the neighborhood average. The "legal" status provides peace of mind for both the landlords and tenants.'),
                createBlock('Financially, the numbers are compelling. The project cost was approximately $65,000. With $21,000 annual revenue, the payback period is roughly 3 years. Furthermore, a licensed appraiser estimated the suite added over $85,000 to the total property value immediately upon completion.')
            ]
        },

        timeline: [
            {
                _key: 'timeline-1',
                phase: 'Permits & Design',
                duration: '3 weeks',
                description: 'Completed architectural drawings, applied for Development Permit (DP) and Building Permit (BP). Secured "Legal Secondary Suite" designation.'
            },
            {
                _key: 'timeline-2',
                phase: 'Framing & Mechanical Rough-ins',
                duration: '2 weeks',
                description: 'Framed bedroom walls and mechanical room. Installed independent furnace and ductwork. Rough-in plumbing for kitchen and bath.'
            },
            {
                _key: 'timeline-3',
                phase: 'Electrical & Inspections',
                duration: '1 week',
                description: 'Ran separate electrical panel for the suite. Passed rough-in wiring and plumbing inspections with City of Calgary.'
            },
            {
                _key: 'timeline-4',
                phase: 'Insulation & Soundproofing',
                duration: '1 week',
                description: 'Installed ROXUL Safe\'n\'Sound insulation and resilient channel on ceilings for maximum noise dampening between floors.'
            },
            {
                _key: 'timeline-5',
                phase: 'Drywall & Mudding',
                duration: '2 weeks',
                description: 'Boarded walls with 5/8" Type X fire-rated drywall (crucial for legal suites). Taping, mudding, and sanding to paint-ready finish.'
            },
            {
                _key: 'timeline-6',
                phase: 'Finishing & Flooring',
                duration: '2 weeks',
                description: 'Painted walls in "Chantilly Lace." Installed Luxury Vinyl Plank flooring throughout. Set kitchen cabinets and bathroom vanity.'
            },
            {
                _key: 'timeline-7',
                phase: 'Final Inspections',
                duration: '1 week',
                description: 'Passed final building, electrical, and plumbing inspections. Received occupancy permit and registry sticker.'
            }
        ],

        challengesSolved: [
            {
                _key: 'challenge-1',
                challenge: 'Strict Fire Separation Requirements',
                solution: 'Used 5/8" Type X firewall drywall on all ceilings and mechanical room walls. Sealed all penetrations with fire-stop caulking to ensure 45-minute fire rating between units.'
            },
            {
                _key: 'challenge-2',
                challenge: 'Independent Heating for Tenant Comfort',
                solution: 'Instead of shared ductwork (which transfers smell and sound), we installed electric baseboard heating with smart thermostats in the suite, keeping the main furnace dedicated to upstairs. This lowered upfront costs and prevents air mixing.'
            },
            {
                _key: 'challenge-3',
                challenge: 'Egress Window Height Consistency',
                solution: 'The existing basement windows were slightly too high for code egress. We built custom interior steps/benches below each bedroom window to ensure safe and code-compliant exit routes during emergencies.'
            }
        ],

        clientQuote: {
            quote: 'Just Peac Homes handled the entire permitting headache for us. We rented the suite out within 2 days of listing it. The extra income covers more than half our mortgage!',
            clientName: 'David & Jennifer',
            clientRole: 'Property Investors'
        },

        // Ensure category metrics are set
        rentalIncome: '$1,750/mo',
        roi: '3 Year Payback'
    }

    try {
        // Updating Seton Legal Suite ID: O7YtP3U9ZmUnyBia7ftUiq
        await client
            .patch('O7YtP3U9ZmUnyBia7ftUiq')
            .set(caseStudyData)
            .commit()

        console.log('✅ Successfully populated Seton Legal Suite!')
        console.log('\nContent added:')
        console.log('- Project Story (Investment Focus)')
        console.log('- Timeline (7 phases)')
        console.log('- 3 Challenges (Fire, HVAC, Egress)')
        console.log('- Client Testimonial')
        console.log('\n🌐 View at: http://localhost:3000/project/seton-legal-basement-suite')
    } catch (error) {
        console.error('❌ Error:', error)
    }
}

populateSetonLegalSuite().catch(console.error)

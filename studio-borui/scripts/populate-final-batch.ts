import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

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

async function populateFinalBatch() {
    console.log('🚀 Populating final batch of projects...\n')

    // 1. Britannia Garage Suite
    console.log('📝 Updating Britannia Garage Suite...')
    const garageStory = {
        projectStory: {
            vision: [
                createBlock('Britannia is one of Calgary\'s most prestigious neighborhoods, but lot sizes can limit expansion. The owners wanted to replace a crumbling detached garage with a modern 3-car garage featuring a luxury studio suite above for visiting guests and potential future rental.'),
                createBlock('The design challenge was to create a structure that looked like an architectural feature, not just a service building. They wanted it to match the mid-century modern aesthetic of the main house.')
            ],
            process: [
                createBlock('We poured a structural slab-on-grade engineered to support 3 vehicles and the living space above. In-slab hydronic heating was installed for the garage floor, a must-have for luxury Calgary properties.'),
                createBlock('For the suite, we used a separate forced-air system for rapid response heating. The exterior features commercial-grade ACM panelling and cedar soffits.'),
                createBlock('The interior is a compact 600 sq. ft. studio with a full kitchen, laundry, and a bathroom with a skylight. We maximized storage with built-in millwork along the knee-walls.')
            ],
            outcome: [
                createBlock('This project won a "Best Garage Suite" category award. It provides flexible space that has been used as a home office, guest house, and short-term executive rental.'),
                createBlock('It rents for $2,500/month as a furnished executive unit due to the premium location.')
            ]
        },
        timeline: [
            { _key: 'g1', phase: 'Demolition & Excavation', duration: '1 week', description: 'Removed existing single garage and pad.' },
            { _key: 'g2', phase: 'Foundation & Slab', duration: '2 weeks', description: 'Poured engineered slab with hydronic heating loops.' },
            { _key: 'g3', phase: 'Framing', duration: '3 weeks', description: 'Framed 2-story structure with heavy duty LVL beams for wide garage doors.' },
            { _key: 'g4', phase: 'Exterior Finishes', duration: '4 weeks', description: 'ACM panels, cedar siding, and membrane roofing.' },
            { _key: 'g5', phase: 'Interior Finishes', duration: '5 weeks', description: 'Full apartment finishing: drywall, kitchen, bath, flooring.' }
        ],
        challengesSolved: [
            {
                _key: 'gc1',
                challenge: 'Height Restrictions',
                solution: 'City bylaws restricted total height. We used a flat roof design and specialized trusses to maximize interior ceiling height without exceeding the exterior envelope limit.'
            },
            {
                _key: 'gc2',
                challenge: 'Heating a Garage & Suite',
                solution: 'Divided systems: In-floor heat for garage (efficient, steady) and efficient electric mini-split for the suite (AC/Heat) plus backup electric baseboards.'
            }
        ],
        clientQuote: {
            quote: 'It looks better than most main houses. Our guests fight over who gets to stay in the "garage".',
            clientName: 'Robert L.',
            clientRole: 'Homeowner'
        }
    }
    await client.patch('modern-garage-suite').set(garageStory).commit()
    console.log('✅ Britannia Garage Suite Done!')

    // 2. Marda Loop Heritage (Luxury Reno)
    console.log('\n📝 Updating Marda Loop Heritage...')
    const heritageStory = {
        projectStory: {
            vision: [
                createBlock('This 1912 character home in Marda Loop had good bones but 100 years of "bad updates." The new owners wanted to restore its original charm while modernizing the mechanical systems and opening up the compartmentalized main floor.'),
                createBlock('The goal was "Historical Modern": restoring original fir floors and millwork, but adding a chef\'s kitchen and open entertaining space.')
            ],
            process: [
                createBlock('We started by carefully removing and labelling original baseboards and trim to be refinished and reinstalled. We stripped the paint off the original fir staircase to reveal the beautiful grain.'),
                createBlock('Structurally, we removed two walls to create an open kitchen/dining area, hiding a steel beam in the ceiling to keep the period-correct flat ceiling look (no bulkheads).'),
                createBlock('The kitchen features unlacquered brass hardware that will patina with time, shaker cabinets, and a farmhouse sink. Behind the walls, we replaced all knob-and-tube wiring and cast iron plumbing.')
            ],
            outcome: [
                createBlock('The home feels like it has been there for a century, yet functions like a 2025 new build. The blend of old and new is seamless.'),
                createBlock('The renovation added approx. 40% to the home\'s value, but the owners say preserving the history is the real return.')
            ]
        },
        timeline: [
            { _key: 'h1', phase: 'Abatement & Demo', duration: '2 weeks', description: 'Asbestos testing/removal. Careful deconstruction of heritage trim.' },
            { _key: 'h2', phase: 'Structural & Rough-ins', duration: '3 weeks', description: 'Beam installation. Full electrical rewire and plumbing replacement.' },
            { _key: 'h3', phase: 'Restoration', duration: '4 weeks', description: 'Refinishing original floors and stairs. Repairing lath and plaster walls.' },
            { _key: 'h4', phase: 'Modern Finishes', duration: '3 weeks', description: 'Kitchen installation, bathroom tiling.' }
        ],
        challengesSolved: [
            {
                _key: 'hc1',
                challenge: 'Knob and Tube Wiring',
                solution: 'Found active knob-and-tube throughout. Replaced 100% of wiring to bring home to modern code (and insurability) without damaging significant amounts of original lath/plaster.'
            },
            {
                _key: 'hc2',
                challenge: 'Matching 100-Year-Old Millwork',
                solution: 'Had custom knives cut for our shaper to replicate the exact profile of the 1912 baseboards for areas where we couldn\'t salvage the original.'
            }
        ],
        clientQuote: {
            quote: 'They respected the house. That was the most important thing. They saved the soul of this old place while making it warm and safe for our kids.',
            clientName: 'Eleanor & Mark',
            clientRole: 'Homeowners'
        }
    }
    await client.patch('ksBd7J2rUVbRXaXvOwge3c').set(heritageStory).commit()
    console.log('✅ Marda Loop Heritage Done!')
}

populateFinalBatch().catch(console.error)

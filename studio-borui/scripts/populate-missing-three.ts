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

async function populateMissingThree() {
    console.log('🚀 Populating final 3 remaining projects...\n')

    // 1. Concept: Legal Basement Suite (Standard)
    console.log('📝 Updating Concept: Legal Basement Suite...')
    const conceptLegalStory = {
        projectStory: {
            vision: [
                createBlock('This project represents our standard, high-yield legal basement suite package designed specifically for investors seeking safe, consistent returns. The goal was to create a cost-effective yet durable rental unit that meets all City of Calgary safety codes without over-improving for the neighborhood.'),
                createBlock('The design prioritizes tenant safety and landlord liability protection, creating a bright, livable space that rents quickly to quality tenants.')
            ],
            process: [
                createBlock('We began with a comprehensive mechanical assessment to determine the most efficient heating solution (independent baseboards vs. shared furnace with dampers). We opted for a shared high-efficiency furnace with a powered damper system to control airflow independently.'),
                createBlock('Standard but durable finishes were selected: commercial-grade LVP flooring, laminate countertops with a waterproof edge, and easily replaceable LED fixtures. This keeps maintenance costs low for the investor.'),
                createBlock('Fire separation was achieved using 5/8" Type X drywall on ceilings and mechanical room walls, along with solid core doors for the utility room and suite entrance.')
            ],
            outcome: [
                createBlock('This repeatable design package has been proven to generate reliable cash flow. It rents for market average ($1,400-$1,500/month) with low vacancy rates.'),
                createBlock('It offers the perfect balance of upfront cost vs. long-term durability, typically yielding an ROI of 15-18% over a 5-year period for investors.')
            ]
        },
        timeline: [
            { _key: 'cl1', phase: 'Design & Permitting', duration: '2 weeks', description: 'Standardized layout allows for rapid permit approval.' },
            { _key: 'cl2', phase: 'Framing & Rough-ins', duration: '2 weeks', description: 'Efficient framing of bedrooms and mechanical room.' },
            { _key: 'cl3', phase: 'Drywall & Fire Separation', duration: '2 weeks', description: 'Installation of fire-rated electrical boxes and drywall.' },
            { _key: 'cl4', phase: 'Finishing', duration: '3 weeks', description: 'Durable paint, flooring, and cabinetry installation.' }
        ],
        challengesSolved: [
            {
                _key: 'clc1',
                challenge: 'Low Ceiling Height',
                solution: 'Bulkheads were strategically placed over non-living areas (mechanical/storage) to maximize headroom in main living and bedroom areas, keeping them open and airy.'
            },
            {
                _key: 'clc2',
                challenge: 'Shared Laundry Access',
                solution: 'Created a common mechanical/laundry area accessible by both units through fire-rated doors, saving the cost of purchasing two sets of machines.'
            }
        ],
        rentalIncome: '$1,450/mo',
        roi: '18% Annual',
        clientQuote: {
            quote: 'Simple, compliant, and cash-flowing. Just Peac Homes delivered exactly what I needed for my rental portfolio without breaking the bank.',
            clientName: 'Investor Group',
            clientRole: 'Property Owners'
        }
    }
    await client.patch('concept-legal-basement-suite').set(conceptLegalStory).commit()
    console.log('✅ Concept Legal Suite Done!')

    // 2. Altadore Modern (Luxury)
    console.log('\n📝 Updating Altadore Modern...')
    const altadoreStory = {
        projectStory: {
            vision: [
                createBlock('In the heart of Altadore, this infill project aimed to redefine modern luxury. The homeowners wanted a sleek, minimalist aesthetic that felt warm and inviting, not sterile. The vision centered on "organic modernism"—clean lines softened by natural textures.'),
                createBlock('A key requirement was integrating the indoor and outdoor living spaces to take advantage of the south-facing backyard.')
            ],
            process: [
                createBlock('We installed floor-to-ceiling commercial-grade aluminum windows to flood the main floor with light. The kitchen features a massive 12-foot island with a waterfall edge in honed granite, contrasting beautifully with the white oak rift-cut cabinetry.'),
                createBlock('To achieve the seamless indoor-outdoor flow, we installed a 16-foot sliding glass wall system that opens the living room completely to the cedar deck.'),
                createBlock('The staircase is a structural steel mono-stringer with open risers, acting as a sculptural piece that allows light to travel through the home.')
            ],
            outcome: [
                createBlock('The home is a masterpiece of light and space. It has been featured in local design publications for its bold use of texture and light.'),
                createBlock('The renovation significantly increased the usable square footage by optimizing the layout and integrating the outdoor space as a seasonal room.')
            ]
        },
        timeline: [
            { _key: 'am1', phase: 'Demolition & Structural', duration: '3 weeks', description: 'Steel beam installation for open span.' },
            { _key: 'am2', phase: 'Mechanical Systems', duration: '3 weeks', description: 'Radiant floor heating and high-velocity AC.' },
            { _key: 'am3', phase: 'Curtain Wall Installation', duration: '2 weeks', description: 'Installation of large format glazing.' },
            { _key: 'am4', phase: 'Interior Finishes', duration: '6 weeks', description: 'Custom millwork, hardwood, and tile.' }
        ],
        challengesSolved: [
            {
                _key: 'amc1',
                challenge: 'Structural Spans',
                solution: 'To support the open concept main floor without columns, we craned in a 25-foot engineered steel beam hidden within the ceiling system.'
            },
            {
                _key: 'amc2',
                challenge: 'Complex Window Installation',
                solution: 'The sheer size of the glass units required a specialized glazing team and crane lift for installation, requiring precise coordination and road closures.'
            }
        ],
        clientQuote: {
            quote: 'It feels like living in an art gallery, but comfortable enough to let the kids run around. The light in this house is incredible.',
            clientName: 'Overview Design',
            clientRole: 'Design Partners'
        }
    }
    await client.patch('ksBd7J2rUVbRXaXvOwgc87').set(altadoreStory).commit()
    console.log('✅ Altadore Modern Done!')

    // 3. Lake Bonavista Estate (Luxury)
    console.log('\n📝 Updating Lake Bonavista Estate...')
    const bonavistaStory = {
        projectStory: {
            vision: [
                createBlock('This sprawling estate home in Lake Bonavista had remained untouched since the 1970s. The clients bought it for the location and lot size but needed a complete overhaul to suit their young family.'),
                createBlock('They wanted a "transitional" style—blending traditional elements with modern functionality. The layout needed to be opened up to improve flow between the kitchen, dining, and family areas.')
            ],
            process: [
                createBlock('We executed a "down to the studs" renovation. The closed-off kitchen was relocated to the center of the home, becoming the command center for the family.'),
                createBlock('We installed wide-plank engineered white oak flooring throughout the main level to unify the spaces. The new kitchen features two islands: one for prep and one for casual dining.'),
                createBlock('The basement was dug down 18 inches to increase ceiling height, allowing us to add a home gym, theater room, and guest suite.')
            ],
            outcome: [
                createBlock('This forever home now functions perfectly for a modern family while respecting the scale and grandeur of the original estate. The basement underpinning added over 1,500 sq. ft. of comfortable living space.'),
                createBlock('The property value has nearly doubled post-renovation, confirming that major investments in prime neighborhoods like Lake Bonavista yield high returns.')
            ]
        },
        timeline: [
            { _key: 'lb1', phase: 'Underpinning & Excavation', duration: '4 weeks', description: 'Digging out basement to increase ceiling height.' },
            { _key: 'lb2', phase: 'Structural Changes', duration: '3 weeks', description: 'Removing 3 load bearing walls.' },
            { _key: 'lb3', phase: 'New Systems', duration: '4 weeks', description: 'New 200amp service, new plumbing stacks, new dual furnaces.' },
            { _key: 'lb4', phase: 'Finishing', duration: '8 weeks', description: 'High-end custom millwork, finishing carpentry, stone masonry.' }
        ],
        challengesSolved: [
            {
                _key: 'lbc1',
                challenge: 'Low Basement Ceilings',
                solution: 'Underpinned the foundation (lowering the floor) by 18 inches. This complex structural work gave the basement 9-foot ceilings, transforming it from storage to premium living space.'
            },
            {
                _key: 'lbc2',
                challenge: 'Asbestos Abatement',
                solution: 'Discovered vermiculite insulation in attic. Brought in specialized abatement team to safely remove all hazardous materials before construction began.'
            }
        ],
        clientQuote: {
            quote: 'We essentially got a brand new house without having to leave the neighborhood we start to love. The basement height makes it feel like an main extension of the home.',
            clientName: 'The Andersons',
            clientRole: 'Homeowners'
        }
    }
    await client.patch('ksBd7J2rUVbRXaXvOwgckf').set(bonavistaStory).commit()
    console.log('✅ Lake Bonavista Estate Done!')
}

populateMissingThree().catch(console.error)

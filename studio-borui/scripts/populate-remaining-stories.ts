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

async function populateRemainingStories() {
    console.log('🚀 Populating remaining project stories...\n')

    // 1. Backyard Suite (Garden Suite)
    console.log('📝 Updating Backyard Suite...')
    const backyardStory = {
        projectStory: {
            vision: [
                createBlock('Situated on a wide lot in a revitalizing neighborhood, the homeowners saw an opportunity to utilize their expansive backyard space. Their goal was twofold: create a completely independent living space for aging parents that could eventually transition into a high-end rental unit.'),
                createBlock('They wanted a "soft density" solution that felt like a standalone home, not a shed. Privacy from the main house and high architectural quality were non-negotiable requirements.')
            ],
            process: [
                createBlock('We designed a 750 sq. ft. garden suite that complements the main house while maintaining its own distinct modern identity. We utilized the new City of Calgary H-GO zoning to maximize the footprint.'),
                createBlock('The structure rests on a frost-protected shallow foundation (FPSF), reducing excavation costs. We used HardieBoard siding for durability and installed oversized sliding doors to connect the living area to a private patio.'),
                createBlock('Inside, cathedral ceilings make the small footprint feel airy and spacious. A full-size kitchen with island ensures the space is functional for long-term living.')
            ],
            outcome: [
                createBlock('The resulting garden suite is a stunning example of gentle density. It provides close-proximity living for family while maintaining independence.'),
                createBlock('Market analysis suggests this unit would command $2,200+/month as a short-term executive rental or $1,800/month for long-term tenants. It instantly added an estimated $180,000 to the property value.')
            ]
        },
        timeline: [
            {
                _key: 't1',
                phase: 'Permits & Utility Planning',
                duration: '5 weeks',
                description: 'Navigated H-GO zoning requirements. Planned distinct utility connections (water/sewer) which required significant coordination with the City.'
            },
            {
                _key: 't2',
                phase: 'Excavation & Foundation',
                duration: '3 weeks',
                description: 'Excavated for foundation and utility trenching. Poured frost-protected slab-on-grade.'
            },
            {
                _key: 't3',
                phase: 'Framing & Roofing',
                duration: '3 weeks',
                description: 'Framed walls and roof capability. Installed scissor trusses to create vaulted ceilings inside.'
            },
            {
                _key: 't4',
                phase: 'Exterior Envelope',
                duration: '3 weeks',
                description: 'Installed windows, doors, and HardieBoard siding. Completed roofing and exterior waterproofing.'
            },
            {
                _key: 't5',
                phase: 'Mechanical & Electrical',
                duration: '2 weeks',
                description: 'Rough-in of independent furnace, hot water tank, and electrical panel.'
            },
            {
                _key: 't6',
                phase: 'Interior Finishes',
                duration: '4 weeks',
                description: 'Drywall, painting, flooring, cabinetry, and fixture installation.'
            }
        ],
        challengesSolved: [
            {
                _key: 'c1',
                challenge: 'Deep Utility Trenching in Winter',
                solution: 'Ground frost required hydro-vac excavation to safely expose main lines without damaging them, followed by insulated hoarding to cure the concrete foundation properly.'
            },
            {
                _key: 'c2',
                challenge: 'Privacy from Main House',
                solution: 'Designed the suite with clerestory windows on the side facing the main house—letting in light but blocking sightlines. Oriented the main patio to the alley/side for private outdoor space.'
            }
        ],
        clientQuote: {
            quote: 'It feels bigger than our first apartment. The vaulted ceilings change everything. Having mom close by but in her own space has been life-changing for our family.',
            clientName: 'Michael T.',
            clientRole: 'Homeowner'
        }
    }

    await client.patch('concept-backyard-suite').set(backyardStory).commit()
    console.log('✅ Backyard Suite Done!')

    // 2. Elbow Park Spa Bathroom
    console.log('\n📝 Updating Elbow Park Spa Bathroom...')
    const bathroomStory = {
        projectStory: {
            vision: [
                createBlock('The existing master ensuite in this Elbow Park home was stuck in the 80s—carpeted floors, a giant corner jacuzzi tub that was never used, and a tiny mismatched shower. The client wanted a "Four Seasons Hotel" experience at home.'),
                createBlock('Their wishlist included a massive curb-less steam shower, heated floors, and a freestanding tub that acted as a sculptural focal point rather than a space-hog.')
            ],
            process: [
                createBlock('We completely gutted the space, removing the bulkhead ceilings to maximize height. The layout was reimagined to center the freestanding tub under the window.'),
                createBlock('We installed a Schluter-Kerdi system for the entire wet room area to ensure 100% waterproofing for the steam shower. A linear drain allowed for large-format porcelain tiles (24x48) to run seamlessly from the main floor into the shower without a curb.'),
                createBlock('Custom floating vanities in walnut added warmth to the cool grey and white palette. We incorporated smart mirrors with integrated lighting and anti-fog technology.')
            ],
            outcome: [
                createBlock('The bathroom is now a true retreat. The steam shower gets daily use, and the heated floors are a favorite feature during Calgary winters. The renovation modernized the entire master suite.'),
                createBlock('Real estate assessments indicate this high-end renovation recouped approximately 85% of its cost in immediate equity gain, a very high ratio for bathroom renovations.')
            ]
        },
        timeline: [
            {
                _key: 't1',
                phase: 'Demolition & Prep',
                duration: '1 week',
                description: 'Removed all fixtures, tile, and subfloor. Jackhammered concrete to relocate shower drain.'
            },
            {
                _key: 't2',
                phase: 'Plumbing & Electrical Rough-in',
                duration: '1 week',
                description: 'Relocated drains. Ran dedicated lines for steam generator and heated floor system.'
            },
            {
                _key: 't3',
                phase: 'Waterproofing & Tiling',
                duration: '2 weeks',
                description: 'Installed Schluter waterproofing system. Laid heated floor mat. Installed large format tile floor-to-ceiling.'
            },
            {
                _key: 't4',
                phase: 'Fixtures & Glass',
                duration: '1 week',
                description: 'Installed vanity, tub, rain shower head. Measured and installed custom 10mm glass enclosure.'
            }
        ],
        challengesSolved: [
            {
                _key: 'c1',
                challenge: 'Relocating Drains in Concrete Slab',
                solution: 'Used GPR (Ground Penetrating Radar) to scan slab before cutting. Safely trenched concrete to move shower drain 4 feet to accommodate new layout, then re-poured concrete.'
            },
            {
                _key: 'c2',
                challenge: 'Steam Shower Sealing',
                solution: 'Sloped the ceiling above the shower to prevent cold drips. Used epoxy grout for maximum moisture resistance and longevity.'
            }
        ],
        clientQuote: {
            quote: 'I travel for work constantly, but this bathroom is better than any hotel I\'ve stayed in. The steam shower is the best way to start the morning.',
            clientName: 'James R.',
            clientRole: 'Homeowner'
        }
    }

    await client.patch('spa-bathroom-retreat').set(bathroomStory).commit()
    console.log('✅ Elbow Park Bathroom Done!')
}

populateRemainingStories().catch(console.error)

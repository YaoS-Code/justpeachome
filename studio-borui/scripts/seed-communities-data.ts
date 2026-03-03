import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN,
})

const communityData: Record<string, any> = {
    'altadore': {
        zoningTypes: [
            {
                code: 'R-C2',
                description: 'Contextual One/Two Dwelling District - Allows for duplexes, semi-detached homes, and secondary suites.',
                allowsSecondarysuites: true,
                allowsBackyardSuites: true
            },
            {
                code: 'R-CG',
                description: 'Contextual Grade-Oriented - Supports rowhouses and townhomes.',
                allowsSecondarysuites: true,
                allowsBackyardSuites: true
            }
        ],
        characteristics: {
            era: 'mixed',
            lotSizes: "25' x 125' to 50' x 125'",
            homeStyles: ['modern-infill', 'heritage', 'two-storey'],
            walkScore: 78,
            transitAccess: 'good',
            proximityToDowntown: '5 km (10 min)'
        },
        amenities: ['Marda Loop Shopping District', 'River Park', 'Sandy Beach', 'Off-leash Dog Parks'],
        investmentPotential: {
            rentalDemand: 'very-high',
            averageRent: '$2,500-3,500/month for infill',
            propertyAppreciation: 'strong'
        }
    },
    'killarney': {
        zoningTypes: [
            {
                code: 'R-C2',
                description: 'Contextual One/Two Dwelling District - Prime for infill development.',
                allowsSecondarysuites: true,
                allowsBackyardSuites: true
            }
        ],
        characteristics: {
            era: 'mixed',
            lotSizes: "25' x 120'",
            homeStyles: ['modern-infill', 'bungalow', 'two-storey'],
            walkScore: 75,
            transitAccess: 'excellent',
            proximityToDowntown: '4 km (8 min)'
        },
        amenities: ['Westbrook Mall', 'Killarney Aquatic Centre', '17th Ave SW Shops', 'Shaganappi Point Golf Course'],
        investmentPotential: {
            rentalDemand: 'high',
            averageRent: '$2,200-3,000/month',
            propertyAppreciation: 'steady'
        }
    },
    'marda-loop': {
        zoningTypes: [
            {
                code: 'M-C1',
                description: 'Multi-Residential Contextual Low Profile - Great for townhomes and low-rise apartments.',
                allowsSecondarysuites: true,
                allowsBackyardSuites: false
            }
        ],
        characteristics: {
            era: 'established',
            lotSizes: "Various",
            homeStyles: ['townhouse', 'low-rise condo', 'infill'],
            walkScore: 85,
            transitAccess: 'good',
            proximityToDowntown: '3.5 km (7 min)'
        },
        amenities: ['Marda Loop Business District', 'CSpace King Edward', 'South Calgary Park'],
        investmentPotential: {
            rentalDemand: 'very-high',
            averageRent: '$1,800-2,500/month',
            propertyAppreciation: 'strong'
        }
    },
    'lake-bonavista': {
        zoningTypes: [
            {
                code: 'R-C1',
                description: 'Contextual One Dwelling District - Primarily single-family homes.',
                allowsSecondarysuites: true,
                allowsBackyardSuites: true
            }
        ],
        characteristics: {
            era: 'established',
            lotSizes: "60' x 110'",
            homeStyles: ['bungalow', 'two-storey', 'split-level'],
            walkScore: 45,
            transitAccess: 'moderate',
            proximityToDowntown: '15 km (20 min)'
        },
        amenities: ['Lake Bonavista (Private Lake)', 'Fish Creek Park', 'Southcentre Mall'],
        investmentPotential: {
            rentalDemand: 'high',
            averageRent: '$2,800-3,500/month (Whole House)',
            propertyAppreciation: 'stable'
        }
    }
}

async function seedCommunities() {
    console.log('🌱 Seeding community data...\n')

    const communities = await client.fetch(`*[_type == "community"]{ _id, title, slug }`)
    console.log(`Found ${communities.length} communities`)

    for (const community of communities) {
        const slug = community.slug?.current
        if (!slug) continue

        // Match by slug keyword
        let data = null
        if (slug.includes('altadore')) data = communityData['altadore']
        else if (slug.includes('killarney')) data = communityData['killarney']
        else if (slug.includes('marda')) data = communityData['marda-loop']
        else if (slug.includes('bonavista')) data = communityData['lake-bonavista']

        if (data) {
            console.log(`Updating ${community.title}...`)
            try {
                await client.patch(community._id).set(data).commit()
                console.log(`✅ Updated ${community.title}`)
            } catch (err) {
                console.error(`❌ Failed to update ${community.title}`, err)
            }
        } else {
            console.log(`⚠️ No data found for ${community.title} (slug: ${slug})`)
        }
    }

    console.log('\n✨ Seeding complete!')
}

seedCommunities()

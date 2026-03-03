import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

async function fixHomePageContent() {
    console.log('🔧 Fixing Home Page content issues...\n')

    const homePageQuery = `*[_type == "homePage"][0]`
    const homePage = await client.fetch(homePageQuery)

    if (!homePage) {
        console.error('❌ Home page not found!')
        return
    }

    // Fix Value Proposition section
    const updatedValueProposition = {
        title: 'Two Approaches, One Standard of Excellence',
        subtitle: 'We understand that different projects have different goals. That\'s why we offer two distinct approaches.',
        premiumStandard: {
            title: 'Premium Standard',
            focus: 'Unique aesthetics, smart home integration, high-end appliances',
            materials: 'Hardwood, quartz, custom cabinetry',
            design: 'Personalized to your taste',
            durability: 'High-maintenance, requires care',
            roi: 'Increases overall property value'
        },
        investmentStandard: {
            title: 'Investment Standard',
            focus: 'Durability, easy maintenance, tenant safety code compliance',
            materials: 'Vinyl plank (LVP), laminate, pre-fab cabinets',
            design: 'Neutral tones to appeal to mass market',
            durability: 'Commercial grade, tenant-proof',
            roi: 'Maximized rental yield (10-15%)'
        }
    }

    await client
        .patch(homePage._id)
        .set({
            valueProposition: updatedValueProposition
        })
        .commit()

    console.log('✅ Value Proposition section updated')
    console.log('\n📋 Updated content:')
    console.log(`  Title: "${updatedValueProposition.title}"`)
    console.log(`  Subtitle: "${updatedValueProposition.subtitle}"`)
    console.log('\n  Premium Standard:')
    console.log(`    Focus: "${updatedValueProposition.premiumStandard.focus}"`)
    console.log(`    Materials: "${updatedValueProposition.premiumStandard.materials}"`)
    console.log('\n  Investment Standard:')
    console.log(`    Focus: "${updatedValueProposition.investmentStandard.focus}"`)
    console.log(`    Materials: "${updatedValueProposition.investmentStandard.materials}"`)
    console.log('\n✅ All fixes applied successfully!')
}

fixHomePageContent().catch(console.error)

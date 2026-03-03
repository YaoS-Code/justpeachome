import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

async function updateFeaturedProjectsTitle() {
    console.log('🔧 Updating Featured Projects title...\n')

    const homePageQuery = `*[_type == "homePage"][0]`
    const homePage = await client.fetch(homePageQuery)

    if (!homePage) {
        console.error('❌ Home page not found!')
        return
    }

    await client
        .patch(homePage._id)
        .set({
            'featuredProjects.title': 'Featured Projects',
            'featuredProjects.subtitle': 'See our latest Calgary renovations and custom builds'
        })
        .commit()

    console.log('✅ Featured Projects section updated')
    console.log('  Old title: "Curated Portfolio"')
    console.log('  New title: "Featured Projects"')
    console.log('  New subtitle: "See our latest Calgary renovations and custom builds"')
}

updateFeaturedProjectsTitle().catch(console.error)

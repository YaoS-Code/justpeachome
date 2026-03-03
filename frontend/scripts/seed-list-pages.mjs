import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const servicesPage = {
    _type: 'servicesPage',
    _id: 'singleton-servicesPage',
    title: 'Expert Services',
    description: 'From concept to completion, we offer a full suite of architectural design and construction services for Calgary homeowners, specializing in R-CG infills and luxury renovations.',
}

const projectsPage = {
    _type: 'projectsPage',
    _id: 'singleton-projectsPage',
    title: 'Selected Works',
    description: 'A curated collection of our most significant projects, demonstrating our commitment to organic modern aesthetics, sustainable luxury, and functional family living.',
}

const blogPage = {
    _type: 'blogPage',
    _id: 'singleton-blogPage',
    title: 'The Design Journal',
    description: 'Your resource for organic modern living, renovation guides, and the latest insights in sustainable home building.',
}

async function seed() {
    console.log('🚀 Seeding List Page Settings...')
    try {
        await client.createOrReplace(servicesPage)
        console.log('✅ Seeded Services Page')
        await client.createOrReplace(projectsPage)
        console.log('✅ Seeded Projects Page')
        await client.createOrReplace(blogPage)
        console.log('✅ Seeded Blog Page')
    } catch (error) {
        console.error('❌ Seeding failed:', error.message)
        process.exit(1)
    }
}

seed()

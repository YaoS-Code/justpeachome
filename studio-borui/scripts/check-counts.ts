import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

async function checkCounts() {
    const typesToCount = ['project', 'service', 'community', 'homePage', 'heroImage', 'faq', 'benefit']
    console.log('📊 Checking document counts in Sanity...')

    try {
        for (const type of typesToCount) {
            const count = await client.fetch(`count(*[_type == "${type}"])`)
            console.log(`- ${type}: ${count}`)
        }

        const allTypes = await client.fetch(`array::unique(*[]. _type)`)
        console.log('\nAll existing document types:', allTypes)

    } catch (error) {
        console.error('❌ Failed to check counts:', error)
    }
}

checkCounts()

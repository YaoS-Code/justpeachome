import { createClient } from '@sanity/client'

const token = process.env.SANITY_AUTH_TOKEN

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: token
})

async function debug() {
    console.log('--- Sanity Direct Client Debug ---')
    console.log('Token Length:', token ? token.length : 0)

    // Attempt Write
    try {
        console.log('Attempting test write...')
        const doc = { _type: 'test_doc', title: 'Debug Write Direct' }
        const res = await client.create(doc)
        console.log('Write Success! Doc ID:', res._id)
        // clean up
        await client.delete(res._id)
        console.log('Test doc deleted.')
    } catch (e) {
        console.error('Write Failed:', e.message)
    }
}

debug()

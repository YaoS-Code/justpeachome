import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

async function deleteDrafts() {
    console.log('🗑️  Deleting draft versions...\n')

    const draftIds = [
        'drafts.ksBd7J2rUVbRXaXvOwgeMt', // Killarney Kitchen
        'drafts.ksBd7J2rUVbRXaXvOwgckf', // Lake Bonavista Estate
        'drafts.ksBd7J2rUVbRXaXvOwgc87', // Altadore Modern
        'drafts.ksBd7J2rUVbRXaXvOwge3c'  // Marda Loop Heritage (if exists)
    ]

    for (const draftId of draftIds) {
        try {
            const exists = await client.fetch(`*[_id == "${draftId}"][0]`)
            if (exists) {
                await client.delete(draftId)
                console.log(`✅ Deleted: ${draftId}`)
            } else {
                console.log(`ℹ️  Not found: ${draftId}`)
            }
        } catch (error) {
            console.error(`❌ Error deleting ${draftId}:`, error)
        }
    }

    console.log('\n✨ Draft cleanup complete!')
}

deleteDrafts().catch(console.error)

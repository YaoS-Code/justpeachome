import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

async function updateProjectCategories() {
    console.log('🔄 Starting project category updates...\n')

    const updates = [
        {
            id: 'O7YtP3U9ZmUnyBia7ftUiq',
            title: 'Seton Legal Basement Suite',
            newCategory: 'legal-suite',
            oldCategory: 'investment'
        },
        {
            id: 'concept-backyard-suite',
            title: 'Concept: Garden Suite / Laneway House',
            newCategory: 'backyard-suite',
            oldCategory: 'investment'
        },
        {
            id: 'ksBd7J2rUVbRXaXvOwgeMt',
            title: 'Killarney Kitchen',
            newCategory: 'kitchen-bath',
            oldCategory: 'luxury'
        },
        {
            id: 'ksBd7J2rUVbRXaXvOwge3c',
            title: 'Marda Loop Heritage',
            newCategory: 'luxury-renovation',
            oldCategory: 'luxury'
        },
        {
            id: 'ksBd7J2rUVbRXaXvOwgckf',
            title: 'Lake Bonavista Estate',
            newCategory: 'luxury-renovation',
            oldCategory: 'both'
        },
        {
            id: 'ksBd7J2rUVbRXaXvOwgc87',
            title: 'Altadore Modern',
            newCategory: 'luxury-renovation',
            oldCategory: 'both'
        }
    ]

    for (const update of updates) {
        try {
            await client
                .patch(update.id)
                .set({ projectCategory: update.newCategory })
                .commit()

            console.log(`✅ ${update.title}`)
            console.log(`   ${update.oldCategory} → ${update.newCategory}\n`)
        } catch (error) {
            console.error(`❌ Failed to update ${update.title}:`, error)
        }
    }

    console.log('✨ Category updates complete!')
}

updateProjectCategories().catch(console.error)

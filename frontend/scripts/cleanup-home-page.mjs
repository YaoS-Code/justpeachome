import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const HOME_PAGE_ID = 'ae8dd291-d52f-4a80-969a-c7f931e0229c'

async function cleanup() {
    console.log('🧹 Cleaning up Home Page document...')
    try {
        const doc = await client.getDocument(HOME_PAGE_ID)

        if (!doc) {
            console.error('❌ Document not found')
            return
        }

        const patch = client.patch(HOME_PAGE_ID)

        // 1. Rename ogImage to socialImage in seo
        if (doc.seo && doc.seo.ogImage) {
            console.log('  - Renaming seo.ogImage to seo.socialImage')
            patch.set({ 'seo.socialImage': doc.seo.ogImage })
            patch.unset(['seo.ogImage'])
        }

        // 2. Remove _system field
        if (doc._system) {
            console.log('  - Removing _system field')
            patch.unset(['_system'])
        }

        // 3. Ensure statsSection items have keys (already did this, but double check)
        if (doc.statsSection && doc.statsSection.items) {
            const itemsWithKeys = doc.statsSection.items.map((item, idx) => ({
                ...item,
                _key: item._key || `stat-${idx}`
            }))
            patch.set({ 'statsSection.items': itemsWithKeys })
        }

        await patch.commit()
        console.log('✅ Cleanup successful!')
    } catch (error) {
        console.error('❌ Cleanup failed:', error.message)
        process.exit(1)
    }
}

cleanup()

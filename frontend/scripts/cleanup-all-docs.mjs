import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const SINGLETONS = [
    'ae8dd291-d52f-4a80-969a-c7f931e0229c', // Home
    'singleton-siteSettings',
    'singleton-contactPage',
    'aboutPage',
    'singleton-blogPage',
    'singleton-servicesPage',
    'singleton-projectsPage'
]

async function cleanupAll() {
    console.log('🧹 Starting Global Content Cleanup...')

    for (const id of SINGLETONS) {
        try {
            const doc = await client.getDocument(id)
            if (!doc) continue

            console.log(`  - Checking ${id} (${doc._type})...`)
            const patch = client.patch(id)
            let hasChanges = false

            // Fix SEO field names
            if (doc.seo) {
                if (doc.seo.ogImage) {
                    console.log(`    * Renaming seo.ogImage -> seo.socialImage`)
                    patch.set({ 'seo.socialImage': doc.seo.ogImage })
                    patch.unset(['seo.ogImage'])
                    hasChanges = true
                }
                if (doc.seo.title) {
                    console.log(`    * Renaming seo.title -> seo.metaTitle`)
                    patch.set({ 'seo.metaTitle': doc.seo.title })
                    patch.unset(['seo.title'])
                    hasChanges = true
                }
            }

            // Remove _system
            if (doc._system) {
                console.log(`    * Removing _system`)
                patch.unset(['_system'])
                hasChanges = true
            }

            // Fix missing keys in statsSection.items (Home Page only)
            if (id === 'ae8dd291-d52f-4a80-969a-c7f931e0229c' && doc.statsSection?.items) {
                const itemsWithKeys = doc.statsSection.items.map((item, idx) => ({
                    ...item,
                    _key: item._key || `stat-${idx}`
                }))
                patch.set({ 'statsSection.items': itemsWithKeys })
                hasChanges = true
            }

            if (hasChanges) {
                await patch.commit()
                console.log(`    ✅ Updated ${id}`)
            } else {
                console.log(`    ⏭️ No changes needed for ${id}`)
            }
        } catch (error) {
            console.warn(`    ⚠️ Failed to cleanup ${id}: ${error.message}`)
        }
    }
    console.log('✨ All cleanups complete!')
}

cleanupAll()

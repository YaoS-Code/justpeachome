import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load .env file from root directory
const envPath = join(process.cwd(), '..', '.env')
try {
    const envContent = readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/)
        if (match) {
            const key = match[1].trim()
            const value = match[2].trim()
            if (!process.env[key]) {
                process.env[key] = value
            }
        }
    })
} catch (err) {
    console.log('⚠️  Could not load .env file:', err.message)
}

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN_Edit,
})

async function fixServiceKeys() {
    console.log('🔧 Fixing Service document keys...\n')
    
    // Get the service document
    const serviceId = 'EWqfRe4HhQuPCNZ0OFjHDD'
    const doc = await client.getDocument(serviceId)
    
    if (!doc) {
        console.log('❌ Document not found')
        return
    }
    
    console.log('📄 Found document:', doc.title)
    console.log('🔍 Checking for invalid keys...\n')
    
    const patch = client.patch(serviceId)
    let hasChanges = false
    
    // Fix FAQs array - remove "_key" and "answer" fields, keep only _key, question, answer
    if (doc.faqs && Array.isArray(doc.faqs)) {
        console.log('  📋 Fixing FAQs array...')
        const fixedFaqs = doc.faqs.map((item, idx) => {
            const fixed = {
                _key: item._key || `faq${idx + 1}`,
                question: item.question || item['"question"'] || '',
                answer: item.answer || item['"answer"'] || ''
            }
            return fixed
        })
        patch.set({ faqs: fixedFaqs })
        hasChanges = true
        console.log(`    ✅ Fixed ${fixedFaqs.length} FAQ items`)
    }
    
    // Fix Features array
    if (doc.features && Array.isArray(doc.features)) {
        console.log('  📋 Fixing Features array...')
        const fixedFeatures = doc.features.map((item, idx) => {
            const fixed = {
                _key: item._key || `feat${idx + 1}`,
                title: item.title || item['"title"'] || '',
                description: item.description || item['"description"'] || '',
                icon: item.icon || item['"icon"'] || 'CheckCircle'
            }
            return fixed
        })
        patch.set({ features: fixedFeatures })
        hasChanges = true
        console.log(`    ✅ Fixed ${fixedFeatures.length} Feature items`)
    }
    
    // Fix Process array
    if (doc.process && Array.isArray(doc.process)) {
        console.log('  📋 Fixing Process array...')
        const fixedProcess = doc.process.map((item, idx) => {
            const fixed = {
                _key: item._key || `step${idx + 1}`,
                title: item.title || item['"title"'] || '',
                description: item.description || item['"description"'] || '',
                order: item.order || item['"order"'] || (idx + 1)
            }
            return fixed
        })
        patch.set({ process: fixedProcess })
        hasChanges = true
        console.log(`    ✅ Fixed ${fixedProcess.length} Process items`)
    }
    
    // Remove any unknown fields
    const knownFields = [
        '_id', '_type', '_createdAt', '_updatedAt', '_rev',
        'title', 'slug', 'heroStyle', 'splitHero',
        'shortDescription', 'coverImage', 'content',
        'features', 'process', 'gallery', 'faqs', 'seo'
    ]
    
    const unknownFields = Object.keys(doc).filter(key => !knownFields.includes(key))
    if (unknownFields.length > 0) {
        console.log('  🗑️  Removing unknown fields:')
        unknownFields.forEach(field => {
            console.log(`    - ${field}`)
            patch.unset([field])
        })
        hasChanges = true
    }
    
    if (hasChanges) {
        console.log('\n💾 Committing changes...')
        await patch.commit()
        console.log('✅ Successfully updated document!')
    } else {
        console.log('⏭️  No changes needed')
    }
}

fixServiceKeys()


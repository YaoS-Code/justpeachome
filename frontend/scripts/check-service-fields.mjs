import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
})

async function checkServiceFields() {
    console.log('🔍 Checking Service document fields...\n')

    // Get all services first
    const allServices = await client.fetch('*[_type == "service"]{ _id, title, slug }')
    console.log('📋 All services:')
    allServices.forEach(s => console.log(`  - ${s.title} (${s._id})`))
    console.log('')

    // Get the basement service by ID
    const serviceId = 'EWqfRe4HhQuPCNZ0OFjHDD'
    const doc = await client.getDocument(serviceId)

    if (!doc) {
        console.log('❌ Document not found')
        return
    }
    
    console.log('📄 Document ID:', doc._id)
    console.log('📝 Document Type:', doc._type)
    console.log('\n📋 All fields in document:')
    console.log('─'.repeat(50))
    
    const allKeys = Object.keys(doc).sort()
    allKeys.forEach(key => {
        const value = doc[key]
        const type = Array.isArray(value) ? 'array' : typeof value
        console.log(`  ${key.padEnd(25)} : ${type}`)
    })
    
    console.log('\n🔍 Checking for unknown fields...')
    console.log('─'.repeat(50))
    
    // Expected fields from schema
    const expectedFields = [
        '_id', '_type', '_createdAt', '_updatedAt', '_rev',
        'title', 'slug', 'heroStyle', 'splitHero',
        'shortDescription', 'coverImage', 'content',
        'features', 'process', 'gallery', 'faqs', 'seo'
    ]
    
    const unexpectedFields = allKeys.filter(key => !expectedFields.includes(key))
    
    if (unexpectedFields.length > 0) {
        console.log('⚠️  Found unexpected fields:')
        unexpectedFields.forEach(field => {
            console.log(`  - ${field}`)
        })
    } else {
        console.log('✅ No unexpected fields found')
    }
}

checkServiceFields()


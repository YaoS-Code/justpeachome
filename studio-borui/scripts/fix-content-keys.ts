import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env from root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const client = createClient({
  projectId: 'yoxfbvg1',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

function generateKey(): string {
  return uuidv4().replace(/-/g, '').substring(0, 22)
}

async function fixContentKeys() {
  try {
    console.log('🔧 Fixing missing _key in content fields...\n')
    
    // Get all services
    const services = await client.fetch(`*[_type == "service"]`)
    
    console.log(`📋 Found ${services.length} service(s)\n`)
    
    let fixedCount = 0
    
    for (const service of services) {
      // Skip drafts for now
      if (service._id.startsWith('drafts.')) {
        console.log(`⏭️  Skipping draft: ${service.title}`)
        continue
      }
      
      let updated = false
      const updatedService = { ...service }
      
      // Fix content field
      if (service.content && Array.isArray(service.content)) {
        const missingKeys = service.content.filter((item: any) => !item._key)
        
        if (missingKeys.length > 0) {
          console.log(`\n📄 ${service.title}`)
          console.log(`   ❌ Found ${missingKeys.length} items with missing _key in content field`)
          
          updatedService.content = service.content.map((item: any) => {
            if (!item._key) {
              const newKey = generateKey()
              console.log(`      🔧 Adding _key: "${newKey}" to ${item._type} block`)
              return { ...item, _key: newKey }
            }
            return item
          })
          
          updated = true
        }
      }
      
      // Update document if needed
      if (updated) {
        console.log(`   💾 Updating "${service.title}"...`)
        await client.createOrReplace(updatedService)
        console.log(`   ✅ Updated!\n`)
        fixedCount++
      }
    }
    
    // Also check other document types with content fields
    const otherTypes = ['post', 'project', 'homePage', 'aboutPage']
    
    for (const docType of otherTypes) {
      const docs = await client.fetch(`*[_type == "${docType}" && !(_id in path("drafts.**"))]`)
      
      for (const doc of docs) {
        let updated = false
        const updatedDoc = { ...doc }
        
        if (doc.content && Array.isArray(doc.content)) {
          const missingKeys = doc.content.filter((item: any) => !item._key)
          
          if (missingKeys.length > 0) {
            console.log(`\n📄 ${docType}: ${doc.title || doc._id}`)
            console.log(`   ❌ Found ${missingKeys.length} items with missing _key`)
            
            updatedDoc.content = doc.content.map((item: any) => {
              if (!item._key) {
                const newKey = generateKey()
                console.log(`      🔧 Adding _key: "${newKey}"`)
                return { ...item, _key: newKey }
              }
              return item
            })
            
            updated = true
          }
        }
        
        if (updated) {
          console.log(`   💾 Updating...`)
          await client.createOrReplace(updatedDoc)
          console.log(`   ✅ Updated!\n`)
          fixedCount++
        }
      }
    }
    
    console.log(`\n🎉 Fixed ${fixedCount} document(s)!`)
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

fixContentKeys()


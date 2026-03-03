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
  return uuidv4().replace(/-/g, '').substring(0, 12)
}

function fixArrayKeys(arr: any[]): { fixed: any[], changed: boolean } {
  let changed = false
  const fixed = arr.map((item: any) => {
    if (!item._key || item._key.length < 8) {
      changed = true
      const newKey = generateKey()
      console.log(`      🔧 Fixing: "${item._key || 'missing'}" → "${newKey}"`)
      return { ...item, _key: newKey }
    }
    return item
  })
  return { fixed, changed }
}

async function fixAllKeys() {
  try {
    console.log('🔍 Searching for ALL documents with array fields...\n')
    
    // Get ALL documents
    const allDocs = await client.fetch(`*[defined(_type)]`)
    
    console.log(`📋 Found ${allDocs.length} total documents\n`)
    
    let fixedCount = 0
    
    for (const doc of allDocs) {
      let updated = false
      const updatedDoc = { ...doc }
      
      console.log(`\n📄 Checking: ${doc._type} - "${doc.title || doc.name || doc._id}"`)
      
      // Check all possible array fields
      const arrayFields = Object.keys(doc).filter(key => Array.isArray(doc[key]))
      
      if (arrayFields.length === 0) {
        console.log(`   ℹ️  No array fields`)
        continue
      }
      
      for (const fieldName of arrayFields) {
        const arr = doc[fieldName]
        
        // Skip if array is empty or items don't have _key
        if (arr.length === 0) continue
        
        const hasKeys = arr.some((item: any) => typeof item === 'object' && '_key' in item)
        if (!hasKeys) continue
        
        console.log(`   🔍 Checking field: ${fieldName} (${arr.length} items)`)
        
        const { fixed, changed } = fixArrayKeys(arr)
        
        if (changed) {
          updatedDoc[fieldName] = fixed
          updated = true
        }
      }
      
      // Update document if needed
      if (updated) {
        console.log(`   💾 Updating document...`)
        await client.createOrReplace(updatedDoc)
        console.log(`   ✅ Updated!`)
        fixedCount++
      }
    }
    
    console.log(`\n\n🎉 Fixed ${fixedCount} document(s)!`)
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

fixAllKeys()


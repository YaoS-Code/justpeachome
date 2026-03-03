import { createClient } from '@sanity/client'
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

async function checkDrafts() {
  try {
    console.log('🔍 Checking all draft documents...\n')
    
    // Get all draft documents
    const drafts = await client.fetch(`*[_id in path("drafts.**")]`)
    
    console.log(`📋 Found ${drafts.length} draft document(s)\n`)
    
    for (const draft of drafts) {
      console.log(`\n📄 ${draft._type}: "${draft.title || draft.name || draft._id}"`)
      console.log(`   ID: ${draft._id}`)
      
      // Check all array fields
      const arrayFields = Object.keys(draft).filter(key => Array.isArray(draft[key]))
      
      if (arrayFields.length === 0) {
        console.log(`   ℹ️  No array fields`)
        continue
      }
      
      for (const fieldName of arrayFields) {
        const arr = draft[fieldName]
        
        if (arr.length === 0) continue
        
        const hasKeys = arr.some((item: any) => typeof item === 'object' && '_key' in item)
        if (!hasKeys) continue
        
        console.log(`\n   📋 ${fieldName} (${arr.length} items):`)
        
        arr.forEach((item: any, index: number) => {
          if (item && typeof item === 'object') {
            const keyStatus = !item._key 
              ? '❌ MISSING' 
              : item._key.length < 8 
              ? `⚠️  TOO SHORT (${item._key.length})` 
              : '✅'
            
            console.log(`      [${index}] ${keyStatus} _key: "${item._key || 'undefined'}"`)
            
            if (item.title) console.log(`           title: "${item.title}"`)
            if (item.question) console.log(`           question: "${item.question}"`)
            if (item.feature) console.log(`           feature: "${item.feature}"`)
          }
        })
        
        // Check for duplicates
        const keys = arr
          .filter((item: any) => item && item._key)
          .map((item: any) => item._key)
        
        const uniqueKeys = new Set(keys)
        if (keys.length !== uniqueKeys.size) {
          console.log(`\n      ❌ DUPLICATE KEYS DETECTED!`)
          const keyCount: { [key: string]: number } = {}
          keys.forEach((key: string) => {
            keyCount[key] = (keyCount[key] || 0) + 1
          })
          Object.entries(keyCount).forEach(([key, count]) => {
            if (count > 1) {
              console.log(`         🔴 "${key}" appears ${count} times`)
            }
          })
        }
      }
    }
    
    console.log('\n\n✅ Draft check complete!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkDrafts()


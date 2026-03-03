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

async function checkBasementSuite() {
  try {
    console.log('🔍 Checking Basement & Secondary Suites service...\n')
    
    // Get both published and draft versions
    const docs = await client.fetch(`*[_type == "service" && title == "Basement & Secondary Suites"]`)
    
    console.log(`📋 Found ${docs.length} version(s)\n`)
    
    for (const doc of docs) {
      console.log(`\n${'='.repeat(80)}`)
      console.log(`📄 ${doc._id}`)
      console.log(`${'='.repeat(80)}\n`)
      
      // Check content field in detail
      if (doc.content && Array.isArray(doc.content)) {
        console.log(`📝 CONTENT field (${doc.content.length} items):\n`)
        
        doc.content.forEach((item: any, index: number) => {
          console.log(`[${index}] ────────────────────────────────────────`)
          console.log(`  _type: ${item._type || 'MISSING'}`)
          console.log(`  _key: ${item._key || '❌ MISSING'}`)
          
          if (item._type === 'block') {
            console.log(`  style: ${item.style || 'normal'}`)
            if (item.children && item.children.length > 0) {
              const text = item.children.map((c: any) => c.text).join('')
              console.log(`  text: "${text.substring(0, 60)}${text.length > 60 ? '...' : ''}"`)
            }
          } else if (item._type === 'image') {
            console.log(`  asset: ${item.asset?._ref || 'MISSING'}`)
          }
          
          // Check if _key is valid
          if (!item._key) {
            console.log(`  ❌ ERROR: Missing _key!`)
          } else if (typeof item._key !== 'string') {
            console.log(`  ❌ ERROR: _key is not a string! Type: ${typeof item._key}`)
          } else if (item._key.length < 8) {
            console.log(`  ⚠️  WARNING: _key too short (${item._key.length} chars)`)
          }
          console.log('')
        })
        
        // Check for duplicates
        const keys = doc.content
          .filter((item: any) => item._key)
          .map((item: any) => item._key)
        
        const uniqueKeys = new Set(keys)
        
        if (keys.length !== uniqueKeys.size) {
          console.log(`\n❌ DUPLICATE KEYS FOUND!\n`)
          const keyCount: { [key: string]: number } = {}
          keys.forEach((key: string) => {
            keyCount[key] = (keyCount[key] || 0) + 1
          })
          Object.entries(keyCount).forEach(([key, count]) => {
            if (count > 1) {
              console.log(`   🔴 "${key}" appears ${count} times`)
            }
          })
        } else {
          console.log(`✅ No duplicate keys in content field`)
        }
        
        // Check for missing keys
        const missingKeys = doc.content.filter((item: any) => !item._key)
        if (missingKeys.length > 0) {
          console.log(`\n❌ ${missingKeys.length} items with MISSING _key`)
        } else {
          console.log(`✅ All items have _key`)
        }
      }
      
      // Also check other array fields
      const otherArrays = ['features', 'faqs', 'gallery', 'process']
      for (const fieldName of otherArrays) {
        if (doc[fieldName] && Array.isArray(doc[fieldName])) {
          console.log(`\n📋 ${fieldName.toUpperCase()} (${doc[fieldName].length} items):`)
          doc[fieldName].forEach((item: any, i: number) => {
            console.log(`   [${i}] _key: ${item._key || '❌ MISSING'}`)
          })
        }
      }
    }
    
    console.log('\n\n✅ Check complete!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkBasementSuite()


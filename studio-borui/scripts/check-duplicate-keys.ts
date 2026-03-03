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

function checkDuplicateKeys(arr: any[], fieldName: string, docTitle: string): boolean {
  const keys = arr
    .filter((item: any) => item && typeof item === 'object' && item._key)
    .map((item: any) => item._key)
  
  const uniqueKeys = new Set(keys)
  
  if (keys.length !== uniqueKeys.size) {
    console.log(`   ❌ DUPLICATE KEYS FOUND in ${fieldName}!`)
    
    // Find duplicates
    const keyCount: { [key: string]: number } = {}
    keys.forEach((key: string) => {
      keyCount[key] = (keyCount[key] || 0) + 1
    })
    
    Object.entries(keyCount).forEach(([key, count]) => {
      if (count > 1) {
        console.log(`      🔴 "${key}" appears ${count} times`)
      }
    })
    
    return true
  }
  
  // Check for missing keys
  const missingKeys = arr.filter((item: any) => !item._key || typeof item._key !== 'string')
  if (missingKeys.length > 0) {
    console.log(`   ❌ MISSING KEYS in ${fieldName}: ${missingKeys.length} items`)
    return true
  }
  
  // Check for null/undefined keys
  const nullKeys = arr.filter((item: any) => item._key === null || item._key === undefined)
  if (nullKeys.length > 0) {
    console.log(`   ❌ NULL/UNDEFINED KEYS in ${fieldName}: ${nullKeys.length} items`)
    return true
  }
  
  return false
}

async function checkAllDuplicates() {
  try {
    console.log('🔍 Checking for duplicate or missing _key values...\n')
    
    // Get ALL documents
    const allDocs = await client.fetch(`*[defined(_type)]`)
    
    console.log(`📋 Checking ${allDocs.length} documents\n`)
    
    let problemCount = 0
    
    for (const doc of allDocs) {
      const arrayFields = Object.keys(doc).filter(key => Array.isArray(doc[key]))
      
      if (arrayFields.length === 0) continue
      
      let hasProblems = false
      
      for (const fieldName of arrayFields) {
        const arr = doc[fieldName]
        
        // Skip if array is empty or items don't have _key
        if (arr.length === 0) continue
        
        const hasKeys = arr.some((item: any) => typeof item === 'object' && '_key' in item)
        if (!hasKeys) continue
        
        const hasProblem = checkDuplicateKeys(arr, fieldName, doc.title || doc.name || doc._id)
        
        if (hasProblem && !hasProblems) {
          console.log(`\n📄 ${doc._type}: "${doc.title || doc.name || doc._id}" (ID: ${doc._id})`)
          hasProblems = true
        }
      }
      
      if (hasProblems) {
        problemCount++
        
        // Show the actual array content for debugging
        for (const fieldName of arrayFields) {
          const arr = doc[fieldName]
          if (arr.length === 0) continue
          
          const hasKeys = arr.some((item: any) => typeof item === 'object' && '_key' in item)
          if (!hasKeys) continue
          
          console.log(`\n   📋 ${fieldName} array content:`)
          arr.forEach((item: any, index: number) => {
            if (item && typeof item === 'object') {
              console.log(`      [${index}] _key: "${item._key || 'MISSING'}" | _type: "${item._type || 'N/A'}"`)
              if (item.title) console.log(`           title: "${item.title}"`)
              if (item.question) console.log(`           question: "${item.question}"`)
            }
          })
        }
      }
    }
    
    if (problemCount === 0) {
      console.log('\n✅ No duplicate or missing keys found!')
    } else {
      console.log(`\n\n⚠️  Found problems in ${problemCount} document(s)`)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkAllDuplicates()


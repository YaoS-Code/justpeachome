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

async function diagnoseKeys() {
  try {
    console.log('🔍 Diagnosing all array fields with _key...\n')
    
    // Get all services
    const services = await client.fetch(`*[_type == "service"]`)
    
    console.log(`📋 Found ${services.length} service(s)\n`)
    
    for (const service of services) {
      console.log(`\n📄 Service: "${service.title}" (ID: ${service._id})`)
      
      // Check keyFeatures
      if (service.keyFeatures && Array.isArray(service.keyFeatures)) {
        console.log(`   🔑 keyFeatures (${service.keyFeatures.length} items):`)
        service.keyFeatures.forEach((feature: any, index: number) => {
          const keyStatus = !feature._key 
            ? '❌ MISSING' 
            : feature._key.length < 8 
            ? `⚠️  TOO SHORT (${feature._key.length} chars)` 
            : feature._key === 'basement'
            ? '❌ INVALID (basement)'
            : '✅ OK'
          console.log(`      [${index}] _key: "${feature._key || 'undefined'}" ${keyStatus}`)
          if (feature.title) console.log(`          title: "${feature.title}"`)
        })
      } else {
        console.log(`   🔑 keyFeatures: none`)
      }
      
      // Check benefits
      if (service.benefits && Array.isArray(service.benefits)) {
        console.log(`   💎 benefits (${service.benefits.length} items):`)
        service.benefits.forEach((benefit: any, index: number) => {
          const keyStatus = !benefit._key 
            ? '❌ MISSING' 
            : benefit._key.length < 8 
            ? `⚠️  TOO SHORT (${benefit._key.length} chars)` 
            : benefit._key === 'basement'
            ? '❌ INVALID (basement)'
            : '✅ OK'
          console.log(`      [${index}] _key: "${benefit._key || 'undefined'}" ${keyStatus}`)
          if (benefit.title) console.log(`          title: "${benefit.title}"`)
        })
      } else {
        console.log(`   💎 benefits: none`)
      }
      
      // Check process steps
      if (service.process && Array.isArray(service.process)) {
        console.log(`   📝 process (${service.process.length} items):`)
        service.process.forEach((step: any, index: number) => {
          const keyStatus = !step._key 
            ? '❌ MISSING' 
            : step._key.length < 8 
            ? `⚠️  TOO SHORT (${step._key.length} chars)` 
            : '✅ OK'
          console.log(`      [${index}] _key: "${step._key || 'undefined'}" ${keyStatus}`)
        })
      }
      
      // Check faqs
      if (service.faqs && Array.isArray(service.faqs)) {
        console.log(`   ❓ faqs (${service.faqs.length} items):`)
        service.faqs.forEach((faq: any, index: number) => {
          const keyStatus = !faq._key 
            ? '❌ MISSING' 
            : faq._key.length < 8 
            ? `⚠️  TOO SHORT (${faq._key.length} chars)` 
            : '✅ OK'
          console.log(`      [${index}] _key: "${faq._key || 'undefined'}" ${keyStatus}`)
        })
      }
    }
    
    console.log('\n\n✅ Diagnosis complete!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

diagnoseKeys()


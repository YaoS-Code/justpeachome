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

async function fixKeys() {
  try {
    console.log('🔍 Searching for documents with invalid _key fields...\n')
    
    // Get all services
    const services = await client.fetch(`*[_type == "service"]`)
    
    console.log(`✅ Found ${services.length} service(s)\n`)
    
    for (const service of services) {
      let updated = false
      const updatedService = { ...service }
      
      // Fix keyFeatures
      if (service.keyFeatures && Array.isArray(service.keyFeatures)) {
        updatedService.keyFeatures = service.keyFeatures.map((feature: any) => {
          if (!feature._key || feature._key === 'basement' || feature._key.length < 8) {
            const newKey = generateKey()
            console.log(`   🔧 [${service.title}] Fixing keyFeature: "${feature._key || 'missing'}" → "${newKey}"`)
            updated = true
            return { ...feature, _key: newKey }
          }
          return feature
        })
      }
      
      // Fix benefits
      if (service.benefits && Array.isArray(service.benefits)) {
        updatedService.benefits = service.benefits.map((benefit: any) => {
          if (!benefit._key || benefit._key === 'basement' || benefit._key.length < 8) {
            const newKey = generateKey()
            console.log(`   🔧 [${service.title}] Fixing benefit: "${benefit._key || 'missing'}" → "${newKey}"`)
            updated = true
            return { ...benefit, _key: newKey }
          }
          return benefit
        })
      }

      // Fix FAQs
      if (service.faqs && Array.isArray(service.faqs)) {
        updatedService.faqs = service.faqs.map((faq: any) => {
          if (!faq._key || faq._key.length < 8) {
            const newKey = generateKey()
            console.log(`   🔧 [${service.title}] Fixing FAQ: "${faq._key || 'missing'}" → "${newKey}"`)
            updated = true
            return { ...faq, _key: newKey }
          }
          return faq
        })
      }

      // Fix process steps
      if (service.process && Array.isArray(service.process)) {
        updatedService.process = service.process.map((step: any) => {
          if (!step._key || step._key.length < 8) {
            const newKey = generateKey()
            console.log(`   🔧 [${service.title}] Fixing process step: "${step._key || 'missing'}" → "${newKey}"`)
            updated = true
            return { ...step, _key: newKey }
          }
          return step
        })
      }
      
      // Update document if needed
      if (updated) {
        console.log(`   💾 Updating "${service.title}"...`)
        await client.createOrReplace(updatedService)
        console.log(`   ✅ Updated!\n`)
      }
    }
    
    // Fix projects
    const projects = await client.fetch(`*[_type == "project"]`)
    
    for (const project of projects) {
      let updated = false
      const updatedProject = { ...project }
      
      // Fix features
      if (project.features && Array.isArray(project.features)) {
        updatedProject.features = project.features.map((feature: any) => {
          if (!feature._key || feature._key.length < 8) {
            const newKey = generateKey()
            console.log(`   🔧 [${project.title}] Fixing feature: "${feature._key || 'missing'}" → "${newKey}"`)
            updated = true
            return { ...feature, _key: newKey }
          }
          return feature
        })
      }
      
      // Update document if needed
      if (updated) {
        console.log(`   💾 Updating "${project.title}"...`)
        await client.createOrReplace(updatedProject)
        console.log(`   ✅ Updated!\n`)
      }
    }
    
    console.log('🎉 All invalid keys have been fixed!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

fixKeys()


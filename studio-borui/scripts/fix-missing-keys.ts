import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

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

async function fixMissingKeys() {
  try {
    console.log('🔍 Searching for documents with missing or invalid _key fields...\n')
    
    // Get all services (they have keyFeatures arrays)
    const services = await client.fetch(`*[_type == "service"]`)
    
    console.log(`✅ Found ${services.length} service(s)\n`)
    
    let fixedCount = 0
    
    for (const service of services) {
      let needsUpdate = false
      const patches: any[] = []
      
      // Check keyFeatures array
      if (service.keyFeatures && Array.isArray(service.keyFeatures)) {
        const fixedFeatures = service.keyFeatures.map((feature: any) => {
          if (!feature._key || feature._key === 'basement' || feature._key.length < 8) {
            needsUpdate = true
            const newKey = generateKey()
            console.log(`   🔧 Fixing key in "${service.title}": "${feature._key || 'missing'}" → "${newKey}"`)
            return { ...feature, _key: newKey }
          }
          return feature
        })
        
        if (needsUpdate) {
          patches.push({
            id: service._id,
            patch: {
              set: { keyFeatures: fixedFeatures }
            }
          })
        }
      }
      
      // Check benefits array
      if (service.benefits && Array.isArray(service.benefits)) {
        const fixedBenefits = service.benefits.map((benefit: any) => {
          if (!benefit._key || benefit._key === 'basement' || benefit._key.length < 8) {
            needsUpdate = true
            const newKey = generateKey()
            console.log(`   🔧 Fixing key in "${service.title}" benefits: "${benefit._key || 'missing'}" → "${newKey}"`)
            return { ...benefit, _key: newKey }
          }
          return benefit
        })
        
        if (needsUpdate) {
          patches.push({
            id: service._id,
            patch: {
              set: { benefits: fixedBenefits }
            }
          })
        }
      }
      
      // Apply patches
      for (const { id, patch } of patches) {
        await client.patch(id).set(patch.set).commit()
        fixedCount++
      }
    }
    
    // Also check projects
    const projects = await client.fetch(`*[_type == "project"]`)
    
    for (const project of projects) {
      let needsUpdate = false
      const patches: any[] = []
      
      // Check features array
      if (project.features && Array.isArray(project.features)) {
        const fixedFeatures = project.features.map((feature: any) => {
          if (!feature._key || feature._key.length < 8) {
            needsUpdate = true
            const newKey = generateKey()
            console.log(`   🔧 Fixing key in project "${project.title}": "${feature._key || 'missing'}" → "${newKey}"`)
            return { ...feature, _key: newKey }
          }
          return feature
        })
        
        if (needsUpdate) {
          patches.push({
            id: project._id,
            patch: {
              set: { features: fixedFeatures }
            }
          })
        }
      }
      
      // Apply patches
      for (const { id, patch } of patches) {
        await client.patch(id).set(patch.set).commit()
        fixedCount++
      }
    }
    
    console.log(`\n✅ Fixed ${fixedCount} document(s) with missing or invalid keys!`)
    console.log('\n🎉 All keys have been regenerated!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

fixMissingKeys()


import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'yoxfbvg1',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

async function deleteD2TeaLab() {
  try {
    console.log('🔍 Searching for D2 Tea Lab project...')
    
    // Find the project
    const projects = await client.fetch(
      `*[_type == "project" && title match "*D2 Tea Lab*"]`
    )
    
    if (projects.length === 0) {
      console.log('❌ No project found with title containing "D2 Tea Lab"')
      return
    }
    
    console.log(`✅ Found ${projects.length} project(s):`)
    projects.forEach((p: any) => {
      console.log(`   - ${p.title} (ID: ${p._id})`)
    })
    
    // Delete each project
    for (const project of projects) {
      console.log(`\n🗑️  Deleting: ${project.title}...`)
      await client.delete(project._id)
      console.log(`✅ Deleted: ${project.title}`)
    }
    
    console.log('\n🎉 All D2 Tea Lab projects have been deleted!')
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

deleteD2TeaLab()


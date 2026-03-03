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

async function addGrantInfo() {
  try {
    console.log('🔍 Finding Basement & Secondary Suites service...\n')
    
    // Get the service
    const service = await client.fetch(
      `*[_type == "service" && title == "Basement & Secondary Suites" && !(_id in path("drafts.**"))][0]`
    )
    
    if (!service) {
      console.log('❌ Service not found!')
      return
    }
    
    console.log(`✅ Found service: ${service.title} (ID: ${service._id})\n`)
    
    // Create new content blocks for the grant information
    const grantBlocks = [
      {
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Calgary Secondary Suite Incentive Program',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The Calgary Secondary Suite Incentive Program provides homeowners with up to $10,000 in grant funding to build, legalize, and register a secondary suite (e.g., basement suite) within their primary residence. The program focuses on safety, covering costs for items like egress windows, smoke-tight barriers, and electrical, aiming to increase safe, affordable housing.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Key Program Details',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Funding Amount: ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Up to $10,000 per homeowner.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Eligibility: ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Must be an existing or new suite within the main home; detached/backyard suites are generally not included in this specific incentive. You must own the property, and the home must be your primary residence.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Application Process: ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'You must have an active building permit and complete a mandatory online eLearning course.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Eligible Work: ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Only costs for safety elements incurred after the application date are eligible for reimbursement.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Approved Safety Items: ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'Reimbursements can cover egress windows (up to $1,500), hardwired/interconnected alarms ($1,000), protected exiting ($1,000), smoke-tight barriers ($4,000), and separate heating/air systems ($6,000).',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Deadline: ',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: 'While no hard deadline is explicitly stated for the program, the federal Housing Accelerator Fund backing it closes on September 1, 2026.',
            marks: []
          }
        ],
        markDefs: []
      }
    ]
    
    // Add the grant blocks to the existing content
    const updatedContent = [...(service.content || []), ...grantBlocks]
    
    const updatedService = {
      ...service,
      content: updatedContent
    }
    
    console.log('💾 Updating service with grant information...')
    await client.createOrReplace(updatedService)
    console.log('✅ Service updated successfully!\n')
    
    console.log(`📊 Content blocks: ${service.content?.length || 0} → ${updatedContent.length}`)
    console.log(`   Added ${grantBlocks.length} new blocks about the grant program`)
    
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addGrantInfo()


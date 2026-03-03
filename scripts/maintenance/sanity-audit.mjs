import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
})

async function checkImageMetadata() {
    console.log('--- CHECKING IMAGE METADATA FOR ALL DOCUMENTS ---\n')

    const query = `{
    "projects": *[_type == "project"] { 
      title, 
      "coverImageAlt": coverImage.alt,
      "coverImageCaption": coverImage.caption,
      "coverImageContext": coverImage.contextTag,
      "galleryCount": count(gallery),
      "galleryWithAlt": count(gallery[defined(alt)])
    },
    "posts": *[_type == "post"] { 
      title,
      "mainImageAlt": mainImage.alt,
      "mainImageCaption": mainImage.caption,
      "mainImageContext": mainImage.contextTag
    },
    "services": *[_type == "service"] { 
      title,
      "coverImageAlt": coverImage.alt,
      "coverImageCaption": coverImage.caption,
      "coverImageContext": coverImage.contextTag
    },
    "communities": *[_type == "community"] { 
      title,
      "coverImageAlt": coverImage.alt,
      "coverImageCaption": coverImage.caption,
      "coverImageContext": coverImage.contextTag
    }
  }`

    const data = await client.fetch(query)

    console.log('=== PROJECTS ===')
    data.projects.forEach(p => {
        console.log(`📦 ${p.title}`)
        console.log(`   Cover Alt: ${p.coverImageAlt || '❌ MISSING'}`)
        console.log(`   Cover Caption: ${p.coverImageCaption || '❌ MISSING'}`)
        console.log(`   Context Tag: ${p.coverImageContext || '❌ MISSING'}`)
        console.log(`   Gallery: ${p.galleryWithAlt || 0}/${p.galleryCount || 0} images have alt text\n`)
    })

    console.log('\n=== BLOG POSTS ===')
    data.posts.forEach(p => {
        console.log(`📝 ${p.title}`)
        console.log(`   Main Image Alt: ${p.mainImageAlt || '❌ MISSING'}`)
        console.log(`   Caption: ${p.mainImageCaption || '❌ MISSING'}`)
        console.log(`   Context Tag: ${p.mainImageContext || '❌ MISSING'}\n`)
    })

    console.log('\n=== SERVICES ===')
    data.services.forEach(s => {
        console.log(`🔧 ${s.title}`)
        console.log(`   Cover Alt: ${s.coverImageAlt || '❌ MISSING'}`)
        console.log(`   Caption: ${s.coverImageCaption || '❌ MISSING'}`)
        console.log(`   Context Tag: ${s.coverImageContext || '❌ MISSING'}\n`)
    })

    console.log('\n=== COMMUNITIES ===')
    data.communities.forEach(c => {
        console.log(`🏘️  ${c.title}`)
        console.log(`   Cover Alt: ${c.coverImageAlt || '❌ MISSING'}`)
        console.log(`   Caption: ${c.coverImageCaption || '❌ MISSING'}`)
        console.log(`   Context Tag: ${c.coverImageContext || '❌ MISSING'}\n`)
    })
}

checkImageMetadata()

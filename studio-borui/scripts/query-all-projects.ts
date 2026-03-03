import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

async function queryProjects() {
    const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    projectCategory,
    tags,
    shortDescription,
    "coverImageRef": coverImage.asset._ref,
    completionDate
  }`)

    console.log(JSON.stringify(projects, null, 2))
}

queryProjects().catch(console.error)

import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN,
})

async function dumpAssets() {
    const query = `*[_type == "sanity.imageAsset"] | order(_createdAt desc) {
    _id,
    originalFilename,
    _createdAt,
    metadata {
      dimensions
    }
  }`
    const assets = await client.fetch(query)
    console.log(JSON.stringify(assets, null, 2))
}

dumpAssets()

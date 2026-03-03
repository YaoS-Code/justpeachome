import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'yoxfbvg1',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-20',
})

async function run() {
  const defaultQuery = `*[_type == "homePage"][0]{ _id, title, hero }`
  const argQuery = process.argv[2]
  const query = argQuery || defaultQuery

  console.log(`\n🔍 Querying Sanity: ${query}`)

  try {
    const data = await client.fetch(query)
    console.log('\n--- Result ---')
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('\n❌ Fetch Error:', error.message)
  }
}

run()

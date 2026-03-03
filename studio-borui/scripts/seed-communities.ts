import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const communities = [
    {
        title: 'Altadore',
        slug: 'altadore',
        shortDescription: 'Inner-city luxury renovations',
    },
    {
        title: 'Lake Bonavista',
        slug: 'lake-bonavista',
        shortDescription: 'Estate & infill specialists',
    },
    {
        title: 'Marda Loop',
        slug: 'marda-loop',
        shortDescription: 'Heritage & modern fusion',
    },
    {
        title: 'Killarney',
        slug: 'killarney',
        shortDescription: 'Family-friendly renovations',
    },
]

async function seed() {
    console.log('Seeding communities...')
    for (const community of communities) {
        // Check if exists
        const query = `*[_type == "community" && slug.current == "${community.slug}"][0]`
        const exists = await client.fetch(query)

        if (!exists) {
            console.log(`Creating ${community.title}...`)
            const doc = {
                _type: 'community',
                title: community.title,
                slug: { _type: 'slug', current: community.slug },
                shortDescription: community.shortDescription,
                // Cover image to be uploaded by user
            }

            await client.create(doc)
        } else {
            console.log(`Skipping ${community.title} (exists)`)
        }
    }
    console.log('Done!')
}

seed()

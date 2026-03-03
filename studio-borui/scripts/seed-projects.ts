import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const projects = [
    {
        title: 'Altadore Modern',
        slug: 'altadore-modern',
        shortDescription: 'Complete home transformation',
    },
    {
        title: 'Lake Bonavista Estate',
        slug: 'lake-bonavista-estate',
        shortDescription: 'Luxury infill development',
    },
    {
        title: 'Marda Loop Heritage',
        slug: 'marda-loop-heritage',
        shortDescription: 'Historic home restoration',
    },
    {
        title: 'Killarney Kitchen',
        slug: 'killarney-kitchen',
        shortDescription: 'Modern kitchen redesign',
    },
]

async function seed() {
    console.log('Seeding projects...')
    for (const project of projects) {
        // Check if exists
        const query = `*[_type == "project" && slug.current == "${project.slug}"][0]`
        const exists = await client.fetch(query)

        if (!exists) {
            console.log(`Creating ${project.title}...`)
            const doc = {
                _type: 'project',
                title: project.title,
                slug: { _type: 'slug', current: project.slug },
                shortDescription: project.shortDescription,
                // We leave coverImage blank for the user to upload
            }

            await client.create(doc)
        } else {
            console.log(`Skipping ${project.title} (exists)`)
        }
    }
    console.log('Done!')
}

seed()

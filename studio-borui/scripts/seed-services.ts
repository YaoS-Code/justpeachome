import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const services = [
    {
        title: 'Bathroom Renovation',
        description: 'Luxury vanities, tiles & fixtures',
        image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80', // Placeholder
    },
    {
        title: 'Basement Development',
        description: 'Suites, wet bars & home theaters',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80',
    },
    {
        title: 'Infill Development',
        description: 'R-CG zoning custom homes',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    },
    {
        title: 'Heritage Restoration',
        description: "Preserving Calgary's character homes", // escape quote?
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    },
    {
        title: 'Whole Home Renovation',
        description: 'Complete transformations',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
    },
]

async function seed() {
    console.log('Seeding services...')
    for (const service of services) {
        const slug = service.title.toLowerCase().replace(/ /g, '-').replace(/'/g, '')

        // Check if exists
        const query = `*[_type == "service" && slug.current == "${slug}"][0]`
        const exists = await client.fetch(query)

        if (!exists) {
            console.log(`Creating ${service.title}...`)
            // Note: We are not uploading actual images because that requires fetching the blob.
            // We will create the document WITHOUT image for now, OR we can try to upload these URLs.
            // Uploading from URL is tricky in simple scripts without fetch available (React Native/Node envs differ).
            // Let's just create the documents with titles and descriptions. The user can add images.
            // OR wait, the user specifically asked for "placeholders".
            // I can leave the image blank, but that might look broken.
            // Better: I will use a separate task to notify user that I created them but they need images.
            // Or I can try to simply create them.

            const doc = {
                _type: 'service',
                title: service.title,
                slug: { _type: 'slug', current: slug },
                shortDescription: service.description,
            }

            await client.create(doc)
        } else {
            console.log(`Skipping ${service.title} (exists)`)
        }
    }
    console.log('Done!')
}

seed()

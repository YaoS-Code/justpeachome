import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

const bathroomData = {
    title: 'Bathroom Renovation',
    shortDescription: 'Transform your bathroom into a personal sanctuary with custom vanities, heated floors, and spa-like showers.',
    features: [
        {
            title: 'Custom Vanities',
            description: 'Handcrafted cabinetry tailored to your storage needs and style.',
            icon: 'Layout'
        },
        {
            title: 'Spa Showers',
            description: 'Rainfall heads, steam systems, and seamless glass enclosures.',
            icon: 'Droplets'
        },
        {
            title: 'Heated Floors',
            description: 'Luxury underfloor heating for comfort in cold Calgary winters.',
            icon: 'ThermometerSun' // Lucide icon name attempt
        }
    ],
    process: [
        {
            order: 1,
            title: 'Design Consultation',
            description: 'We discuss layouts, materials, and fixtures to match your vision and budget.'
        },
        {
            order: 2,
            title: 'Demolition & Prep',
            description: 'Careful removal of old fixtures and preparation of plumbing and electrical.'
        },
        {
            order: 3,
            title: 'Installation',
            description: 'Expert tile setting, cabinetry installation, and fixture fitting.'
        },
        {
            order: 4,
            title: 'Final Reveil',
            description: 'A sparkling clean bathroom ready for your first relaxing soak.'
        }
    ],
    faqs: [
        {
            question: 'How long does a bathroom renovation take?',
            answer: 'A standard full bathroom renovation typically takes 3-4 weeks, depending on the complexity of tile work and custom cabinetry lead times.'
        },
        {
            question: 'Do I need a permit?',
            answer: 'If we are moving plumbing or electrical lines, or making structural changes, yes. Just replacing fixtures usually does not require a permit.'
        },
        {
            question: 'What is the average cost?',
            answer: 'Costs vary widely based on finishes. A standard ensuite renovation in Calgary typically starts from $15k and can go up to $40k+ for luxury finishes.'
        }
    ]
}

async function run() {
    console.log('Updating Bathroom Renovation service...')

    const query = `*[_type == "service" && slug.current == "bathroom-renovation"][0]._id`
    const id = await client.fetch(query)

    if (!id) {
        console.error('Service not found! (It should exist)')
        return
    }

    // Prepare gallery with placeholder images if we had IDs, 
    // but since we just generated them and they are local, 
    // we cannot easily script the upload without a token interaction or complex script.
    // I will set the text data first.

    await client.patch(id).set({
        shortDescription: bathroomData.shortDescription,
        features: bathroomData.features,
        process: bathroomData.process,
        faqs: bathroomData.faqs
    }).commit()

    console.log('Bathroom service data updated.')
}

run()

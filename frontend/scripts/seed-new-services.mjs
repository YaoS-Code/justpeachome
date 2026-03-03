import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const services = [
    {
        title: 'Basement Development',
        slug: 'basement-development',
        shortDescription: 'Transform your underutilized basement into a legal, income-generating secondary suite or a premium luxury living space.',
        imagePath: '/Users/borui/.gemini/antigravity/brain/2c418e2f-52c8-400f-b31c-848dc13a78d6/modern_basement_suite_calgary_1769193664567.png',
        altText: 'JUST PEAC HOMES modern legal basement suite renovation in Calgary with white oak flooring and large egress windows.',
        content: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Calgary basement development is the most effective way to increase your home\'s square footage and property value. At JUST PEAC HOMES, we specialize in legal secondary suite conversions that meet or exceed all City of Calgary building codes and safety standards.' }]
            },
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'How do I make my Calgary basement suite legal? Our turnkey process handles everything from initial architectural drawings and egress window installation to electrical upgrades and final inspections. Most basement permitting cycles in Calgary take between 4-8 weeks, and we manage every step to ensure your investment is compliant and safe.' }]
            }
        ]
    },
    {
        title: 'Backyard Suites',
        slug: 'backyard-suites',
        shortDescription: 'Maximize your property\'s potential with a custom laneway house or carriage home, optimized for Calgary\'s new R-CG zoning regulations.',
        imagePath: '/Users/borui/.gemini/antigravity/brain/2c418e2f-52c8-400f-b31c-848dc13a78d6/modern_backyard_suite_calgary_1769193677318.png',
        altText: 'JUST PEAC HOMES custom backyard suite and laneway house construction in Calgary featuring organic modern design and cedar siding.',
        content: [
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Backyard suites, also known as laneway houses or accessory dwelling units (ADUs), are revolutionizing urban living in Calgary. With the recent R-CG zoning changes, more homeowners than ever can build detached secondary dwellings that provide multi-generational living options or premium rental income.' }]
            },
            {
                _type: 'block',
                children: [{ _type: 'span', text: 'Why choose JUST PEAC HOMES for your laneway house? We provide architectural-led design and build services specifically tailored to Calgary\'s unique climate and neighborhood character. From infill communities like Altadore to established areas like Lake Bonavista, we handle the complex permitting and utility connections required for a seamless build.' }]
            }
        ]
    }
]

async function seed() {
    console.log('🚀 Seeding new services into Sanity...')

    for (const service of services) {
        try {
            console.log(`  - Uploading image for ${service.title}...`)
            const imageAsset = await client.assets.upload('image', readFileSync(service.imagePath), {
                filename: `${service.slug}.png`
            })

            console.log(`  - Creating document for ${service.title}...`)
            await client.create({
                _type: 'service',
                title: service.title,
                slug: { _type: 'slug', current: service.slug },
                shortDescription: service.shortDescription,
                coverImage: {
                    _type: 'accessibleImage',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id
                    },
                    alt: service.altText,
                    contextTag: 'product'
                },
                content: service.content,
                seo: {
                    _type: 'seo',
                    metaTitle: `${service.title} Calgary | JUST PEAC HOMES`,
                    metaDescription: service.shortDescription.substring(0, 160),
                }
            })
            console.log(`    ✅ Success: ${service.title}`)
        } catch (error) {
            console.error(`    ❌ Failed: ${service.title} - ${error.message}`)
        }
    }
}

seed()

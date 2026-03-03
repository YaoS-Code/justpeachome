import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const siteSettings = {
    _type: 'siteSettings',
    _id: 'singleton-siteSettings',
    title: 'JUST PEAC HOMES',
    description: "Just Peac Homes: Capturing the essence of Calgary living through organic modern design. Specializing in R-CG infill developments, heritage restorations, and bespoke luxury homes.",
    contactInfo: {
        email: 'hello@justpeachomes.com',
        phone: '(403) 555-0123',
        address: 'Calgary, Alberta\n(By Appointment Only)',
    },
    socialLinks: [
        { _key: 'ig', platform: 'Instagram', url: 'https://instagram.com/justpeachomes' },
        { _key: 'pin', platform: 'Pinterest', url: 'https://pinterest.com/justpeachomes' },
    ],
    footer: {
        brandStatement: 'Building with intention. Living with purpose. Rooted in Calgary, inspired by nature.',
        copyrightText: `© ${new Date().getFullYear()} Just Peac Homes. All rights reserved.`,
    }
}

const contactPage = {
    _type: 'contactPage',
    _id: 'singleton-contactPage',
    title: 'Contact Us',
    hero: {
        headline: 'Begin Your Journey',
        subheadline: "Every great home starts with a conversation. Whether you're planning a complex infill or a thoughtful renovation, we're here to guide you.",
    },
    serviceAreas: {
        title: 'Service Areas',
        content: "Serving Calgary's most vibrant communities, including Altadore, Marda Loop, Mount Royal, and Lake Bonavista. We understand the unique character of each neighborhood.",
    },
    seo: {
        _type: 'seo',
        title: 'Contact Just Peac Homes | Calgary Custom Builder',
        metaDescription: 'Start your custom home or renovation project with Just Peac Homes. Serving Calgary\'s inner-city and established neighborhoods.',
    }
}

async function seed() {
    console.log('🚀 Seeding Site Settings and Contact Page...')
    try {
        await client.createOrReplace(siteSettings)
        console.log('✅ Successfully seeded Site Settings')
        await client.createOrReplace(contactPage)
        console.log('✅ Successfully seeded Contact Page')
    } catch (error) {
        console.error('❌ Seeding failed:', error.message)
        process.exit(1)
    }
}

seed()

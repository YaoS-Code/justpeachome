import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_AUTH_TOKEN
})

// Paths to the generated images
const IMAGES_DIR = '/Users/borui/.gemini/antigravity/brain/0bd7edd4-8753-4b15-b946-d50cfa76d19a'

const imagesToUpload = [
    {
        filename: 'basement_bedroom_egress_1769815016881.png',
        alt: 'Legal basement bedroom with egress window in Calgary',
        title: 'Basement Bedroom with Egress Window'
    },
    {
        filename: 'rental_suite_kitchen_1769815029092.png',
        alt: 'Rental suite kitchen with durable finishes',
        title: 'Rental Suite Kitchen'
    },
    {
        filename: 'backyard_suite_exterior_1769815042894.png',
        alt: 'Modern backyard suite in Calgary',
        title: 'Backyard Suite Exterior'
    }
]

async function uploadImage(filename: string, alt: string, title: string) {
    const filePath = path.join(IMAGES_DIR, filename)

    console.log(`Uploading ${filename}...`)

    const asset = await client.assets.upload('image', createReadStream(filePath), {
        filename: filename,
    })

    console.log(`✓ Uploaded ${filename} (ID: ${asset._id})`)

    return {
        _type: 'accessibleImage',
        asset: {
            _type: 'reference',
            _ref: asset._id
        },
        alt: alt,
        title: title
    }
}

async function updateHomePage() {
    console.log('\n📸 Uploading images to Sanity...')

    // Upload all images
    const [bedroomImage, kitchenImage, backyardImage] = await Promise.all(
        imagesToUpload.map(img => uploadImage(img.filename, img.alt, img.title))
    )

    console.log('\n📝 Updating Home Page content...')

    // Fetch the current home page
    const homePageQuery = `*[_type == "homePage"][0]`
    const homePage = await client.fetch(homePageQuery)

    if (!homePage) {
        console.error('❌ Home page not found!')
        return
    }

    // Update the home page with split hero and new content
    const updatedHomePage = {
        ...homePage,
        heroType: 'split',
        splitHero: {
            left: {
                headline: 'Your Dream Home',
                subheadline: 'Custom renovations that reflect your unique style',
                ctaText: 'Explore Luxury Projects',
                ctaLink: '/projects',
                image: bedroomImage
            },
            right: {
                headline: 'Smart Investment',
                subheadline: 'Build rental income with legal basement suites',
                ctaText: 'Calculate Your ROI',
                ctaLink: '#roi-calculator',
                image: kitchenImage
            }
        },
        trustBadges: {
            enabled: true,
            title: 'Your Calgary Renovation Experts',
            badges: [
                {
                    icon: 'ShieldCheck',
                    title: '100% Calgary Code Compliant',
                    description: 'All projects meet Alberta Building Code requirements'
                },
                {
                    icon: 'DollarSign',
                    title: '$10,000 Grant Partner',
                    description: 'We help you access government incentives'
                },
                {
                    icon: 'Lock',
                    title: 'Fixed Price Guarantee',
                    description: 'No hidden fees or surprise costs'
                },
                {
                    icon: 'Award',
                    title: 'Licensed & Insured',
                    description: '2-5 year warranty on all work'
                }
            ]
        },
        roiCalculator: {
            enabled: true,
            title: 'Calculate Your Basement Suite ROI',
            subtitle: 'See how much you could earn with a legal rental suite in Calgary',
            disclaimer: 'Estimates based on 2024 Calgary market data. Actual costs and rental rates may vary.'
        },
        grantProgram: {
            enabled: true,
            title: 'Get Paid to Build Your Rental Suite',
            description: 'Planning a secondary suite? You could be eligible for up to $10,000 in government grants through the Calgary Secondary Suite Incentive Program.',
            ctaText: 'Check My Eligibility',
            ctaLink: '/contact?subject=grant-eligibility',
            highlightColor: '#B8653E',
            deadline: 'March 31, 2025',
            eligibility: 'Calgary homeowners building legal secondary suites',
            officialLink: 'https://www.calgary.ca/housing/secondary-suites.html'
        },
        valueProposition: {
            ...homePage.valueProposition,
            premiumStandard: {
                ...homePage.valueProposition?.premiumStandard,
                durability: 'High-maintenance, requires care',
                roi: 'Increases overall property value'
            },
            investmentStandard: {
                ...homePage.valueProposition?.investmentStandard,
                durability: 'Commercial grade, tenant-proof',
                roi: 'Maximized rental yield (10-15%)'
            }
        }
    }

    await client
        .patch(homePage._id)
        .set(updatedHomePage)
        .commit()

    console.log('✅ Home page updated successfully!')
    console.log('\n📋 Summary:')
    console.log('  - Split hero enabled with investment vs luxury paths')
    console.log('  - Trust badges configured')
    console.log('  - ROI calculator enabled')
    console.log('  - Grant program section configured')
    console.log('  - Value proposition enhanced with durability and ROI metrics')
    console.log('\n🌐 Visit your site to see the changes!')
}

updateHomePage().catch(console.error)

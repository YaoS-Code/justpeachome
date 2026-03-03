import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const homePageUpdate = {
    _type: 'homePage',
    _id: 'homePage',
    hero: {
        headline: 'Modern Living, \nOrganic Design.',
        subheadline: 'We craft sustainable, luxury custom homes and high-end renovations in Calgary’s most desirable inner-city communities.',
        ctaLink: '/contact',
        ctaText: 'Start Your Project'
    },
    featuredProjects: {
        title: 'Curated Portfolio',
        subtitle: 'Explore our latest award-winning Calgary home renovations, custom infills, and heritage restorations.'
    },
    servicesSection: {
        title: 'Holistic Design & Build',
        description: 'From R-CG infill developments to bespoke renovations, we provide comprehensive services tailored to your lifestyle and Calgary’s unique landscape.'
    },
    statsSection: {
        items: [
            { _key: 'stat1', value: '20+', label: 'Years of Excellence', icon: 'TrendingUp' },
            { _key: 'stat2', value: '150+', label: 'Homes Transformed', icon: 'CheckCircle' },
            { _key: 'stat3', value: '5.0', label: 'Star Rating', icon: 'Award' },
            { _key: 'stat4', value: '100%', label: 'Satisfaction Guarantee', icon: 'Users' }
        ]
    },
    benefits: {
        title: 'Why Choose JUST PEAC HOMES',
        items: [
            {
                _key: 'benefit1',
                title: 'Rooted in Calgary',
                description: 'We deeply understand local zoning (R-CG), climate challenges, and architectural heritage, ensuring your home is built to last.',
                icon: 'MapPin'
            },
            {
                _key: 'benefit2',
                title: 'Sustainable Luxury',
                description: 'We prioritize energy-efficient materials and healthy home principles without compromising on high-end aesthetics.',
                icon: 'Leaf'
            },
            {
                _key: 'benefit3',
                title: 'Transparent Process',
                description: 'From initial budget to final walkthrough, you get clear communication, detailed timelines, and no hidden costs.',
                icon: 'FileText'
            }
        ]
    },
    communitiesSection: {
        title: 'Communities We Serve',
        description: 'We specialize in revitalizing Calgary’s most sought-after neighborhoods, including Altadore, Marda Loop, Killarney, Mount Royal, and established communities like Lake Bonavista.'
    },
    insightsSection: {
        title: 'The Design Journal',
        description: 'Expert insights on modern architecture, sustainable building practices, and the Calgary real estate market.'
    },
    ctaSection: {
        title: 'Ready to Build Your Legacy?',
        subtitle: 'Schedule a free consultation to discuss your vision for a custom home or renovation in Calgary.',
        ctaText: 'Start the Conversation',
        ctaLink: '/contact'
    },
    seo: {
        metaTitle: 'Just Peac Homes | Custom Home Builder & Renovator Calgary',
        metaDescription: 'Premier custom home builder and renovation expert in Calgary. Specializing in R-CG infills, heritage restorations, and sustainable organic modern design.',
        keywords: ['Calgary Custom Homes', 'Home Renovation Calgary', 'R-CG Infill', 'Luxury Renovations', 'Sustainable Building'],
        aiSummary: 'Just Peac Homes is a Calgary-based design-build firm specializing in organic modern custom homes, major renovations, and R-CG infill developments. They prioritize sustainable practices and high-end craftsmanship.'
    }
}

async function seed() {
    console.log('🚀 Updating Home Page with remaining dynamic sections...')
    try {
        const imagePath = '/Users/borui/Documents/Organized_Files/Code_Projects/just_peac_homes/frontend/public/images/services/infill-development.png'
        console.log('  - Uploading hero background image...')
        const imageAsset = await client.assets.upload('image', readFileSync(imagePath), {
            filename: 'home-hero-bg.png'
        })

        // Use the uploaded image for the hero
        const heroWithImage = {
            ...homePageUpdate.hero,
            backgroundImage: {
                _type: 'accessibleImage',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset._id
                },
                alt: 'Modern infill home in Calgary with wood siding and large windows',
                contextTag: 'mood'
            }

        }

        const seoWithImage = {
            ...homePageUpdate.seo,
            socialImage: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset._id
                }
            }
        }

        // We use patch to avoid overwriting the existing hero/benefits/etc.
        await client.patch('ae8dd291-d52f-4a80-969a-c7f931e0229c')
            .set({
                hero: heroWithImage,
                featuredProjects: homePageUpdate.featuredProjects,
                servicesSection: homePageUpdate.servicesSection,
                statsSection: homePageUpdate.statsSection,
                benefits: homePageUpdate.benefits,
                communitiesSection: homePageUpdate.communitiesSection,
                insightsSection: homePageUpdate.insightsSection,
                ctaSection: homePageUpdate.ctaSection,
                seo: seoWithImage
            })
            .commit()
        console.log('✅ Successfully updated Home Page')
    } catch (error) {
        console.error('❌ Update failed:', error.message)
        process.exit(1)
    }
}

seed()

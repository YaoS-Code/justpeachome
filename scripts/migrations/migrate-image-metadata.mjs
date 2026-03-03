import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN,
})

// 根据 Sanity_Guidline 的 Image Rule 生成优化的 alt text
const imageOptimizations = {
    // PROJECTS: [客户行业] + [解决的问题] + [你的服务内容]
    projects: [
        {
            id: "ksBd7J2rUVbRXaXvOwgc87",
            title: "Altadore Modern",
            coverImage: {
                alt: "Modern luxury home renovation in Altadore Calgary featuring open-concept living space with natural light",
                caption: "Complete transformation of an Altadore family home",
                contextTag: "product"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwgckf",
            title: "Lake Bonavista Estate",
            coverImage: {
                alt: "Luxury custom infill estate home in Lake Bonavista Calgary with contemporary architecture",
                caption: "High-end R-CG infill development project",
                contextTag: "product"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwge3c",
            title: "Marda Loop Heritage",
            coverImage: {
                alt: "Historic character home restoration in Marda Loop Calgary preserving original architectural details",
                caption: "Heritage restoration blending historic charm with modern functionality",
                contextTag: "product"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwgeMt",
            title: "Killarney Kitchen",
            coverImage: {
                alt: "Modern kitchen renovation in Killarney Calgary with custom cabinetry and quartz countertops",
                caption: "Complete kitchen redesign for a busy family home",
                contextTag: "product"
            }
        }
    ],

    // SERVICES: [品牌] + [服务名] + [核心属性]
    services: [
        {
            id: "461BGCEBetjgtL8qVw02KT",
            title: "Bathroom Renovation",
            coverImage: {
                alt: "Luxury bathroom renovation Calgary featuring marble tiles custom vanity and modern fixtures",
                caption: "High-end ensuite transformation",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw02cP",
            title: "Basement Development",
            coverImage: {
                alt: "Finished basement Calgary with legal suite layout home theater and custom wet bar",
                caption: "Multi-functional basement development",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw033J",
            title: "Infill Development",
            coverImage: {
                alt: "R-CG zoning custom infill home Calgary modern architecture on narrow inner-city lot",
                caption: "Specialized R-CG infill construction",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw06fV",
            title: "Heritage Restoration",
            coverImage: {
                alt: "Calgary heritage home restoration preserving character details while upgrading mechanical systems",
                caption: "Authentic character home preservation",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw0Ae7",
            title: "Whole Home Renovation",
            coverImage: {
                alt: "Complete home renovation Calgary transforming dated bungalow into modern family residence",
                caption: "End-to-end home transformation project",
                contextTag: "product"
            }
        },
        {
            id: "edeb07c1-61e7-4ae9-8338-8f5086d9998d",
            title: "Kitchen",
            coverImage: {
                alt: "Custom kitchen renovation Calgary with high-end appliances quartz countertops and designer cabinetry",
                caption: "Luxury kitchen design and build",
                contextTag: "product"
            }
        }
    ],

    // COMMUNITIES: [具体的物体] + [氛围形容词] + [光影/风格]
    communities: [
        {
            id: "6pHz6MgKhT64plXvVHiWBN",
            title: "Killarney",
            coverImage: {
                alt: "Killarney Calgary neighborhood featuring tree-lined streets and family-friendly character homes",
                caption: "Established inner-city community",
                contextTag: "mood"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwlBxS",
            title: "Lake Bonavista",
            coverImage: {
                alt: "Lake Bonavista Calgary waterfront community with modern estate homes and natural scenery",
                caption: "Premium lakeside living destination",
                contextTag: "mood"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwlCCs",
            title: "Marda Loop",
            coverImage: {
                alt: "Marda Loop Calgary vibrant urban neighborhood with heritage homes and modern infills",
                caption: "Walkable community with character charm",
                contextTag: "mood"
            }
        },
        {
            id: "oR5rmzJRTTTXSt7VQamH9u",
            title: "Altadore",
            coverImage: {
                alt: "Altadore Calgary inner-city neighborhood known for luxury renovations and custom builds",
                caption: "Premier location for high-end development",
                contextTag: "mood"
            }
        }
    ],

    // POSTS: Gallery/氛围图
    posts: [
        {
            id: "0db8bcc6-28f4-424f-80a1-bf9ae8684744",
            title: "Mudroom Essentials",
            mainImage: {
                alt: "Organized mudroom Calgary with custom cabinetry boot storage and tile flooring for winter gear",
                caption: "Functional mudroom design for Calgary climate",
                contextTag: "diagram"
            }
        },
        {
            id: "63952540-ddcb-4ebb-8504-f1de695ea90d",
            title: "Organic Modern",
            mainImage: {
                alt: "Organic modern interior design Calgary featuring natural wood textures earth tones and minimalist furniture",
                caption: "2026 design trend: warm minimalism",
                contextTag: "mood"
            }
        },
        {
            id: "8a964c64-8213-4db0-8efe-e8e83ca2b94e",
            title: "Killarney Bungalow",
            mainImage: {
                alt: "Before and after Killarney bungalow renovation Calgary showing open-concept transformation",
                caption: "1950s bungalow modernization project",
                contextTag: "product"
            }
        },
        {
            id: "a81b8eab-1425-4a0d-a540-b6987e766532",
            title: "R-CG Infill Guide",
            mainImage: {
                alt: "R-CG zoning diagram Calgary showing property setbacks and density regulations for infill development",
                caption: "Understanding Calgary's R-CG zoning rules",
                contextTag: "diagram"
            }
        }
    ]
}

async function optimizeImages() {
    if (!process.env.SANITY_API_TOKEN) {
        console.error('Error: SANITY_API_TOKEN not set.')
        return
    }

    console.log('🖼️  Starting image metadata optimization...\n')

    const transaction = client.transaction()
    let updateCount = 0

    // Update Projects
    imageOptimizations.projects.forEach(item => {
        transaction.patch(item.id, p => p.set({ coverImage: item.coverImage }))
        updateCount++
        console.log(`✅ ${item.title}: Added alt text and context tag`)
    })

    // Update Services
    imageOptimizations.services.forEach(item => {
        transaction.patch(item.id, p => p.set({ coverImage: item.coverImage }))
        updateCount++
        console.log(`✅ ${item.title}: Added alt text and context tag`)
    })

    // Update Communities
    imageOptimizations.communities.forEach(item => {
        transaction.patch(item.id, p => p.set({ coverImage: item.coverImage }))
        updateCount++
        console.log(`✅ ${item.title}: Added alt text and context tag`)
    })

    // Update Posts
    imageOptimizations.posts.forEach(item => {
        transaction.patch(item.id, p => p.set({ mainImage: item.mainImage }))
        updateCount++
        console.log(`✅ ${item.title}: Added alt text and context tag`)
    })

    try {
        const result = await transaction.commit()
        console.log(`\n🎉 Success! Optimized ${updateCount} images across ${result.results.length} documents.`)
    } catch (err) {
        console.error('❌ Update failed:', err.message)
    }
}

optimizeImages()

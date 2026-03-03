import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN,
})

const restorations = {
    projects: [
        {
            id: "ksBd7J2rUVbRXaXvOwgc87",
            title: "Altadore Modern",
            assetId: "image-c30b28c82e2b8df9de8f3a9018dcd2f1a8297627-2816x1536-png", // Altadore.png
            metadata: {
                alt: "Modern luxury home renovation in Altadore Calgary featuring open-concept living space with natural light",
                caption: "Complete transformation of an Altadore family home",
                contextTag: "product"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwgckf",
            title: "Lake Bonavista Estate",
            assetId: "image-e7e1bf82ab78014848c72e3c2195c7fadaabdf6f-2816x1536-png", // Lake.png
            metadata: {
                alt: "Luxury custom infill estate home in Lake Bonavista Calgary with contemporary architecture",
                caption: "High-end R-CG infill development project",
                contextTag: "product"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwge3c",
            title: "Marda Loop Heritage",
            assetId: "image-75dcb3b1dc2b77c12697d6f87b1f5c15e373bf00-1024x1024-jpg", // gallery-fireplace.png (Best fit for heritage)
            metadata: {
                alt: "Historic character home restoration in Marda Loop Calgary preserving original architectural details",
                caption: "Heritage restoration blending historic charm with modern functionality",
                contextTag: "product"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwgeMt",
            title: "Killarney Kitchen",
            assetId: "image-5183bc4104bed6765924785ac94d1a15aadb1a16-1024x572-jpg", // kitchen.jpg
            metadata: {
                alt: "Modern kitchen renovation in Killarney Calgary with custom cabinetry and quartz countertops",
                caption: "Complete kitchen redesign for a busy family home",
                contextTag: "product"
            }
        }
    ],

    services: [
        {
            id: "461BGCEBetjgtL8qVw02KT",
            title: "Bathroom Renovation",
            assetId: "image-08c586819162ec01d77c30e7787493d3dd81d224-2816x1536-png", // bathroom.png
            metadata: {
                alt: "Luxury bathroom renovation Calgary featuring marble tiles custom vanity and modern fixtures",
                caption: "High-end ensuite transformation",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw02cP",
            title: "Basement Development",
            assetId: "image-056ac633f310a65529f1b9d8d2cd3b6979f29833-2816x1536-png", // basement.png
            metadata: {
                alt: "Finished basement Calgary with legal suite layout home theater and custom wet bar",
                caption: "Multi-functional basement development",
                contextTag: "product"
            }
        },
        {
            id: "edeb07c1-61e7-4ae9-8338-8f5086d9998d",
            title: "Kitchen",
            assetId: "image-245392bba0040d1d3cfeb85a9660617c61929ba0-2816x1536-png", // kitchen.png
            metadata: {
                alt: "Custom kitchen renovation Calgary with high-end appliances quartz countertops and designer cabinetry",
                caption: "Luxury kitchen design and build",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw0Ae7",
            title: "Whole Home Renovation",
            assetId: "image-9dbf4089a87d1878beaa5e220c463031c93d4133-2816x1536-png", // whole-home.png
            metadata: {
                alt: "Complete home renovation Calgary transforming dated bungalow into modern family residence",
                caption: "End-to-end home transformation project",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw033J",
            title: "Infill Development",
            assetId: "image-2b7770c195213aee02bbc9d346f707725d590a08-2752x1536-png", // moden.png -> Infill?
            metadata: {
                alt: "R-CG zoning custom infill home Calgary modern architecture on narrow inner-city lot",
                caption: "Specialized R-CG infill construction",
                contextTag: "product"
            }
        },
        {
            id: "461BGCEBetjgtL8qVw06fV",
            title: "Heritage Restoration",
            assetId: "image-a50092cde537abd5ebd453569c409afb097bd03b-2752x1536-png", // old-building.png
            metadata: {
                alt: "Calgary heritage home restoration preserving character details while upgrading mechanical systems",
                caption: "Authentic character home preservation",
                contextTag: "product"
            }
        },
    ],

    communities: [
        {
            id: "6pHz6MgKhT64plXvVHiWBN",
            title: "Killarney",
            assetId: "image-e11f3a7b75d3bd7e424cfaf2fcd3d76a8f242ee3-2816x1536-png", // killarney-community.png
            metadata: {
                alt: "Killarney Calgary neighborhood featuring tree-lined streets and family-friendly character homes",
                caption: "Established inner-city community",
                contextTag: "mood"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwlBxS",
            title: "Lake Bonavista",
            assetId: "image-40a31aeb7596c0d27679c566333035471090350d-2816x1536-png", // lake-community.png
            metadata: {
                alt: "Lake Bonavista Calgary waterfront community with modern estate homes and natural scenery",
                caption: "Premium lakeside living destination",
                contextTag: "mood"
            }
        },
        {
            id: "ksBd7J2rUVbRXaXvOwlCCs",
            title: "Marda Loop",
            assetId: "image-f5762220eb216d172f66364526b44a9576575315-2816x1536-png", // marda-community.png
            metadata: {
                alt: "Marda Loop Calgary vibrant urban neighborhood with heritage homes and modern infills",
                caption: "Walkable community with character charm",
                contextTag: "mood"
            }
        },
        {
            id: "oR5rmzJRTTTXSt7VQamH9u",
            title: "Altadore",
            assetId: "image-c1aa97bf95a20a5c05905027b6a716450fc7c5a4-2816x1536-png", // altadore-community.png
            metadata: {
                alt: "Altadore Calgary inner-city neighborhood known for luxury renovations and custom builds",
                caption: "Premier location for high-end development",
                contextTag: "mood"
            }
        }
    ],

    posts: [
        {
            id: "0db8bcc6-28f4-424f-80a1-bf9ae8684744",
            title: "Mudroom Essentials",
            assetId: "image-813b4118621d5f463de0b8f73efa8422a1041873-1024x1024-jpg", // interior-mudroom.png
            metadata: {
                alt: "Organized mudroom Calgary with custom cabinetry boot storage and tile flooring for winter gear",
                caption: "Functional mudroom design for Calgary climate",
                contextTag: "diagram"
            }
        },
        {
            id: "63952540-ddcb-4ebb-8504-f1de695ea90d",
            title: "Organic Modern",
            assetId: "image-bf17cc12a7182e186a46e855857126c90b7c3d13-1024x1024-jpg", // organic-modern-living.png
            metadata: {
                alt: "Organic modern interior design Calgary featuring natural wood textures earth tones and minimalist furniture",
                caption: "2026 design trend: warm minimalism",
                contextTag: "mood"
            }
        },
        {
            id: "8a964c64-8213-4db0-8efe-e8e83ca2b94e",
            title: "Killarney Bungalow",
            assetId: "image-a7ab926b4671fdf164716bd974e69b6f0c8cfdb5-1024x1024-jpg", // exterior-main.png
            metadata: {
                alt: "Before and after Killarney bungalow renovation Calgary showing open-concept transformation",
                caption: "1950s bungalow modernization project",
                contextTag: "product"
            }
        },
        {
            id: "a81b8eab-1425-4a0d-a540-b6987e766532",
            title: "R-CG Infill Guide",
            assetId: "image-9219e2cc318909f3d2127c172a88f80b1f9bc898-1024x1024-jpg", // cover-cinematic.png
            metadata: {
                alt: "R-CG zoning diagram Calgary showing property setbacks and density regulations for infill development",
                caption: "Understanding Calgary's R-CG zoning rules",
                contextTag: "diagram"
            }
        }
    ]
}

async function restoreImages() {
    if (!process.env.SANITY_API_TOKEN) {
        console.error('Error: SANITY_API_TOKEN not set.')
        return
    }

    console.log('🩹 Starting image asset restoration with metadata preservation...\n')

    const transaction = client.transaction()
    let updateCount = 0

    const processItems = (items, fieldName) => {
        items.forEach(item => {
            // Reconstruct the full image object with ASSET REFERENCE
            const imageObject = {
                _type: 'accessibleImage', // or 'image' if that's what schema expects? Schema uses accessibleImage now.
                asset: {
                    _type: 'reference',
                    _ref: item.assetId
                },
                ...item.metadata
            }

            transaction.patch(item.id, p => p.set({ [fieldName]: imageObject }))
            updateCount++
            console.log(`✅ Restored ${item.title} -> ${item.assetId}`)
        })
    }

    processItems(restorations.projects, 'coverImage')
    processItems(restorations.services, 'coverImage')
    processItems(restorations.communities, 'coverImage')
    processItems(restorations.posts, 'mainImage')

    try {
        const result = await transaction.commit()
        console.log(`\n🎉 Success! Restored ${updateCount} images.`)
    } catch (err) {
        console.error('❌ Restore failed:', err.message)
    }
}

restoreImages()

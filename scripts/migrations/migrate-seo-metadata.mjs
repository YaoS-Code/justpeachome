
import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN, // Required for write access
})

const optimizationData = [
    // POSTS
    {
        id: "0db8bcc6-28f4-424f-80a1-bf9ae8684744",
        seo: {
            metaTitle: "What are the essentials for a Calgary Mudroom? | JUST PEAC",
            metaDescription: "A functional mudroom handles snow and boots in style. Designing for Calgary's winter requires smart drainage, custom cabinetry, and durable materials.",
            keywords: ["Calgary mudroom design", "winter entryway", "custom mudrooms Calgary"],
            aiSummary: "Calgary mudroom design requires prioritized storage for winter gear and moisture-resistant materials to handle local climate challenges."
        }
    },
    {
        id: "63952540-ddcb-4ebb-8504-f1de695ea90d",
        seo: {
            metaTitle: "Why Organic Modern is the 2026 Home Design Trend | JUST PEAC",
            metaDescription: "Organic Modern combines texture and earth tones to create timeless warmth. 2026 marks a shift toward biophilic luxury and natural material palettes.",
            keywords: ["Organic Modern 2026", "Calgary interior design", "luxury home trends"],
            aiSummary: "The 2026 Organic Modern trend emphasizes a fusion of minimalist modernism with natural, warm materials and textures."
        }
    },
    {
        id: "a81b8eab-1425-4a0d-a540-b6987e766532",
        seo: {
            metaTitle: "How does R-CG Infill Development work in Calgary? | Guide",
            metaDescription: "R-CG zoning maximizes land value by increasing residential density. Success in Calgary infills depends on the right architecture and urban planning.",
            keywords: ["R-CG zoning guide", "Calgary infill development", "property value maximization"],
            aiSummary: "A technical guide to R-CG zoning in Calgary, explaining how residential property owners can unlock value through densified development."
        }
    },

    // SERVICES
    {
        id: "461BGCEBetjgtL8qVw02KT",
        seo: {
            metaTitle: "Is custom bathroom renovation worth it in Calgary?",
            metaDescription: "Luxury bathroom renovations increase home value and daily comfort. Custom vanities and high-end fixtures define modern ensuite excellence.",
            keywords: ["custom bathroom Calgary", "luxury ensuite renovation", "bathroom ROI"],
            aiSummary: "Professional bathroom renovation services in Calgary focusing on luxury aesthetics and high-return property upgrades."
        }
    },
    {
        id: "461BGCEBetjgtL8qVw02cP",
        seo: {
            metaTitle: "How to maximize space in Calgary Basement Development?",
            metaDescription: "Basement development creates versatile living spaces from legal suites to theaters. Functional layouts add significant square footage and value.",
            keywords: ["basement suites Calgary", "legal basement development", "home theaters"],
            aiSummary: "Execution of basement development projects in Calgary, converting underutilized areas into high-value living or rental spaces."
        }
    },
    {
        id: "461BGCEBetjgtL8qVw033J",
        seo: {
            metaTitle: "Why choose JUST PEAC for Infill Development in Calgary?",
            metaDescription: "Infill development requires expert navigating of city bylaws and zoning. We specialize in R-CG projects that respect community character.",
            keywords: ["inner city builder Calgary", "R-CG infill specialist", "custom builds"],
            aiSummary: "Specialized building services for inner-city infill projects in Calgary, with deep expertise in R-CG zoning and modern architecture."
        }
    },
    {
        id: "461BGCEBetjgtL8qVw06fV",
        seo: {
            metaTitle: "Can Heritage Homes be modernized without losing charm?",
            metaDescription: "Heritage restoration preserves character while upgrading for modern energy efficiency. Balancing historic charm with sustainable living is our core focus.",
            keywords: ["historic home restoration", "Calgary character homes", "heritage remodeling"],
            aiSummary: "Restoration services for heritage homes in Calgary, ensuring the preservation of historical integrity while integrating modern systems."
        }
    },

    // COMMUNITIES
    {
        id: "oR5rmzJRTTTXSt7VQamH9u",
        seo: {
            metaTitle: "What makes Altadore the top choice for custom builds?",
            metaDescription: "Altadore offers premier inner-city luxury. It is Calgary's most active community for high-end infills and whole-home renovations.",
            keywords: ["Altadore home builder", "luxury renovations Altadore", "living in Altadore"],
            aiSummary: "Community profile of Altadore, Calgary, highlighting its status as a hub for luxury residential renovations and custom builds."
        }
    }
    // ... more items can be added as needed
]

async function runOptimization() {
    if (!process.env.SANITY_API_TOKEN) {
        console.error('Error: SANITY_API_TOKEN environment variable is not set.')
        return
    }

    console.log(`Starting LLM-friendly batch SEO update for ${optimizationData.length} documents...`)

    const transaction = client.transaction()

    optimizationData.forEach(item => {
        transaction.patch(item.id, p => p.set({ seo: item.seo }))
    })

    try {
        const result = await transaction.commit()
        console.log(`Success! Updated ${result.results.length} documents.`)
    } catch (err) {
        console.error('Update failed:', err.message)
    }
}

runOptimization()

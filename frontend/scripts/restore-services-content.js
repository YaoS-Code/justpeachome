
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2025-01-20',
});

const block = (text, style = 'normal') => ({
    _type: 'block',
    style: style,
    children: [{ _type: 'span', text: text }]
});

// --- SERVICE CONTENT DEFINITIONS ---

// 1. KITCHEN
const kitchenContent = {
    shortDescription: "Custom luxury kitchens designed for modern living.",
    coverImage: {
        _type: 'accessibleImage',
        asset: { _ref: 'image-245392bba0040d1d3cfeb85a9660617c61929ba0-2816x1536-png', _type: 'reference' },
        alt: "Custom kitchen renovation Calgary with high-end appliances quartz countertops and designer cabinetry",
        caption: "Luxury kitchen design and build",
        contextTag: "product"
    },
    content: [
        block("The Culinary Heart of Your Home", "h2"),
        block("A kitchen is more than just a place to cook—it's the social hub of the family, the centerpiece of your home, and the space that adds the most value to your property. At JUST PEAC HOMES, we specialize in creating kitchens that balance striking aesthetics with effortless functionality."),
        block("From custom cabinetry that maximizes every inch of storage to integrated high-end appliances and curated lighting, our design-build approach ensures your kitchen renovation is seamless and transformative.")
    ],
    features: [
        { title: "Custom Cabinetry", description: "Bespoke millwork designed for your specific storage needs and aesthetic preferences.", icon: "ChefHat" },
        { title: "Premium Surfaces", description: "Durable and beautiful quartz, marble, or quartzite countertops with expert fabrication.", icon: "Layers" },
        { title: "Chef-Grade Appliances", description: "Seamless integration of premium brands like Wolf, Sub-Zero, and Miele.", icon: "Flame" },
        { title: "Lighting Design", description: "Layered lighting schemes including task, ambient, and accent lighting.", icon: "Lightbulb" }
    ],
    process: [
        { title: "Discovery & Layout", description: "We analyze your workflow and design a layout that maximizes efficiency and social flow.", order: 1 },
        { title: "Selection & Design", description: "Choosing materials, finishes, and fixtures that align with your organic modern vision.", order: 2 },
        { title: "Construction", description: "Precision demolition, plumbing, electrical, and expert carpentry.", order: 3 },
        { title: "Final Reveal", description: "A detailed walkthrough of your brand-new, fully functional culinary space.", order: 4 }
    ],
    faqs: [
        { question: "How long does a typical kitchen renovation take?", answer: "Most kitchen renovations take between 8 to 12 weeks, depending on the complexity and lead times for custom materials." },
        { question: "Can I stay in my home during the renovation?", answer: "While possible, we recommend preparing for limited kitchen access. We can help set up a temporary kitchenette for your convenience." }
    ]
};

// 2. WHOLE HOME RENOVATION
const wholeHomeContent = {
    shortDescription: "Complete transformations from studs to finishing.",
    content: [
        block("Total Transformation, Inside and Out", "h2"),
        block("A whole-home renovation is your opportunity to keep the neighborhood you love while finally having the home you've always dreamed of. We specialize in taking older Calgary homes—from mid-century bungalows to 90s estate houses—and stripping them back to the studs to create cohesive modern masterpiece."),
        block("Our team manages every aspect of the project, including structural engineering, building envelope upgrades, and complete interior redesign, ensuring your 'new' home is built to the highest modern standards of efficiency and luxury.")
    ],
    features: [
        { title: "Structural Reconfiguration", description: "Removing walls and installing steel beams for modern open-concept living.", icon: "Box" },
        { title: "Energy Upgrades", description: "New windows, insulation, and high-efficiency mechanical systems.", icon: "Zap" },
        { title: "Unified Design", description: "A consistent aesthetic throughout every room for a harmonious living experience.", icon: "Layout" },
        { title: "Exterior Revitalization", description: "New siding, roofing, and landscaping to match your modern interior.", icon: "Home" }
    ],
    process: [
        { title: "Assessment & Planning", description: "In-depth site analysis and architectural planning for total transformation.", order: 1 },
        { title: "Permitting & Engineering", description: "We handle all city approvals and structural engineering requirements.", order: 2 },
        { title: "Full Construction", description: "Seamless execution of demolition, framing, and finishing across the whole home.", order: 3 },
        { title: "Possession", description: "Handing over the keys to your completely reimagined, virtually new home.", order: 4 }
    ],
    faqs: [
        { question: "Is it worth renovating vs. building new?", answer: "Often, yes. Renovation can preserve certain grandfathered zoning benefits and mature landscaping while being more cost-effective depending on the foundation's condition." }
    ]
};

// 3. INFILL DEVELOPMENT
const infillContent = {
    shortDescription: "High-value urban development and zoning expertise.",
    content: [
        block("Urban Density with Luxury Design", "h2"),
        block("Infill development is the key to sustainable urban growth in Calgary's inner city. Whether you are a homeowner looking to build two homes on a single lot or an investor seeking a multi-unit project, we navigate the complexities of R-CG and R-C2 zoning to deliver high-value properties."),
        block("Our infills are designed to stand out, combining bold contemporary architecture with functional family layouts that feel light and expansive even on narrow lots.")
    ],
    features: [
        { title: "Zoning Expertise", description: "Expert navigation of Calgary's specific bylaws and development permits.", icon: "Map" },
        { title: "Maximized Square Footage", description: "Smart design strategies to create spacious homes on urban lots.", icon: "Maximize" },
        { title: "Smart Home Integration", description: "State-of-the-art technology for security, climate, and entertainment.", icon: "Smartphone" },
        { title: "Sustainability", description: "Built with durable, modern materials that ensure long-term value.", icon: "Leaf" }
    ],
    process: [
        { title: "Feasibility Study", description: "We analyze your lot to determine the maximum buildable potential and ROI.", order: 1 },
        { title: "Architectural Design", description: "Creating striking exterior renderings and optimized floor plans.", order: 2 },
        { title: "DP & BP Approvals", description: "Full management of Development and Building Permit applications.", order: 3 },
        { title: "Construction", description: "Turnkey construction management from excavation to final landscaping.", order: 4 }
    ],
    faqs: [
        { question: "What is R-CG zoning?", answer: "R-CG is a low-density residential district that allows for a mix of housing forms like rowhouses, townhouses, and secondary suites." }
    ]
};

// 4. HERITAGE RESTORATION
const heritageContent = {
    shortDescription: "Preserving character while upgrading for modern comfort.",
    content: [
        block("Preserving the Past, Modernizing the Future", "h2"),
        block("Calgary's historic neighborhoods are filled with architectural gems that deserve care. Our heritage restoration service focuses on preserving the craftsmanship and character of century-old homes while upgrading them for the 21st century."),
        block("We specialize in sensitive additions, envelope upgrades, and interior modernizations that complement the original architecture rather than competing with it.")
    ],
    features: [
        { title: "Character Preservation", description: "Restoring original trim, hardwood, and architectural details.", icon: "Star" },
        { title: "Foundation Renewal", description: "Lifting homes to pour new foundations and create usable basements.", icon: "ArrowUp" },
        { title: "Period-Appropriate Design", description: "Choosing modern finishes that honor the era of the home.", icon: "Palette" },
        { title: "Modern Comfort", description: "Integrating AC, smart controls, and soundproofing into historic frames.", icon: "Activity" }
    ],
    process: [
        { title: "Heritage Analysis", description: "Identifying key character elements that must be preserved.", order: 1 },
        { title: "Structural Stabilization", description: "Securing the historic structure before modern upgrades begin.", order: 2 },
        { title: "Restoration & Addition", description: "Careful work by skilled craftsmen to blend old with new.", order: 3 },
        { title: "Handover", description: "Preserving a piece of history for the next generation.", order: 4 }
    ],
    faqs: [
        { question: "How do you handle hazardous materials in old homes?", answer: "We follow strict abatement protocols for lead and asbestos common in older properties before starting construction." }
    ]
};

// --- UPDATE LOGIC ---

const updates = [
    { title: "Kitchen", data: kitchenContent },
    { title: "Whole Home Renovation", data: wholeHomeContent },
    { title: "Infill Development", data: infillContent },
    { title: "Heritage Restoration", data: heritageContent }
];

async function restoreContent() {
    console.log("🚀 Starting Bulk Content Restoration...");
    for (const update of updates) {
        try {
            const query = `*[_type == "service" && title == "${update.title}"][0]._id`;
            const docId = await client.fetch(query);
            if (docId) {
                console.log(`📝 Restoring data for: ${update.title} (${docId})...`);
                const baseId = docId.replace('drafts.', '');
                const publishedId = baseId;
                const draftId = `drafts.${baseId}`;

                await client.patch(publishedId).set(update.data).commit();
                try {
                    await client.patch(draftId).set(update.data).commit();
                } catch (e) { }
                console.log(`✅ ${update.title} restored.`);
            } else {
                console.warn(`⚠️  Could not find service: ${update.title}`);
            }
        } catch (error) {
            console.error(`❌ Error on ${update.title}:`, error.message);
        }
    }
    console.log("✨ Restoration Complete.");
}

restoreContent();


const { createClient } = require('next-sanity');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2025-01-20',
});

// Helper to create simple blocks
const block = (text, style = 'normal') => ({
    _type: 'block',
    style: style,
    children: [{ _type: 'span', text: text }]
});

// Content for Altadore Community
const altadoreContent = [
    block("The Heart of Modern Infill Living", "h2"),
    block("Altadore is widely considered one of Calgary's most desirable inner-city communities, and for good reason. Nestled between the elbow river and the vibrant Marda Loop district, it offers a perfect balance of quiet, tree-lined streets and energetic urban amenities. For homeowners who refuse to compromise between location and lifestyle, Altadore is the ultimate destination."),

    block("The Vibe: Urban Village", "h3"),
    block("There is a distinct energy in Altadore. It's where young families, professionals, and long-time residents mix. Weekends see the neighborhood come alive with people walking to River Park for a dog walk, grabbing coffee at Phil & Sebastian, or browsing the boutiques along 33rd Avenue. Ideally, it feels like a village within the city—connected, walkable, and vibrant."),

    block("Architecture & Design", "h3"),
    block("Altadore has become the epicenter of modern infill development in Calgary. The neighborhood's generous 50-foot lots are perfectly suited for luxury semi-detached and detached homes. At JUST PEAC HOMES, we specialize in designing properties here that respect the established character while introducing bold, modern aesthetics. Think large windows, flat rooflines, mix-material facades (stucco, cedar, brick), and functional open-concept interiors designed for entertaining."),

    block("Amenities & Lifestyle", "h3"),
    block("Living here means you are minutes from everywhere you want to be:"),
    {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: "River Park & Sandy Beach: One of the city's best off-leash dog parks and river access points." }]
    },
    {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: "Marda Loop: A HUB of culture with over 130 trendy shops, restaurants, and wellness studios." }]
    },
    {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: "Top Schools: Excellent options for families including Altadore School and Lycée Louis Pasteur." }]
    },
    {
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: "Commute: A quick 10-minute drive or easy bike ride to downtown Calgary." }]
    },

    block("Why Build in Altadore?", "h3"),
    block("Real estate in Altadore provides exception value retention. As one of the city's most established 'redevelopment zones', investing in a new build here is not just a lifestyle choice, but a sound financial decision. The demand for high-quality, modern homes in this area remains consistently high.")
];

// Content for Lake Bonavista Estate Project
const lakeBonavistaContent = [
    block("Project Overview", "h2"),
    block("Lake Bonavista is Calgary's premier lake community, known for its large estate lots and mature trees. This project involved the complete revitalization of a 1980s expansive bungalow that had great bones but a dated, compartmentalized layout. Our goal was to transform it into a modern 'forever home' that enhanced its connection to the outdoors while offering state-of-the-art luxury."),

    block("The Challenge", "h3"),
    block("The original home suffered from low ceilings in key areas, a closed-off kitchen that faced a dark hallway, and finishes that hadn't been touched in decades. Strategically, we needed to open up the floor plan without compromising structural integrity, requiring significant engineering adjustments to install flush steel beams."),

    block("The Vision: Timeless Modernity", "h3"),
    block("The clients wanted a space that felt warm and organic but undeniably modern. We selected a palette of white oak, natural limestone, and warm greys. The design centered around creating a 'Great Room' concept where the kitchen, dining, and living areas flowed effortlessly into one another, anchored by a massive central island."),

    block("Key Features", "h3"),

    block("1. The Chef's Kitchen", "h4"),
    block("We installed custom floor-to-ceiling walnut cabinetry, a 48\" Wolf range, and a hidden butler's pantry. The centerpiece is a 10-foot waterfall island surfaced in durable quartz, perfect for casual family meals or large gatherings."),

    block("2. The Master Sanctuary", "h4"),
    block("We reconfigured the bedroom wing to create a true master retreat. This included a walk-in steam shower, a freestanding soaker tub, and a custom walk-in closet with integrated lighting."),

    block("3. Indoor-Outdoor Flow", "h4"),
    block("By replacing standard patio doors with a 16-foot multi-slide door system, we erased the boundary between the living room and the new composite deck, effectively doubling the entertaining space in summer months."),

    block("The Outcome", "h3"),
    block("The result is a home that respects its estate roots but functions for modern life. It helps the family live better—more light, more connection, and more joy in everyday moments. This project stands as a testament to the potential hidden inside Calgary's older estate homes.")
];

async function updateDocs() {
    console.log('🚀 Starting Deep Content Update...');

    // Update Altadore
    try {
        console.log('📝 Updating Altadore Community...');
        const altadoreId = 'oR5rmzJRTTTXSt7VQamH9u'; // From previous lookup
        await client.patch(altadoreId).set({ content: altadoreContent }).commit();
        console.log('✅ Altadore updated.');
    } catch (e) {
        console.error('❌ Failed to update Altadore:', e.message);
    }

    // Update Lake Bonavista Estate
    try {
        console.log('📝 Updating Lake Bonavista Estate Project...');
        const lbId = 'ksBd7J2rUVbRXaXvOwgckf'; // From previous lookup
        await client.patch(lbId).set({ content: lakeBonavistaContent }).commit();
        console.log('✅ Lake Bonavista Estate updated.');
    } catch (e) {
        console.error('❌ Failed to update Lake Bonavista Estate:', e.message);
    }

    console.log('✨ Update Complete.');
}

updateDocs();

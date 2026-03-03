
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

// Helper
const block = (text, style = 'normal') => ({
    _type: 'block',
    style: style,
    children: [{ _type: 'span', text: text }]
});

const list = (items) => items.map(text => ({
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    children: [{ _type: 'span', text }]
}));

// --- COMMUNITIES ---

const mardaLoopContent = [
    block("The Trendy Heart of SW Calgary", "h2"),
    block("Marda Loop is more than a neighborhood; it's a lifestyle destination. Known for its walkable streets lined with over 130 independent boutiques, restaurants, and cafes, it offers an energetic urban vibe just minutes from downtown. It attracts a mix of young professionals, artists, and families who value culture and convenience."),
    block("Housing & Architecture", "h3"),
    block("The area is characterized by a dynamic mix of character homes and modern infill developments. We specialize in building high-density, luxury semi-detached homes and skinny infills here, maximizing square footage on 25-50ft lots while incorporating rooftop patios to capture city views."),
    block("Living Here", "h3"),
    ...list([
        "Culture: Home to the Marda Gras Street Festival and year-round community events.",
        "Shopping: Everything from COBS Bread to Village Ice Cream is walkable.",
        "Commute: Direct access to 14th Street and Crowchild Trail makes getting around expansive."
    ])
];

const killarneyContent = [
    block("Historic Charm Meets Modern Living", "h2"),
    block("Killarney-Glengarry is one of Calgary’s oldest suburbs, now undergoing a stunning transformation. Its wide, tree-lined streets and deep 125-foot lots make it a prime location for custom builds. It offers a quieter, more residential feel than Marda Loop while remaining incredibly central."),
    block("The Architectural Shift", "h3"),
    block("Killarney is the poster child for Calgary's infill boom. The original post-war bungalows are rapidly being replaced by contemporary semi-detached and detached homes. Our projects here focus on 'transitional' designs—bridging the gap between modern minimalism and the warmth of the original neighborhood context."),
    block("Why Killarney?", "h3"),
    ...list([
        "Recreation: The Killarney Aquatic & Recreation Centre is a community hub.",
        "Green Space: Abundant parks and easy access to the Shaganappi Golf Course.",
        "Accessibility: Walking distance to the Westbrook LRT station."
    ])
];

const lakeBonavistaCommunityContent = [
    block("Calgary's Premier Lake Community", "h2"),
    block("Lake Bonavista is the jewel of Southeast Calgary. As the first man-made lake community in Canada, it set the standard for exclusive, resort-style living within the city. It is an area of prestige, privacy, and active family living."),
    block("The Estate Home Opportunity", "h3"),
    block("Most homes here are large estate bungalows and two-storey splits built in the 70s and 80s. They sit on massive lots with mature landscaping. Our work here focuses on 'down-to-the-studs' renovations—taking these solid, spacious structures and completely reimagining the interiors with open-concept layouts, chef's kitchens, and luxury finishes."),
    block("Lifestyle", "h3"),
    ...list([
        "The Lake: Private access for residents to swim, boat, and skate year-round.",
        "Community: A tight-knit, safe environment perfect for raising children.",
        "Convenience: Steps from Fish Creek Park and top-tier shopping at Southcentre Mall."
    ])
];

// --- PROJECTS ---

const altadoreModernContent = [
    block("A Masterclass in Infill Design", "h2"),
    block("Situated on a quiet street in Altadore, this detached infill project was designed to challenge the conventions of the 'skinny home'. By utilizing a cantilevered second floor and an open-riser staircase, we maximized the perception of width and light."),
    block("Design Highlights", "h3"),
    ...list([
        "Facade: A striking combination of black corrugated metal and clear-stained cedar siding.",
        "Kitchen: Two-tone cabinetry (matte black and white oak) with a 12-foot quartz island.",
        "Tech: Fully integrated Control4 smart home system controlling lighting, audio, and security."
    ]),
    block("The Result", "h3"),
    block("A home that feels expansive, private, and ultra-modern, perfectly suited for a design-conscious professional couple.")
];

const mardaLoopHeritageContent = [
    block("Restoring the Past", "h2"),
    block("This project was a labour of love. The original 1912 Craftsman bungalow had immense character but failing mechanical systems and a cramped layout. Instead of tearing it down, the owners chose a sensitive restoration and addition."),
    block("The Scope", "h3"),
    block("We lifted the house to pour a new foundation, creating a full-height basement suite. On the main floor, we restored the original fir trim and hardwood floors while opening up the rear of the house to a new modern kitchen and dining extension."),
    block("Blending Eras", "h3"),
    block("The new addition features floor-to-ceiling glass, creating a deliberate visual break between the historic structure and the modern living space. It celebrates the best of both worlds.")
];

const killarneyKitchenContent = [
    block("From Dark to Dazzling", "h2"),
    block("The owners of this 1990s Killarney infill loved their location but hated their kitchen. It was dark, U-shaped, and cut off from the dining room. Our mission was to create a bright, social heart for the home."),
    block("The Transformation", "h3"),
    block("We removed a load-bearing wall to combine the kitchen and dining area. We installed custom flat-panel cabinetry in a soft grey, paired with a white subway tile backsplash run vertically for a modern twist. New LED pot lighting and under-cabinet task lighting banished the shadows forever."),
    block("Features", "h3"),
    ...list([
        "Custom coffee bar with pocket doors.",
        "Durable quartz countertops with a waterfall edge.",
        "High-performance induction cooktop."
    ])
];

// Map titles to content
const updates = [
    { type: 'community', title: 'Marda Loop', content: mardaLoopContent },
    { type: 'community', title: 'Killarney', content: killarneyContent },
    { type: 'community', title: 'Lake Bonavista', content: lakeBonavistaCommunityContent },
    { type: 'project', title: 'Altadore Modern', content: altadoreModernContent },
    { type: 'project', title: 'Marda Loop Heritage', content: mardaLoopHeritageContent },
    { type: 'project', title: 'Killarney Kitchen', content: killarneyKitchenContent },
    // D2 Tea Lab skipped or generic placeholders if needed
];

async function runUpdates() {
    console.log('🚀 Starting Bulk Content Update...');

    for (const item of updates) {
        try {
            // Find ID
            const query = `*[_type == "${item.type}" && title == "${item.title}"][0]._id`;
            const docId = await client.fetch(query);

            if (docId) {
                console.log(`📝 Updating ${item.type}: ${item.title}...`);
                await client.patch(docId).set({ content: item.content }).commit();
                console.log('✅ Done.');
            } else {
                console.log(`⚠️  Could not find ${item.title}`);
            }
        } catch (e) {
            console.error(`❌ Error on ${item.title}:`, e.message);
        }
    }
    console.log('✨ All content updated.');
}

runUpdates();

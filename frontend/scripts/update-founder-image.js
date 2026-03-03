
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2025-01-20',
});

async function updateFounderStory() {
    console.log('🚀 Updating Founder Story...');
    try {
        // 1. Upload the image
        const imagePath = '/Users/borui/.gemini/antigravity/brain/90cda553-bf16-4cd3-ae1f-92403fb168b8/founder_story_craftsmanship_1769549944340.png';
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image not found at ${imagePath}`);
        }

        console.log('  - Uploading image...');
        const fileBuffer = fs.readFileSync(imagePath);
        const imageAsset = await client.assets.upload('image', fileBuffer, {
            filename: 'founder-story-craftsmanship.png'
        });

        // 2. Patch the ABOUT PAGE
        console.log('  - Patching About Page...');

        // Define the block content for the story
        const storyContent = [
            {
                _key: 'p1',
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'Our journey began at OCAD University, where our founder earned a degree in Industrial Design. This formal education in furniture design and fine craftsmanship—combined with a lifelong influence from a father deeply rooted in construction—laid the groundwork for what JUST PEAC HOMES is today.'
                    }
                ]
            },
            {
                _key: 'p2',
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'In 2022, we relocated from Vancouver to Calgary to bring this heritage of precision and aesthetic integrity to the local market. We believe that a home is more than a structure; it is a meticulously crafted object of living art.'
                    }
                ]
            },
            {
                _key: 'p3',
                _type: 'block',
                style: 'normal',
                children: [
                    {
                        _type: 'span',
                        text: 'As a licensed provincial contractor with full insurance coverage, we provide end-to-end services—from initial design concepts and detailed drawings to final execution—ensuring a seamless and professional experience for our clients.'
                    }
                ]
            }
        ];

        await client.patch('aboutPage')
            .set({
                founderStory: {
                    title: 'A Legacy of Craftsmanship',
                    image: {
                        _type: 'accessibleImage',
                        asset: {
                            _type: 'reference',
                            _ref: imageAsset._id
                        },
                        alt: 'Architectural blueprints and woodworking tools on a drafting table, representing craftsmanship and industrial design.'
                    },
                    content: storyContent
                }
            })
            .commit();

        console.log('✅ Successfully updated Founder Story on About Page (ID: aboutPage)');

    } catch (error) {
        console.error('❌ Error updating Founder Story:', error.message);
    }
}

updateFounderStory();

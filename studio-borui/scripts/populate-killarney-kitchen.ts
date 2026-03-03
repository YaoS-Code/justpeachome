import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN
})

// Helper to create properly formatted PortableText blocks
function createBlock(text: string) {
    return {
        _type: 'block',
        _key: `block-${Math.random().toString(36).substr(2, 9)}`,
        style: 'normal',
        markDefs: [],
        children: [{
            _type: 'span',
            _key: `span-${Math.random().toString(36).substr(2, 9)}`,
            text: text,
            marks: []
        }]
    }
}

async function populateKillarneyKitchen() {
    console.log('📝 Populating Killarney Kitchen case study...\n')

    const caseStudyData = {
        projectStory: {
            vision: [
                createBlock('The owners of this 1990s Killarney infill loved their location but hated their kitchen. It was dark, cramped, U-shaped, and completely cut off from the dining room. The original layout made hosting impossible, and a single north-facing window provided minimal natural light, making the space feel cave-like.'),
                createBlock('Our mission: transform this isolated kitchen into a bright, social heart of the home where the family could cook, dine, and entertain together. They wanted modern finishes, maximum storage, and a layout that encouraged family interaction.')
            ],
            process: [
                createBlock('We removed the load-bearing wall between the kitchen and dining room, installing a steel LVL beam to preserve structural integrity while opening up sight lines. The new layout features an L-shaped design with a large 9-foot island that seats four – perfect for homework, casual meals, and entertaining.'),
                createBlock('We chose custom flat-panel cabinetry in soft grey (Sherwin Williams Repose Grey) for a modern, timeless look that won\'t date quickly. The vertical subway tile backsplash adds visual height and interest, breaking from the traditional horizontal pattern. Durable quartz countertops in Calacatta Laza provide the marble look without the maintenance.'),
                createBlock('New LED recessed lighting (12 fixtures total) and under-cabinet task lighting banished the shadows forever. We enlarged the window opening and added a garden window above the sink, flooding the space with natural light. The hidden coffee bar with pocket doors was a last-minute addition that became the client\'s favorite feature.')
            ],
            outcome: [
                createBlock('The kitchen transformation exceeded the clients\' expectations. What was once a dark, isolated workspace is now a bright, inviting gathering space that\'s become the heart of family life. The family reports cooking at home 5x more often and hosting monthly dinner parties – something impossible in the old layout.'),
                createBlock('The investment also paid off financially. Comparable Killarney homes with updated kitchens are selling for $40,000-$60,000 more than those with original 1990s finishes. Total project cost: $45,000. Estimated value added: $55,000+. ROI: 122%.')
            ]
        },

        timeline: [
            {
                _key: 'timeline-1',
                phase: 'Planning & Structural Engineering',
                duration: '2 weeks',
                description: 'Worked with structural engineer to design steel beam solution for load-bearing wall removal. Finalized cabinet design, material selections, and lighting plan with client.'
            },
            {
                _key: 'timeline-2',
                phase: 'Demolition',
                duration: '1 week',
                description: 'Removed old cabinets, countertops, appliances, and flooring. Demolished load-bearing wall and installed engineered LVL beam with proper supports.'
            },
            {
                _key: 'timeline-3',
                phase: 'Rough-Ins (Electrical & Plumbing)',
                duration: '2 weeks',
                description: 'Rerouted all kitchen plumbing from galvanized to PEX. Added 12 new LED recessed lights, undercabinet lighting circuits, and dedicated appliance circuits. Enlarged window opening.'
            },
            {
                _key: 'timeline-4',
                phase: 'Drywall & Painting',
                duration: '1 week',
                description: 'Finished ceiling and walls, mudded and sanded. Painted walls in Benjamin Moore Simply White and ceiling in ultra-white.'
            },
            {
                _key: 'timeline-5',
                phase: 'Cabinetry Installation',
                duration: '1 week',
                description: 'Installed custom flat-panel cabinetry with soft-close drawers throughout. Added coffee bar with pocket doors and pull-out spice racks.'
            },
            {
                _key: 'timeline-6',
                phase: 'Countertops & Backsplash',
                duration: '5 days',
                description: 'Templated and installed quartz countertops with waterfall edge on island. Installed vertical subway tile backsplash with contrasting grout.'
            },
            {
                _key: 'timeline-7',
                phase: 'Flooring',
                duration: '3 days',
                description: 'Installed wide-plank engineered hardwood flooring (7.5" oak in natural finish) throughout kitchen and dining area.'
            },
            {
                _key: 'timeline-8',
                phase: 'Fixtures & Final Touches',
                duration: '1 week',
                description: 'Installed all appliances (induction cooktop, double ovens, panel-ready dishwasher). Added fixtures, hardware, and completed punchlist items.'
            }
        ],

        challengesSolved: [
            {
                _key: 'challenge-1',
                challenge: 'Limited natural light from single north-facing window',
                solution: 'We enlarged the existing window opening, added a garden window above the sink, installed 12 LED recessed lights, and used undercabinet LED strips. Light-colored cabinetry and white walls maximize light reflection.'
            },
            {
                _key: 'challenge-2',
                challenge: 'Old galvanized plumbing couldn\'t support island sink location',
                solution: 'Completely rerouted kitchen plumbing with modern PEX system. Added dedicated shutoff valves for all fixtures and a cleanout for future maintenance access.'
            },
            {
                _key: 'challenge-3',
                challenge: 'Client wanted induction cooktop but electrical panel was at capacity',
                solution: 'Upgraded main panel from 100amp to 200amp service. Added dedicated 240V circuit for induction range and separate circuits for double wall ovens.'
            }
        ],

        clientQuote: {
            quote: 'We went from eating takeout in the living room to hosting Sunday dinners for 12. The coffee bar gets more use than we ever imagined. This kitchen completely changed how we use our home and honestly, how much we enjoy being here.',
            clientName: 'Sarah M.',
            clientRole: 'Homeowner'
        }
    }

    try {
        await client
            .patch('ksBd7J2rUVbRXaXvOwgeMt')
            .set(caseStudyData)
            .commit()

        console.log('✅ Successfully populated Killarney Kitchen!')
        console.log('\nContent added:')
        console.log('- Project Story (Vision: 2 paragraphs, Process: 3 paragraphs, Outcome: 2 paragraphs)')
        console.log('- Timeline (8 phases, ~9 weeks total)')
        console.log('- 3 Challenges with Solutions')
        console.log('- Client Testimonial')
        console.log('\n🌐 View at: http://localhost:3000/project/killarney-kitchen')
    } catch (error) {
        console.error('❌ Error:', error)
    }
}

populateKillarneyKitchen().catch(console.error)

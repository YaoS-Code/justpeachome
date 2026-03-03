import { createClient } from 'next-sanity'

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2025-01-20',
    token: process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

const processSteps = [
    {
        _type: 'processStep',
        order: 1,
        title: 'Vision Alignment',
        description: 'We begin by deeply understanding your goals, lifestyle, and budget. Whether it\'s a heritage restoration or a new R-CG infill, we align our expertise with your vision.',
        icon: 'MessageSquare',
        highlights: ['In-depth consultation', 'Feasibility analysis', 'Budget transparency']
    },
    {
        _type: 'processStep',
        order: 2,
        title: 'Architectural Design',
        description: 'Our design team creates bespoke plans that maximize space and light. We blend functional requirements with organic modern aesthetics to create your unique sanctuary.',
        icon: 'PenTool',
        highlights: ['3D visualization', 'Sustainable material selection', 'Custom joinery design']
    },
    {
        _type: 'processStep',
        order: 3,
        title: 'Permitting & Approvals',
        description: 'Navigating Calgary\'s zoning and building codes can be complex. We handle all permits, including R-CG re-zoning applications, ensuring a compliant and smooth process.',
        icon: 'FileCheck',
        highlights: ['City of Calgary liaison', 'Zoning compliance', 'Permit expediting']
    },
    {
        _type: 'processStep',
        order: 4,
        title: 'Precision Build',
        description: 'Our master craftsmen bring the design to life. We prioritize building science principles and sustainable practices to ensure your home is healthy, efficient, and durable.',
        icon: 'Hammer',
        highlights: ['High-performance envelope', 'Low-VOC materials', 'Rigorous site management']
    },
    {
        _type: 'processStep',
        order: 5,
        title: 'Quality Assurance',
        description: 'We maintain strict quality control at every milestone. Our multi-point inspections ensure that every detail, from framing to finishes, meets our exacting standards.',
        icon: 'ClipboardCheck',
        highlights: ['Milestone inspections', 'Deficiency resolution', 'Performance testing']
    },
    {
        _type: 'processStep',
        order: 6,
        title: 'Welcome Home',
        description: 'The journey concludes with a comprehensive walkthrough and handover. We ensure you are fully comfortable with your new home\'s systems and maintenance.',
        icon: 'Home',
        highlights: ['Systems orientation', 'Maintenance manual', 'Comprehensive warranty']
    }
]

const testimonials = [
    {
        _type: 'testimonial',
        clientName: 'Sarah & Michael Chen',
        projectType: 'Kitchen & Main Floor Renovation',
        location: 'Altadore',
        quote: 'Just Peac Homes didn\'t just renovate our house; they reimagined how we live. The focus on natural light and organic materials has brought a sense of calm to our busy lives. Their team is professional, tidy, and truly cares.',
        rating: 5,
        date: '2025-11-15'
    },
    {
        _type: 'testimonial',
        clientName: 'David Thompson',
        projectType: 'R-CG Infill Development',
        location: 'Lake Bonavista',
        quote: 'As an investor, I needed a partner who understood the new R-CG zoning inside out. They maximized the lot potential while creating a stunning property that sold effectively immediately. A seamless experience from start to finish.',
        rating: 5,
        date: '2025-10-22'
    },
    {
        _type: 'testimonial',
        clientName: 'The Martinez Family',
        projectType: 'Whole Home Restoration',
        location: 'Marda Loop',
        quote: 'We wanted to preserve the character of our 1950s bungalow while making it energy efficient. Just Peac Homes delivered a masterclass in blending old and new. The craftsmanship is impeccable, and the result is warm, inviting, and sustainable.',
        rating: 5,
        date: '2025-12-08'
    }
]

async function seed() {
    console.log('🚀 Seeding Process Steps and Testimonials...')
    try {
        for (const step of processSteps) {
            await client.create(step)
        }
        console.log('✅ Successfully seeded Process Steps')
        for (const testimonial of testimonials) {
            await client.create(testimonial)
        }
        console.log('✅ Successfully seeded Testimonials')
    } catch (error) {
        console.error('❌ Seeding failed:', error.message)
        process.exit(1)
    }
}

seed()

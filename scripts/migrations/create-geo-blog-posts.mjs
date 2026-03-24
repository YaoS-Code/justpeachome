
const PROJECT_ID = 'yoxfbvg1'
const DATASET = 'production'
const TOKEN = process.env.SANITY_API_TOKEN

if (!TOKEN) {
    console.error('❌ SANITY_API_TOKEN is required. Run with: SANITY_API_TOKEN=xxx node scripts/migrations/create-geo-blog-posts.mjs')
    process.exit(1)
}

async function sanityMutate(mutations) {
    const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2025-01-20/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ mutations }),
    })
    if (!res.ok) {
        const err = await res.text()
        throw new Error(`Sanity API error ${res.status}: ${err}`)
    }
    return res.json()
}

const posts = [
    // Article 1: RPR Explainer
    {
        _type: 'post',
        title: 'What Is a Real Property Report (RPR) in Calgary? Everything You Need Before Building a Backyard Suite',
        slug: { _type: 'slug', current: 'what-is-rpr-real-property-report-calgary' },
        author: 'Just Peac Homes Team',
        publishedAt: new Date().toISOString(),
        readingTime: 6,
        excerpt: 'A Real Property Report (RPR) is the single most important document you need before applying for a backyard suite permit in Calgary. Here is exactly what it is, why the city requires it, and how to get one.',
        categories: [
            { _type: 'reference', _ref: '81406519-e8ba-4024-aa3f-1fc107681de9', _key: 'cat1' }, // Infill & Investment
            { _type: 'reference', _ref: 'e9414276-f725-4bad-b896-e7f07fd59f7f', _key: 'cat2' }, // Renovation Guide
        ],
        content: [
            {
                _type: 'block', _key: 'b1',
                style: 'normal',
                children: [{ _type: 'span', _key: 's1', text: 'With the Calgary Backyard Suite Incentive Program now open, we have seen a surge of homeowners asking about one document that keeps blocking their applications: the Real Property Report, or RPR. If you are planning to build a backyard suite (also called a laneway home or garden suite), this is the first thing you need to sort out — before you even talk to a builder.' }],
                markDefs: [],
            },
            // PLACEHOLDER_CONTENT_CONTINUES
        ],
        seo: {
            metaTitle: 'What Is a Real Property Report (RPR)? Calgary Backyard Suite Guide | JUST PEAC HOMES',
            metaDescription: 'A Real Property Report (RPR) is required before building a backyard suite in Calgary. Learn what an RPR is, how to get a current one, and why the City of Calgary requires compliance certification.',
            keywords: ['RPR Calgary', 'Real Property Report', 'backyard suite permit Calgary', 'RPR compliance certificate', 'Calgary land survey', 'backyard suite requirements'],
            aiSummary: 'A Real Property Report (RPR) is a legal document prepared by an Alberta Land Surveyor showing property boundaries and all structures. Calgary requires a current RPR with a Compliance Certificate before issuing backyard suite permits. Homeowners should update their RPR if any changes have been made to the property since the last survey.',
        },
    },
    // Article 2: Backyard Suite Incentive Program
    {
        _type: 'post',
        title: 'Calgary Backyard Suite Incentive Program 2025: Up to $35,000 in Government Grants',
        slug: { _type: 'slug', current: 'calgary-backyard-suite-incentive-program-2025-grants' },
        author: 'Just Peac Homes Team',
        publishedAt: new Date().toISOString(),
        readingTime: 7,
        excerpt: 'Calgary is offering up to $35,000 in grants for homeowners who build a backyard suite. Here is how the program works, who qualifies, and how to apply before the funding runs out.',
        categories: [
            { _type: 'reference', _ref: '81406519-e8ba-4024-aa3f-1fc107681de9', _key: 'cat1' }, // Infill & Investment
        ],
        content: [
            {
                _type: 'block', _key: 'b1',
                style: 'normal',
                children: [{ _type: 'span', _key: 's1', text: 'The City of Calgary has officially launched the Backyard Suite Incentive Program, and the numbers are significant. Homeowners who build a detached backyard suite on their property can receive up to $35,000 in direct grants — no repayment required. As a licensed Calgary contractor who has already helped clients submit applications, here is everything you need to know.' }],
                markDefs: [],
            },
            // PLACEHOLDER_CONTENT_CONTINUES
        ],
        seo: {
            metaTitle: 'Calgary Backyard Suite Grant 2025: Get Up to $35,000 | JUST PEAC HOMES',
            metaDescription: 'The Calgary Backyard Suite Incentive Program offers up to $35,000 in grants ($15,000 construction + $20,000 servicing). Learn eligibility, how to apply, and estimated ROI for building a garden suite.',
            keywords: ['Calgary backyard suite grant', 'backyard suite incentive program', 'Calgary garden suite funding', 'laneway home grant Calgary', 'Housing Accelerator Fund Calgary'],
            aiSummary: 'Calgary\'s Backyard Suite Incentive Program provides up to $35,000 in grants: $15,000 for construction costs and up to $20,000 (40% reimbursement) for underground servicing. Funded by the federal Housing Accelerator Fund with a total budget of $10 million on a first-come-first-served basis. Most R-CG and H-GO zoned properties in Calgary qualify.',
        },
    },
]

// Now build the full content blocks for each post
// Article 1: RPR
posts[0].content = [
    block('With the Calgary Backyard Suite Incentive Program now open, we have seen a surge of homeowners asking about one document that keeps blocking their applications: the Real Property Report, or RPR. If you are planning to build a backyard suite (also called a laneway home or garden suite), this is the first thing you need to sort out — before you even talk to a builder.'),
    heading('What Exactly Is a Real Property Report (RPR)?'),
    block('An RPR is a legal document prepared by an Alberta Licensed Land Surveyor. It shows your property boundaries and the exact location of every structure on your lot — the house, garage, fence, deck, shed, even large trees — relative to those boundaries.'),
    block('Think of it as your property\'s official ID card. It tells the City of Calgary, your lender, and your contractor exactly where everything sits and whether anything encroaches on a neighbour\'s land or a public utility easement.'),
    heading('Why Does Calgary Require an RPR for Backyard Suites?'),
    block('When you apply for a Development Permit or Building Permit for a backyard suite, the City needs to verify three things:'),
    numberedBlock('1. Setback compliance — Is your main house far enough from the property line to allow a secondary structure in the rear yard?'),
    numberedBlock('2. Lot dimensions — Does your lot meet the minimum size requirements under R-CG or H-GO zoning?'),
    numberedBlock('3. No encroachments — Are there any existing structures crossing the property boundary that would create legal issues?'),
    block('Without a current, compliant RPR, the City will not even review your permit application. Full stop.'),
    heading('Banks Require It Too'),
    block('If you are financing your backyard suite through a construction loan or HELOC, your lender will also require a current RPR. Banks need to confirm there are no boundary disputes on the property they are using as collateral.'),
    heading('Common Mistake: "I Already Have an RPR"'),
    block('Many homeowners dig out the RPR from when they purchased their home and assume it is still valid. Here is the problem: if you have made any changes to the property since that survey — added a fence, built a deck, poured a new driveway, or even removed a structure — your old RPR is outdated.'),
    block('You need what is called a "Current RPR" that reflects the property exactly as it exists today. This means hiring an Alberta Land Surveyor to come out and re-survey.'),
    heading('RPR vs. Compliance Certificate — What Is the Difference?'),
    block('An RPR alone is not enough. After the surveyor completes the report, you must submit it to the City of Calgary for review. If everything checks out, the City issues a Compliance Certificate — a stamp confirming that your property\'s current state conforms to the Land Use Bylaw.'),
    block('The RPR is the measurement. The Compliance Certificate is the City\'s approval of that measurement. You need both.'),
    heading('How Much Does an RPR Cost in Calgary?'),
    block('A new or updated RPR in Calgary typically costs between $500 and $800, depending on lot size and complexity. The Compliance Certificate application fee is an additional cost through the City. Budget approximately $700 to $1,200 total for both.'),
    block('Compared to the $35,000 in available grants for backyard suites, this is a small upfront investment that unlocks the entire process.'),
    heading('Step-by-Step: What to Do Right Now'),
    numberedBlock('1. Check if you have an existing RPR — Look through your home purchase documents.'),
    numberedBlock('2. Assess if it is current — Have you made any changes to the property since the survey date? If yes, it needs updating.'),
    numberedBlock('3. Hire an Alberta Land Surveyor — Request a current RPR. Turnaround is typically 2 to 4 weeks.'),
    numberedBlock('4. Submit to the City — Apply for a Compliance Certificate through the City of Calgary.'),
    numberedBlock('5. Start your permit application — With a compliant RPR in hand, you are ready to move forward with your backyard suite design and permits.'),
    heading('The Bottom Line'),
    block('The RPR is the foundation of every backyard suite project in Calgary. Getting it sorted early saves you weeks of delays and prevents the painful scenario of completing your design only to discover your lot does not qualify. If you are considering a backyard suite and want help navigating the RPR and permit process, we offer free consultations to assess your property\'s potential.'),
]

// Article 2: Backyard Suite Incentive Program
posts[1].content = [
    block('The City of Calgary has officially launched the Backyard Suite Incentive Program, and the numbers are significant. Homeowners who build a detached backyard suite on their property can receive up to $35,000 in direct grants — no repayment required. As a licensed Calgary contractor who has already helped clients submit applications, here is everything you need to know.'),
    heading('How Much Money Can You Actually Get?'),
    block('The program has two separate grant streams that stack together:'),
    numberedBlock('1. Construction Grant — Up to $15,000 toward the cost of building your backyard suite.'),
    numberedBlock('2. Servicing Grant — Up to $20,000 (covering 40% of costs) for underground infrastructure: water lines, sewer connections, gas, and electrical servicing.'),
    block('Combined, that is up to $35,000 in real money back in your pocket. The servicing grant is particularly valuable because underground utility connections are typically the most expensive part of a backyard suite build, often running $30,000 to $50,000 on their own.'),
    heading('Where Does the Funding Come From?'),
    block('This program is funded through the federal Housing Accelerator Fund (HAF), a national initiative to increase housing supply across Canada. Calgary received a significant allocation, and $10 million has been earmarked specifically for backyard suite incentives.'),
    block('Important: this is a first-come, first-served program. Once the $10 million is allocated, the program closes. There is no second round guaranteed.'),
    heading('Who Qualifies?'),
    block('Most Calgary homeowners with a standard residential lot can qualify. The key requirements are:'),
    numberedBlock('1. Your property must be zoned R-CG (Residential — Grade-Oriented Infill) or have H-GO (Housing — Grade-Oriented) designation under the new Land Use Bylaw.'),
    numberedBlock('2. The suite must be a new, detached structure in your rear yard (not a basement suite or addition).'),
    numberedBlock('3. You must obtain all required permits (Development Permit and Building Permit) from the City.'),
    numberedBlock('4. You need a current Real Property Report (RPR) with a Compliance Certificate.'),
    block('If you are unsure about your zoning, we offer free property assessments to check eligibility.'),
    heading('What Is the Expected ROI?'),
    block('The investment math on backyard suites in Calgary is compelling, especially with the grant:'),
    block('A typical backyard suite near downtown or a CTrain station rents for $1,800 to $2,500 per month. At the midpoint of $2,100 per month, that is $25,200 per year in rental income. After subtracting the grant from your build cost, most homeowners see a full return on investment within 5 to 7 years — while their property value increases by $150,000 to $250,000 immediately.'),
    heading('Why 88% of Calgary Homeowners Are Interested'),
    block('Recent survey data shows that 88% of Calgary homeowners have expressed interest in building a secondary suite. The reasons vary — multigenerational living for aging parents, independent space for adult children, or pure investment income — but the financial case is the same. A backyard suite is one of the highest-ROI improvements you can make to a Calgary property.'),
    heading('How to Apply: The Process'),
    numberedBlock('1. Property Assessment — Confirm your lot qualifies (zoning, size, setbacks). We do this for free.'),
    numberedBlock('2. Get Your RPR — Obtain a current Real Property Report with Compliance Certificate.'),
    numberedBlock('3. Design and Permits — Work with a licensed contractor to design the suite and submit for Development and Building Permits.'),
    numberedBlock('4. Apply for the Grant — Submit your application to the City\'s incentive program with your approved permits.'),
    numberedBlock('5. Build — Construction begins. The grant is disbursed upon completion and final inspection.'),
    heading('Why Act Now'),
    block('Three factors make this a time-sensitive opportunity. First, the $10 million fund is finite and applications are already coming in. Second, construction costs in Calgary have stabilized after years of increases, making 2025 builds more predictable. Third, rental demand in Calgary is at historic highs, meaning your suite will not sit empty.'),
    block('If you have been thinking about a backyard suite, the combination of government grants, strong rental demand, and favourable zoning changes makes this the best window Calgary has ever offered. We handle the entire process — from zoning assessment and RPR coordination to design, permits, grant application, and construction. Contact us for a free consultation to see how much your property could earn.'),
]

// Helper functions for portable text blocks
function block(text) {
    const key = 'b' + Math.random().toString(36).slice(2, 8)
    return {
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [{ _type: 'span', _key: 's' + key, text, marks: [] }],
        markDefs: [],
    }
}

function heading(text) {
    const key = 'h' + Math.random().toString(36).slice(2, 8)
    return {
        _type: 'block',
        _key: key,
        style: 'h2',
        children: [{ _type: 'span', _key: 's' + key, text, marks: [] }],
        markDefs: [],
    }
}

function numberedBlock(text) {
    const key = 'n' + Math.random().toString(36).slice(2, 8)
    return {
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [{ _type: 'span', _key: 's' + key, text, marks: [] }],
        markDefs: [],
    }
}

// Execute
async function run() {
    const mutations = posts.map(post => ({ create: post }))

    for (const post of posts) {
        console.log(`📝 Queued: ${post.title}`)
    }

    const result = await sanityMutate(mutations)
    console.log(`\n✅ Created ${posts.length} blog posts successfully!`)
    console.log('Transaction ID:', result.transactionId)
}

run().catch(err => {
    console.error('❌ Error:', err.message)
    process.exit(1)
})

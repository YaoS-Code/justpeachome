
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

const FAQS = [
    {
        _type: 'object',
        question: "Are you fully licensed and insured?",
        answer: "Absolutely. We are fully licensed to operate in Calgary and all surrounding municipalities. Crucially, we hold a Prepaid Contractor Licence with the Government of Alberta, which legally allows us to collect deposits—a requirement many homeowners aren't aware of. This licence requires us to post a security bond, offering you added protection and peace of mind. We also carry comprehensive general liability insurance and WCB coverage for all workers."
    },
    {
        _type: 'object',
        question: "Do you offer a warranty on your work?",
        answer: "Yes. Every project comes with a comprehensive workmanship warranty. If anything we've installed doesn't hold up as expected within the first year, we fix it at no cost. Additionally, we use high-quality materials that come with their own manufacturer warranties, and we're happy to help facilitate those claims if needed. We stand behind our quality."
    },
    {
        _type: 'object',
        question: "How long does a typical project take?",
        answer: "While every home is unique, our experience allows us to provide realistic timelines. A standard basement development typically takes 8-10 weeks, while a legal secondary suite or garage suite usually runs 12-14 weeks from start to finish. We provide a detailed schedule before we start, so you always know what to expect."
    },
    {
        _type: 'object',
        question: "Will the price change during construction?",
        answer: "We believe in a \"Fixed-Price Guarantee\". The number on your final quote is the number you pay. The only time this changes is if you request a scope change (e.g., upgrading a finish), which is always discussed and approved in writing before we proceed. No surprises, just transparency."
    }
]

async function seedFAQs() {
    try {
        console.log('Fetching About Page...')
        const aboutPage = await client.fetch('*[_type == "aboutPage"][0]')

        if (!aboutPage) {
            console.error('About Page not found!')
            return
        }

        console.log('Updating About Page with FAQs...')
        await client.patch(aboutPage._id)
            .set({ faqs: FAQS })
            .commit()

        console.log('Successfully added FAQs to About Page!')
    } catch (err) {
        console.error('Migration failed:', err.message)
    }
}

seedFAQs()

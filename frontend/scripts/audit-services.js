
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

async function auditServices() {
    const query = `*[_type == "service"]{
        _id,
        title,
        "hasContent": defined(content) && count(content) > 1,
        "hasFeatures": defined(features) && count(features) > 0,
        "hasProcess": defined(process) && count(process) > 0,
        "hasFaqs": defined(faqs) && count(faqs) > 0,
        "hasGallery": defined(gallery) && count(gallery) > 0
    }`;
    const services = await client.fetch(query);
    console.table(services);
}

auditServices();

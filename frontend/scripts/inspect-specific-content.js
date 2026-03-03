
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

async function inspectDocs() {
    const slug1 = 'altadore'; // Community
    const slug2 = 'lake-bonavista-estate'; // Project

    const query = `*[slug.current in [$slug1, $slug2]]{
        _id, 
        _type, 
        title, 
        slug,
        content
    }`;

    const docs = await client.fetch(query, { slug1, slug2 });
    console.log(JSON.stringify(docs, null, 2));
}

inspectDocs();

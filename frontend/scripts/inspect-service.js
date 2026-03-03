
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

async function inspectService() {
    const slug = 'kitchen';
    const query = `*[_type == "service" && slug.current == $slug]`;
    const docs = await client.fetch(query, { slug });
    console.log(JSON.stringify(docs, null, 2));
}

inspectService();

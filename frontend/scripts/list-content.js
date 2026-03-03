
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

async function listContent() {
    const docs = await client.fetch('*[_type in ["service", "project", "community"]]{_type, title, _id, "hasContent": defined(content)}');
    console.table(docs);
}

listContent();

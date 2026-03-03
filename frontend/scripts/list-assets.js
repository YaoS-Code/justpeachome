
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

async function listAssets() {
    const query = `*[_type == "sanity.imageAsset"][0...20]{_id, originalFilename, url}`;
    const assets = await client.fetch(query);
    console.log(JSON.stringify(assets, null, 2));
}

listAssets();


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

async function deleteProject() {
    const title = 'D2 Tea Lab';
    console.log(`🔍 Searching for project: "${title}"...`);

    try {
        // Find documents with this title (published or drafts)
        const docs = await client.fetch(`*[_type == "project" && title == "${title}"]{_id, _type}`);

        if (docs.length === 0) {
            console.log(`⚠️  No project found with title "${title}".`);
            return;
        }

        console.log(`Found ${docs.length} document(s):`);
        docs.forEach(d => console.log(` - ${d._id} (${d._type})`));

        // Delete them
        for (const doc of docs) {
            console.log(`🗑️  Deleting ${doc._id}...`);
            await client.delete(doc._id);
            console.log(`✅ Deleted ${doc._id}`);
        }

    } catch (error) {
        console.error('❌ Error deleting project:', error.message);
    }
}

deleteProject();

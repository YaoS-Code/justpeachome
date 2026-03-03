
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

async function resolveDuplicates() {
    console.log('🗑️  Deleting redundant "singleton-aboutPage" document...');

    try {
        await client.delete('singleton-aboutPage');
        console.log('✅ Successfully deleted "singleton-aboutPage".');

        // Verify only one remains
        const query = `*[_type == "aboutPage"]{_id, title}`;
        const documents = await client.fetch(query);
        console.log('\n🔍 Remaining "aboutPage" documents:');
        console.table(documents);

    } catch (error) {
        console.error('❌ Error deleting document:', error.message);
    }
}

resolveDuplicates();

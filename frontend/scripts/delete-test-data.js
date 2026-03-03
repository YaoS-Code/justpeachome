
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

async function deleteTestDoc() {
    const docId = 'test-permission-check';
    console.log(`🗑️  Attempting to delete document ID: ${docId}...`);

    try {
        const result = await client.delete(docId);
        console.log('✅ Successfully deleted "Permission Test" project.');
        console.log('Result:', result);
    } catch (error) {
        console.error('❌ Error deleting document:', error.message);
    }
}

deleteTestDoc();

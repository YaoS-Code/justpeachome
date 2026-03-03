
const { createClient } = require('next-sanity');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ SANITY_API_TOKEN is missing from .env file');
    process.exit(1);
}

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2025-01-20',
});

const singletonTypes = [
    'homePage',
    'aboutPage',
    'contactPage',
    'siteSettings',
    'blogPage',
    'servicesPage',
    'projectsPage',
    'legalPage' // Note: This might not be a singleton if there are multiple legal pages, but checking anyway
];

async function checkDuplicates() {
    console.log('🔍 Checking for duplicate singleton documents...');
    let foundIssues = false;

    for (const type of singletonTypes) {
        try {
            const query = `*[_type == "${type}"]{_id, title}`;
            const documents = await client.fetch(query);

            if (documents.length > 1) {
                console.log(`\n⚠️  DUPLICATE FOUND for type: "${type}"`);
                console.log(`   Count: ${documents.length}`);
                console.table(documents);
                foundIssues = true;
            } else if (documents.length === 1) {
                console.log(`✅ "${type}": OK (ID: ${documents[0]._id})`);
            } else {
                console.log(`ℹ️  "${type}": No documents found.`);
            }
        } catch (error) {
            console.error(`❌ Error checking type "${type}":`, error.message);
        }
    }

    if (!foundIssues) {
        console.log('\n✨ No duplicate singleton documents found.');
    } else {
        console.log('\n⚠️  Please resolve the duplicates listed above to ensure the website displays the correct content.');
    }
}

checkDuplicates();


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

async function checkSeoStatus() {
    console.log('🔍 Checking SEO status for all content...');

    // Define types to check
    const typesToCheck = [
        'homePage', 'aboutPage', 'contactPage', 'servicesPage', 'projectsPage', 'blogPage', // Singletons
        'service', 'project', 'post', 'community' // Documents
    ];

    const query = `*[
        _type in $types
    ]{
        _id,
        _type,
        title,
        seo {
            metaTitle,
            metaDescription,
            aiSummary,
            keywords
        }
    }`;

    try {
        const documents = await client.fetch(query, { types: typesToCheck });

        const missingData = [];

        documents.forEach(doc => {
            const seo = doc.seo || {};
            const missing = [];

            if (!seo.metaTitle) missing.push('metaTitle');
            if (!seo.metaDescription) missing.push('metaDescription');
            if (!seo.aiSummary) missing.push('aiSummary');
            if (!seo.keywords || seo.keywords.length === 0) missing.push('keywords');

            if (missing.length > 0) {
                missingData.push({
                    type: doc._type,
                    title: doc.title || 'Untitled',
                    id: doc._id,
                    missingFields: missing
                });
            }
        });

        if (missingData.length === 0) {
            console.log('✅ All documents have complete SEO data!');
        } else {
            console.log(`⚠️  Found ${missingData.length} documents with missing SEO data:\n`);

            // Group by type for better readability
            const grouped = missingData.reduce((acc, item) => {
                acc[item.type] = acc[item.type] || [];
                acc[item.type].push(item);
                return acc;
            }, {});

            Object.keys(grouped).forEach(type => {
                console.log(`\n📌 Type: ${type.toUpperCase()}`);
                console.table(grouped[type].map(d => ({
                    Title: d.title.substring(0, 30),
                    'Missing Fields': d.missingFields.join(', ')
                })));
            });
        }

    } catch (error) {
        console.error('❌ Error checking SEO status:', error.message);
    }
}

checkSeoStatus();

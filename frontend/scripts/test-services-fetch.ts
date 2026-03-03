import { getServices, getProjects, getCommunities, getSiteSettings } from '../lib/sanity';

async function testFetch() {
    console.log('Testing Sanity Fetch...');

    try {
        console.log('Fetching Services...');
        const services = await getServices();
        console.log(`✅ Services: ${services.length} items`);
        services.forEach((s: any) => console.log(`   - ${s.title}`));
    } catch (error) {
        console.error('❌ Services fetch failed:', error);
    }

    try {
        console.log('Fetching Projects...');
        const projects = await getProjects();
        console.log(`✅ Projects: ${projects.length} items`);
    } catch (error) {
        console.error('❌ Projects fetch failed:', error);
    }

    try {
        console.log('Fetching Communities...');
        const communities = await getCommunities();
        console.log(`✅ Communities: ${communities.length} items`);
    } catch (error) {
        console.error('❌ Communities fetch failed:', error);
    }

    try {
        console.log('Fetching Site Settings...');
        const settings = await getSiteSettings();
        console.log(`✅ Site Settings: ${settings ? 'Found' : 'Not Found'}`);
        if (settings) console.log(`   Title: ${settings.title}`);
    } catch (error) {
        console.error('❌ Site Settings fetch failed:', error);
    }
}

testFetch();

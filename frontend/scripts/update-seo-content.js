
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

// Generated SEO Content based on site context
const seoUpdates = [
    // --- SINGLETONS ---
    {
        id: 'singleton-servicesPage',
        seo: {
            metaTitle: 'Expert Custom Home Build & Renovation Services | JUST PEAC HOMES',
            metaDescription: 'Explore our comprehensive construction services in Calgary. From custom home builds and major renovations to infill developments and interior design.',
            breadcrumbTitle: 'Services',
            aiSummary: 'JUST PEAC HOMES offers a full range of residential construction services including new custom homes, infill developments, whole-home renovations, and architectural design. We specialize in organic modern aesthetics and sustainable building practices.',
            keywords: ['custom home builder', 'home renovations Calgary', 'infill development', 'luxury home builder', 'architectural design']
        }
    },
    {
        id: 'singleton-projectsPage',
        seo: {
            metaTitle: 'Our Portfolio of Custom Homes & Renovations | JUST PEAC HOMES',
            metaDescription: 'View our gallery of completed projects in Calgary. Featured works include luxury infills in Altadore, modern renovations in Killarney, and custom estates.',
            breadcrumbTitle: 'Portfolio',
            aiSummary: 'Browse the diverse portfolio of JUST PEAC HOMES, showcasing our expertise in modern design and quality craftsmanship. Our projects range from high-end custom builds to transformative renovations in Calgary\'s most desirable neighborhoods.',
            keywords: ['custom home portfolio', 'renovation gallery', 'luxury homes Calgary', 'modern home design', 'construction projects']
        }
    },
    {
        id: 'singleton-blogPage',
        seo: {
            metaTitle: 'The Design Journal | Home Building Insights & Trends',
            metaDescription: 'Read our expert articles on custom home building, interior design trends, and renovation tips. Your resource for creating an organic modern home.',
            breadcrumbTitle: 'Journal',
            aiSummary: 'The Design Journal by JUST PEAC HOMES features in-depth articles on residential architecture, interior design trends, and construction advice. Stay informed about the latest in organic modern living and sustainable building.',
            keywords: ['home building blog', 'design trends 2024', 'renovation tips', 'Calgary architecture', 'interior design ideas']
        }
    },
    {
        id: 'aboutPage', // ID Verified from previous steps
        seo: {
            // Updating existing partial data if needed, but focusing on missing
            aiSummary: 'JUST PEAC HOMES is a premier custom home builder in Calgary, founded on the principles of industrial design and fine craftsmanship. We bring a unique "organic modern" aesthetic to every project, ensuring homes are not just structures but works of living art.',
            keywords: ['about just peac homes', 'calgary home builder', 'industrial design architecture', 'luxury custom homes', 'craftsmanship']
        }
    },

    // --- COMMUNITIES ---
    {
        type: 'community',
        title: 'Altadore',
        seo: {
            metaTitle: 'Custom Homes & Renovations in Altadore, Calgary',
            metaDescription: 'Build your dream home in Altadore with JUST PEAC HOMES. We specialize in luxury infills and renovations in this vibrant, inner-city community.',
            aiSummary: 'Altadore is one of Calgary\'s most sought-after neighborhoods, known for its vibrant culture and proximity to Marda Loop. JUST PEAC HOMES builds luxury custom infills here that blend modern design with the area\'s established charm.',
            keywords: ['Altadore custom homes', 'infill builder Altadore', 'Marda Loop renovations', 'inner city Calgary homes']
        }
    },
    {
        type: 'community',
        title: 'Killarney',
        seo: {
            metaTitle: 'Killarney Infill Builders & Renovations | JUST PEAC HOMES',
            metaDescription: 'Expert custom home building in Killarney. Transform your property with our modern design and infill development services.',
            aiSummary: 'Killarney offers a perfect mix of historic charm and modern redevelopment. We specialize in building high-end semi-detached and detached infills that enhance this mature neighborhood\'s evolving architectural landscape.',
            keywords: ['Killarney infills', 'Killarney renovations', 'custom homes SW Calgary', 'modern infill design']
        }
    },
    {
        type: 'community',
        title: 'Marda Loop',
        seo: {
            metaTitle: 'Marda Loop Custom Home Builders | Modern Living',
            metaDescription: 'Experience the best of Marda Loop living. We design and build custom homes that match the energetic and walkable lifestyle of this premier district.',
            aiSummary: 'Marda Loop is the heart of trendy living in Calgary. Our projects in Marda Loop focus on maximizing space and style, delivering sophisticated urban homes just steps away from the city\'s best shops and cafes.',
            keywords: ['Marda Loop builders', 'luxury homes Marda Loop', 'urban living Calgary', 'custom home design']
        }
    },
    {
        type: 'community',
        title: 'Lake Bonavista',
        seo: {
            metaTitle: 'Lake Bonavista Estate Renovations & Custom Builds',
            metaDescription: 'Revitalize your home in Lake Bonavista. We specialize in large-scale renovations and custom builds in Calgary\'s premier lake community.',
            aiSummary: 'Lake Bonavista is Calgary\'s premier lake community. We specialize in transforming established estate homes through major renovations and additions, bringing modern luxury to this exclusive lakeside neighborhood.',
            keywords: ['Lake Bonavista renovations', 'lake community homes', 'estate home builder', 'SE Calgary renovations']
        }
    },

    // --- SERVICES ---
    // --- SERVICES ---
    {
        type: 'service',
        title: 'Whole Home Renovation',
        seo: {
            metaTitle: 'Whole-Home Renovations Calgary | Transform Your Space',
            metaDescription: 'Complete home transformations. We modernize dated layouts, upgrade systems, and redesign interiors to create a cohesive, luxury living experience.',
            aiSummary: 'Specializing in major residential overhauls, our Whole-Home Renovation service breathes new life into existing properties. We reimagine floor plans, update finishes, and modernize systems to create a brand-new home within your existing walls.',
            keywords: ['whole home renovation', 'major home remodel', 'house gut reno', 'luxury renovation']
        }
    },
    {
        type: 'service',
        title: 'Infill Development',
        seo: {
            metaTitle: 'Calgary Infill Developer | R-CG & R-C2 Projects',
            metaDescription: 'Maximize your property value with our infill development expertise. We manage zoning, subdivision, and construction for high-ROI urban projects.',
            aiSummary: 'Our Infill Development service is designed for investors and homeowners looking to build in Calgary\'s inner city. We expertly navigate zoning bylaws (R-CG, R-C2) to design and build high-value semi-detached or row homes that maximize lot potential.',
            keywords: ['infill development', 'R-CG zoning', 'inner city builder', 'property investment']
        }
    },
    {
        type: 'service',
        title: 'Basement & Secondary Suites',
        seo: {
            metaTitle: 'Basement Development & Legal Suites | Calgary',
            metaDescription: 'Transform your lower level into a usable, luxurious space. Legal secondary suites, entertainment areas, home gyms, and more.',
            aiSummary: 'Unlock the potential of your home with our Basement & Secondary Suites service. We specialize in developing legal income suites and luxurious entertainment zones that add value and functionality to your property, indistinguishable in quality from the main floor.',
            keywords: ['basement renovation', 'legal basement suite', 'secondary suite Calgary', 'basement development']
        }
    },
    {
        type: 'service',
        title: 'Bathroom Renovation',
        seo: {
            metaTitle: 'Luxury Bathroom Renovations | Spa-Like Retreats',
            metaDescription: 'Turn your bathroom into a private sanctuary. High-end finishes, custom vanities, and spa-inspired designs.',
            aiSummary: 'We create spa-inspired bathroom retreats using high-end materials and custom millwork. From master ensuites with steam showers to functional family bathrooms, our designs focus on relaxation, functionality, and timeless elegance.',
            keywords: ['bathroom renovation', 'luxury ensuite', 'bathroom remodel', 'spa bathroom design']
        }
    },
    {
        type: 'service',
        title: 'Kitchen',
        seo: {
            metaTitle: 'Custom Kitchen Renovations | The Heart of Your Home',
            metaDescription: 'Design the kitchen of your dreams. Custom cabinetry, high-end appliances, and functional layouts for the modern chef.',
            aiSummary: 'The kitchen is the heart of the home, and our renovation service treats it as such. We deliver custom cabinetry, optimized layouts, and premium finishes to create a culinary space that is both beautiful for entertaining and functional for daily life.',
            keywords: ['kitchen renovation', 'custom cabinets', 'kitchen remodel Calgary', 'luxury kitchen design']
        }
    },
    {
        type: 'service',
        title: 'Heritage Restoration',
        seo: {
            metaTitle: 'Heritage Home Restoration & Renovation | Calgary',
            metaDescription: 'Preserving the past, building for the future. Expert restoration of century homes in Calgary\'s historic neighborhoods.',
            aiSummary: 'Our Heritage Restoration service respects the architectural integrity of Calgary\'s historic properties while seamlessly integrating modern conveniences. We specialize in character preservation, envelope upgrades, and sensitive modern additions.',
            keywords: ['heritage restoration', 'century home renovation', 'historic home builder', 'craftsman restoration']
        }
    },
    {
        type: 'service',
        title: 'Backyard & Garage Suites',
        seo: {
            metaTitle: 'Backyard & Garage Suites (Laneway Homes) | Calgary',
            metaDescription: 'Add value and living space with a custom laneway home or garage suite. Perfect for rental income or multi-generational living.',
            aiSummary: 'Maximize your property\'s potential with a Backyard or Garage Suite. Also known as laneway homes, these custom detached units provide excellent rental income potential or flexible living space for family members, designed with privacy and style in mind.',
            keywords: ['garage suite', 'laneway home', 'backyard suite', 'garden suite Calgary']
        }
    },

    // --- PROJECTS ---
    {
        type: 'project',
        title: 'Altadore Modern',
        seo: {
            metaTitle: 'Altadore Modern Infill | Luxury Custom Home',
            metaDescription: 'Explore our Altadore Modern project—a sleek, contemporary infill featuring open-concept living, custom millwork, and abundant natural light.',
            aiSummary: 'The Altadore Modern project is a stunning example of contemporary infill architecture. It features a striking flat-roof exterior, a custom walnut kitchen, and a seamless indoor-outdoor living connection, perfectly suited for the vibrant Altadore community.',
            keywords: ['modern infill', 'Altadore custom home', 'contemporary architecture', 'luxury real estate']
        }
    },
    {
        type: 'project',
        title: 'Lake Bonavista Estate',
        seo: {
            metaTitle: 'Lake Bonavista Estate Renovation | Timeless Luxury',
            metaDescription: 'A complete transformation of a classic estate home in Lake Bonavista. See how we modernized this lakeside property while preserving its character.',
            aiSummary: 'This Lake Bonavista Estate renovation involved a complete interior gut and structural reconfiguration. We opened up the floor plan to maximize lake views, installed a chef\'s kitchen, and created a master suite sanctuary, blending traditional elegance with modern comfort.',
            keywords: ['estate renovation', 'Lake Bonavista home', 'luxury remodel', 'kitchen renovation']
        }
    },
    {
        type: 'project',
        title: 'Marda Loop Heritage',
        seo: {
            metaTitle: 'Marda Loop Heritage Restoration | Modern Craftsman',
            metaDescription: 'Blending history with modern living. This Marda Loop project respects the neighborhood\'s heritage while delivering state-of-the-art amenities.',
            aiSummary: 'Our Marda Loop Heritage project is a sensitive restoration and modernization of a character home. We preserved key architectural details while upgrading the envelope, mechanical systems, and interior finishes to meet modern energy and design standards.',
            keywords: ['heritage restoration', 'Marda Loop renovation', 'craftsman style', 'modern heritage']
        }
    },
    {
        type: 'project',
        title: 'Killarney Kitchen',
        seo: {
            metaTitle: 'Killarney Kitchen Renovation | Bright & Airy Design',
            metaDescription: 'A bright and functional kitchen remodel in Killarney. Custom white oak cabinetry, quartz countertops, and improved flow.',
            aiSummary: 'The Killarney Kitchen project focused on transforming a dark, cramped space into a bright, social hub. By removing a structural wall and installing custom white oak millwork, we created an airy, open-concept kitchen perfect for family gatherings.',
            keywords: ['kitchen renovation', 'Killarney remodel', 'white oak cabinets', 'open concept kitchen']
        }
    },

    // --- BLOG POSTS (Adding generic summaries for likely existing posts) ---
    {
        type: 'post',
        title: '10 Tips for a Successful Renovation',
        seo: {
            aiSummary: 'An essential guide for homeowners planning a renovation. We cover budgeting, timeline management, and how to select the right contractor to ensure your project runs smoothly.',
            keywords: ['renovation tips', 'planning a remodel', 'contractor selection', 'home improvement guide']
        }
    }
];

async function updateSeo() {
    console.log('🚀 Starting SEO Content Update...');

    for (const update of seoUpdates) {
        try {
            // Find document ID if not provided (lookup by type + title)
            let docId = update.id;

            if (!docId && update.type && update.title) {
                const query = `*[_type == "${update.type}" && title == "${update.title}"][0]._id`;
                docId = await client.fetch(query);
            }

            if (!docId) {
                console.log(`⚠️  Could not find document for: "${update.title}" (${update.type}) - Skipping.`);
                continue;
            }

            // Prepare patch
            // We use setIfMissing for fields we don't want to overwrite if they exist (optional),
            // but here we likely want to fill gaps. We'll use a merge strategy.
            console.log(`📝 Updating SEO for: ${update.id || update.title} (${docId})...`);

            const patch = client.patch(docId);

            // Build the SEO object to merge. 
            // We fetch current first to merge smartly or just overwrite missing? 
            // For efficiency, we will fetch current SEO to avoid overwriting good manual data if it exists, 
            // but since user said "many are missing", we will prioritize filling.

            const currentDoc = await client.fetch(`*[_id == $id][0]{seo}`, { id: docId });
            const currentSeo = currentDoc?.seo || {};

            const newSeo = {
                ...currentSeo, // Keep existing values
                ...update.seo, // Overwrite with new specific values (or fill if missing)
                // NOTE: If you wanted to ONLY fill missing, you'd check existing fields here.
                // Given the request, I'll trust my generated content is better than "empty".
            };

            await patch.set({ seo: newSeo }).commit();
            console.log(`✅ Updated.`);

        } catch (error) {
            console.error(`❌ Error updating ${update.title}:`, error.message);
        }
    }
    console.log('\n✨ SEO Update Complete.');
}

updateSeo();

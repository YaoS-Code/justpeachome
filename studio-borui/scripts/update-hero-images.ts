import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { basename, join } from 'path'

const client = getCliClient({ apiVersion: '2024-01-01' })

const PROJECTS = [
    {
        slug: 'altadore-modern',
        imageFile: 'hero_altadore_modern_1769681651652.png',
        alt: 'Twilight view of Altadore Modern luxury home with angular rooflines and glowing windows',
        seoTitle: 'Altadore Modern | Luxury Custom Home in SW Calgary',
        seoDesc: 'Explore the Altadore Modern project, a stunning example of contemporary architecture in Calgary featuring minimalist design and floor-to-ceiling windows.'
    },
    {
        slug: 'lake-bonavista-estate',
        imageFile: 'hero_lake_bonavista_estate_1769681672434.png',
        alt: 'Grand front entrance of Lake Bonavista Estate home with stone exterior and lush landscaping',
        seoTitle: 'Lake Bonavista Estate | Premium Lake Community Renovation',
        seoDesc: 'A complete transformation in Lake Bonavista. This estate home blends traditional stone craftsmanship with modern luxury living.'
    },
    {
        slug: 'marda-loop-heritage',
        imageFile: 'hero_marda_loop_heritage_1769681707623.png',
        alt: 'Restored craftsman heritage home in Marda Loop with large front porch and detailed woodwork',
        seoTitle: 'Marda Loop Heritage Restoration | Character Home Renovation',
        seoDesc: 'Preserving history in Marda Loop. See how we restored this craftsman heritage home while updating it for modern comfort.'
    },
    {
        slug: 'killarney-kitchen',
        imageFile: 'hero_killarney_kitchen_1769681731245.png',
        alt: 'Bright modern kitchen in Killarney with white quartz island and walnut cabinetry',
        seoTitle: 'Killarney Modern Kitchen | Custom Cabinetry & Design',
        seoDesc: 'A chef\'s dream kitchen in Killarney. Featuring custom walnut millwork, a waterfall quartz island, and high-end appliances.'
    }
]

const ASSETS_DIR = join(process.cwd(), '../generated-assets')

async function updateHeroImages() {
    console.log('Starting batch update of hero images and SEO info...')

    for (const project of PROJECTS) {
        try {
            console.log(`\n-----------------------------------`)
            console.log(`Processing project: ${project.slug}`)

            // 1. Fetch Project ID
            const query = `*[_type == "project" && slug.current == "${project.slug}"][0]._id`
            const projectId = await client.fetch(query)

            if (!projectId) {
                console.warn(`❌ Project with slug "${project.slug}" not found. Skipping.`)
                continue
            }
            console.log(`Found Project ID: ${projectId}`)

            // 2. Upload Image
            const imagePath = join(ASSETS_DIR, project.imageFile)
            console.log(`Uploading image from: ${imagePath}`)

            const imageAsset = await client.assets.upload('image', createReadStream(imagePath), {
                filename: project.imageFile
            })
            console.log(`✅ Image uploaded. Asset ID: ${imageAsset._id}`)

            // 3. Patch Document
            console.log(`Patching document...`)
            await client.patch(projectId)
                .set({
                    heroImage: {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: imageAsset._id
                        },
                        alt: project.alt
                    }
                })
                .setIfMissing({
                    seo: {}
                })
                // We set nested fields carefully
                .set({
                    'seo.metaTitle': project.seoTitle,
                    'seo.metaDescription': project.seoDesc,
                    // Use the same hero image for social sharing if not already set preferably, 
                    // but let's just set the main SEO fields for now.
                    // Setting socialImage to heroImage is also a good idea.
                    'seo.socialImage': {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: imageAsset._id
                        }
                    }
                })
                .commit()

            console.log(`✅ Successfully updated ${project.slug} with hero image and SEO info.`)

        } catch (error) {
            console.error(`❌ Error processing ${project.slug}:`, error)
        }
    }

    console.log('\nBatch update completed.')
}

updateHeroImages()

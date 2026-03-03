import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const client = createClient({
    projectId: 'yoxfbvg1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN,
})

const IMG_PATH = '/Users/borui/.gemini/antigravity/brain/bd628a35-b818-42f2-9b1d-48981585c0f8/calgary_community_street_1769819524471.png'

async function uploadHeaderImage() {
    try {
        console.log(`Uploading header image...`)
        const asset = await client.assets.upload('image', createReadStream(IMG_PATH), {
            filename: 'calgary_community_street.png'
        })
        console.log(`Uploaded header image: ${asset._id}`)

        // Optional: Update communities without cover images ???
        // For now just logging the ID is enough as per task
    } catch (error) {
        console.error(`Failed to upload header image:`, error)
    }
}

uploadHeaderImage()

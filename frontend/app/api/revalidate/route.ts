import { type NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<{
            _type: string
            slug?: { current: string }
        }>(req, process.env.SANITY_REVALIDATE_SECRET)

        if (!isValidSignature) {
            return new Response('Invalid signature', { status: 401 })
        }

        if (!body?._type) {
            return new Response('Bad Request', { status: 400 })
        }

        console.log('Revalidating type:', body._type)

        // Revalidate paths based on content type
        switch (body._type) {
            case 'project':
                revalidatePath('/', 'page')
                revalidatePath('/portfolio', 'page')
                if (body.slug?.current) {
                    revalidatePath(`/project/${body.slug.current}`, 'page')
                }
                break
            case 'service':
                revalidatePath('/', 'page')
                revalidatePath('/services', 'page')
                if (body.slug?.current) {
                    revalidatePath(`/services/${body.slug.current}`, 'page')
                }
                break
            case 'community':
                revalidatePath('/', 'page')
                revalidatePath('/communities', 'page')
                if (body.slug?.current) {
                    revalidatePath(`/communities/${body.slug.current}`, 'page')
                }
                break
            case 'post':
                revalidatePath('/', 'page')
                revalidatePath('/blog', 'page')
                if (body.slug?.current) {
                    revalidatePath(`/blog/${body.slug.current}`, 'page')
                }
                break
            case 'homePage':
                revalidatePath('/', 'page')
                break
            case 'aboutPage':
                revalidatePath('/about', 'page')
                break
            case 'contactPage':
                revalidatePath('/contact', 'page')
                break
            case 'siteSettings':
                revalidatePath('/', 'layout') // Revalidate everything if settings change
                break
            default:
                // Unknown type, just revalidate home
                revalidatePath('/', 'page')
        }

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        })
    } catch (err: unknown) {
        console.error(err)
        return new Response(err instanceof Error ? err.message : 'Unknown error', { status: 500 })
    }
}

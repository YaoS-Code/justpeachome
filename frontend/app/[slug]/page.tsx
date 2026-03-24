import { Metadata } from 'next'
import { getLegalPageBySlug } from '@/lib/sanity'
import { PortableText } from '@/components/portable-text'
import { notFound } from 'next/navigation'

export const revalidate = 60
export const runtime = 'edge'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const data = await getLegalPageBySlug(slug)
    if (!data) return {}
    return {
        title: `${data.seo?.title || data.title} | JUST PEAC HOMES`,
        description: data.seo?.description,
        alternates: {
            canonical: `/${slug}`
        },
    }
}

export default async function LegalPage({ params }: PageProps) {
    const { slug } = await params
    const data = await getLegalPageBySlug(slug)

    if (!data) {
        notFound()
    }

    return (
        <div className="bg-background-warm min-h-screen pt-32 pb-24 text-primary">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-olive mb-12 border-b border-border-light pb-6">
                    {data.title}
                </h1>
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-olive prose-p:text-secondary">
                    <PortableText value={data.content} />
                </div>
            </div>
        </div>
    )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { getCommunities, getProjects, type Community } from '@/lib/sanity'
import SanityImage from '@/components/sanity-image'
import ProjectGallery from '@/components/project-gallery'

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Communities We Serve | JUST PEAC HOMES',
    description: 'Explore the Calgary neighborhoods where we build custom homes and renovations, including Altadore, Marda Loop, Lake Bonavista, and Killarney.',
    alternates: {
        canonical: '/communities'
    },
}

export default async function CommunitiesPage() {
    const [communities, projects] = await Promise.all([
        getCommunities(),
        getProjects()
    ])

    // Structured Data for SEO - CollectionPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://justpeachome.ca/communities#collection",
                "name": "Communities We Serve | JUST PEAC HOMES",
                "description": "Explore the Calgary neighborhoods where we build custom homes and renovations.",
                "url": "https://justpeachome.ca/communities",
                "hasPart": communities.map((community: Community) => ({
                    "@type": "Place",
                    "name": community.title,
                    "description": community.shortDescription,
                    "url": `https://justpeachome.ca/communities/${community.slug}`
                })),
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://justpeachome.ca/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://justpeachome.ca/communities#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://justpeachome.ca/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Communities",
                        "item": "https://justpeachome.ca/communities"
                    }
                ]
            }
        ]
    }

    return (
        <div className="bg-background-warm min-h-screen pt-32 pb-24">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-olive mb-6">
                        Communities We Serve
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto font-body">
                        We specialize in Calgary&apos;s most desirable inner-city and established neighborhoods.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {communities.map((community: Community) => (
                        <div key={community._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-light">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <SanityImage
                                    image={community.coverImage}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{community.title}</h2>
                                <p className="text-secondary mb-8 line-clamp-3">{community.shortDescription}</p>
                                <div className="mt-auto">
                                    <Link
                                        href={`/communities/${community.slug}`} // Assuming this route exists, likely handled by [slug] or needs creation
                                        className="inline-flex items-center gap-2 text-accent-clay font-bold text-sm tracking-widest uppercase group/link"
                                    >
                                        Explore Community
                                        <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Projects Gallery */}
                <div className="mt-24">
                    <ProjectGallery
                        title="Projects in These Communities"
                        subtitle="Explore our work across Calgary's most desirable neighborhoods"
                        projects={projects}
                        maxItems={6}
                    />
                </div>
            </div>
        </div>
    )
}

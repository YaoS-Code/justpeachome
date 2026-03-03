import { Metadata } from 'next'
import Link from 'next/link'
import { getServices, getServicesPageSettings, getProjects, type Service } from '@/lib/sanity'
import SanityImage from '@/components/sanity-image'
import ProjectGallery from '@/components/project-gallery'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getServicesPageSettings()
    return {
        title: `${settings?.seo?.metaTitle || settings?.title || 'Our Services'} | JUST PEAC HOMES`,
        description: settings?.seo?.metaDescription || settings?.description || 'Explore our range of custom home building and renovation services in Calgary.',
        alternates: {
            canonical: '/services'
        },
    }
}

export default async function ServicesPage() {
    const [services, settings, projects] = await Promise.all([
        getServices(),
        getServicesPageSettings(),
        getProjects()
    ])

    // Structured Data for SEO - CollectionPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://justpeachome.ca/services#collection",
                "name": settings?.title || "Our Services | JUST PEAC HOMES",
                "description": settings?.description || "Expert craftsmanship for every aspect of your home transformation.",
                "url": "https://justpeachome.ca/services",
                "hasPart": services.map((service: Service) => ({
                    "@type": "Service",
                    "name": service.title,
                    "description": service.shortDescription,
                    "url": `https://justpeachome.ca/services/${service.slug}`
                })),
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://justpeachome.ca/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://justpeachome.ca/services#breadcrumb",
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
                        "name": "Services",
                        "item": "https://justpeachome.ca/services"
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
                        {settings?.title || 'Our Services'}
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto font-body">
                        {settings?.description || 'Expert craftsmanship for every aspect of your home transformation.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service: Service) => (
                        <div key={service._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-light">
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <SanityImage
                                    image={service.coverImage}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-1">
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{service.title}</h2>
                                <p className="text-secondary mb-8 line-clamp-3">{service.shortDescription}</p>
                                <div className="mt-auto">
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="inline-flex items-center gap-2 text-accent-clay font-bold text-sm tracking-widest uppercase group/link"
                                    >
                                        View Details
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
                        title="See Our Services in Action"
                        subtitle="Real projects showcasing our craftsmanship and expertise"
                        projects={projects}
                        maxItems={6}
                    />
                </div>
            </div>
        </div>
    )
}


import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCommunityBySlug, urlForImage, type Community } from '@/lib/sanity'
import { PortableText } from '@/components/portable-text'
import SanityImage from '@/components/sanity-image'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getCommunity(slug: string): Promise<Community> {
    return getCommunityBySlug(slug)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const community = await getCommunity(slug)

    if (!community) {
        return {
            title: 'Community Not Found',
            description: 'The requested community could not be found.',
        }
    }

    const title = community?.seo?.title || `${community.title} | JUST PEAC HOMES`
    const description = community?.seo?.description || community?.shortDescription || `Discover our custom homes and renovations in ${community.title}.`
    const ogImage = community?.seo?.image?.asset
        ? urlForImage(community.seo.image).width(1200).height(630).url()
        : community?.coverImage?.asset
            ? urlForImage(community.coverImage).width(1200).height(630).url()
            : undefined

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            images: ogImage ? [ogImage] : [],
        },
        alternates: {
            canonical: `/communities/${slug}`,
        },
    }
}

export default async function CommunityPage({ params }: PageProps) {
    const { slug } = await params
    const community = await getCommunity(slug)

    if (!community) {
        notFound()
    }

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Place",
                "@id": `https://justpeachome.ca/communities/${slug}#place`,
                "name": community?.title || '',
                "description": community?.shortDescription || '',
                "url": `https://justpeachome.ca/communities/${slug}`,
                "image": community?.coverImage?.asset ? urlForImage(community.coverImage).url() : undefined,
                "additionalProperty": [
                    ...(community?.characteristics?.walkScore ? [{
                        "@type": "PropertyValue",
                        "name": "Walk Score",
                        "value": community.characteristics.walkScore
                    }] : []),
                    ...(community?.characteristics?.transitAccess ? [{
                        "@type": "PropertyValue",
                        "name": "Transit Access",
                        "value": community.characteristics.transitAccess
                    }] : []),
                    ...(community?.zoningTypes?.map((z: { code: string; description: string }) => ({
                        "@type": "PropertyValue",
                        "name": "Zoning Code",
                        "value": z?.code || '',
                        "description": z?.description || ''
                    })) || [])
                ],
                "amenityFeature": community?.amenities?.map((amenity: string) => ({
                    "@type": "LocationFeatureSpecification",
                    "name": amenity,
                    "value": true
                }))
            },
            {
                "@type": "BreadcrumbList",
                "@id": `https://justpeachome.ca/communities/${slug}#breadcrumb`,
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
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": community?.title || '',
                        "item": `https://justpeachome.ca/communities/${slug}`
                    }
                ]
            }
        ]
    };

    return (
        <main className="min-h-screen bg-background-warm">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gray-900">
                {community?.coverImage?.asset && (
                    <div className="absolute inset-0">
                        <SanityImage
                            image={community.coverImage}
                            fill
                            className="object-cover brightness-75"
                            priority
                            context="mood"
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <span className="block text-accent-clay font-medium tracking-widest uppercase mb-4 animate-fadeIn">
                        Communities We Serve
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-md">
                        {community?.title}
                    </h1>
                    {community?.shortDescription && (
                        <p className="text-lg md:text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed">
                            {community.shortDescription}
                        </p>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Main Content & Zoning */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Intro */}
                        <div>
                            <h2 className="text-3xl font-display font-semibold text-olive mb-6">About {community?.title || 'This Community'}</h2>
                            {community?.content ? (
                                <div className="prose prose-lg prose-p:text-secondary prose-headings:font-display prose-headings:text-olive">
                                    <PortableText value={community.content} />
                                </div>
                            ) : (
                                <p className="text-lg text-secondary leading-relaxed">
                                    {community?.shortDescription || `We specialize in custom homes and renovations in ${community?.title || 'this area'}.`}
                                </p>
                            )}
                        </div>

                        {/* Zoning Section */}
                        {community?.zoningTypes && community.zoningTypes.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-display font-semibold text-primary mb-6 flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-700 p-2 rounded-lg text-xl">🏗️</span>
                                    Zoning & Development
                                </h3>
                                <div className="grid gap-6">
                                    {community.zoningTypes.map((zoning) => (
                                        <div key={zoning?.code} className="bg-white rounded-xl p-6 border border-border-light shadow-sm">
                                            <div className="flex items-start justify-between mb-3">
                                                <span className="font-bold text-lg text-primary bg-gray-100 px-3 py-1 rounded">
                                                    {zoning?.code || 'N/A'}
                                                </span>
                                                <div className="flex gap-2">
                                                    {zoning?.allowsSecondarysuites && (
                                                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                            + Secondary Suite
                                                        </span>
                                                    )}
                                                    {zoning?.allowsBackyardSuites && (
                                                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                            + Backyard Suite
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-secondary">{zoning?.description || ''}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Investment Potential Section */}
                        {community?.investmentPotential && (
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-display font-semibold mb-6 flex items-center gap-3">
                                    <span className="bg-white/10 p-2 rounded-lg text-xl">📈</span>
                                    Investment Insights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <p className="text-white/60 text-sm uppercase tracking-wide mb-1">Rental Demand</p>
                                        <p className="text-xl font-bold capitalize">{community.investmentPotential.rentalDemand?.replace('-', ' ') || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm uppercase tracking-wide mb-1">Avg. Rental Rate</p>
                                        <p className="text-xl font-bold">{community.investmentPotential.averageRent || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm uppercase tracking-wide mb-1">Appreciation</p>
                                        <p className="text-xl font-bold capitalize">{community.investmentPotential.propertyAppreciation || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Characteristics & Amenities */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Neighborhood Profile */}
                        {community?.characteristics && (
                            <div className="bg-background-cream rounded-2xl p-8 border border-border-medium">
                                <h3 className="text-xl font-display font-bold text-olive mb-6">Neighborhood Profile</h3>
                                <ul className="space-y-4">
                                    {community.characteristics?.era && (
                                        <li className="flex justify-between items-center border-b border-border-light pb-3 last:border-0 last:pb-0">
                                            <span className="text-secondary">Era</span>
                                            <span className="font-semibold text-primary capitalize">{community.characteristics.era}</span>
                                        </li>
                                    )}
                                    {community.characteristics?.walkScore && (
                                        <li className="flex justify-between items-center border-b border-border-light pb-3 last:border-0 last:pb-0">
                                            <span className="text-secondary">Walk Score</span>
                                            <span className={`font-semibold ${community.characteristics.walkScore >= 70 ? 'text-green-600' : 'text-primary'
                                                }`}>
                                                {community.characteristics.walkScore}/100
                                            </span>
                                        </li>
                                    )}
                                    {community.characteristics?.transitAccess && (
                                        <li className="flex justify-between items-center border-b border-border-light pb-3 last:border-0 last:pb-0">
                                            <span className="text-secondary">Transit</span>
                                            <span className="font-semibold text-primary capitalize">{community.characteristics.transitAccess}</span>
                                        </li>
                                    )}
                                    {community.characteristics?.proximityToDowntown && (
                                        <li className="flex justify-between items-center border-b border-border-light pb-3 last:border-0 last:pb-0">
                                            <span className="text-secondary">Downtown</span>
                                            <span className="font-semibold text-primary">{community.characteristics.proximityToDowntown}</span>
                                        </li>
                                    )}
                                    {community.characteristics?.lotSizes && (
                                        <li className="border-b border-border-light pb-3 last:border-0 last:pb-0">
                                            <span className="block text-secondary mb-1">Typical Lots</span>
                                            <span className="font-semibold text-primary text-sm">{community.characteristics.lotSizes}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {/* Amenities */}
                        {community?.amenities && community.amenities.length > 0 && (
                            <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
                                <h3 className="text-xl font-display font-bold text-olive mb-6">Local Amenities</h3>
                                <ul className="space-y-3">
                                    {community.amenities.map((amenity, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-accent-clay mt-1">✓</span>
                                            <span className="text-secondary">{amenity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Box */}
                        <div className="bg-accent-clay/10 rounded-2xl p-8 text-center">
                            <h3 className="text-lg font-bold text-primary mb-3">Building in {community?.title || 'This Community'}?</h3>
                            <p className="text-sm text-secondary mb-6">We allow for free consultations to discuss zoning and potential.</p>
                            <Link
                                href="/contact"
                                className="inline-block w-full bg-accent-clay text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-clay-dark transition-colors"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section (Bottom) */}
            <section className="bg-white py-20 px-6 border-t border-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-olive mb-6">
                        Ready to Start?
                    </h2>
                    <p className="text-lg text-secondary mb-10 max-w-2xl mx-auto">
                        Whether you&apos;re looking to build a new custom home or renovate your existing property in {community?.title || 'this community'}, we understand the unique character and zoning of this community.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-accent-clay text-white font-medium py-4 px-8 rounded-lg hover:bg-accent-clay-dark hover:text-white transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                    >
                        Discuss Your Project
                    </Link>
                </div>
            </section>
        </main>
    )
}

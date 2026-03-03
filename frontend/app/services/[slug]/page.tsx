

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client, urlForImage, type Service } from '@/lib/sanity'
import { PortableText } from '@/components/portable-text'
import Navigation from '@/components/navigation'
import { getServices } from '@/lib/sanity'
import ServiceFeatures from '@/components/service-features'
import ServiceGallery from '@/components/service-gallery'
import ServiceFAQ from '@/components/service-faq'
import HeroSplit from '@/components/hero-split'
import ServiceProcess from '@/components/service-process'
import SanityImage from '@/components/sanity-image'

// Enable ISR

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

// Fetch single service data
async function getService(slug: string): Promise<Service | null> {
    return client.fetch(
        `*[_type == "service" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      coverImage,
      heroStyle,
      splitHero {
        left {
          image,
          headline,
          subheadline,
          ctaText,
          ctaLink
        },
        right {
          image,
          headline,
          subheadline,
          ctaText,
          ctaLink
        }
      },
      content,
      features,
      process,
      gallery,
      faqs,
      seo {
        metaTitle,
        metaDescription,
        socialImage
      }
    }`,
        { slug }
    )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const service = await getService(slug)

    if (!service) {
        return {
            title: 'Service Not Found',
            description: 'The requested service could not be found.',
        }
    }

    const title = service.seo?.metaTitle || `${service.title} | JUST PEAC HOMES`
    const description = service.seo?.metaDescription || service.shortDescription || `Learn more about our ${service.title} services.`
    const ogImage = service.seo?.socialImage
        ? urlForImage(service.seo.socialImage).width(1200).height(630).url()
        : service.coverImage
            ? urlForImage(service.coverImage).width(1200).height(630).url()
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
            canonical: `/services/${slug}`,
        },
    }
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params

    // Parallel fetch: Service data + Menu data
    const [service, allServices] = await Promise.all([
        getService(slug),
        getServices()
    ])

    if (!service) {
        notFound()
    }

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": `https://justpeachome.ca/services/${slug}#service`,
                "name": service.title,
                "description": service.seo?.metaDescription || service.shortDescription,
                "provider": {
                    "@type": "LocalBusiness",
                    "@id": "https://justpeachome.ca/#organization"
                },
                "areaServed": {
                    "@type": "City",
                    "name": "Calgary"
                },
                "image": service.coverImage?.asset ? urlForImage(service.coverImage).url() : undefined,
                "url": `https://justpeachome.ca/services/${slug}`
            },
            {
                "@type": "BreadcrumbList",
                "@id": `https://justpeachome.ca/services/${slug}#breadcrumb`,
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
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": service.seo?.breadcrumbTitle || service.title,
                        "item": `https://justpeachome.ca/services/${slug}`
                    }
                ]
            },
            // FAQ Schema if FAQs exist
            ...(service.faqs && service.faqs.length > 0 ? [{
                "@type": "FAQPage",
                "mainEntity": service.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }] : [])
        ],
        "keywords": [
            ...(service.tags || []),
            ...(service.seo?.keywords || [])
        ].join(', ')
    };

    return (
        <main className="min-h-screen bg-warm">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navigation services={allServices} />

            {/* Hero Section */}
            {service.heroStyle === 'split' && service.splitHero ? (
                <HeroSplit splitHero={service.splitHero} />
            ) : (
                <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gray-900">
                    {service.coverImage?.asset && (
                        <div className="absolute inset-0">
                            <SanityImage
                                image={service.coverImage}
                                fill
                                className="object-cover brightness-75"
                                priority
                            />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 drop-shadow-md">
                            {service.title}
                        </h1>
                        {service.shortDescription && (
                            <p className="text-lg md:text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed">
                                {service.shortDescription}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Features/Benefits Section */}
            {service.features && service.features.length > 0 && (
                <ServiceFeatures features={service.features} />
            )}

            {/* Main Content Section */}
            <section className="py-16 md:py-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-accent-clay font-bold tracking-wider text-sm uppercase">Overview</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-olive mt-2">
                            About This Service
                        </h2>
                    </div>
                    {service.content ? (
                        <div className="prose prose-lg prose-p:text-primary prose-headings:font-display prose-headings:text-olive">
                            <PortableText value={service.content} />
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                            <p className="text-secondary italic">Detailed content coming soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Section */}
            {service.gallery && service.gallery.length > 0 && (
                <ServiceGallery images={service.gallery} />
            )}

            {/* FAQ Section */}
            {service.faqs && service.faqs.length > 0 && (
                <ServiceFAQ faqs={service.faqs} />
            )}

            {/* Process Section - For Consultation Services */}
            {service.process && service.process.length > 0 && (
                <ServiceProcess steps={service.process} />
            )}

            {/* CTA Section */}
            <section className="bg-background-warm py-20 px-6 border-t border-border-light">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-semibold text-olive mb-6">
                        Ready to Start Your {service.title}?
                    </h2>
                    <p className="text-lg text-secondary mb-10 max-w-2xl mx-auto">
                        Book a free consultation to discuss your vision and see how we can bring organic modern design to your business environment.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-accent-clay text-white font-medium py-4 px-8 rounded-lg hover:bg-accent-clay-dark hover:text-white transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                    >
                        {service.slug === 'commercial-renovations' ? 'Request a Project Estimate' : 'Get a Free Consultation'}
                    </Link>
                </div>
            </section>

            {/* Footer should be in global layout, but if not, need to ensure it appears */}
        </main>
    )
}

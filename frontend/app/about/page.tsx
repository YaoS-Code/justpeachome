
import Link from 'next/link'
import { getAboutPage, getProjects, getProcessSteps } from '@/lib/sanity'
import SanityImage from '@/components/sanity-image'
import { PortableText } from '@portabletext/react'
import FAQSection from '@/components/faq-section'
import ProjectGallery from '@/components/project-gallery'
import ProcessSection from '@/components/process-section'

export const revalidate = 3600  // 1 hour

export async function generateMetadata() {
    const data = await getAboutPage()
    return {
        title: `${data?.seo?.metaTitle || data?.title || 'About Us'} | JUST PEAC HOMES`,
        description: data?.seo?.metaDescription || 'Learn about Calgary\'s premier custom home builder.',
        alternates: {
            canonical: '/about'
        }
    }
}

export default async function AboutPage() {
    const [data, projects, processSteps] = await Promise.all([
        getAboutPage(),
        getProjects(),
        getProcessSteps()
    ])

    if (!data) return null

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://justpeachome.ca/about#webpage",
                "name": data?.title || 'About Us',
                "description": data?.seo?.metaDescription,
                "mainEntity": {
                    "@type": "Organization",
                    "@id": "https://justpeachome.ca/#organization",
                    "name": "JUST PEAC HOMES",
                    "description": "Calgary's premier custom home builder and renovation company"
                },
                "url": "https://justpeachome.ca/about"
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://justpeachome.ca/about#breadcrumb",
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
                        "name": data?.seo?.breadcrumbTitle || "About",
                        "item": "https://justpeachome.ca/about"
                    }
                ]
            }
        ]
    }

    return (
        <div className="bg-background-warm min-h-screen">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    {data.hero?.backgroundImage ? (
                        <SanityImage
                            image={data.hero.backgroundImage}
                            fill
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-background-cream" />
                    )}
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 z-1" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <span className="block text-white/90 font-medium tracking-widest uppercase mb-4 animate-fadeIn">
                        Our Story
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight text-white shadow-lg drop-shadow-md">
                        {data.hero?.headline}
                    </h1>
                    <p className="text-xl text-white/95 max-w-3xl mx-auto font-body leading-relaxed drop-shadow-sm">
                        {data.hero?.subheadline}
                    </p>
                </div>
            </section>

            {/* Founder's Story Section */}
            {data?.founderStory && (
                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-background-cream/10">
                            {data.founderStory.image ? (
                                <SanityImage
                                    image={data.founderStory.image}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-secondary/30 bg-background-cream/20">
                                    <span className="text-sm uppercase tracking-widest">Heritage & Craftsmanship</span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-4xl font-display font-bold text-olive">
                                {data.founderStory?.title || 'Our Story'}
                            </h2>
                            <div className="space-y-6 text-lg text-secondary leading-relaxed font-body prose prose-lg prose-olive">
                                {data.founderStory?.content && <PortableText value={data.founderStory.content} />}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* The PEAC Philosophy */}
            {data?.philosophy && (
                <section className="bg-background-cream/30 py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-olive mb-4">
                                {data.philosophy?.title || 'Our Philosophy'}
                            </h2>
                            <p className="text-lg text-secondary max-w-2xl mx-auto">
                                {data.philosophy?.subtitle || ''}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {data.philosophy?.items?.map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-surface-stone/50">
                                    <span className="text-5xl font-display font-bold text-accent-clay/20 block mb-4">{item?.letter}</span>
                                    <h3 className="text-2xl font-display font-semibold text-olive mb-3">
                                        {item?.title || ''}
                                    </h3>
                                    <p className="text-secondary leading-relaxed">
                                        {item?.description || ''}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Specialization Section */}
            {data?.specialization && (
                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-olive mb-4">
                            {data.specialization?.title || 'Our Specialization'}
                        </h2>
                        <p className="text-lg text-secondary max-w-3xl mx-auto font-body">
                            {data.specialization?.description || ''}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {data.specialization?.items?.map((service, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="w-12 h-12 rounded-full bg-olive text-white flex-shrink-0 flex items-center justify-center font-display text-xl font-bold">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-semibold text-olive mb-2 group-hover:text-accent-clay transition-colors">
                                        {service?.title || ''}
                                    </h3>
                                    <p className="text-secondary leading-relaxed">
                                        {service?.description || ''}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Our Renovation Process */}
            <ProcessSection steps={processSteps} />

            {/* Featured Projects */}
            <ProjectGallery
                title="Our Featured Work"
                subtitle="See how we've transformed homes across Calgary"
                projects={projects}
                maxItems={3}
            />

            {/* FAQ Section */}
            <FAQSection items={data.faqs} />

            {/* CTA */}
            {data?.cta && (
                <section className="py-24 px-6 text-center bg-white border-t border-surface-stone/20">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-olive mb-8">
                        {data.cta?.headline || 'Ready to Start Your Project?'}
                    </h2>
                    <Link
                        href={data.cta?.buttonLink || '/contact'}
                        className="inline-block bg-accent-clay text-white font-medium py-4 px-10 rounded-lg hover:bg-accent-clay-dark transition-all transform hover:-translate-y-1 shadow-lg"
                    >
                        {data.cta?.buttonText || 'Contact Us'}
                    </Link>
                </section>
            )}

        </div>
    )
}

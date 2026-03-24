
import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import { getContactPage, getSiteSettings, getProjects } from '@/lib/sanity'
import ProjectGallery from '@/components/project-gallery'

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
    const data = await getContactPage()
    return {
        title: `${data?.seo?.metaTitle || data?.title || 'Contact Us'} | JUST PEAC HOMES`,
        description: data?.seo?.metaDescription || 'Get in touch for a free consultation on your custom home or renovation project in Calgary.',
        alternates: {
            canonical: '/contact'
        }
    }
}

export default async function ContactPage() {
    const [data, settings, projects] = await Promise.all([
        getContactPage(),
        getSiteSettings(),
        getProjects()
    ])

    const contact = settings?.contactInfo

    // Structured Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ContactPage",
                "@id": "https://justpeachome.ca/contact#webpage",
                "name": data?.title || "Contact JUST PEAC HOMES",
                "description": data?.seo?.metaDescription,
                "mainEntity": {
                    "@type": "LocalBusiness",
                    "@id": "https://justpeachome.ca/#organization",
                    "telephone": contact?.phone || "+14038508386",
                    "email": contact?.email || "info@justpeachome.ca",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Calgary",
                        "addressRegion": "AB",
                        "addressCountry": "CA"
                    }
                },
                "url": "https://justpeachome.ca/contact"
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://justpeachome.ca/contact#breadcrumb",
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
                        "name": data?.seo?.breadcrumbTitle || "Contact",
                        "item": "https://justpeachome.ca/contact"
                    }
                ]
            }
        ]
    }

    return (
        <div className="bg-background-warm min-h-screen pt-32 pb-24 text-primary">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-olive mb-6">
                        {data?.hero?.headline || 'Get in Touch'}
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto font-body">
                        {data?.hero?.subheadline || "Ready to start your project? We'd love to hear from you."}
                    </p>
                </div>

                {/* Contact Grid (Moved Up) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-display font-semibold text-olive mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-4 text-lg text-secondary">
                                <p>
                                    <strong className="block text-primary text-sm uppercase tracking-wide mb-1">Email</strong>
                                    <a href={`mailto:${contact?.email || 'info@justpeachomes.com'}`} className="hover:text-accent-clay transition-colors">
                                        {contact?.email || 'info@justpeachome.ca'}
                                    </a>
                                </p>
                                <p>
                                    <strong className="block text-primary text-sm uppercase tracking-wide mb-1">Phone</strong>
                                    <a href={`tel:${contact?.phone?.replace(/\D/g, '') || '+14038508386'}`} className="hover:text-accent-clay transition-colors">
                                        {contact?.phone || '(403) 850-8386'}
                                    </a>
                                </p>
                                <p>
                                    <strong className="block text-primary text-sm uppercase tracking-wide mb-1">Office</strong>
                                    <span className="whitespace-pre-line">
                                        {contact?.address || 'Calgary, Alberta\n(By Appointment Only)'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {data?.serviceAreas && (
                            <div>
                                <h2 className="text-2xl font-display font-semibold text-olive mb-6">
                                    {data.serviceAreas?.title || 'Service Areas'}
                                </h2>
                                <p className="text-lg text-secondary leading-relaxed">
                                    {data.serviceAreas?.content || 'We serve Calgary and surrounding areas.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                </div>

                {/* Featured Portfolio (Renamed & Moved Down) */}
                <ProjectGallery
                    title="Recent Portfolio"
                    subtitle="See the quality and craftsmanship we bring to every project"
                    projects={projects}
                    maxItems={3}
                />
            </div>
        </div>
    )
}

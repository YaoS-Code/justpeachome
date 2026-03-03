import { Metadata } from 'next'
import { getProjects, getProjectsPageSettings, type Project } from '@/lib/sanity'
import { Suspense } from 'react'
import ProjectsClient from '@/components/projects-client'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getProjectsPageSettings()
    return {
        title: `Our Portfolio | JUST PEAC HOMES`,
        description: settings?.seo?.metaDescription || settings?.description || 'Explore our portfolio of investment properties and luxury renovations in Calgary.',
        alternates: {
            canonical: '/portfolio'
        },
    }
}

export default async function PortfolioPage() {
    const [projects, settings] = await Promise.all([
        getProjects(),
        getProjectsPageSettings()
    ])

    // Structured Data for SEO - CollectionPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://justpeachome.ca/portfolio#collection",
                "name": "Our Portfolio | JUST PEAC HOMES",
                "description": settings?.description || "A showcase of our investment properties and luxury renovations across Calgary.",
                "url": "https://justpeachome.ca/portfolio",
                "hasPart": projects.map((project: Project) => ({
                    "@type": "CreativeWork",
                    "name": project.title,
                    "description": project.shortDescription,
                    "url": `https://justpeachome.ca/project/${project.slug}`,
                    ...(project.projectCategory && {
                        "additionalType": project.projectCategory === 'investment'
                            ? "InvestmentProperty"
                            : "LuxuryRenovation"
                    })
                })),
                "publisher": {
                    "@type": "Organization",
                    "@id": "https://justpeachome.ca/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://justpeachome.ca/portfolio#breadcrumb",
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
                        "name": "Portfolio",
                        "item": "https://justpeachome.ca/portfolio"
                    }
                ]
            }
        ]
    }

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={<div className="min-h-screen pt-32 pb-24 text-center">Loading Projects...</div>}>
                <ProjectsClient projects={projects} settings={{ ...settings, title: 'Our Portfolio' }} />
            </Suspense>
        </>
    )
}

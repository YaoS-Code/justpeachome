import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { getLegalPages } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://justpeachome.ca'

    // Fetch dynamic routes from Sanity with _updatedAt
    const [services, projects, posts, communities, legalPages] = await Promise.all([
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "service"]{ "slug": slug.current, _updatedAt }`),
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "project"]{ "slug": slug.current, _updatedAt }`),
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`),
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "community"]{ "slug": slug.current, _updatedAt }`),
        getLegalPages()
    ])

    // Use the most recent _updatedAt from all content as the static pages' lastModified
    const allDates = [...services, ...projects, ...posts, ...communities].map(d => new Date(d._updatedAt).getTime())
    const staticLastModified = allDates.length > 0 ? new Date(Math.max(...allDates)) : new Date()

    // Core static routes
    const staticRoutes = [
        '',
        '/portfolio',
        '/services',
        '/communities',
        '/blog',
        '/about',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const serviceRoutes = services.map((s) => ({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified: new Date(s._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const projectRoutes = projects.map((p) => ({
        url: `${baseUrl}/project/${p.slug}`,
        lastModified: new Date(p._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const communityRoutes = communities.map((c) => ({
        url: `${baseUrl}/communities/${c.slug}`,
        lastModified: new Date(c._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const postRoutes = posts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(p._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    const legalRoutes = legalPages.map((l) => ({
        url: `${baseUrl}/${l.slug}`,
        lastModified: new Date(l._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    }))

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...communityRoutes, ...postRoutes, ...legalRoutes]
}

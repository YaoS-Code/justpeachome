import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://justpeachome.ca'

    // Fetch dynamic routes from Sanity with _updatedAt
    const [services, projects, posts, communities] = await Promise.all([
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "service"]{ "slug": slug.current, _updatedAt }`),
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "project"]{ "slug": slug.current, _updatedAt }`),
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "post"]{ "slug": slug.current, _updatedAt }`),
        client.fetch<{ slug: string; _updatedAt: string }[]>(`*[_type == "community"]{ "slug": slug.current, _updatedAt }`)
    ])

    // Core static routes
    const staticRoutes = [
        '',
        '/projects',
        '/services',
        '/communities',
        '/blog',
        '/about',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
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

    return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...communityRoutes, ...postRoutes]
}

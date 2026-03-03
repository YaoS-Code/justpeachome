/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import SanityImage from './sanity-image'
import type { Community } from '@/lib/sanity'

interface CommunityFocusProps {
    title?: string
    description?: string
    communities: Community[]
}

export default function CommunityFocus({
    title = "Communities We Serve",
    description,
    communities = []
}: CommunityFocusProps) {
    // Take first 4 or 6 communities to showcase
    const displayCommunities = communities.slice(0, 6)

    return (
        <section className="py-24 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-clay mb-4">
                            {title}
                        </h2>
                        {description && (
                            <p className="text-lg text-secondary">
                                {description}
                            </p>
                        )}
                    </div>
                    <Link
                        href="/communities"
                        className="text-accent-clay font-semibold hover:underline flex items-center gap-1 group"
                    >
                        View All Neighborhoods
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayCommunities.map((community: any) => (
                        <Link
                            key={community._id}
                            href={`/communities/${community.slug}`}
                            className="relative group h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <SanityImage
                                image={community.coverImage}
                                context="mood"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-2xl font-display font-bold text-white mb-2 transform group-hover:-translate-y-1 transition-transform">
                                    {community.title}
                                </h3>
                                <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    {community.shortDescription}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

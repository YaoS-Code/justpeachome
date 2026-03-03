/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import SanityImage from './sanity-image'
import { format } from 'date-fns'

interface InsightsSectionProps {
    posts: any[]
    title?: string
    description?: string
}

export default function InsightsSection({
    posts = [],
    title = "Latest Insights",
    description = "Explore our latest updates, design tips, and renovation guides."
}: InsightsSectionProps) {
    // Take the 3 most recent posts
    const recentPosts = posts.slice(0, 3)

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-clay mb-4">
                            {title}
                        </h2>
                        <p className="text-secondary text-lg">
                            {description}
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:inline-flex items-center text-accent-clay font-semibold hover:underline group"
                    >
                        Read All Articles
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {recentPosts.map((post) => (
                        <article key={post._id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-border-light hover:shadow-xl transition-all duration-300">
                            <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden">
                                <SanityImage
                                    image={post.mainImage}
                                    context="mood"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                {post.categories?.[0] && (
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-accent-clay tracking-wider uppercase">
                                        {post.categories[0].title}
                                    </span>
                                )}
                            </Link>

                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-muted text-sm mb-4">
                                    {post.publishedAt && (
                                        <time dateTime={post.publishedAt}>
                                            {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                                        </time>
                                    )}
                                    {post.readingTime && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-border-light"></span>
                                            <span>{post.readingTime} min read</span>
                                        </>
                                    )}
                                </div>

                                <h3 className="text-xl font-display font-bold text-primary mb-4 group-hover:text-accent-clay transition-colors line-clamp-2">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-secondary text-sm line-clamp-3 mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6 border-t border-border-light flex items-center justify-between">
                                    <span className="text-xs font-medium text-muted">
                                        By {post.author?.name || 'JUST PEAC'}
                                    </span>
                                    <Link href={`/blog/${post.slug}`} className="text-accent-clay font-bold text-xs uppercase tracking-widest flex items-center gap-1 group/btn">
                                        Read More
                                        <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 text-center md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-8 py-4 bg-background-cream text-primary font-bold rounded-lg hover:bg-border-light transition-colors"
                    >
                        Read All Articles
                    </Link>
                </div>
            </div>
        </section>
    )
}

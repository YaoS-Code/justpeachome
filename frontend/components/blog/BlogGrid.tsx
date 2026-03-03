import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity';

interface BlogGridProps {
    posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    // Featured post is the first one
    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-6 pb-24">
            {/* Featured Post */}
            {featuredPost && (
                <div className="mb-20">
                    <Link href={`/blog/${featuredPost.slug}`} className="group block">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-border-light overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-border-medium rounded-lg">
                            <div className="lg:col-span-7 relative h-[400px] lg:h-[500px] overflow-hidden">
                                {featuredPost.mainImage && (
                                    <Image
                                        src={urlForImage(featuredPost.mainImage).url()}
                                        alt={featuredPost.mainImage.alt || featuredPost.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="lg:col-span-5 p-8 lg:p-12">
                                <div className="flex items-center gap-3 mb-4 text-xs font-medium tracking-wider uppercase text-accent-clay">
                                    {featuredPost.categories?.[0]?.title || 'Journal'}
                                    <span className="w-1 h-1 rounded-full bg-border-dark opacity-30"></span>
                                    {featuredPost.readingTime ? `${featuredPost.readingTime} min read` : 'Read now'}
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-display mb-4 text-primary group-hover:text-accent-clay transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-muted mb-8 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <span className="inline-block text-sm font-medium border-b border-text-primary pb-0.5 group-hover:border-accent-clay group-hover:text-accent-clay transition-colors">
                                    Read Story
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Grid of Remaining Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                {remainingPosts.map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug}`} className="group block">
                        <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden mb-6 rounded-sm bg-background-cream">
                            {post.mainImage && (
                                <Image
                                    src={urlForImage(post.mainImage).url()}
                                    alt={post.mainImage.alt || post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-xs font-medium tracking-wider uppercase text-muted">
                            {post.categories?.[0]?.title}
                            <span className="w-1 h-1 rounded-full bg-border-dark opacity-30"></span>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>

                        <h3 className="text-2xl font-display mb-3 text-primary group-hover:text-accent-clay transition-colors leading-tight">
                            {post.title}
                        </h3>

                        <p className="text-muted text-sm line-clamp-2">
                            {post.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

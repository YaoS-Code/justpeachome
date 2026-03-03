import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getPostsByCategory, urlForImage } from '@/lib/sanity';
import { components } from '@/components/blog/PortableTextComponents';
import { Post } from '@/types/sanity';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.seo?.metaTitle || `${post?.title} | JUST PEAC HOMES Design Journal`;
  const description = post?.seo?.metaDescription || post?.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`
    },
    openGraph: {
      title,
      description,
      images: [
        post?.seo?.socialImage?.asset
          ? urlForImage(post.seo.socialImage).width(1200).height(630).url()
          : post?.mainImage?.asset
            ? urlForImage(post.mainImage).width(1200).height(630).url()
            : ''
      ],
    },
  };
}

export const revalidate = 60; // Revalidate every minute

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts if category exists
  const relatedPosts = post.categories?.[0]?.slug?.current
    ? (await getPostsByCategory(post.categories[0].slug.current))
      .filter((p: { _id: string }) => p._id !== post._id)
      .slice(0, 3)
    : [];

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://justpeachome.ca/blog/${slug}#post`,
        "headline": post?.title || '',
        "description": post?.seo?.metaDescription || post?.excerpt || '',
        "image": post?.mainImage?.asset ? urlForImage(post.mainImage).url() : undefined,
        "author": {
          "@type": "Person",
          "name": post?.author || "JUST PEAC HOMES"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://justpeachome.ca/#organization"
        },
        "datePublished": post?.publishedAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://justpeachome.ca/blog/${slug}`
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://justpeachome.ca/blog/${slug}#breadcrumb`,
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
            "name": "Design Journal",
            "item": "https://justpeachome.ca/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post?.seo?.breadcrumbTitle || post?.title || 'Blog Post',
            "item": `https://justpeachome.ca/blog/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <article className="min-h-screen bg-background-warm selection:bg-accent-taupe selection:text-white pb-24">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Article Header - Centered Layout */}
      <header className="relative w-full pt-20 pb-12 px-6 text-center lg:pt-40 lg:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4 md:mb-6 text-xs md:text-sm font-medium tracking-widest uppercase text-accent-clay">
            {post.categories?.[0]?.title || 'Blog'}
            {post?.readingTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-border-dark opacity-30"></span>
                <span>{post.readingTime} min read</span>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-display font-medium text-primary mb-6 md:mb-8 leading-tight">
            {post?.title}
          </h1>

          <div className="flex items-center justify-center gap-2 text-muted text-xs md:text-sm italic font-display">
            by {post?.author || 'JUST PEAC HOMES'}
            <span className="mx-2">•</span>
            {new Date(post?.publishedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mb-20 md:mb-24">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-sm overflow-hidden shadow-sm">
          {post?.mainImage?.asset && (
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.mainImage?.alt || post?.title || ''}
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[750px] mx-auto px-6 prose prose-lg prose-headings:font-display prose-p:font-light prose-a:text-accent-clay">
        {/* Drop Cap for first paragraph handled via CSS in globals or inline if needed, but Tailwind `first-letter` utility is cleaner */}
        <div className="first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-display first-letter:text-accent-clay first-letter:leading-[0.8]">
          <PortableText value={post.content} components={components} />
        </div>
      </div>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto mt-24 px-6 border-b border-border-light pb-24">
        <div className="bg-background-cream p-12 md:p-16 text-center rounded-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-display mb-4 text-primary">Inspired by this look?</h3>
            <p className="text-secondary mb-8 max-w-lg mx-auto">
              We specialize in bringing organic modern design to life in Calgary homes. Let&apos;s discuss your vision.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-accent-clay text-white px-8 py-4 rounded-md font-medium hover:bg-accent-clay-dark transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5 transform duration-200"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-taupe opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <h3 className="text-2xl md:text-3xl font-display text-primary mb-10 text-center">More from the Journal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related: Post) => (
              <Link key={related._id} href={`/blog/${related.slug?.current || '#'}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4 rounded-sm bg-background-cream">
                  {related.mainImage?.asset && (
                    <Image
                      src={urlForImage(related.mainImage).url()}
                      alt={related.mainImage?.alt || related.title || ''}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2 text-xs font-medium tracking-wider uppercase text-muted">
                  {related.categories?.[0]?.title || 'Blog'}
                  <span className="w-1 h-1 rounded-full bg-border-dark opacity-30"></span>
                  {new Date(related.publishedAt || Date.now()).toLocaleDateString()}
                </div>
                <h4 className="text-xl font-display text-primary group-hover:text-accent-clay transition-colors">
                  {related.title || ''}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <div className="text-center mt-24">
        <Link href="/blog" className="text-muted hover:text-accent-clay transition-colors text-sm uppercase tracking-widest font-medium border-b border-transparent hover:border-accent-clay pb-1">
          ← Back to Journal
        </Link>
      </div>

    </article>
  );
}

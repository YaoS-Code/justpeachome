import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import CategoryFilter from '@/components/blog/CategoryFilter';
import BlogGrid from '@/components/blog/BlogGrid';
import { getPosts, getCategories, getPostsByCategory, getBlogPageSettings } from '@/lib/sanity';

export const revalidate = 60;
export const runtime = 'edge';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogPageSettings()
  return {
    title: `${settings?.seo?.metaTitle || settings?.title || 'The Design Journal'} | JUST PEAC HOMES`,
    description: settings?.seo?.metaDescription || settings?.description || 'Insights on crafting organic modern homes in Calgary. Design trends, renovation guides, and project stories.',
    alternates: {
      canonical: '/blog'
    }
  }
}

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const categorySlug = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;

  const [posts, categories, settings] = await Promise.all([
    categorySlug ? getPostsByCategory(categorySlug) : getPosts(),
    getCategories(),
    getBlogPageSettings()
  ]);

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": settings?.title || "The Design Journal | JUST PEAC HOMES",
    "description": settings?.description,
    "url": "https://justpeachome.ca/blog",
    "publisher": {
      "@type": "Organization",
      "@id": "https://justpeachome.ca/#organization"
    }
  };

  return (
    <main className="min-h-screen bg-background-warm selection:bg-accent-taupe selection:text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero title={settings?.title} description={settings?.description} />

      <div className="relative z-20 -mt-8 md:-mt-12 bg-background-warm rounded-t-3xl border-t border-border-light pt-12">
        <Suspense fallback={<div>Loading filters...</div>}>
          <CategoryFilter categories={categories} />
        </Suspense>

        <Suspense fallback={<div>Loading posts...</div>}>
          {posts.length > 0 ? (
            <BlogGrid posts={posts} />
          ) : (
            <div className="text-center py-20 text-secondary">
              <p className="text-xl font-display">No stories found in this category.</p>
              <Link href="/blog" className="text-accent-clay hover:underline mt-4 inline-block">View all journal entries</Link>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}

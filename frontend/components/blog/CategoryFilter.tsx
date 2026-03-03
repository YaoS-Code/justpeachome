"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Category } from '@/types/sanity';

interface CategoryFilterProps {
    categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category');

    return (
        <div className="w-full mb-12 overflow-x-auto px-6 no-scrollbar md:flex md:justify-center">
            <div className="flex gap-3 md:gap-6 items-center border-b border-border-light pb-4 md:border-none md:pb-0 min-w-max">
                <Link
                    href="/blog"
                    className={`
            relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-medium transition-all duration-300 rounded-full whitespace-nowrap
            ${!currentCategory
                            ? 'bg-accent-taupe text-white shadow-md'
                            : 'text-secondary hover:text-accent-clay hover:bg-background-cream'}
          `}
                    style={{
                        color: !currentCategory ? 'var(--text-white)' : undefined
                    }}
                >
                    All Stories
                </Link>

                {categories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/blog?category=${category.slug.current}`}
                        className={`
              relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-base font-medium transition-all duration-300 rounded-full whitespace-nowrap
              ${currentCategory === category.slug.current
                                ? 'bg-accent-taupe text-white shadow-md'
                                : 'text-secondary hover:text-accent-clay hover:bg-background-cream'}
            `}
                        style={{
                            color: currentCategory === category.slug.current ? 'var(--text-white)' : undefined
                        }}
                    >
                        {category.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

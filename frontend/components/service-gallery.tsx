'use client'

import SanityImage from './sanity-image'
import type { AccessibleImage } from '@/lib/sanity'

interface ServiceGalleryProps {
    images?: AccessibleImage[]
}

export default function ServiceGallery({ images = [] }: ServiceGalleryProps) {
    if (!images || images.length === 0) return null

    // Simple display of all passed images
    const filteredImages = images



    return (
        <section className="py-24 bg-white border-t border-border-light">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-olive mb-4">
                        Project Gallery
                    </h2>
                    <p className="text-secondary max-w-2xl mx-auto">
                        Explore our recent work and craftsmanship.
                    </p>
                </div>

                {/* Filter Tabs Removed for General Service Gallery context */}
                {/* To re-enable, we should pass categories as props rather than hardcoding residential types */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image._key || index}
                            className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background-cream group"
                        >
                            <SanityImage
                                image={image}
                                context="product"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-secondary italic">No images found for this category yet.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

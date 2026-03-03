'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryImage {
    _key: string
    url?: string
    alt?: string
}

interface ProjectGalleryGridProps {
    images: GalleryImage[]
}

export default function ProjectGalleryGrid({ images }: ProjectGalleryGridProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

    // Handle body scroll lock/unlock when lightbox opens/closes
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [selectedImageIndex])

    if (!images || images.length === 0) return null

    // Filter out images without URLs
    const validImages = images.filter(img => img.url)

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index)
    }

    const closeLightbox = () => {
        setSelectedImageIndex(null)
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedImageIndex === null) return
        setSelectedImageIndex((selectedImageIndex + 1) % validImages.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (selectedImageIndex === null) return
        setSelectedImageIndex((selectedImageIndex - 1 + validImages.length) % validImages.length)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
                {validImages.map((image, idx) => (
                    <div
                        key={image._key || idx}
                        className={`
              relative group cursor-zoom-in overflow-hidden rounded-xl bg-background-cream
              ${idx % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              ${idx % 5 === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
            `}
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            src={image.url!}
                            alt={image.alt || `Gallery image ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white p-2 rounded-full backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImageIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
                        onClick={closeLightbox}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 hidden md:block"
                        onClick={prevImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] aspect-[4/3] md:aspect-[16/9]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={validImages[selectedImageIndex].url!}
                            alt={validImages[selectedImageIndex].alt || 'Gallery image'}
                            fill
                            className="object-contain"
                            priority
                            sizes="90vw"
                        />
                    </div>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 hidden md:block"
                        onClick={nextImage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
                        {selectedImageIndex + 1} / {validImages.length}
                    </div>
                </div>
            )}
        </>
    )
}

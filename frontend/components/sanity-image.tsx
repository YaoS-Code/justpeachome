/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

interface SanityImageProps {
    image: any
    context?: 'product' | 'mood' | 'diagram' | 'ui' | 'decorative'
    className?: string
    width?: number
    height?: number
    fill?: boolean
    sizes?: string
    priority?: boolean
}

export default function SanityImage({
    image,
    context = 'mood',
    className = '',
    width,
    height,
    fill = false,
    sizes,
    priority = false
}: SanityImageProps) {
    // Robust check for image asset
    if (!image || !image.asset) {
        console.warn('[SanityImage] Missing image or image asset:', image);
        return null;
    }

    // Helper to build optimized URL
    const getOptimizedUrl = (builder: any) => {
        try {
            let result = builder;
            if (width) result = result.width(width);
            if (height) result = result.height(height);

            // If it's a fill image and no width is provided, cap it for performance
            if (fill && !width) {
                result = result.width(2000); // 2K cap for safety
            }

            return result.url();
        } catch (error) {
            console.error('[SanityImage] Error generating URL:', error);
            return null;
        }
    }

    const imageUrl = getOptimizedUrl(urlForImage(image));

    if (!imageUrl) {
        console.error('[SanityImage] Failed to generate URL for image:', image);
        return null;
    }

    console.log('[SanityImage] Generated URL for', image.alt || 'no-alt', ':', imageUrl);


    // 1. If decorative, hide from AI/Screen Readers
    if (context === 'decorative') {
        return (
            <Image
                src={imageUrl}
                alt=""
                aria-hidden="true"
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                className={className}
                sizes={sizes || (fill ? "100vw" : undefined)}
                priority={priority}
            />
        )
    }

    // 2. Semantic Alt Text (Guidelines)
    // Logic: image.alt (Sanity) > context fallback
    const altText = image.alt || `Image representing ${context}`

    const baseImage = (
        <Image
            src={imageUrl}
            alt={altText}
            width={!fill ? (width || 800) : undefined}
            height={!fill ? (height || 600) : undefined}
            fill={fill}
            className={`${className} ${fill ? 'object-cover' : ''}`}
            sizes={sizes || (fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined)}
            priority={priority}
        />
    )

    // 3. Caption support for Semantic Weight
    if (image.caption) {
        return (
            <figure className="group">
                {baseImage}
                <figcaption className="mt-2 text-sm text-muted italic group-hover:text-secondary transition-colors">
                    {image.caption}
                </figcaption>
            </figure>
        )
    }

    return baseImage
}

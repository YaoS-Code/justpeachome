import React from 'react';
import Image from 'next/image';
import { PortableTextComponents } from '@portabletext/react';
import { urlForImage } from '@/lib/sanity';
import { GalleryBlock, TipBoxBlock, ProductMentionBlock, BeforeAfterBlock, SanityImage } from '@/types/sanity';

export const components: PortableTextComponents = {
    types: {
        image: ({ value }: { value: SanityImage }) => {
            // Check for either _ref (unexpanded) or _id (expanded)
            if (!value?.asset?._ref && !value?.asset?._id) {
                return null;
            }
            return (
                <figure className="my-10 relative">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-background-cream">
                        <Image
                            src={urlForImage(value).url()}
                            alt={value.alt || 'Blog image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="mt-3 text-center text-sm text-muted italic font-display">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
        gallery: ({ value }: { value: GalleryBlock }) => {
            const { images, layout } = value;
            if (!images || images.length === 0) return null;

            let gridClass = 'grid-cols-1 md:grid-cols-2';
            if (layout === 'three-cols') gridClass = 'grid-cols-1 md:grid-cols-3';
            if (layout === 'masonry') gridClass = 'columns-1 md:columns-2 lg:columns-3 space-y-4';

            if (layout === 'masonry') {
                return (
                    <div className={`my-12 gap-4 ${gridClass}`}>
                        {images.map((img, idx) => (
                            <div key={idx} className="break-inside-avoid relative overflow-hidden rounded-sm mb-4">
                                <Image
                                    src={urlForImage(img).url()}
                                    alt={img.alt || `Gallery image ${idx + 1}`}
                                    width={800} // Masonry needs explicit dimensions usually, but width+auto height works in columns
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        ))}
                    </div>
                );
            }

            return (
                <div className={`my-12 grid gap-4 ${gridClass}`}>
                    {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-sm bg-background-cream">
                            <Image
                                src={urlForImage(img).url()}
                                alt={img.alt || `Gallery image ${idx + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    ))}
                </div>
            );
        },
        tipBox: ({ value }: { value: TipBoxBlock }) => {
            const { title, content, type } = value;
            const bgColors = {
                tip: 'bg-background-warm border-l-4 border-accent-taupe',
                warning: 'bg-amber-50 border-l-4 border-amber-400',
                note: 'bg-slate-50 border-l-4 border-slate-300',
            };

            return (
                <div className={`my-8 p-6 ${bgColors[type] || bgColors.tip} rounded-r-md shadow-sm`}>
                    <h4 className="font-display text-xl font-medium mb-2 text-primary flex items-center gap-2">
                        {type === 'tip' && <span>💡</span>}
                        {title}
                    </h4>
                    <p className="text-secondary text-sm md:text-base">{content}</p>
                </div>
            );
        },
        productMention: ({ value }: { value: ProductMentionBlock }) => {
            return (
                <a
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block my-8 group"
                >
                    <div className="border border-border-medium rounded-md p-4 transition-all hover:border-accent-clay hover:shadow-md flex items-center justify-between">
                        <div>
                            <span className="text-xs font-bold tracking-wider text-accent-clay uppercase mb-1 block">Recommended Product</span>
                            <h4 className="text-lg font-medium text-primary group-hover:text-accent-clay transition-colors">{value.name}</h4>
                            {value.description && <p className="text-sm text-muted mt-1">{value.description}</p>}
                        </div>
                        <div className="text-accent-clay group-hover:translate-x-1 transition-transform">
                            →
                        </div>
                    </div>
                </a>
            );
        },
        beforeAfter: ({ value }: { value: BeforeAfterBlock }) => {
            return (
                <div className="my-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-wider rounded-full shadow-sm z-10">BEFORE</span>
                            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                                <Image src={urlForImage(value.beforeImage).url()} alt="Before" fill className="object-cover filter sepia-[.2] grayscale-[.3]" />
                            </div>
                        </div>
                        <div className="relative">
                            <span className="absolute top-4 left-4 bg-accent-clay/90 text-white backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-wider rounded-full shadow-sm z-10">AFTER</span>
                            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
                                <Image src={urlForImage(value.afterImage).url()} alt="After" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                    {value.description && (
                        <p className="text-center text-sm text-muted mt-4 italic">{value.description}</p>
                    )}
                </div>
            );
        }
    },
    block: {
        h2: ({ children }) => <h2 className="text-3xl md:text-4xl mt-12 mb-6 font-display font-medium text-olive">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl md:text-3xl mt-10 mb-4 font-display font-medium text-olive">{children}</h3>,
        normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-secondary font-light">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="my-10 pl-6 border-l-2 border-accent-clay italic text-xl md:text-2xl font-display text-olive leading-normal">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-8 space-y-2 text-secondary">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-8 space-y-2 text-secondary">{children}</ol>,
    },
};

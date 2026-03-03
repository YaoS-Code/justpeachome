import { PortableText as BasePortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

/* eslint-disable @typescript-eslint/no-explicit-any */

const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
                    <Image
                        src={urlForImage(value).url()}
                        alt={value.alt || 'Service Image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>
            )
        },
    },
    block: {
        normal: ({ children }) => <p className="mb-4 text-primary leading-relaxed">{children}</p>,
        h1: ({ children }) => <h1 className="text-4xl font-display font-bold text-olive mt-12 mb-6">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-display font-semibold text-olive mt-10 mb-4">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-display font-semibold text-olive mt-8 mb-4">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent-clay pl-4 italic text-secondary my-6">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="text-primary">{children}</li>,
        number: ({ children }) => <li className="text-primary">{children}</li>,
    },
}

export function PortableText({ value }: { value: any }) {
    return <BasePortableText value={value} components={components} />
}

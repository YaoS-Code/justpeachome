
import Link from 'next/link'
import SanityImage from './sanity-image'
import { getServices, type Service } from '@/lib/sanity'

interface ServicesSectionProps {
    title?: string
    description?: string
}

export default async function ServicesSection({
    title = 'Our Expertise',
    description = 'Comprehensive design and build services tailored to Calgary\'s unique character.'
}: ServicesSectionProps) {
    const services = await getServices()

    // Show up to 8 services
    const displayServices = services.slice(0, 8)

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-olive mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayServices.map((service: Service) => (
                        <Link
                            key={service._id}
                            href={`/services/${service.slug}`}
                            className="group flex flex-col items-center text-center p-6 rounded-xl hover:bg-white transition-colors duration-300"
                        >
                            <div className="relative w-full aspect-[4/3] mb-6 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                                <SanityImage
                                    image={service.coverImage}
                                    context="product"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>

                            {service.serviceCategory === 'commercial' && (
                                <span className="absolute top-4 right-4 bg-accent-clay text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-widest">
                                    Commercial
                                </span>
                            )}

                            <h3 className="text-xl font-display font-semibold text-primary mb-3 group-hover:text-accent-clay transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                                {service.shortDescription}
                            </p>

                            <span className="text-accent-clay font-medium text-sm flex items-center mt-auto">
                                Learn More
                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-8 py-3 border border-accent-clay text-base font-medium rounded-md text-accent-clay hover:bg-accent-clay hover:text-white transition-colors duration-300"
                    >
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    )
}

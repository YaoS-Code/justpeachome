
import { Star } from 'lucide-react'
import type { Testimonial } from '@/lib/sanity'

interface TestimonialsSectionProps {
    testimonials?: Testimonial[]
}

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
    const displayTestimonials = testimonials.slice(0, 3)

    return (
        <section className="py-24 bg-background-warm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-clay mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Real experiences from Calgary homeowners who trusted us with their renovation projects.
                    </p>
                </div>

                {/* Testimonials Grid */}
                {displayTestimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayTestimonials.map((testimonial) => (
                            <div
                                key={testimonial._id}
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                {/* Rating Stars */}
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < (testimonial.rating || 5)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-200 text-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-primary italic mb-6 leading-relaxed">
                                    &quot;{testimonial.quote}&quot;
                                </p>

                                {/* Client Info */}
                                <div className="border-t border-border-light pt-4">
                                    <p className="font-semibold text-primary mb-1">
                                        {testimonial.clientName}
                                    </p>
                                    <p className="text-sm text-secondary">
                                        {testimonial.projectType}
                                        {testimonial.location && ` • ${testimonial.location}`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted">
                        No testimonials yet. Add them in Sanity Studio.
                    </div>
                )}

                {/* Optional: View All Reviews Link */}
                <div className="text-center mt-12">
                    <p className="text-secondary">
                        Our clients are our best advocates.
                    </p>
                </div>
            </div>
        </section>
    )
}

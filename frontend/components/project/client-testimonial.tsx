interface ClientQuote {
    quote?: string
    clientName?: string
    clientRole?: string
}

interface ClientTestimonialProps {
    testimonial: ClientQuote
}

export default function ClientTestimonial({ testimonial }: ClientTestimonialProps) {
    if (!testimonial?.quote) {
        return null
    }

    return (
        <div className="relative bg-gradient-to-br from-olive/5 to-accent-clay/10 rounded-2xl p-8 md:p-12 border-2 border-olive/20 shadow-lg">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-6xl text-olive/20 font-serif">&quot;</div>

            <div className="relative z-10">
                <blockquote className="text-lg md:text-xl text-primary font-light leading-relaxed mb-6 pl-8">
                    {testimonial.quote}
                </blockquote>

                <div className="flex items-center gap-4 pl-8">
                    <div className="w-12 h-12 rounded-full bg-accent-clay text-white flex items-center justify-center font-display font-bold text-lg">
                        {testimonial.clientName?.charAt(0) || '?'}
                    </div>
                    <div>
                        <p className="font-display font-bold text-olive">
                            {testimonial.clientName || 'Client'}
                        </p>
                        {testimonial.clientRole && (
                            <p className="text-sm text-muted">
                                {testimonial.clientRole}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-6 right-6 text-6xl text-olive/20 font-serif rotate-180">&quot;</div>
        </div>
    )
}

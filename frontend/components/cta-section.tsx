import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface CTASectionProps {
    title?: string
    subtitle?: string
    ctaText?: string
    ctaLink?: string
}

export default function CTASection({
    title = "Get Your Free Consultation",
    subtitle = "Ready to transform your home? Contact us today to discuss your vision.",
    ctaText = "Book Now",
    ctaLink = "/contact"
}: CTASectionProps) {
    return (
        <section className="relative py-32 overflow-hidden px-6">
            {/* Premium Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/cta/cta-bg.png"
                    alt="Luxury Interior Background"
                    fill
                    className="object-cover brightness-75"
                    priority
                />
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 md:p-20 text-center shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                        {title}
                    </h2>
                    <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-body leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href={ctaLink}
                            className="w-full sm:w-auto px-12 py-5 bg-accent-clay text-white rounded-lg font-bold text-lg shadow-xl hover:bg-accent-clay-dark hover:text-white hover:shadow-accent-clay/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {ctaText}
                        </Link>
                    </div>

                    {/* Refined Trust Indicators */}
                    <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6 text-white/90 text-sm font-medium tracking-wide">
                        {[
                            "Expert Consultation",
                            "Project Estimate",
                            "Quality Guaranteed"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group">
                                <div className="p-1 rounded-full bg-accent-clay/20 text-accent-clay group-hover:bg-accent-clay group-hover:text-white transition-colors duration-300">
                                    <Check className="w-4 h-4" />
                                </div>
                                <span className="uppercase text-[11px] tracking-[0.2em] font-semibold">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative organic shapes */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-clay/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-taupe/10 rounded-full blur-3xl pointer-events-none" />
        </section>
    )
}

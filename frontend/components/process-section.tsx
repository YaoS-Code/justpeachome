
import Link from 'next/link'
import { MessageSquare, PenTool, FileCheck, Hammer, ClipboardCheck, Home } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ProcessStep } from '@/lib/sanity'

interface ProcessSectionProps {
    title?: string
    subtitle?: string
    steps?: ProcessStep[]
}

const iconMap: Record<string, LucideIcon> = {
    MessageSquare,
    PenTool,
    FileCheck,
    Hammer,
    ClipboardCheck,
    Home
}

export default function ProcessSection({
    title = 'Our Renovation Process',
    subtitle = 'From concept to completion, we guide you through every step of your Calgary home transformation.',
    steps = []
}: ProcessSectionProps) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-clay mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Timeline Container */}
                {steps.length > 0 ? (
                    <div className="relative">
                        {/* Vertical Timeline Line (Desktop) */}
                        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border-light transform -translate-x-1/2" />

                        {/* Steps */}
                        <div className="space-y-12 lg:space-y-16">
                            {steps.map((step, index) => {
                                const IconComponent = iconMap[step.icon] || MessageSquare
                                const isEven = index % 2 === 0

                                return (
                                    <div
                                        key={step._id || index}
                                        className={`relative flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                            }`}
                                    >
                                        {/* Content Card */}
                                        <div className={`flex-1 ${isEven ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'}`}>
                                            <div className="bg-background-warm p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                                                {/* Step Number Badge (Mobile) */}
                                                <div className="lg:hidden w-12 h-12 bg-accent-clay rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto text-white">
                                                    {index + 1}
                                                </div>

                                                <h3 className="text-2xl font-display font-semibold text-primary mb-3">
                                                    {step.title}
                                                </h3>

                                                <p className="text-secondary leading-relaxed mb-4">
                                                    {step.description}
                                                </p>

                                                {/* Highlights */}
                                                {step.highlights && step.highlights.length > 0 && (
                                                    <ul className={`space-y-2 ${isEven ? 'lg:ml-auto lg:mr-0' : 'lg:mr-auto lg:ml-0'} lg:max-w-sm`}>
                                                        {step.highlights.map((highlight, i) => (
                                                            <li key={i} className="flex items-center gap-2 text-sm text-secondary">
                                                                <div className="w-1.5 h-1.5 bg-accent-clay rounded-full flex-shrink-0" />
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>

                                        {/* Center Circle (Desktop) */}
                                        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-accent-clay rounded-full items-center justify-center shadow-lg z-10">
                                            <div className="text-center">
                                                <div className="text-white font-bold text-2xl mb-1">{index + 1}</div>
                                                <IconComponent className="w-6 h-6 mx-auto text-white" strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Spacer for alignment */}
                                        <div className="hidden lg:block flex-1" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted">
                        No process steps defined. Add them in Sanity Studio.
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-secondary mb-6">
                        Ready to start your Calgary renovation journey?
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-4 bg-accent-clay text-white rounded-lg font-semibold hover:bg-accent-clay-dark transition-colors shadow-md hover:shadow-lg"
                    >
                        Schedule Your Free Consultation
                    </Link>
                </div>
            </div>
        </section>
    )
}

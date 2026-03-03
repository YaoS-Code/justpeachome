
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface WhyChooseUsProps {
    title?: string
    items?: Array<{
        icon: string
        title: string
        description: string
    }>
}

export default function WhyChooseUs({
    title = "Why Choose JUST PEAC HOMES",
    items = []
}: WhyChooseUsProps) {
    return (
        <section className="py-24 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-clay mb-4">
                        {title}
                    </h2>
                    <div className="w-24 h-1 bg-accent-clay mx-auto opacity-30"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {items.map((item, index) => {
                        const IconComponent = (Icons as any)[item.icon] as LucideIcon || Icons.CheckCircle

                        return (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <IconComponent className="w-8 h-8 text-accent-clay" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-secondary leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

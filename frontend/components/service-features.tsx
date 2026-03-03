import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'


interface ServiceFeaturesProps {
    features?: Array<{
        title: string
        description: string
        icon: string
    }>
}

export default function ServiceFeatures({ features = [] }: ServiceFeaturesProps) {
    if (!features || features.length === 0) return null

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => {
                        // Dynamic icon loading
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const IconComponent = (Icons as any)[feature.icon] as LucideIcon || Icons.CheckCircle

                        return (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-16 h-16 rounded-full bg-background-warm flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <IconComponent className="w-8 h-8 text-accent-clay" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

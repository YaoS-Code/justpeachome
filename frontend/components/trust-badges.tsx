'use client'

import { ShieldCheck, DollarSign, Lock, Award, CheckCircle, Home } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

interface Badge {
    icon: string
    title: string
    description: string
}

interface TrustBadgesProps {
    enabled?: boolean
    title?: string
    badges?: Badge[]
}

export default function TrustBadges({
    enabled = true,
    title = 'Your Calgary Renovation Experts',
    badges = [
        {
            icon: 'ShieldCheck',
            title: '100% Calgary Code Compliant',
            description: 'All projects meet Alberta Building Code requirements'
        },
        {
            icon: 'DollarSign',
            title: '$10,000 Grant Partner',
            description: 'We help you access government incentives'
        },
        {
            icon: 'Lock',
            title: 'Fixed Price Guarantee',
            description: 'No hidden fees or surprise costs'
        },
        {
            icon: 'Award',
            title: 'Licensed & Insured',
            description: '2-5 year warranty on all work'
        },
    ]
}: TrustBadgesProps) {
    if (!enabled) return null

    // Icon mapping
    const getIcon = (iconName: string) => {
        const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
            ShieldCheck,
            DollarSign,
            Lock,
            Award,
            CheckCircle,
            Home
        }

        // Try to get from map first, fallback to dynamic lookup
        // We can safely index LucideIcons with a string if we know it's a valid key,
        // or provide a fallback. The type assertion is removed by ensuring the lookup
        // is compatible with the expected component type.
        const Icon = iconMap[iconName] || LucideIcons[iconName as keyof typeof LucideIcons] || CheckCircle
        return Icon
    }

    return (
        <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
                        {title}
                    </h2>
                    <div className="w-24 h-1 bg-accent-clay mx-auto rounded-full" />
                </div>

                {/* Badges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {badges.map((badge, index) => {
                        const Icon = getIcon(badge.icon)
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent-clay/30 text-center"
                            >
                                {/* Icon */}
                                <div className="mb-4 flex justify-center">
                                    <div className="w-16 h-16 rounded-full bg-accent-clay/10 flex items-center justify-center group-hover:bg-accent-clay/20 transition-colors">
                                        <Icon className="w-8 h-8 text-accent-clay" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {badge.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {badge.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom Note */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                        Every project is backed by our commitment to quality, compliance, and customer satisfaction.
                        We handle all permits and ensure your renovation meets Calgary&apos;s strict building standards.
                    </p>
                </div>
            </div>
        </section>
    )
}

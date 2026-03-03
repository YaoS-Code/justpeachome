/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUp, Users, Award, CheckCircle } from 'lucide-react'

interface StatItem {
    value: string
    label: string
    icon: string
}

interface StatsBarProps {
    stats?: StatItem[]
}

const defaultStats: StatItem[] = [
    {
        value: '20+',
        label: 'Years Experience',
        icon: 'TrendingUp'
    },
    {
        value: '150+',
        label: 'Projects Completed',
        icon: 'CheckCircle'
    },
    {
        value: '4.9/5',
        label: 'Client Rating',
        icon: 'Award'
    },
    {
        value: '100%',
        label: 'Satisfaction Guarantee',
        icon: 'Users'
    }
]

const iconMap: any = {
    TrendingUp,
    Users,
    Award,
    CheckCircle
}

export default function StatsBar({ stats = defaultStats }: StatsBarProps) {
    // If stats is empty array (from Sanity but no items), use defaults
    const displayStats = stats && stats.length > 0 ? stats : defaultStats

    return (
        <div className="py-16 bg-accent-clay">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {displayStats.map((stat, index) => {
                        const IconComponent = iconMap[stat.icon] || CheckCircle

                        return (
                            <div key={index} className="text-center">
                                {/* Icon */}
                                <div className="flex justify-center mb-3">
                                    <IconComponent className="w-8 h-8 text-white opacity-80" strokeWidth={1.5} />
                                </div>

                                {/* Value */}
                                <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-white">
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="uppercase tracking-wide text-sm font-medium text-white opacity-80">
                                    {stat.label}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

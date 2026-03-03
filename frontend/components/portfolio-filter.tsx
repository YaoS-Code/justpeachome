'use client'

import React from 'react'

export type PortfolioFilter = 'all' | 'investment' | 'backyard' | 'luxury' | 'kitchen'

interface PortfolioFilterProps {
    activeFilter: PortfolioFilter
    onFilterChange: (filter: PortfolioFilter) => void
    counts?: {
        all: number
        investment: number
        backyard: number
        luxury: number
        kitchen: number
    }
}

export default function PortfolioFilter({ activeFilter, onFilterChange, counts }: PortfolioFilterProps) {
    const filters: { value: PortfolioFilter; label: string; description: string }[] = [
        {
            value: 'all',
            label: 'All Projects',
            description: 'View our complete portfolio'
        },
        {
            value: 'investment',
            label: 'Legal Basement Suites',
            description: 'Income-generating secondary suites'
        },
        {
            value: 'backyard',
            label: 'Backyard Garden Suites',
            description: 'Detached laneway homes'
        },
        {
            value: 'luxury',
            label: 'Luxury Home Renovations',
            description: 'Whole-home transformations'
        },
        {
            value: 'kitchen',
            label: 'Kitchen & Bath Design',
            description: 'Premium cabinetry and spa-like retreats'
        }
    ]

    return (
        <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {filters.map((filter) => {
                    const isActive = activeFilter === filter.value
                    const count = counts?.[filter.value]

                    return (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange(filter.value)}
                            className={`
                group relative px-6 py-4 rounded-xl transition-all duration-300
                ${isActive
                                    ? 'bg-accent-clay text-white shadow-lg scale-105'
                                    : 'bg-white text-secondary hover:bg-background-cream border border-border-light'
                                }
              `}
                        >
                            <div className="flex flex-col items-center sm:items-start">
                                <span className={`font-display font-bold text-sm sm:text-base ${isActive ? 'text-white' : 'text-primary'}`}>
                                    {filter.label}
                                </span>
                                <span className={`text-xs mt-1 ${isActive ? 'text-white/90' : 'text-tertiary'}`}>
                                    {filter.description}
                                </span>
                                {count !== undefined && (
                                    <span className={`text-xs mt-1 font-semibold ${isActive ? 'text-white' : 'text-accent-clay'}`}>
                                        {count} {count === 1 ? 'project' : 'projects'}
                                    </span>
                                )}
                            </div>

                            {/* Active indicator */}
                            {isActive && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent-clay rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

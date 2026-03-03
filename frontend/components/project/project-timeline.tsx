'use client'

import { useState } from 'react'

interface TimelinePhase {
    _key?: string
    phase: string
    duration?: string
    description?: string
    date?: string
}

interface ProjectTimelineProps {
    timeline: TimelinePhase[]
}

const phaseIcons: { [key: string]: string } = {
    planning: '📋',
    permits: '📝',
    demolition: '🔨',
    structural: '🏗️',
    mechanical: '⚙️',
    electrical: '⚡',
    plumbing: '🚰',
    framing: '🪜',
    drywall: '🧱',
    finishes: '🎨',
    flooring: '📐',
    cabinetry: '🪵',
    fixtures: '💡',
    completion: '✅',
    inspection: '👁️',
}

function getPhaseIcon(phase: string): string {
    const lowercased = phase.toLowerCase()
    for (const [key, icon] of Object.entries(phaseIcons)) {
        if (lowercased.includes(key)) {
            return icon
        }
    }
    return '📍' // default
}

export default function ProjectTimeline({ timeline }: ProjectTimelineProps) {
    const [expandedPhase, setExpandedPhase] = useState<string | null>(null)

    if (!timeline || timeline.length === 0) {
        return null
    }

    return (
        <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-clay via-olive to-accent-clay opacity-30" />

            <div className="space-y-8">
                {timeline.map((phase, index) => {
                    const isExpanded = expandedPhase === phase._key || expandedPhase === `phase-${index}`
                    const icon = getPhaseIcon(phase.phase)

                    return (
                        <div key={phase._key || index} className="relative pl-16">
                            {/* Timeline Dot/Icon */}
                            <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent-clay to-olive flex items-center justify-center shadow-lg border-4 border-background-warm">
                                <span className="text-2xl">{icon}</span>
                            </div>

                            {/* Phase Card */}
                            <div className="bg-white rounded-xl border-2 border-border-light shadow-sm hover:shadow-md transition-all duration-300">
                                <button
                                    onClick={() => setExpandedPhase(isExpanded ? null : (phase._key || `phase-${index}`))}
                                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-accent-clay rounded-xl"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-display font-bold text-olive mb-1">
                                                {phase.phase}
                                            </h3>
                                            {phase.duration && (
                                                <p className="text-sm font-semibold text-accent-clay">
                                                    Duration: {phase.duration}
                                                </p>
                                            )}
                                            {phase.date && (
                                                <p className="text-xs text-muted mt-1">
                                                    Completed: {new Date(phase.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Duration Badge */}
                                            {phase.duration && (
                                                <span className="px-3 py-1 bg-surface-cream text-olive text-xs font-bold rounded-full">
                                                    {phase.duration}
                                                </span>
                                            )}
                                            {/* Expand Icon */}
                                            <svg
                                                className={`w-5 h-5 text-olive transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Description (Expanded) */}
                                    {isExpanded && phase.description && (
                                        <div className="mt-4 pt-4 border-t border-border-light">
                                            <p className="text-secondary text-sm leading-relaxed">
                                                {phase.description}
                                            </p>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Total Duration Summary */}
            <div className="mt-12 p-6 bg-gradient-to-r from-olive/10 to-accent-clay/10 rounded-xl border-2 border-olive/20">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-muted uppercase tracking-wider">Total Project Duration</p>
                        <p className="text-2xl font-display font-bold text-olive mt-1">
                            {timeline.reduce((total, phase) => {
                                const match = phase.duration?.match(/(\d+)\s*(week|month|day)/i)
                                if (match) {
                                    const num = parseInt(match[1])
                                    const unit = match[2].toLowerCase()
                                    if (unit.startsWith('week')) return total + num
                                    if (unit.startsWith('month')) return total + num * 4
                                    if (unit.startsWith('day')) return total + Math.ceil(num / 7)
                                }
                                return total
                            }, 0)} weeks
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted">Completed in {timeline.length} phases</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

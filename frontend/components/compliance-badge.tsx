interface ComplianceBadgeProps {
    badge: string
    size?: 'sm' | 'md'
}

const badgeConfig: Record<string, { label: string; icon: string; color: string }> = {
    'legal-registered': {
        label: 'Legal Registered',
        icon: '✓',
        color: 'bg-green-100 text-green-800 border-green-300'
    },
    'city-approved': {
        label: 'City Approved',
        icon: '✓',
        color: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    'code-compliant': {
        label: 'Code Compliant',
        icon: '✓',
        color: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    },
    'egress-windows': {
        label: 'Egress Windows',
        icon: '🪟',
        color: 'bg-sky-100 text-sky-800 border-sky-300'
    },
    'fire-separation': {
        label: 'Fire Separation',
        icon: '🛡️',
        color: 'bg-orange-100 text-orange-800 border-orange-300'
    },
    'independent-hvac': {
        label: 'Independent HVAC',
        icon: '❄️',
        color: 'bg-cyan-100 text-cyan-800 border-cyan-300'
    }
}

export default function ComplianceBadge({ badge, size = 'sm' }: ComplianceBadgeProps) {
    const config = badgeConfig[badge]

    if (!config) return null

    const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full border font-semibold ${config.color} ${sizeClasses}`}
            title={config.label}
        >
            <span>{config.icon}</span>
            <span>{config.label}</span>
        </span>
    )
}

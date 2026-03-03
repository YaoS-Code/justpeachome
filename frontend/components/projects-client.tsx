'use client'


import Link from 'next/link'
import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { type Project } from '@/lib/sanity'
import SanityImage from '@/components/sanity-image'
import PortfolioFilter, { type PortfolioFilter as FilterType } from '@/components/portfolio-filter'
import ComplianceBadge from '@/components/compliance-badge'

interface ProjectsClientProps {
    projects: Project[]
    settings: {
        title?: string
        description?: string
    }
}

export default function ProjectsClient({ projects, settings }: ProjectsClientProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Initialize filter from URL directly - Source of Truth
    const activeFilter = (searchParams.get('filter') as FilterType) || 'all'

    // Update URL when filter changes
    const setActiveFilter = (filter: FilterType) => {
        const params = new URLSearchParams(searchParams.toString())
        if (filter === 'all') {
            params.delete('filter')
        } else {
            params.set('filter', filter)
        }
        router.replace(`?${params.toString()}`, { scroll: false })
    }

    // Filter projects based on category - Updated for Phase 11 Granular Categories
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects

        return projects.filter((project) => {
            const category = project.projectCategory || 'both'

            if (activeFilter === 'investment') {
                return category === 'investment' ||
                    category === 'legal-suite' ||
                    category === 'both'
            }
            if (activeFilter === 'backyard') {
                // Check granular category OR backyard tags
                const isBackyardCategory = category === 'backyard-suite'
                const hasBackyardTag = project.tags?.some(tag =>
                    tag.toLowerCase().includes('backyard') ||
                    tag.toLowerCase().includes('laneway') ||
                    tag.toLowerCase().includes('garden') ||
                    tag.toLowerCase().includes('garage suite')
                )
                return isBackyardCategory || hasBackyardTag || category === 'investment' // Fallback for old tagging
            }
            if (activeFilter === 'luxury') {
                return category === 'luxury' ||
                    category === 'luxury-renovation' ||
                    category === 'both'
            }
            if (activeFilter === 'kitchen') {
                return category === 'kitchen-bath' ||
                    project.tags?.some(tag =>
                        tag.toLowerCase().includes('kitchen') ||
                        tag.toLowerCase().includes('bath') ||
                        tag.toLowerCase().includes('bathroom')
                    )
            }

            return true
        })
    }, [projects, activeFilter])

    // Calculate counts for filter tabs
    const filterCounts = useMemo(() => {
        const counts = {
            all: projects.length,
            investment: 0,
            backyard: 0,
            luxury: 0,
            kitchen: 0
        }

        projects.forEach((project) => {
            const category = project.projectCategory || 'both'

            // Investment Count
            if (category === 'investment' || category === 'legal-suite' || category === 'both') {
                counts.investment++
            }

            // Luxury Count
            if (category === 'luxury' || category === 'luxury-renovation' || category === 'both') {
                counts.luxury++
            }

            // Kitchen & Bath Count
            if (category === 'kitchen-bath' || project.tags?.some(tag =>
                tag.toLowerCase().includes('kitchen') ||
                tag.toLowerCase().includes('bath') ||
                tag.toLowerCase().includes('bathroom')
            )) {
                counts.kitchen++
            }

            // Backyard Count
            const isBackyardCategory = category === 'backyard-suite'
            const hasBackyardTag = project.tags?.some(tag =>
                tag.toLowerCase().includes('backyard') ||
                tag.toLowerCase().includes('laneway') ||
                tag.toLowerCase().includes('garden') ||
                tag.toLowerCase().includes('garage suite')
            )
            if (isBackyardCategory || hasBackyardTag || category === 'investment') { // Broad check for backyard
                counts.backyard++
            }
        })

        return counts
    }, [projects])

    return (
        <div className="bg-background-warm min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-olive mb-6">
                        {settings?.title || 'Our Portfolio'}
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto font-body">
                        {settings?.description || 'A showcase of our recent work across Calgary, from investment properties to luxury renovations.'}
                    </p>
                </div>

                {/* Active Filter Indicator */}
                {activeFilter !== 'all' && (
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent-clay/10 border-2 border-accent-clay rounded-xl">
                            <span className="text-sm font-semibold text-secondary uppercase tracking-wide">Viewing:</span>
                            <span className="text-lg font-display font-bold text-primary">
                                {activeFilter === 'investment' && 'Legal Basement Suites'}
                                {activeFilter === 'backyard' && 'Backyard Garden Suites'}
                                {activeFilter === 'luxury' && 'Luxury Home Renovations'}
                                {activeFilter === 'kitchen' && 'Kitchen & Bath Design'}
                            </span>
                            <span className="text-sm text-tertiary">({filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'})</span>
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                <PortfolioFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    counts={filterCounts}
                />

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project: Project) => {
                        const isInvestment = project.projectCategory === 'investment' ||
                            (project.projectCategory === 'both' && (project.rentalIncome || project.roi))

                        return (
                            <div
                                key={project._id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-light flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    {/* Main Cover Image */}
                                    <SanityImage
                                        image={project.coverImage}
                                        fill
                                        className={`object-cover transition-transform duration-700 group-hover:scale-110 ${project.hoverImage ? 'group-hover:opacity-0' : ''}`}
                                    />

                                    {/* Hover/Detail Image - shown on hover if available */}
                                    {project.hoverImage && (
                                        <SanityImage
                                            image={project.hoverImage}
                                            fill
                                            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transition-transform duration-700 group-hover:scale-110"
                                        />
                                    )}

                                    {/* Category Badge Overlay */}
                                    {project.projectCategory && (
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${project.projectCategory === 'investment' || project.projectCategory === 'legal-suite'
                                                    ? 'bg-green-600 text-white'
                                                    : project.projectCategory === 'backyard-suite'
                                                        ? 'bg-emerald-600 text-white'
                                                        : project.projectCategory === 'luxury' || project.projectCategory === 'luxury-renovation'
                                                            ? 'bg-purple-600 text-white'
                                                            : project.projectCategory === 'kitchen-bath'
                                                                ? 'bg-amber-600 text-white'
                                                                : 'bg-blue-600 text-white'
                                                }`}>
                                                {project.projectCategory === 'investment' || project.projectCategory === 'legal-suite'
                                                    ? 'Legal Suite'
                                                    : project.projectCategory === 'backyard-suite'
                                                        ? 'Backyard Suite'
                                                        : project.projectCategory === 'luxury' || project.projectCategory === 'luxury-renovation'
                                                            ? 'Luxury Renovation'
                                                            : project.projectCategory === 'kitchen-bath'
                                                                ? 'Kitchen & Bath'
                                                                : project.projectCategory === 'both'
                                                                    ? 'Multi-Purpose'
                                                                    : 'Premium'}
                                            </span>
                                        </div>
                                    )}

                                    {/* Material Focus Overlay */}
                                    {project.materialFocus && (
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                                                <p className="text-white text-xs font-semibold">{project.materialFocus}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <h2 className="text-2xl font-display font-bold text-primary mb-2">{project.title}</h2>

                                    {project.completionDate && (
                                        <p className="text-sm text-tertiary mb-3">
                                            {new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                        </p>
                                    )}

                                    {/* Investment Metrics */}
                                    {isInvestment && (project.rentalIncome || project.roi) && (
                                        <div className="mb-4 space-y-2">
                                            {project.rentalIncome && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-green-600 font-bold">💰</span>
                                                    <span className="text-secondary">
                                                        <span className="font-semibold text-primary">Rental Income:</span> {project.rentalIncome}
                                                    </span>
                                                </div>
                                            )}
                                            {project.roi && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <span className="text-blue-600 font-bold">📈</span>
                                                    <span className="text-secondary">
                                                        <span className="font-semibold text-primary">ROI:</span> {project.roi}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Compliance Badges */}
                                    {project.complianceBadges && project.complianceBadges.length > 0 && (
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {project.complianceBadges.slice(0, 3).map((badge) => (
                                                <ComplianceBadge key={badge} badge={badge} size="sm" />
                                            ))}
                                            {project.complianceBadges.length > 3 && (
                                                <span className="text-xs text-tertiary">+{project.complianceBadges.length - 3} more</span>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-secondary mb-6 line-clamp-2">{project.shortDescription}</p>

                                    <div className="mt-auto">
                                        <Link
                                            href={`/project/${project.slug}`}
                                            className="inline-flex items-center gap-2 text-accent-clay font-bold text-sm tracking-widest uppercase group/link"
                                        >
                                            Explore Project
                                            <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* No Results Message */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-xl text-secondary">No projects found in this category.</p>
                        <button
                            onClick={() => setActiveFilter('all')}
                            className="mt-4 text-accent-clay font-bold hover:underline"
                        >
                            View All Projects
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

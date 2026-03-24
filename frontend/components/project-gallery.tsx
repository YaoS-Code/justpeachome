'use client'

import Link from 'next/link'
import SanityImage from './sanity-image'
import type { Project } from '@/lib/sanity'

interface ProjectGalleryProps {
    title?: string
    subtitle?: string
    projects: Project[]
    maxItems?: number
    showViewAll?: boolean
}

export default function ProjectGallery({
    title = 'Featured Projects',
    subtitle = 'Explore our latest Calgary home renovations and custom builds',
    projects = [],
    maxItems = 6,
    showViewAll = true
}: ProjectGalleryProps) {
    const displayProjects = projects.slice(0, maxItems)

    if (projects.length === 0) {
        return null
    }

    return (
        <section className="py-24 bg-background-cream">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-accent-clay mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProjects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>

                {/* View All Projects CTA */}
                {showViewAll && (
                    <div className="text-center mt-16">
                        <Link
                            href="/portfolio"
                            className="inline-block px-8 py-4 bg-accent-taupe text-white rounded-lg font-bold transition-all hover:bg-opacity-90 hover:-translate-y-1 shadow-md"
                        >
                            View All Projects
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-light flex flex-col">
            {/* Project Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <SanityImage
                    image={project.coverImage}
                    context="product"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </div>

            {/* Project Info */}
            <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-display font-bold text-primary mb-3">
                    {project.title}
                </h3>

                {project.completionDate && (
                    <p className="text-sm text-muted mb-6 font-medium">
                        {new Date(project.completionDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                        })}
                    </p>
                )}

                {project.shortDescription && (
                    <p className="text-secondary mb-6 line-clamp-2">
                        {project.shortDescription}
                    </p>
                )}

                <div className="mt-auto">
                    <Link
                        href={`/project/${project.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent-clay text-white rounded-lg font-bold text-sm tracking-wide uppercase group/link hover:bg-accent-clay-dark transition-all hover:shadow-md"
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
}

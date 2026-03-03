'use client'

import { useState } from 'react'
import Link from 'next/link'
import SanityImage from './sanity-image'
import type { Project } from '@/lib/sanity'

interface FeaturedProjectsTabsProps {
  title?: string
  subtitle?: string
  useTabs?: boolean
  luxuryTabLabel?: string
  incomeTabLabel?: string
  projects: Project[]
}

export default function FeaturedProjectsTabs({
  title = 'Our Portfolio',
  subtitle = 'Explore our latest Calgary home renovations and custom builds',
  useTabs = true,
  luxuryTabLabel = 'Luxury Living',
  incomeTabLabel = 'Income Suites',
  projects = []
}: FeaturedProjectsTabsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'luxury' | 'income'>('all')

  // Simple filtering based on project title/description keywords
  // In the future, you can add a proper category field to the project schema
  const luxuryProjects = projects.filter(p =>
    p.title?.toLowerCase().includes('custom') ||
    p.title?.toLowerCase().includes('luxury') ||
    p.title?.toLowerCase().includes('kitchen') ||
    p.title?.toLowerCase().includes('bathroom') ||
    p.title?.toLowerCase().includes('renovation')
  )

  const incomeProjects = projects.filter(p =>
    p.title?.toLowerCase().includes('suite') ||
    p.title?.toLowerCase().includes('basement') ||
    p.title?.toLowerCase().includes('rental') ||
    p.title?.toLowerCase().includes('income')
  )

  // If no filtering matches, show all projects in both tabs
  const displayLuxuryProjects = luxuryProjects.length > 0 ? luxuryProjects : projects
  const displayIncomeProjects = incomeProjects.length > 0 ? incomeProjects : projects

  const currentProjects =
    activeTab === 'all' ? projects :
      activeTab === 'luxury' ? displayLuxuryProjects :
        displayIncomeProjects

  if (!useTabs) {
    // Fallback to simple grid without tabs
    return (
      <section className="py-24 bg-background-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-accent-clay mb-4">
              {title}
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <ProjectGrid projects={projects.slice(0, 6)} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-background-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-accent-clay mb-4">
            {title}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-md border border-border-light">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'all'
                ? 'bg-accent-taupe text-white shadow-md'
                : 'text-secondary hover:text-primary-olive'
                }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveTab('luxury')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'luxury'
                ? 'bg-accent-clay text-white shadow-md'
                : 'text-secondary hover:text-primary-olive'
                }`}
            >
              {luxuryTabLabel}
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === 'income'
                ? 'bg-accent-wood text-white shadow-md'
                : 'text-secondary hover:text-accent-wood'
                }`}
            >
              {incomeTabLabel}
            </button>
          </div>
        </div>

        {/* Projects Grid with fade transition */}
        <div className="transition-opacity duration-300">
          <ProjectGrid projects={currentProjects.slice(0, 6)} activeTab={activeTab} />
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-16">
          <Link
            href="/projects"
            className="inline-block px-8 py-4 bg-accent-taupe text-white rounded-lg font-bold transition-all hover:bg-opacity-90 hover:-translate-y-1 shadow-md"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProjectGrid({ projects, activeTab }: { projects: Project[], activeTab?: string }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-border-light">
        <p className="text-muted">
          No projects yet. Please add your first project in Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} activeTab={activeTab} />
      ))}
    </div>
  )
}

function ProjectCard({ project, activeTab }: { project: Project, activeTab?: string }) {
  // Use real data if available, otherwise fall back to estimate for Income tab
  const showRental = activeTab === 'income' || project.rentalIncome
  const rentalValue = project.rentalIncome || (activeTab === 'income' ? '$1,500 - $2,000' : null)

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

        {/* Monthly Rental Potential Badge (Income/Rental Projects) */}
        {showRental && rentalValue && (
          <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg border border-white/20">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-90">Est. Income</p>
            <p className="text-sm font-bold">{rentalValue}</p>
          </div>
        )}

        {/* ROI Badge */}
        {project.roi && (
          <div className="absolute top-4 left-4 bg-accent-clay/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-lg border border-white/20">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-90">Value Add</p>
            <p className="text-sm font-bold">{project.roi}</p>
          </div>
        )}

        {/* Material Focus Overlay (Bottom) */}
        {project.materialFocus && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
            <p className="text-white/90 text-xs font-medium truncate">
              <span className="text-accent-clay font-bold">Specs:</span> {project.materialFocus}
            </p>
          </div>
        )}
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

        {/* Category Badges (replacing strict tab logic with data tags) */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags?.map(tag => (
            <span key={tag} className="inline-block px-2 py-1 bg-background-cream text-secondary text-[10px] font-bold uppercase tracking-wide rounded-md">
              {tag}
            </span>
          ))}
          {!project.tags?.length && activeTab === 'luxury' && (
            <span className="inline-block px-2 py-1 bg-accent-taupe/10 text-accent-taupe text-[10px] font-bold uppercase tracking-wide rounded-md">
              Luxury
            </span>
          )}
          {!project.tags?.length && activeTab === 'income' && (
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide rounded-md">
              Income Suite
            </span>
          )}
        </div>

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


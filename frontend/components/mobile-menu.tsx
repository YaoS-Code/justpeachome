'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import SanityImage from './sanity-image'
import type { Service, Project, Community } from '@/lib/sanity'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    services?: Service[]
    projects?: Project[]
    communities?: Community[]
}

type MenuState = 'main' | 'services' | 'projects' | 'communities'

export default function MobileMenu({
    isOpen,
    onClose,
    services = [],
    projects = [],
    communities = []
}: MobileMenuProps) {
    const [activePanel, setActivePanel] = useState<MenuState>('main')

    // Reset to main panel when menu is closed
    useEffect(() => {
        if (!isOpen) {
            // Delay reset slightly to allow closing animation to finish if needed
            const timer = setTimeout(() => {
                setActivePanel('main')
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    // Prevent background scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    // Helper to render the slide-over transition styles
    const getPanelStyle = (panelName: MenuState) => {
        const isMain = panelName === 'main'

        // Logic:
        // If activePanel is 'main':
        //   - Main panel is visible (0)
        //   - Sub panels are off-screen right (100%)
        //
        // If activePanel is 'projects':
        //   - Main panel is off-screen left (-30%) - parallax effect or completely gone
        //   - Projects panel is visible (0)
        //   - Other sub panels are off-screen right (100%) or hidden

        if (isMain) {
            return {
                transform: activePanel === 'main' ? 'translateX(0)' : 'translateX(-30%)',
                opacity: activePanel === 'main' ? 1 : 0,
                pointerEvents: activePanel === 'main' ? 'auto' : 'none',
            } as React.CSSProperties
        }

        // For sub-panels:
        return {
            transform: activePanel === panelName ? 'translateX(0)' : 'translateX(100%)',
            opacity: activePanel === panelName ? 1 : 0,
            pointerEvents: activePanel === panelName ? 'auto' : 'none',
        } as React.CSSProperties
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-xl">
            {/* Header / Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-border-light bg-white/50 relative z-20">
                <Link href="/" onClick={onClose} className="text-xl font-display font-bold text-olive">
                    JUST PEAC HOMES
                </Link>
                <button
                    onClick={onClose}
                    className="p-2 text-primary hover:text-accent-clay transition-colors"
                    aria-label="Close menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Panels Container */}
            <div className="flex-1 relative overflow-hidden w-full">

                {/* === MAIN PANEL === */}
                <div
                    className="absolute inset-0 p-6 overflow-y-auto transition-all duration-300 ease-in-out"
                    style={getPanelStyle('main')}
                >
                    <nav className="flex flex-col gap-2">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'About', href: '/about' },
                        ].map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                className="py-3 text-2xl font-display font-medium text-primary border-b border-transparent hover:text-accent-clay transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Drill-down Triggers */}
                        <button
                            onClick={() => setActivePanel('projects')}
                            className="flex items-center justify-between py-3 w-full text-left group"
                        >
                            <span className="text-2xl font-display font-medium text-primary group-hover:text-accent-clay transition-colors">
                                Portfolio
                            </span>
                            <svg className="w-6 h-6 text-muted group-hover:text-accent-clay transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setActivePanel('services')}
                            className="flex items-center justify-between py-3 w-full text-left group"
                        >
                            <span className="text-2xl font-display font-medium text-primary group-hover:text-accent-clay transition-colors">
                                Services
                            </span>
                            <svg className="w-6 h-6 text-muted group-hover:text-accent-clay transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <button
                            onClick={() => setActivePanel('communities')}
                            className="flex items-center justify-between py-3 w-full text-left group"
                        >
                            <span className="text-2xl font-display font-medium text-primary group-hover:text-accent-clay transition-colors">
                                Communities
                            </span>
                            <svg className="w-6 h-6 text-muted group-hover:text-accent-clay transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <Link
                            href="/services/commercial-renovations"
                            onClick={onClose}
                            className="py-3 text-2xl font-display font-medium text-primary border-b border-transparent hover:text-accent-clay transition-colors"
                        >
                            Commercial
                        </Link>

                        <Link
                            href="/blog"
                            onClick={onClose}
                            className="py-3 text-2xl font-display font-medium text-primary border-b border-transparent hover:text-accent-clay transition-colors"
                        >
                            Blog
                        </Link>

                        <Link
                            href="/contact"
                            onClick={onClose}
                            className="py-3 text-2xl font-display font-medium text-primary border-b border-transparent hover:text-accent-clay transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="mt-8 pt-8 border-t border-border-light">
                        <Link
                            href="/contact"
                            onClick={onClose}
                            className="block w-full py-4 text-center bg-accent-clay text-white rounded-lg font-medium text-lg hover:bg-accent-clay-dark hover:text-white transition-colors shadow-md"
                        >
                            Free Consultation
                        </Link>
                    </div>
                </div>

                {/* === PROJECTS PANEL === */}
                <div
                    className="absolute inset-0 p-6 overflow-y-auto bg-white transition-all duration-300 ease-in-out"
                    style={getPanelStyle('projects')}
                >
                    <SubPanelHeader title="Our Portfolio" onBack={() => setActivePanel('main')} />
                    <div className="grid gap-6 pb-20">
                        {projects.slice(0, 6).map((project) => (
                            <Link
                                key={project._id}
                                href={`/project/${project.slug}`}
                                onClick={onClose}
                                className="group block"
                            >
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-background-cream mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                                    <SanityImage
                                        image={project.coverImage}
                                        context="product"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 90vw, 400px"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <span className="text-white font-medium text-sm drop-shadow-md">View Project</span>
                                    </div>
                                </div>
                                <h4 className="text-lg font-bold text-primary group-hover:text-accent-clay transition-colors">
                                    {project.title}
                                </h4>
                                {project.shortDescription && (
                                    <p className="text-sm text-muted line-clamp-2 mt-1">
                                        {project.shortDescription}
                                    </p>
                                )}
                            </Link>
                        ))}
                        <Link
                            href="/portfolio"
                            onClick={onClose}
                            className="block w-full py-3 text-center border border-border-dark text-primary rounded-lg font-medium hover:bg-background-warm transition-colors mt-4"
                        >
                            View All Portfolio
                        </Link>
                    </div>
                </div>

                {/* === SERVICES PANEL === */}
                <div
                    className="absolute inset-0 p-6 overflow-y-auto bg-white transition-all duration-300 ease-in-out"
                    style={getPanelStyle('services')}
                >
                    <SubPanelHeader title="Our Services" onBack={() => setActivePanel('main')} />
                    <div className="grid gap-6 pb-20">
                        {services.map((service) => (
                            <Link
                                key={service._id}
                                href={`/services/${service.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-background-warm transition-colors group"
                            >
                                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-background-cream">
                                    <SanityImage
                                        image={service.coverImage}
                                        context="product"
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-primary group-hover:text-accent-clay transition-colors">
                                        {service.title}
                                    </h4>
                                    <p className="text-xs text-muted line-clamp-2 mt-1">
                                        {service.shortDescription}
                                    </p>
                                </div>
                                <svg className="w-5 h-5 text-muted group-hover:text-accent-clay transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                        <Link
                            href="/services"
                            onClick={onClose}
                            className="block w-full py-3 text-center border border-border-dark text-primary rounded-lg font-medium hover:bg-background-warm transition-colors mt-4"
                        >
                            View All Services
                        </Link>
                    </div>
                </div>

                {/* === COMMUNITIES PANEL === */}
                <div
                    className="absolute inset-0 p-6 overflow-y-auto bg-white transition-all duration-300 ease-in-out"
                    style={getPanelStyle('communities')}
                >
                    <SubPanelHeader title="Communities We Serve" onBack={() => setActivePanel('main')} />
                    <div className="grid grid-cols-2 gap-4 pb-20">
                        {communities.map((community) => (
                            <Link
                                key={community._id}
                                href={`/communities/${community.slug}`}
                                onClick={onClose}
                                className="group block text-center"
                            >
                                <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-transparent group-hover:border-accent-clay transition-colors mb-3">
                                    <SanityImage
                                        image={community.coverImage}
                                        context="mood"
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 768px) 50vw, 200px"
                                    />
                                </div>
                                <h4 className="text-sm font-bold text-primary group-hover:text-accent-clay transition-colors">
                                    {community.title}
                                </h4>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

const SubPanelHeader = ({ title, onBack }: { title: string, onBack: () => void }) => (
    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border-light">
        <button
            onClick={onBack}
            className="p-2 -ml-2 text-primary hover:text-accent-clay transition-colors"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <h3 className="text-xl font-display font-semibold text-olive">
            {title}
        </h3>
    </div>
)

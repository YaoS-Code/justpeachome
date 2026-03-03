'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Megamenu from './megamenu'
import MobileMenu from './mobile-menu'
import { megamenuData as staticMegamenuData } from '@/lib/menu-data'
import type { Service, Project, Community } from '@/lib/sanity'

interface NavLink {
  name: string
  href: string
  hasMegamenu?: boolean
  megamenuKey?: string
}

interface NavigationProps {
  services?: Service[]
  projects?: Project[]
  communities?: Community[]
}

export default function Navigation({ services, projects, communities }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null)
  const pathname = usePathname()

  // Merge static data with dynamic services if available
  const megamenuData = {
    ...staticMegamenuData,
    ...(services && services.length > 0 ? {
      services: {
        title: 'Our Services',
        items: services.map(service => ({
          title: service.title,
          href: `/services/${service.slug}`,
          image: service.coverImage,
          description: service.shortDescription || ''
        }))
      }
    } : {}),
    ...(projects && projects.length > 0 ? {
      projects: {
        title: 'Portfolio by Usage',
        items: [
          {
            title: 'Legal Basement Suites',
            href: '/portfolio?filter=investment',
            image: { asset: { _ref: 'image-7b76f14fd03abac4da4372cb89d0fd18287c741b-1024x1024-jpg' } }, // Legal Suite Living Room
            description: 'Income-generating secondary suites (Registered & Compliant).'
          },
          {
            title: 'Backyard Garden Suites',
            href: '/portfolio?filter=backyard',
            image: { asset: { _ref: 'image-3266a883864eb13683473d172f6953e40ffdb749-1024x1024-jpg' } }, // Backyard Suite Exterior
            description: 'Detached laneway homes for family or rental income.'
          },
          {
            title: 'Luxury Home Renovations',
            href: '/portfolio?filter=luxury',
            image: projects[0]?.coverImage || { asset: { _ref: 'image-ddaae534a29b9f527a7291028239c7bbd2e274b7-1024x1024-jpg' } },
            description: 'Whole-home transformations and custom interiors.'
          },
          {
            title: 'Kitchen & Bath Design',
            href: '/portfolio?filter=kitchen',
            image: { asset: { _ref: 'image-e52cfcbe150eac66b2c8870bbad3251e7959ec89-1024x1024-jpg' } }, // Compact Bathroom
            description: 'Premium cabinetry, stone, and spa-like retreats.'
          }
        ]
      }
    } : {}),
    ...(communities && communities.length > 0 ? {
      communities: {
        title: 'Communities We Serve',
        items: communities.map(community => ({
          title: community.title,
          href: `/communities/${community.slug}`,
          image: community.coverImage,
          description: community.shortDescription || ''
        }))
      }
    } : {})
  }

  // Determine if header should be transparent
  const isHomePage = pathname === '/'
  const isTransparent = isHomePage && !isScrolled

  // Handle scroll effect for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line
    setIsOpen(false)
    setActiveMegamenu(null)
    document.body.style.overflow = 'unset'
  }, [pathname])

  const toggleMenu = () => {
    const newState = !isOpen
    setIsOpen(newState)
    // MobileMenu handles its own body scroll lock now, so we don't need to do it here for the mobile menu strictly,
    // but keeping it managed by the child component is cleaner or we can just toggle state here.
    // The MobileMenu component has a useEffect to lock body scroll when isOpen is true.
  }

  // Handle megamenu hover
  const handleMegamenuEnter = (key: string) => {
    setActiveMegamenu(key)
  }

  const handleMegamenuLeave = () => {
    setActiveMegamenu(null)
  }

  // Dynamic Styles based on transparency state
  const textColor = isTransparent ? 'var(--text-white)' : 'var(--text-primary)'
  const logoColor = isTransparent ? 'var(--text-white)' : 'var(--text-olive)'
  const hoverColor = 'var(--accent-clay)'

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasMegamenu: true, megamenuKey: 'services' },
    { name: 'Portfolio', href: '/portfolio', hasMegamenu: true, megamenuKey: 'projects' },
    { name: 'Communities', href: '/communities', hasMegamenu: true, megamenuKey: 'communities' },
    { name: 'Commercial', href: '/services/commercial-renovations' },
    { name: 'Journal', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  // Determine active category for the hoisted megamenu
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeCategory = activeMegamenu && (megamenuData as any)[activeMegamenu]

  return (
    <>
      {/* Sticky Navigation */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: isTransparent
            ? 'transparent'
            : 'var(--nav-bg-scrolled)',
          backdropFilter: isTransparent ? 'none' : 'blur(12px)',
          boxShadow: isTransparent ? 'none' : 'var(--nav-shadow)',
          transition: 'all 0.3s ease',
          borderBottom: isTransparent ? 'none' : '1px solid var(--border-light)',
          paddingTop: isTransparent ? '1rem' : '0', // Subtle padding shift for effect
        }}
        onMouseLeave={handleMegamenuLeave}
      >
        <nav
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              color: logoColor,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              textShadow: isTransparent ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            JUST PEAC HOMES
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = activeMegamenu === link.megamenuKey

              if (link.hasMegamenu && link.megamenuKey) {
                // Non-clickable label with megamenu (for SEO pages)
                return (
                  <div
                    key={link.href}
                    style={{
                      position: 'relative',
                      padding: '1rem 0', // Increase hit area
                    }}
                    onMouseEnter={() => handleMegamenuEnter(link.megamenuKey!)}
                  >
                    <span
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        color: textColor,
                        transition: 'color 0.2s ease',
                        fontFamily: 'var(--font-body)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        textShadow: isTransparent ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                        cursor: 'default',
                      }}
                    >
                      {link.name}
                      <svg
                        style={{
                          width: '0.75rem',
                          height: '0.75rem',
                          transition: 'transform 0.2s ease',
                          transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </div>
                )
              }

              // Regular link
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: pathname === link.href ? 600 : 500,
                    color:
                      pathname === link.href
                        ? (isTransparent ? 'var(--text-white)' : 'var(--accent-clay)')
                        : textColor,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'var(--font-body)',
                    textShadow: isTransparent ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    borderBottom: pathname === link.href && isTransparent ? '2px solid white' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = hoverColor
                    }
                    handleMegamenuLeave() // Close menu if hovering other links
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.color = textColor
                    }
                  }}
                >
                  {link.name}
                </Link>
              )
            })}
            <Link
              href="/contact"
              style={{
                padding: '0.625rem 1.5rem',
                backgroundColor: isTransparent
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'var(--accent-clay)',
                color: 'var(--text-white)',
                borderRadius: '0.5rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-body)',
                boxShadow: isTransparent
                  ? 'none'
                  : '0 2px 8px rgba(184, 101, 62, 0.25)',
                border: isTransparent ? '1px solid rgba(255,255,255,0.4)' : 'none',
                backdropFilter: isTransparent ? 'blur(4px)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isTransparent
                  ? 'rgba(255, 255, 255, 0.3)'
                  : 'var(--accent-clay-dark)'
                e.currentTarget.style.transform = 'translateY(-1px)'
                if (!isTransparent) e.currentTarget.style.boxShadow = '0 4px 12px rgba(184, 101, 62, 0.35)'
                handleMegamenuLeave()
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isTransparent
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'var(--accent-clay)'
                e.currentTarget.style.transform = 'translateY(0)'
                if (!isTransparent) e.currentTarget.style.boxShadow = '0 2px 8px rgba(184, 101, 62, 0.25)'
              }}
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            style={{
              display: 'block',
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: textColor,
              transition: 'color 0.2s ease',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onMouseEnter={(e) => e.currentTarget.style.color = hoverColor}
            onMouseLeave={(e) => e.currentTarget.style.color = textColor}
          >
            <svg
              style={{ width: '1.5rem', height: '1.5rem' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Global Megamenu */}
        {activeCategory && (
          <Megamenu
            category={activeCategory}
            isOpen={true}
            onClose={handleMegamenuLeave}
          />
        )}

      </header>

      {/* Mobile Menu Overlay - Moved outside header to avoid stacking context issues with backdrop-filter */}
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        services={services}
        projects={projects}
        communities={communities}
      />

      {/* Media query for desktop nav */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}

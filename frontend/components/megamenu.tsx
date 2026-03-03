/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import SanityImage from './sanity-image'

interface MenuItem {
  title: string
  href: string
  image: any
  description: string
}

interface MenuCategory {
  title: string
  items: MenuItem[]
}

interface MegamenuProps {
  category: MenuCategory
  isOpen: boolean
  onClose: () => void
}

export default function Megamenu({ category, isOpen, onClose }: MegamenuProps) {
  if (!isOpen) return null

  return (
    <div
      className="texture-wood"
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        width: '100%',
        // backgroundColor handled by class
        borderTop: '1px solid var(--border-light)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => {
        // Prevent closing when hovering the menu itself
        // This is handled by the parent component canceling the close timeout
      }}
      onMouseLeave={onClose}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '2rem 3rem',
        }}
      >
        {/* Category Title */}
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-olive)',
            fontFamily: 'var(--font-display)',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid var(--accent-clay)',
          }}
        >
          {category.title}
        </h3>

        {/* Menu Items Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {category.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--surface-warm)',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid var(--border-light)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)'
                  e.currentTarget.style.borderColor = 'var(--accent-clay)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'var(--border-light)'
                }}
              >
                {/* Image */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--surface-stone)',
                  }}
                >
                  <SanityImage
                    image={item.image}
                    context="product"
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: '1rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Title */}
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '0.5rem',
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1.5,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Arrow indicator */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--accent-clay)',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span style={{ marginRight: '0.25rem' }}>Learn more</span>
                    <svg
                      style={{ width: '1rem', height: '1rem' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

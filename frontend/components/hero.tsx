/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import SanityImage from './sanity-image'

interface HeroProps {
  headline?: string
  subheadline?: string
  backgroundImage?: any
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
}

export default function HeroSection({
  headline = "Calgary's Premier Renovation & Custom Home Builder",
  subheadline = "Expert R-CG infill development in Altadore, Lake Bonavista, and Marda Loop. Transform your home with craftsmanship and care.",
  backgroundImage,
  primaryCta = {
    text: "Get Free Consultation",
    href: "/contact",
  },
  secondaryCta = {
    text: "View Our Projects",
    href: "/portfolio",
  },
}: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <SanityImage
          image={backgroundImage}
          context="decorative"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark Overlay for Readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          width: '100%',
          padding: '0 2rem',
          textAlign: 'center',
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)', // Reduced min size for mobile
            fontWeight: 700,
            color: 'var(--text-white)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.1,
            marginBottom: '1rem',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.95)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.5,
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto', // Adjusted margin
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
            padding: '0 0.5rem', // Prevent text touching edges on very small screens
          }}
        >
          {subheadline}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Primary CTA */}
          <Link
            href={primaryCta.href}
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: 'var(--accent-clay)',
              color: 'var(--text-white)',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(184, 101, 62, 0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-clay-dark)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(184, 101, 62, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-clay)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(184, 101, 62, 0.4)'
            }}
          >
            {primaryCta.text}
          </Link>


          {/* Secondary CTA */}
          <Link
            href={secondaryCta.href}
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: 'var(--text-white)',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              textDecoration: 'none',
              border: '2px solid var(--text-white)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {secondaryCta.text}
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.47.569-.005 1.288.45 1.81l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
              Licensed & Insured
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
              100+ Calgary Homes
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>
              On-Time Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          animation: 'bounce 2s infinite',
        }}
      >
        <svg
          style={{
            width: '1.5rem',
            height: '1.5rem',
            color: 'var(--text-white)',
            opacity: 0.8,
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* Bounce Animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
      `}</style>
    </section>
  )
}

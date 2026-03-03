import { Metadata } from 'next'
import HeroSection from '@/components/hero'
import HeroSplit from '@/components/hero-split'
import ValueProposition from '@/components/value-proposition'
import GrantProgramHook from '@/components/grant-program-hook'
import ProjectGallery from '@/components/project-gallery'
// import FeaturedProjectsTabs from '@/components/featured-projects-tabs'
import WhyChooseUs from '@/components/why-choose-us'
import InsightsSection from '@/components/insights-section'
import CTASection from '@/components/cta-section'
import TestimonialsSection from '@/components/testimonials-section'
import StatsBar from '@/components/stats-bar'
import TrustBadges from '@/components/trust-badges'
import ROICalculator from '@/components/roi-calculator'
import ServicesSection from '@/components/services-section'
import { getProjects, getHomePage, getPosts, getTestimonials, getSiteSettings, urlForImage } from '@/lib/sanity'
import type { Project, HomePageData } from '@/lib/sanity'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage()
  return {
    title: data?.seo?.metaTitle || data?.title || "JUST PEAC HOMES | Calgary Renovation & Custom Homes",
    description: data?.seo?.metaDescription || "Premier renovation and custom home builder in Calgary, AB.",
    alternates: {
      canonical: '/'
    },
  }
}

export default async function Home() {
  // Fetch all data in parallel
  const [projects, homePageData, posts, testimonials, settings] = await Promise.all([
    getProjects() as Promise<Project[]>,
    getHomePage() as Promise<HomePageData>,
    getPosts(),
    getTestimonials(),
    getSiteSettings()
  ])

  // JSON-LD for SEO/AI Search Optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://justpeachome.ca/#website",
        "url": "https://justpeachome.ca",
        "name": "JUST PEAC HOMES",
        "description": "Premier renovation and custom home builder in Calgary",
        "publisher": {
          "@id": "https://justpeachome.ca/#organization"
        },
        "inLanguage": "en-CA"
      },
      // 2. LocalBusiness Schema
      {
        "@type": "LocalBusiness",
        "@id": "https://justpeachome.ca/#organization",
        "name": "JUST PEAC HOMES",
        "image": homePageData?.hero?.backgroundImage?.asset ? urlForImage(homePageData.hero.backgroundImage).url() : "https://justpeachome.ca/og-image.jpg",
        "logo": {
          "@type": "ImageObject",
          "url": "https://justpeachome.ca/logo.png"
        },
        "description": homePageData?.seo?.metaDescription || "Calgary's premier renovation and custom home builder specializing in R-CG infill development and luxury homes.",
        "url": "https://justpeachome.ca",
        "telephone": settings?.contactInfo?.phone || "+14035550123",
        "email": settings?.contactInfo?.email || "info@justpeachome.ca",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Calgary",
          "addressRegion": "AB",
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.0447,
          "longitude": -114.0719
        },
        "sameAs": settings?.socialLinks?.map(link => link.url) || [],
        "priceRange": "$$$",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        ],
        "knowsAbout": [
          "R-CG Zoning",
          "Secondary Suite Legalization",
          "Backyard Suites",
          "H-GO Zoning",
          "Calgary Land Use Bylaw",
          "Passive House Stats",
          "Basement Suite Renovations"
        ],
        "makesOffer": [
          {
            "@type": "Offer",
            "name": "Secondary Suite Incentive Program Assistance",
            "description": "We help homeowners apply for and maximize the $10,000 Calgary Secondary Suite Incentive Program grant.",
            "price": "0",
            "priceCurrency": "CAD",
            "url": "https://justpeachome.ca/contact"
          },
          {
            "@type": "Offer",
            "name": "Free ROI Consultation",
            "description": "Complimentary investment analysis for basement suite conversions.",
            "price": "0",
            "priceCurrency": "CAD",
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      // 3. Breadcrumb Schema
      {
        "@type": "BreadcrumbList",
        "@id": "https://justpeachome.ca/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://justpeachome.ca/"
          }
        ]
      },
      // 4. Review Schemas
      ...testimonials.map((testimonial) => ({
        "@type": "Review",
        "@id": `https://justpeachome.ca/#review-${testimonial._id}`,
        "itemReviewed": {
          "@type": "LocalBusiness",
          "@id": "https://justpeachome.ca/#organization"
        },
        "author": {
          "@type": "Person",
          "name": testimonial.clientName || 'Anonymous'
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating || 5,
          "bestRating": 5
        },
        "reviewBody": testimonial.quote || '',
        "datePublished": testimonial.date || ''
      }))
    ]
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section (H1) - Conditional: Split or Single */}
      {homePageData?.heroType === 'split' && homePageData?.splitHero ? (
        <HeroSplit splitHero={homePageData.splitHero} />
      ) : (
        <HeroSection
          headline={homePageData?.hero?.headline}
          subheadline={homePageData?.hero?.subheadline}
          backgroundImage={homePageData?.hero?.backgroundImage}
          primaryCta={homePageData?.hero?.ctaText && homePageData?.hero?.ctaLink ? {
            text: homePageData.hero.ctaText,
            href: homePageData.hero.ctaLink
          } : undefined}
        />
      )}

      {/* 2. Trust Badges (NEW) */}
      <TrustBadges
        enabled={homePageData?.trustBadges?.enabled}
        title={homePageData?.trustBadges?.title}
        badges={homePageData?.trustBadges?.badges}
      />

      {/* 3. Value Proposition (Comparison Table) - Only for Split Hero */}
      {homePageData?.heroType === 'split' && homePageData?.valueProposition && (
        <ValueProposition
          title={homePageData.valueProposition?.title || ''}
          subtitle={homePageData.valueProposition?.subtitle || ''}
          premiumStandard={homePageData.valueProposition?.premiumStandard}
          investmentStandard={homePageData.valueProposition?.investmentStandard}
        />
      )}

      {/* 4. Grant Program Hook ($10,000 Incentive) - Only for Split Hero */}
      {homePageData?.heroType === 'split' && homePageData?.grantProgram?.enabled && (
        <GrantProgramHook
          enabled={homePageData.grantProgram?.enabled}
          title={homePageData.grantProgram?.title || ''}
          description={homePageData.grantProgram?.description || ''}
          ctaText={homePageData.grantProgram?.ctaText || 'Learn More'}
          ctaLink={homePageData.grantProgram?.ctaLink || '/contact'}
          highlightColor={homePageData.grantProgram?.highlightColor}
          deadline={homePageData.grantProgram?.deadline}
          eligibility={homePageData.grantProgram?.eligibility}
          officialLink={homePageData.grantProgram?.officialLink}
        />
      )}

      {/* 5. ROI Calculator (NEW) - Interactive Tool */}
      <ROICalculator
        enabled={homePageData?.roiCalculator?.enabled}
        title={homePageData?.roiCalculator?.title}
        subtitle={homePageData?.roiCalculator?.subtitle}
        disclaimer={homePageData?.roiCalculator?.disclaimer}
      />

      {/* 6. Featured Portfolio (was Projects) */}
      <ProjectGallery
        title="Featured Portfolio"
        subtitle="Explore our recent renovations and custom builds across Calgary."
        projects={projects}
      />


      {/* 7. Services Section (H2) - NEW */}
      <ServicesSection
        title={homePageData?.servicesSection?.title || 'Our Expertise'}
        description={homePageData?.servicesSection?.description}
      />

      {/* 8. Stats Bar */}
      <StatsBar stats={homePageData?.statsSection?.items} />

      {/* 10. Why Choose Us (H2) */}
      <WhyChooseUs
        title={homePageData?.benefits?.title}
        items={homePageData?.benefits?.items}
      />

      {/* 11. Testimonials (H2) */}
      <TestimonialsSection testimonials={testimonials} />


      {/* 13. Latest Insights (H2) */}
      <InsightsSection
        posts={posts}
        title={homePageData?.insightsSection?.title}
        description={homePageData?.insightsSection?.description}
      />

      {/* 14. Bottom CTA Section (H2) */}
      <CTASection
        title={homePageData?.ctaSection?.title}
        subtitle={homePageData?.ctaSection?.subtitle}
        ctaText={homePageData?.ctaSection?.ctaText}
        ctaLink={homePageData?.ctaSection?.ctaLink}
      />
    </>
  )
}

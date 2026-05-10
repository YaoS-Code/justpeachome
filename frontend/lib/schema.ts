import type { WebPage, BreadcrumbList, ListItem, Organization, LocalBusiness, Article } from 'schema-dts'

/* ========================================
   Schema.org Structured Data Generator
   ======================================== */

export function generateWebPageSchema({
  title,
  description,
  url,
  image,
}: {
  title: string
  description: string
  url: string
  image?: string
}): WebPage {
  return {
    '@type': 'WebPage',
    name: title,
    description,
    url: `https://justpeachome.ca${url}`,
    image: image ? `https://justpeachome.ca${image}` : undefined,
    publisher: organizationSchema(),
    inLanguage: 'en-CA',
  }
}

export function generateBreadcrumbSchema(items: Array<{
  name: string
  href: string
}>): BreadcrumbList {
  const itemList: ListItem[] = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://justpeachome.ca${item.href}`,
  }))

  return {
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  }
}

export function generateBlogPostSchema({
  title,
  description,
  url,
  image,
  publishDate,
  author,
  category,
}: {
  title: string
  description: string
  url: string
  image?: string
  publishDate: string
  author?: string
  category?: string[]
}): Article {
  return {
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? `https://justpeachome.ca${image}` : undefined,
    url: `https://justpeachome.ca${url}`,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Organization',
      name: author || 'JUST PEAC HOMES',
    },
    publisher: organizationSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://justpeachome.ca${url}`,
    },
    keywords: category ? category.join(', ') : undefined,
  }
}

export function generateProjectSchema({
  title,
  description,
  url,
  image,
  address,
  completionDate,
  projectType,
}: {
  title: string
  description: string
  url: string
  image?: string
  address?: string
  completionDate?: string
  projectType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: title,
    description,
    image: image ? `https://justpeachome.ca${image}` : undefined,
    url: `https://justpeachome.ca${url}`,
    address: address ? {
      '@type': 'PostalAddress',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
      streetAddress: address,
    } : undefined,
    completionDate,
    keywords: projectType,
    creator: organizationSchema(),
  }
}

export function generateServiceSchema({
  name,
  description,
  url,
  image,
}: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `https://justpeachome.ca${url}`,
    provider: organizationSchema(),
    image: image ? `https://justpeachome.ca${image}` : undefined,
  }
}

/* ========================================
   Organization Schema
   ======================================== */

export function organizationSchema(): Organization {
  return {
    '@type': 'Organization',
    name: 'JUST PEAC HOMES',
    url: 'https://justpeachome.ca',
    logo: 'https://justpeachome.ca/logo.png',
    description: 'Calgary\'s premier renovation and custom home builder specializing in R-CG infill development, heritage restoration, and luxury renovations.',
    sameAs: [
      'https://www.facebook.com/justpeachomes',
      'https://www.instagram.com/justpeachomes',
      'https://www.linkedin.com/company/justpeachomes',
      'https://www.houzz.com/pro/justpeachomes',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-403-XXX-XXXX',
      contactType: 'sales',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calgary, AB',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2X',
      addressCountry: 'CA',
    },
  }
}

export function localBusinessSchema(): LocalBusiness {
  return {
    '@type': 'LocalBusiness',
    name: 'JUST PEAC HOMES',
    description: 'Premier renovation and custom home builder in Calgary, AB. Specializing in R-CG infill development, heritage restoration, and luxury renovations.',
    url: 'https://justpeachome.ca',
    telephone: '+1-403-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calgary, AB',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2X',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0447,
      longitude: -114.0719,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        { '@type': 'DayOfWeek', name: 'Monday' },
        { '@type': 'DayOfWeek', name: 'Tuesday' },
        { '@type': 'DayOfWeek', name: 'Wednesday' },
        { '@type': 'DayOfWeek', name: 'Thursday' },
        { '@type': 'DayOfWeek', name: 'Friday' },
        { '@type': 'DayOfWeek', name: 'Saturday' },
        { '@type': 'DayOfWeek', name: 'Sunday' },
      ],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '$$$',
    paymentAccepted: ['Credit Card', 'Debit Card'],
    currenciesAccepted: 'CAD',
  }
}

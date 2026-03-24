/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'yoxfbvg1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-20',
})

const builder = imageUrlBuilder(client)


export function urlForImage(source: any) {
  return builder.image(source).auto('format').quality(80)
}

export interface AccessibleImage {
  _key?: string
  asset: any
  alt?: string
  caption?: string
  contextTag?: 'product' | 'mood' | 'diagram' | 'ui'
  usageType?: 'all' | 'rental' | 'personal'
}

export interface DesignSystem {
  colors: {
    backgrounds: {
      warm: string
      cream: string
      white: string
    }
    text: {
      primary: string
      secondary: string
      muted: string
      olive: string
      white: string
    }
    accents: {
      clay: string
      clayDark: string
      taupe: string
      wood: string
    }
    borders: {
      light: string
      medium: string
      dark: string
    }
  }
  typography: {
    fonts: {
      display: string
      body: string
    }
    headingSizes: {
      h1: string
      h2: string
      h3: string
      h4: string
    }
    textSizes: {
      base: string
      large: string
      small: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }
}

// Fetch Design System from Sanity
export async function getDesignSystem(): Promise<DesignSystem | null> {
  const query = `*[_type == "designSystem" && _id == "singleton-designSystem"][0]`
  return client.fetch(query, {}, { next: { revalidate: 3600 } }) // Cache for 1 hour
}

export interface HomePageData {
  _id: string
  title: string
  heroType?: 'single' | 'split'
  hero?: {
    headline: string
    subheadline: string
    backgroundImage: any
    ctaText: string
    ctaLink: string
  }
  splitHero?: {
    mainHeadline: string
    mainSubheadline: string
    left: {
      image: any
      headline: string
      subheadline: string
      ctaText: string
      ctaLink: string
    }
    right: {
      image: any
      headline: string
      subheadline: string
      ctaText: string
      ctaLink: string
    }
  }
  valueProposition?: {
    title: string
    subtitle: string
    premiumStandard: {
      title: string
      focus: string
      materials: string
      design: string
      durability: string
      roi: string
    }
    investmentStandard: {
      title: string
      focus: string
      materials: string
      design: string
      durability: string
      roi: string
    }
  }
  grantProgram?: {
    enabled: boolean
    title: string
    description: string
    ctaText: string
    ctaLink: string
    highlightColor: string
    deadline: string
    eligibility: string
    officialLink: string
  }
  featuredProjects?: {
    title: string
    subtitle: string
    useTabs: boolean
    luxuryTabLabel: string
    incomeTabLabel: string
  }
  servicesSection?: {
    title: string
    description: string
  }
  statsSection?: {
    items: Array<{
      value: string
      label: string
      icon: string
    }>
  }
  benefits?: {
    title: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  communitiesSection?: {
    title: string
    description: string
  }
  insightsSection?: {
    title: string
    description: string
  }
  ctaSection?: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
  trustBadges?: {
    enabled: boolean
    title: string
    badges: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  roiCalculator?: {
    enabled: boolean
    title: string
    subtitle: string
    disclaimer: string
  }
  seo: any
}

export interface SiteSettings {
  _id: string
  title: string
  description: string
  contactInfo: {
    email: string
    phone: string
    address: string
    serviceAreas?: string[]
  }
  socialLinks: Array<{
    platform: string
    url: string
  }>
  footer: {
    brandStatement: string
    copyrightText: string
  }
}

export interface ContactPageData {
  _id: string
  title: string
  hero: {
    headline: string
    subheadline: string
  }
  serviceAreas: {
    title: string
    content: string
  }
  seo: any
}

export interface AboutPageData {
  _id: string
  title: string
  hero: {
    headline: string
    subheadline: string
    backgroundImage: any
  }
  founderStory?: {
    title: string
    content: any
    image: any
  }
  philosophy?: {
    title: string
    subtitle: string
    items: Array<{
      letter: string
      title: string
      description: string
    }>
  }
  specialization?: {
    title: string
    description: string
    items: Array<{
      title: string
      description: string
    }>
  }
  cta?: {
    headline: string
    buttonText: string
    buttonLink: string
  }
  faqs?: Array<{
    question: string
    answer: string
  }>
  seo: any
}

// Helper functions for GROQ queries
export async function getSiteSettings(): Promise<SiteSettings> {
  const query = `*[_type == "siteSettings"][0]`
  return client.fetch(query)
}

export async function getContactPage(): Promise<ContactPageData> {
  const query = `*[_type == "contactPage"][0]`
  return client.fetch(query)
}

// Helper functions for GROQ queries
export async function getHomePage(): Promise<HomePageData> {
  const query = `*[_type == "homePage"][0]{
    _id,
    title,
    heroType,
    hero{
      headline,
      subheadline,
      backgroundImage,
      ctaText,
      ctaLink
    },
    splitHero,
    valueProposition,
    grantProgram,
    featuredProjects,
    servicesSection,
    statsSection,
    benefits,
    communitiesSection,
    insightsSection,
    ctaSection,
    trustBadges,
    roiCalculator,
    seo {
      ...,
      breadcrumbTitle,
      aiSummary,
      keywords
    }
  }`
  return client.fetch(query)
}

export interface Testimonial {
  _id: string
  clientName: string
  projectType: string
  location: string
  quote: string
  rating: number
  date: string
}

export interface ProcessStep {
  _id: string
  order: number
  title: string
  description: string
  icon: string
  highlights: string[]
}

export interface LegalPageData {
  _id: string
  title: string
  slug: string
  content: any
  seo: any
}

export interface ListPageSettings {
  title: string
  description: string
  seo: any
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(date desc)`)
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return client.fetch(`*[_type == "processStep"] | order(order asc)`)
}

export async function getBlogPageSettings(): Promise<ListPageSettings> {
  return client.fetch(`*[_type == "blogPage"][0]`)
}

export async function getServicesPageSettings(): Promise<ListPageSettings> {
  return client.fetch(`*[_type == "servicesPage"][0]`)
}

export async function getProjectsPageSettings(): Promise<ListPageSettings> {
  return client.fetch(`*[_type == "projectsPage"][0]`)
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPageData> {
  return client.fetch(`*[_type == "legalPage" && slug.current == $slug][0]`, { slug })
}

export async function getLegalPages() {
  return client.fetch<{ slug: string; _updatedAt: string }[]>(
    `*[_type == "legalPage"]{ "slug": slug.current, _updatedAt }`
  )
}

export async function getAboutPage(): Promise<AboutPageData> {
  const query = `*[_type == "aboutPage"][0]{
    _id,
    title,
    hero {
      ...,
      backgroundImage
    },
    founderStory,
    philosophy,
    specialization,
    cta,
    faqs,
    seo {
      ...,
      breadcrumbTitle,
      aiSummary,
      keywords
    }
  }`
  return client.fetch(query)
}

export interface Project {
  _id: string
  title: string
  slug: string
  coverImage: any
  imageUrl?: string
  completionDate?: string
  shortDescription?: string
  seo?: any
  content?: any
  gallery?: any[]
  tags?: string[]
  role?: string
  projectCategory?: 'investment' | 'luxury' | 'both' | 'legal-suite' | 'backyard-suite' | 'luxury-renovation' | 'kitchen-bath'
  rentalIncome?: string
  roi?: string
  materialFocus?: string
  complianceBadges?: string[]
  permitInfo?: {
    developmentPermit?: boolean
    buildingPermit?: boolean
    approvalDate?: string
    notes?: string
  }
  materialSpecs?: Array<{
    category: string
    material: string
    brand?: string
    reason?: string
  }>
  hoverImage?: any
}

export async function getProjects() {
  const query = `*[_type == "project"] | order(completionDate desc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    completionDate,
    shortDescription,
    seo {
      ...,
      breadcrumbTitle,
      aiSummary,
      keywords
    },
    tags,
    role,
    projectCategory,
    rentalIncome,
    roi,
    materialFocus,
    complianceBadges,
    permitInfo,
    materialSpecs,
    "hoverImage": gallery[0]
  }`
  return client.fetch(query)
}

// ... (skipping some parts)

export interface Service {
  _id: string
  title: string
  slug: string
  shortDescription: string
  coverImage: any
  content?: any
  features?: Array<{
    title: string
    description: string
    icon: string
  }>
  gallery?: AccessibleImage[]
  faqs?: Array<{
    question: string
    answer: string
  }>
  process?: Array<{
    _key: string
    title: string
    description: string
    order: number
  }>
  heroStyle?: 'standard' | 'split'
  splitHero?: {
    left: {
      image: any
      headline: string
      subheadline: string
      ctaText: string
      ctaLink: string
    }
    right: {
      image: any
      headline: string
      subheadline: string
      ctaText: string
      ctaLink: string
    }
  }
  serviceCategory?: string
  tags?: string[]
  seo?: any
}

export async function getServices() {
  const query = `*[_type == "service"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    serviceCategory,
    coverImage,
    seo {
      ...,
      breadcrumbTitle,
      aiSummary,
      keywords
    },
    tags
  }`
  return client.fetch(query)
}

export interface Community {
  _id: string
  title: string
  slug: string
  coverImage: any
  shortDescription?: string
  content?: any
  seo?: any
  zoningTypes?: Array<{
    code: string
    description: string
    allowsSecondarysuites: boolean
    allowsBackyardSuites: boolean
  }>
  characteristics?: {
    era?: string
    lotSizes?: string
    homeStyles?: string[]
    walkScore?: number
    transitAccess?: string
    proximityToDowntown?: string
  }
  amenities?: string[]
  investmentPotential?: {
    rentalDemand?: string
    averageRent?: string
    propertyAppreciation?: string
  }
}

export async function getCommunities() {
  const query = `*[_type == "community"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    shortDescription,
    seo {
      ...,
      breadcrumbTitle,
      aiSummary,
      keywords
    },
    zoningTypes,
    characteristics,
    amenities,
    investmentPotential
  }`
  return client.fetch(query)
}

export async function getCommunityBySlug(slug: string): Promise<Community> {
  const query = `*[_type == "community" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    zoningTypes,
    characteristics,
    amenities,
    investmentPotential
  }`
  const params = { slug }
  return client.fetch<Community>(query, params)
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    coverImage,
    heroImage,
    "gallery": gallery[]{
      _key,
      "url": asset->url,
      alt
    },
    "detailedGallery": detailedGallery[]{
      _key,
      "url": asset->url,
      alt
    },
    concept,
    environment,
    beforeAfter[]{
      description,
      beforeImage,
      afterImage
    },
    features,
    projectStory,
    timeline,
    challengesSolved,
    clientQuote
  }`
  const params = { slug }
  return client.fetch(query, params)
}

// Blog functions
export async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{title, "slug": slug.current},
    author,
    readingTime,
    seo {
      ...,
      breadcrumbTitle,
      aiSummary,
      keywords
    }
  }`
  return client.fetch(query)
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ...,
    "slug": slug.current,
    categories[]->{title, "slug": slug.current},
    content[] {
      ...,
      _type == "accessibleImage" => {
        ...,
        asset->
      },
      _type == "gallery" => {
        ...,
        images[] {
          ...,
          asset->
        }
      },
      _type == "beforeAfter" => {
        ...,
        beforeImage { ..., asset-> },
        afterImage { ..., asset-> }
      }
    }
  }`
  const params = { slug }
  return client.fetch(query, params)
}

export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }`
  return client.fetch(query)
}

export async function getPostsByCategory(categorySlug: string) {
  const query = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{title, slug},
    author,
    readingTime
  }`
  const params = { categorySlug }
  return client.fetch(query, params)
}

// Services functions










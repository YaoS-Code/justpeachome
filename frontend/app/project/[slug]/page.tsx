
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, urlForImage } from "@/lib/sanity";
import { PortableText } from "@/components/portable-text";
import SanityImage from "@/components/sanity-image";
import { ProjectDetail } from "@/types/project";
import { Metadata } from 'next';
import BeforeAfterSlider from "@/components/project/before-after-slider";
import ProjectGalleryGrid from "@/components/project/project-gallery-grid";
import ComplianceBadge from "@/components/compliance-badge";
import ProjectTimeline from "@/components/project/project-timeline";
import ChallengesSolved from "@/components/project/challenges-solved";
import ClientTestimonial from "@/components/project/client-testimonial";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug) as ProjectDetail;

  if (!project) {
    return {
      title: 'Project Not Found | JUST PEAC HOMES',
    };
  }

  const title = project.seo?.metaTitle || `${project.title} | Calgary Custom Home Project | JUST PEAC HOMES`;
  const description = project.seo?.metaDescription || project.shortDescription || `View details for ${project.title}, a custom home project in Calgary by JUST PEAC HOMES.`;

  const ogImage = project.seo?.socialImage
    ? urlForImage(project.seo.socialImage).width(1200).height(630).url()
    : project.imageUrl;

  return {
    title,
    description,
    alternates: {
      canonical: `/project/${slug}`
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    }
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug) as ProjectDetail;

  if (!project) {
    notFound();
  }

  // Determine Category Mode
  const category = project.projectCategory || 'both';

  // Investment Group
  const isLegalSuite = category === 'legal-suite' || category === 'investment';
  const isBackyard = category === 'backyard-suite';
  const isInvestment = isLegalSuite || isBackyard || category === 'both';

  // Luxury Group
  const isKitchenBath = category === 'kitchen-bath';
  const isLuxuryReno = category === 'luxury-renovation' || category === 'luxury';
  const isLuxury = isLuxuryReno || isKitchenBath || category === 'both';

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `https://justpeachome.ca/project/${slug}#project`,
        "name": project.title,
        "headline": project.title,
        "description": project.seo?.metaDescription || project.shortDescription || `Custom home project in Calgary by JUST PEAC HOMES.`,
        "image": project.imageUrl,
        "dateCreated": project.completionDate,
        "creator": {
          "@type": "Organization",
          "@id": "https://justpeachome.ca/#organization",
          "name": "JUST PEAC HOMES"
        },
        "locationCreated": {
          "@type": "Place",
          "name": "Calgary, AB"
        },
        "url": `https://justpeachome.ca/project/${slug}`,
        "keywords": project.tags?.join(', '),
        "about": project.concept ? "Architectural Design & Renovation Concept" : undefined,
        "maintainer": {
          "@type": "Organization",
          "name": "JUST PEAC HOMES",
          "roleName": project.role || "General Contractor"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://justpeachome.ca/project/${slug}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://justpeachome.ca/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Portfolio",
            "item": "https://justpeachome.ca/portfolio"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": project.seo?.breadcrumbTitle || project.title,
            "item": `https://justpeachome.ca/project/${slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background-warm font-body">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full mt-[80px]">
        {(project.heroImage || project.coverImage) ? (
          <SanityImage
            image={project.heroImage || project.coverImage}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-surface-stone/30" />
        )}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-32 pb-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors font-medium tracking-wide uppercase text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Portfolio
            </Link>

            {/* Project Title & Category Badge */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 shadow-sm leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-white/90 font-light max-w-2xl">
                  {project.shortDescription}
                </p>
              </div>

              {/* Quick Stats Box - Quad Mode */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white min-w-[280px]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-4 border-b border-white/20 pb-2">
                  {isBackyard ? 'Garden Suite Specs' :
                    isLegalSuite ? 'Investment ROI' :
                      isKitchenBath ? 'Project Details' :
                        'Project Stats'}
                </h3>
                <div className="space-y-3">
                  {project.completionDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Completed</span>
                      <span className="font-semibold">{new Date(project.completionDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                    </div>
                  )}

                  {/* Investment/Legal Suite Specifics */}
                  {isInvestment && project.rentalIncome && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Est. Rent</span>
                      <span className="font-semibold text-green-300">{project.rentalIncome}</span>
                    </div>
                  )}
                  {isInvestment && project.roi && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Proj. ROI</span>
                      <span className="font-semibold text-green-300">{project.roi}</span>
                    </div>
                  )}

                  {/* Backyard Specifics */}
                  {isBackyard && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Zoning</span>
                      <span className="font-semibold">R-CG / H-GO</span>
                    </div>
                  )}

                  {/* Permit Info (Crucial for Investment/Backyard) */}
                  {project.permitInfo && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Permit</span>
                      <span className="font-semibold">
                        {project.permitInfo.developmentPermit ? 'DP' : ''}
                        {project.permitInfo.developmentPermit && project.permitInfo.buildingPermit ? ' + ' : ''}
                        {project.permitInfo.buildingPermit ? 'BP Approved' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-20 max-w-7xl">

        {/* --- DUAL STRATEGY CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-display font-bold text-olive mb-6">
              {isInvestment ? 'The Brief & Strategy' : 'The Vision'}
            </h2>
            {/* Project Story - The Vision */}
            {project.projectStory?.vision ? (
              <div className="prose prose-lg max-w-none text-secondary prose-headings:font-display prose-headings:text-olive prose-p:leading-relaxed">
                <PortableText value={project.projectStory.vision} />
              </div>
            ) : project.content ? (
              <div className="prose prose-lg max-w-none text-secondary prose-headings:font-display prose-headings:text-olive prose-p:leading-relaxed">
                <PortableText value={project.content} />
              </div>
            ) : (
              <p className="text-lg text-secondary leading-relaxed">
                {project.concept ? <PortableText value={project.concept} /> : project.shortDescription}
              </p>
            )}

            {/* Technical/Material Details - Quad Mode */}
            <div className="mt-12 bg-white p-8 rounded-2xl border border-border-light shadow-sm">
              <h3 className="text-xl font-display font-bold text-olive mb-6 flex items-center">
                {isBackyard ? (
                  <>
                    <span className="mr-2">🏡</span> Garden Suite Details
                  </>
                ) : isLegalSuite ? (
                  <>
                    <span className="mr-2">🛡️</span> Compliance & Technical Specs
                  </>
                ) : isKitchenBath ? (
                  <>
                    <span className="mr-2">🛁</span> Fixtures & Finishes
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span> Design Materials & Finishes
                  </>
                )}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wide">
                    {isBackyard ? 'Structure & Systems' :
                      isLegalSuite ? 'Code & Safety Features' :
                        isKitchenBath ? 'Key Components' :
                          'Premium Selections'}
                  </h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    {/* Render Features from Sanity */}
                    {project.features && project.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>
                        {f}
                      </li>
                    ))}

                    {/* Fallbacks if empty */}
                    {isBackyard && (!project.features || project.features.length === 0) && (
                      <>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Independent Utility Connections</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Frost-Protected Foundation</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Space-Saving HVAC</li>
                      </>
                    )}
                    {isLegalSuite && (!project.features || project.features.length === 0) && (
                      <>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Egress Compliant Windows</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Interconnected Smoke/CO Alarms</li>
                        <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Heating & Ventilation Separation</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wide">
                    {isBackyard ? 'Exterior & Efficiency' :
                      isLegalSuite ? 'Durability & Maintenance' :
                        'Custom Materials'}
                  </h4>
                  <ul className="space-y-2 text-sm text-secondary">
                    {project.materialSpecs && project.materialSpecs.length > 0 ? (
                      project.materialSpecs.map((spec, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>
                          <span className="font-semibold mr-1">{spec.material}:</span> {spec.brand || spec.reason}
                        </li>
                      ))
                    ) : (
                      // Fallback demo content
                      <>
                        {isLegalSuite && (
                          <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Commercial Grade LVP Flooring</li>
                        )}
                        {isBackyard && (
                          <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Hardie Board Siding</li>
                        )}
                        {isLuxury && (
                          <li className="flex items-start"><span className="w-1.5 h-1.5 rounded-full bg-accent-clay mt-1.5 mr-2 shrink-0"></span>Custom Millwork Cabinetry</li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            {/* Sidebar CTAs - Quad Mode */}

            {/* 1. Legal Suite / Investment CTA */}
            {isLegalSuite && (
              <div className="bg-gradient-to-br from-olive/5 to-accent-clay/10 p-6 rounded-2xl border border-accent-clay/20">
                <h3 className="text-lg font-display font-bold text-olive mb-4">Financial Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-olive/10">
                    <span className="text-secondary text-sm">Monthly Revenue</span>
                    <span className="font-bold text-lg text-green-700">{project.rentalIncome || 'Contact for detail'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-olive/10">
                    <span className="text-secondary text-sm">Est. Annual ROI</span>
                    <span className="font-bold text-lg text-green-700">{project.roi || '10-15%'}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted mb-4">
                      *Estimates based on current market rates in {project.tags?.[0] || 'Calgary'}.
                    </p>
                    <Link href="/contact" className="block w-full py-3 text-center bg-accent-clay text-white rounded-lg font-medium hover:bg-accent-clay-dark transition-colors shadow-md">
                      Get Your Free ROI Assessment
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Backyard Suite CTA */}
            {isBackyard && (
              <div className="bg-gradient-to-br from-olive/5 to-green-600/10 p-6 rounded-2xl border border-green-600/20">
                <h3 className="text-lg font-display font-bold text-olive mb-2">Can I Build This?</h3>
                <p className="text-sm text-secondary mb-6">
                  Check if your property qualifies for a backyard suite under the new R-CG / H-GO zoning rules.
                </p>
                <div className="bg-white/50 p-3 rounded-lg mb-4 text-xs text-secondary border border-olive/10">
                  <span className="font-bold">Did you know?</span> You can now build a backyard suite AND a legal basement suite on the same lot.
                </div>
                <Link href="/contact" className="block w-full py-3 text-center bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors shadow-md">
                  Check My Zoning Eligibility
                </Link>
              </div>
            )}

            {/* 3 & 4. Luxury / Kitchen CTA */}
            {(isLuxuryReno || isKitchenBath) && (
              <div className="bg-surface-cream p-6 rounded-2xl border border-border-light">
                <h3 className="text-lg font-display font-bold text-olive mb-2">
                  {isKitchenBath ? 'Planning a Renovation?' : 'Build Your Vision'}
                </h3>
                <p className="text-sm text-secondary mb-6">
                  {isKitchenBath
                    ? 'See how we can transform your space with functional design and premium finishes.'
                    : 'Inspired by this project? Let\'s discuss how we can bring similar craftsmanship to your home.'}
                </p>
                <Link href="/contact" className="block w-full py-3 text-center bg-olive text-white rounded-lg font-medium hover:bg-olive-dark transition-colors shadow-md">
                  Book Design Consultation
                </Link>
              </div>
            )}

            {/* Compliance Badges */}
            {project.complianceBadges && project.complianceBadges.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm">
                <h3 className="text-sm font-bold uppercase text-muted tracking-wider mb-4">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {project.complianceBadges.map((badge) => (
                    <ComplianceBadge key={badge} badge={badge} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Timeline */}
        {project.timeline && project.timeline.length > 0 && (
          <section className="mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-olive text-center mb-6">
              Project Timeline
            </h2>
            <p className="text-lg text-secondary text-center max-w-2xl mx-auto mb-12">
              {isInvestment
                ? 'See how we transformed this space step-by-step to maximize your investment return.'
                : 'Follow the journey from concept to completion.'}
            </p>
            <ProjectTimeline timeline={project.timeline} />
          </section>
        )}

        {/* The Process/Transformation Story */}
        {project.projectStory?.process && (
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-olive mb-8">
              The Transformation
            </h2>
            <div className="prose prose-lg max-w-none text-secondary prose-headings:font-display prose-headings:text-olive prose-p:leading-relaxed">
              <PortableText value={project.projectStory.process} />
            </div>
          </section>
        )}

        {/* Challenges & Solutions */}
        {project.challengesSolved && project.challengesSolved.length > 0 && (
          <section className="mb-24">
            <h2 className="text-4xl font-display font-bold text-olive mb-6">
              Challenges We Solved
            </h2>
            <p className="text-lg text-secondary max-w-2xl mb-12">
              Every project comes with unique obstacles. Here&apos;s how we overcame them.
            </p>
            <ChallengesSolved challenges={project.challengesSolved} />
          </section>
        )}

        {/* Before & After Section */}
        {project.beforeAfter && project.beforeAfter.length > 0 && (
          <section className="mb-24 scroll-mt-32" id="transformation">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-olive text-center mb-6">
              The Transformation
            </h2>
            <p className="text-lg text-secondary text-center max-w-2xl mx-auto mb-12">
              See the dramatic difference. {isInvestment ? 'From unfinished basement to income generator.' : 'Reimagining space for modern living.'}
            </p>

            <div className={`grid grid-cols-1 ${project.beforeAfter.length > 1 ? 'md:grid-cols-2' : ''} gap-10`}>
              {project.beforeAfter.map((item, idx) => (
                <BeforeAfterSlider
                  key={item._key || idx}
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  description={item.description}
                  aspectRatio="aspect-[4/3]"
                />
              ))}
            </div>
          </section>
        )}

        {/* Improved Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold text-olive mb-4">
                  Project Gallery
                </h2>
                <p className="text-secondary max-w-xl">
                  Explore the details, finishes, and craftsmanship.
                </p>
              </div>
            </div>

            <ProjectGalleryGrid images={project.gallery} />
          </section>
        )}

        {/* Detailed Gallery (Gallery 2) */}
        {project.detailedGallery && project.detailedGallery.length > 0 && (
          <section className="mb-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold text-olive mb-4">
                  Detailed Gallery
                </h2>
                <p className="text-secondary max-w-xl">
                  A closer look at the materials, finishes, and craftsmanship.
                </p>
              </div>
            </div>

            <ProjectGalleryGrid images={project.detailedGallery} />
          </section>
        )}

        {/* Client Testimonial */}
        {project.clientQuote && (
          <section className="mb-24 max-w-4xl mx-auto">
            <ClientTestimonial testimonial={project.clientQuote} />
          </section>
        )}

        {/* The Outcome */}
        {project.projectStory?.outcome && (
          <section className="mb-24 max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-olive mb-8">
              The Outcome
            </h2>
            <div className="prose prose-lg max-w-none text-secondary prose-headings:font-display prose-headings:text-olive prose-p:leading-relaxed">
              <PortableText value={project.projectStory.outcome} />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-olive mb-8 text-center">
            Project Insights
          </h2>
          <div className="space-y-6">
            {isInvestment ? (
              <>
                <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
                  <h3 className="font-bold text-primary mb-2">Why explicitly choose 45&quot; egress windows?</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    We installed oversized egress windows not only to meet the 2025 Calgary Fire Code requirements for secondary suites but also to maximize natural light, making the basement feel like a main floor living space—increasing rental value by up to 15%.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
                  <h3 className="font-bold text-primary mb-2">What is the specific fire separation used?</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    This unit utilizes 5/8&quot; Type X drywall on ceilings and resilient channel soundproofing, exceeding the STC-50 rating required by code. This ensures safety and significantly reduces noise complaints between tenants and owners.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm">
                  <h3 className="font-bold text-primary mb-2">Design Philosophy</h3>
                  <p className="text-secondary text-sm leading-relaxed">
                    The goal was to blend functionality with aesthetics. We chose materials that age beautifully, ensuring the home remains timeless.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Final CTA Strip */}
        <section className="bg-olive rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {isInvestment ? 'Ready to Maximize Your Property Value?' : 'Ready to Build Your Dream Space?'}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {isBackyard
                ? 'Backyard suites are the fastest way to add value to your property. Find out if you qualify.'
                : isLegalSuite
                  ? 'Book a free zoning assessment to see if your property qualifies for a legal suite.'
                  : 'Schedule a design consultation to discuss your vision with our architectural team.'}
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent-clay hover:bg-accent-clay-dark text-white font-bold rounded-lg transition-colors shadow-lg transform hover:-translate-y-1"
            >
              {isBackyard ? 'Check Zoning Eligibility' :
                isLegalSuite ? 'Start My ROI Assessment' :
                  'Book Design Consultation'}
            </Link>
          </div>
          {/* Decorative pattern opacity */}
          <div className="absolute inset-0 opacity-10 bg-[url('/patterns/texture-dots.png')]"></div>
        </section>

      </main>
    </div>
  );
}

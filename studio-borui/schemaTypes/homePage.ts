import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Page Title',
      initialValue: 'Home',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroType',
      type: 'string',
      title: 'Hero Type',
      options: {
        list: [
          { title: 'Single Hero (Traditional)', value: 'single' },
          { title: 'Split Hero (Dual Path)', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'split',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      type: 'object',
      title: 'Single Hero Section',
      hidden: ({ parent }) => parent?.heroType !== 'single',
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          title: 'Headline',
          initialValue: 'Transform Your Calgary Home into Something Extraordinary',
        }),
        defineField({
          name: 'subheadline',
          type: 'text',
          title: 'Subheadline',
          rows: 2,
          initialValue: 'Premier renovation and custom home building specializing in R-CG infill development, heritage restoration, and luxury renovations.',
        }),
        defineField({
          name: 'backgroundImage',
          type: 'accessibleImage',
          title: 'Background Image',
        }),
        defineField({
          name: 'ctaText',
          type: 'string',
          title: 'CTA Button Text',
          initialValue: 'Get Free Consultation',
        }),
        defineField({
          name: 'ctaLink',
          type: 'string',
          title: 'CTA Button Link',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'splitHero',
      type: 'object',
      title: 'Split Hero Section (Dual Path)',
      description: 'Separate paths for "Living" (luxury/self-use) vs "Investing" (rental/ROI)',
      hidden: ({ parent }) => parent?.heroType !== 'split',
      fields: [
        defineField({
          name: 'mainHeadline',
          type: 'string',
          title: 'Main Headline',
          initialValue: 'Renovations Tailored to Your Purpose',
        }),
        defineField({
          name: 'mainSubheadline',
          type: 'text',
          title: 'Main Subheadline',
          rows: 2,
          initialValue: 'Whether it\'s your forever home or your next income property, we deliver the perfect balance of quality and value.',
        }),
        defineField({
          name: 'left',
          type: 'object',
          title: 'Left Side - For Living (Luxury/Self-Use)',
          fields: [
            { name: 'image', type: 'accessibleImage', title: 'Background Image' },
            { name: 'headline', type: 'string', title: 'Headline', initialValue: 'Elevate Your Lifestyle' },
            { name: 'subheadline', type: 'text', title: 'Subheadline', rows: 2, initialValue: 'Custom Design • Premium Materials • Luxury Finish' },
            { name: 'ctaText', type: 'string', title: 'Button Text', initialValue: 'View Premium Renovations' },
            { name: 'ctaLink', type: 'string', title: 'Button Link', initialValue: '/services' },
          ],
        }),
        defineField({
          name: 'right',
          type: 'object',
          title: 'Right Side - For Investing (Rental/ROI)',
          fields: [
            { name: 'image', type: 'accessibleImage', title: 'Background Image' },
            { name: 'headline', type: 'string', title: 'Headline', initialValue: 'Maximize Your ROI' },
            { name: 'subheadline', type: 'text', title: 'Subheadline', rows: 2, initialValue: 'Legal Suite • Durable • Cost-Effective' },
            { name: 'ctaText', type: 'string', title: 'Button Text', initialValue: 'Build a Rental Suite' },
            { name: 'ctaLink', type: 'string', title: 'Button Link', initialValue: '/services/basement-secondary-suites' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'valueProposition',
      type: 'object',
      title: 'Value Proposition Section',
      description: 'Comparison table showing Premium vs Investment standards',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Two Standards, One Promise of Quality'
        }),
        defineField({
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle',
          rows: 2,
          initialValue: 'We understand that different projects have different goals. That\'s why we offer two distinct approaches.'
        }),
        defineField({
          name: 'premiumStandard',
          type: 'object',
          title: 'Premium Standard (For Living)',
          fields: [
            { name: 'title', type: 'string', title: 'Title', initialValue: 'Premium Standard' },
            { name: 'focus', type: 'text', title: 'Focus', rows: 2, initialValue: 'Unique aesthetics, smart home integration, high-end appliances' },
            { name: 'materials', type: 'text', title: 'Materials', rows: 2, initialValue: 'Hardwood, quartz, custom cabinetry' },
            { name: 'design', type: 'text', title: 'Design', rows: 2, initialValue: 'Personalized to your taste' },
            { name: 'durability', type: 'text', title: 'Durability Profile', rows: 1, initialValue: 'High-maintenance, requires care' },
            { name: 'roi', type: 'text', title: 'Valuation Impact', rows: 1, initialValue: 'Increases overall property value' },
          ],
        }),
        defineField({
          name: 'investmentStandard',
          type: 'object',
          title: 'Investment Standard (For Investing)',
          fields: [
            { name: 'title', type: 'string', title: 'Title', initialValue: 'Investment Standard' },
            { name: 'focus', type: 'text', title: 'Focus', rows: 2, initialValue: 'Durability, easy maintenance, tenant safety code compliance' },
            { name: 'materials', type: 'text', title: 'Materials', rows: 2, initialValue: 'Vinyl plank (LVP), laminate, pre-fab cabinets' },
            { name: 'design', type: 'text', title: 'Design', rows: 2, initialValue: 'Neutral tones to appeal to mass market' },
            { name: 'durability', type: 'text', title: 'Durability Profile', rows: 1, initialValue: 'Commercial grade, tenant-proof' },
            { name: 'roi', type: 'text', title: 'ROI Focus', rows: 1, initialValue: 'Maximized rental yield (10-15%)' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'grantProgram',
      type: 'object',
      title: 'Grant Program Hook Section',
      description: 'Highlight the $10,000 Calgary Secondary Suite Incentive',
      fields: [
        defineField({
          name: 'enabled',
          type: 'boolean',
          title: 'Show Grant Program Section',
          initialValue: true
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Title',
          initialValue: 'Get Paid to Build Your Rental Suite'
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 3,
          initialValue: 'Planning a secondary suite? You could be eligible for up to $10,000 in government grants for safety upgrades like egress windows and smoke-tight barriers. We handle the permits, the construction, and help you meet the eligibility criteria.'
        }),
        defineField({
          name: 'ctaText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Check My Eligibility'
        }),
        defineField({
          name: 'ctaLink',
          type: 'string',
          title: 'Button Link',
          initialValue: '/contact?subject=grant-eligibility'
        }),
        defineField({
          name: 'highlightColor',
          type: 'string',
          title: 'Highlight Color',
          description: 'CSS color for the background (e.g., #B8653E for clay)',
          initialValue: '#B8653E'
        }),
        defineField({
          name: 'deadline',
          type: 'string',
          title: 'Deadline/Status Text',
          initialValue: 'Applications Open for 2026'
        }),
        defineField({
          name: 'eligibility',
          type: 'string',
          title: 'Eligibility Criteria Checklist',
          description: 'Comma separated list of short criteria',
          initialValue: 'New or legalized suites,Safety upgrades,Calgary residents'
        }),
        defineField({
          name: 'officialLink',
          type: 'string',
          title: 'Official Program Link',
          initialValue: 'https://www.calgary.ca/development/home-building/secondary-suites.html'
        }),
      ],
    }),
    defineField({
      name: 'featuredProjects',
      type: 'object',
      title: 'Featured Projects Section',
      description: 'Use tabs to separate Luxury Living vs Income Suites',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Featured Projects' }),
        defineField({ name: 'subtitle', type: 'text', title: 'Subtitle', rows: 2, initialValue: 'Explore our latest Calgary home renovations and custom builds' }),
        defineField({
          name: 'useTabs',
          type: 'boolean',
          title: 'Use Tabs (Luxury Living vs Income Suites)',
          initialValue: true
        }),
        defineField({
          name: 'luxuryTabLabel',
          type: 'string',
          title: 'Luxury Tab Label',
          initialValue: 'Luxury Living'
        }),
        defineField({
          name: 'incomeTabLabel',
          type: 'string',
          title: 'Income Suites Tab Label',
          initialValue: 'Income Suites'
        }),
      ],
    }),
    defineField({
      name: 'servicesSection',
      type: 'object',
      title: 'Services Section',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Our Expertise' }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 2, initialValue: 'Comprehensive design and build services tailored to Calgary\'s unique character.' }),
      ],
    }),
    defineField({
      name: 'statsSection',
      type: 'object',
      title: 'Stats Bar',
      fields: [
        defineField({
          name: 'items',
          type: 'array',
          title: 'Stats Items',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Value', initialValue: '20+' },
                { name: 'label', type: 'string', title: 'Label', initialValue: 'Years Experience' },
                { name: 'icon', type: 'string', title: 'Icon (Lucide name)', initialValue: 'TrendingUp' },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'benefits',
      type: 'object',
      title: 'Why Choose Us Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Why Choose JUST PEAC HOMES',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'items',
          type: 'array',
          title: 'Benefits/Features',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', title: 'Icon (Lucide name)', description: 'e.g., Home, Shield, Award' },
                { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
                { name: 'description', type: 'text', title: 'Description', rows: 3, validation: (Rule) => Rule.required() },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'communitiesSection',
      type: 'object',
      title: 'Communities Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Communities We Serve',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'Description',
          rows: 2,
          initialValue: 'We are proud to build and renovate in Calgary\'s most desirable neighborhoods.',
        }),
      ],
    }),
    defineField({
      name: 'insightsSection',
      type: 'object',
      title: 'Insights Section',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Latest Insights' }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 2, initialValue: 'Explore our latest updates, design tips, and renovation guides.' }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      type: 'object',
      title: 'CTA Section',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'Headline',
          initialValue: 'Get Your Free Consultation',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle',
          rows: 2,
          initialValue: 'Ready to transform your home? Contact us today to discuss your vision.',
        }),
        defineField({
          name: 'ctaText',
          type: 'string',
          title: 'Button Text',
          initialValue: 'Book Now',
        }),
        defineField({
          name: 'ctaLink',
          type: 'string',
          title: 'Button Link',
          initialValue: '/contact',
        }),
      ],
    }),
    defineField({
      name: 'roiCalculator',
      type: 'object',
      title: 'ROI Calculator Section',
      description: 'Interactive calculator for basement suite renovation costs and rental income',
      fields: [
        defineField({
          name: 'enabled',
          type: 'boolean',
          title: 'Show ROI Calculator',
          initialValue: true
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Calculate Your Basement Suite ROI'
        }),
        defineField({
          name: 'subtitle',
          type: 'text',
          title: 'Subtitle',
          rows: 2,
          initialValue: 'Get instant estimates for your Calgary basement renovation project and see your potential rental income.'
        }),
        defineField({
          name: 'disclaimer',
          type: 'text',
          title: 'Disclaimer',
          rows: 2,
          initialValue: 'Estimates are based on 2025 Calgary market data. Final costs may vary based on specific project requirements. Contact us for a detailed quote.'
        }),
      ],
    }),
    defineField({
      name: 'trustBadges',
      type: 'object',
      title: 'Trust & Compliance Badges',
      description: 'Display compliance certifications and guarantees',
      fields: [
        defineField({
          name: 'enabled',
          type: 'boolean',
          title: 'Show Trust Badges',
          initialValue: true
        }),
        defineField({
          name: 'title',
          type: 'string',
          title: 'Section Title',
          initialValue: 'Your Calgary Renovation Experts'
        }),
        defineField({
          name: 'badges',
          type: 'array',
          title: 'Badge Items',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', type: 'string', title: 'Icon (Lucide name)', description: 'e.g., Shield, CheckCircle, Award' },
                { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
                { name: 'description', type: 'text', title: 'Description', rows: 2 },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description'
                }
              }
            },
          ],
          initialValue: [
            {
              icon: 'ShieldCheck',
              title: '100% Calgary Code Compliant',
              description: 'All projects meet Alberta Building Code requirements'
            },
            {
              icon: 'DollarSign',
              title: '$10,000 Grant Partner',
              description: 'We help you access government incentives'
            },
            {
              icon: 'Lock',
              title: 'Fixed Price Guarantee',
              description: 'No hidden fees or surprise costs'
            },
            {
              icon: 'Award',
              title: 'Licensed & Insured',
              description: '2-5 year warranty on all work'
            },
          ]
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'hero.backgroundImage',
    },
  },
})

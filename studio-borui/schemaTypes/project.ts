import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (for Card)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'projectCategory',
      title: 'Project Category',
      description: 'Primary audience for this project',
      type: 'string',
      options: {
        list: [
          // New Categories (Phase 11)
          { title: 'Legal Basement Suite', value: 'legal-suite' },
          { title: 'Backyard Garden Suite', value: 'backyard-suite' },
          { title: 'Luxury Home Renovation', value: 'luxury-renovation' },
          { title: 'Kitchen & Bath Design', value: 'kitchen-bath' },
          // Legacy Categories (for backward compatibility)
          { title: 'Investment (Legacy)', value: 'investment' },
          { title: 'Luxury (Legacy)', value: 'luxury' },
          { title: 'Both (Legacy)', value: 'both' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Categories (AI Search)',
      description: '协助 AI 识别项目属性（例如：Luxury, Infill, R-CG）',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'complianceBadges',
      title: 'Compliance Badges',
      description: 'Certifications and compliance achievements (e.g., "Legal Registered", "City Approved")',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Legal Registered', value: 'legal-registered' },
          { title: 'City of Calgary Approved', value: 'city-approved' },
          { title: 'Code Compliant', value: 'code-compliant' },
          { title: 'Egress Windows Installed', value: 'egress-windows' },
          { title: 'Fire Separation Certified', value: 'fire-separation' },
          { title: 'Independent HVAC', value: 'independent-hvac' },
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'permitInfo',
      title: 'Permit Information',
      description: 'Details about permits obtained for this project',
      type: 'object',
      fields: [
        { name: 'developmentPermit', title: 'Development Permit (DP)', type: 'boolean' },
        { name: 'buildingPermit', title: 'Building Permit (BP)', type: 'boolean' },
        { name: 'approvalDate', title: 'Final Approval Date', type: 'date' },
        { name: 'notes', title: 'Permit Notes', type: 'text', rows: 2 },
      ],
    }),
    defineField({
      name: 'materialSpecs',
      title: 'Material Specifications',
      description: 'Detailed material breakdown for transparency',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string', description: 'e.g., Flooring, Countertops, Cabinets' },
            { name: 'material', title: 'Material', type: 'string', description: 'e.g., LVP, Quartz, Hardwood' },
            { name: 'brand', title: 'Brand (Optional)', type: 'string' },
            { name: 'reason', title: 'Why This Material', type: 'text', rows: 2, description: 'Durability, aesthetics, cost-effectiveness, etc.' },
          ],
          preview: {
            select: {
              title: 'category',
              subtitle: 'material',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'role',
      title: 'Our Role',
      description: '你在该项目中的角色（例如：General Contractor, Designer）',
      type: 'string',
      initialValue: 'General Contractor'
    }),
    defineField({
      name: 'rentalIncome',
      title: 'Estimated Rental Income',
      description: 'Monthly rental income estimate (e.g. "$1,600/mo")',
      type: 'string',
    }),
    defineField({
      name: 'roi',
      title: 'ROI / Value Add',
      description: 'Estimated ROI or property value increase (e.g. "12% ROI" or "+$80k Value")',
      type: 'string',
    }),
    defineField({
      name: 'materialFocus',
      title: 'Key Materials (Overlay)',
      description: 'Short list of materials for card overlay (e.g. "LVP • Quartz • Egress")',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Card 4:3)',
      type: 'accessibleImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image (Wide 16:9)',
      description: 'Optional. A wider, cinematic image for the top hero section. If not provided, the Cover Image will be used.',
      type: 'accessibleImage',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'accessibleImage' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'accessibleImage' }, { type: 'image' }],
    }),
    defineField({
      name: 'concept',
      title: 'Project Concept',
      description: 'The design philosophy and core concept behind the project.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'environment',
      title: 'Environment / Context',
      description: 'Description of the project location, neighborhood, and environmental context.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before & After',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'beforeImage',
              title: 'Before Image',
              type: 'accessibleImage',
            }),
            defineField({
              name: 'afterImage',
              title: 'After Image',
              type: 'accessibleImage',
            }),
          ],
          preview: {
            select: {
              title: 'description',
              media: 'afterImage',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'projectStory',
      title: 'Project Story',
      description: 'Narrative sections for rich storytelling',
      type: 'object',
      fields: [
        {
          name: 'vision',
          title: 'The Vision',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Client goals, initial challenges, what they wanted to achieve'
        },
        {
          name: 'process',
          title: 'The Process / Transformation',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Key decisions, transformations, how it was built, story arc'
        },
        {
          name: 'outcome',
          title: 'The Outcome',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Results, impact, client satisfaction, what was achieved'
        }
      ]
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      description: 'Step-by-step project phases with dates and durations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'phase', type: 'string', title: 'Phase Name' },
          { name: 'duration', type: 'string', title: 'Duration (e.g. "2 weeks")' },
          { name: 'description', type: 'text', title: 'What Happened' },
          { name: 'date', type: 'date', title: 'Completion Date (Optional)' }
        ],
        preview: {
          select: {
            title: 'phase',
            subtitle: 'duration'
          }
        }
      }]
    }),
    defineField({
      name: 'detailedGallery',
      title: 'Detailed Gallery (Gallery 2)',
      description: 'All project detail shots - separate from Before/After gallery',
      type: 'array',
      of: [{
        type: 'accessibleImage',
        options: { hotspot: true }
      }, { type: 'image' }],
    }),
    defineField({
      name: 'challengesSolved',
      title: 'Challenges & Solutions',
      description: 'Problems encountered and how you solved them',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'challenge', type: 'string', title: 'Challenge' },
          { name: 'solution', type: 'text', title: 'Solution', rows: 3 }
        ],
        preview: {
          select: {
            title: 'challenge'
          }
        }
      }]
    }),
    defineField({
      name: 'clientQuote',
      title: 'Client Testimonial',
      description: 'Quote from the client about their experience',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote' },
        { name: 'clientName', type: 'string', title: 'Client Name' },
        { name: 'clientRole', type: 'string', title: 'Role', description: 'e.g. Homeowner, Property Investor' }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      description: 'Key highlights of the project (e.g. Open Concept, Custom Millwork)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'completionDate',
    },
  },
})

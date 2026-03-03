
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
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
            name: 'heroStyle',
            title: 'Hero Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Standard', value: 'standard' },
                    { title: 'Split (Lifestyle vs Income)', value: 'split' }
                ],
                layout: 'radio'
            },
            initialValue: 'standard'
        }),
        defineField({
            name: 'splitHero',
            title: 'Split Hero Content',
            type: 'object',
            hidden: ({ document }) => document?.heroStyle !== 'split',
            fields: [
                {
                    name: 'left',
                    title: 'Left Side (Lifestyle)',
                    type: 'object',
                    fields: [
                        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                        { name: 'headline', title: 'Headline', type: 'string' },
                        { name: 'subheadline', title: 'Subheadline', type: 'string' },
                        { name: 'ctaText', title: 'CTA Text', type: 'string' },
                        { name: 'ctaLink', title: 'CTA Link', type: 'string' }
                    ]
                },
                {
                    name: 'right',
                    title: 'Right Side (Income)',
                    type: 'object',
                    fields: [
                        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                        { name: 'headline', title: 'Headline', type: 'string' },
                        { name: 'subheadline', title: 'Subheadline', type: 'string' },
                        { name: 'ctaText', title: 'CTA Text', type: 'string' },
                        { name: 'ctaLink', title: 'CTA Link', type: 'string' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description (for Menu)',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.max(120),
        }),
        defineField({
            name: 'serviceCategory',
            title: 'Service Category',
            description: 'Primary audience for this service',
            type: 'string',
            options: {
                list: [
                    { title: 'Investment / Income Property', value: 'investment' },
                    { title: 'Luxury / Custom Living', value: 'luxury' },
                    { title: 'Commercial Business', value: 'commercial' },
                    { title: 'Both Audiences', value: 'both' },
                ],
                layout: 'radio',
            },
            initialValue: 'both',
        }),
        defineField({
            name: 'tags',
            title: 'Tags / Categories (AI Search)',
            description: '协助 AI 识别服务属性（例如：Luxury, Income property, Sustainable）',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' }
        }),
        defineField({
            name: 'legalRequirements',
            title: 'Legal Requirements & Code Compliance',
            description: 'Calgary building code requirements for this service (especially important for basement suites)',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'typicalROI',
            title: 'Typical ROI / Value Add',
            description: 'Expected return on investment or property value increase (e.g., "7-15% annual return")',
            type: 'string',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'accessibleImage',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Main Content',
            type: 'array',
            of: [{ type: 'block' }, { type: 'accessibleImage' }],
        }),
        defineField({
            name: 'features',
            title: 'Key Features / Benefits',
            description: 'Displayed in "Why Choose Us" section',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', type: 'string', title: 'Title' }),
                    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
                    defineField({ name: 'icon', type: 'string', title: 'Icon Name (Lucide)', initialValue: 'CheckCircle' }),
                ]
            }]
        }),
        defineField({
            name: 'process',
            title: 'Our Process',
            description: 'Step-by-step workflow for this service (Critical for Consultation services)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', type: 'string', title: 'Step Title' }),
                    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
                    defineField({ name: 'order', type: 'number', title: 'Step Number' }),
                ],
                preview: {
                    select: {
                        title: 'title',
                        subtitle: 'description',
                        order: 'order'
                    },
                    prepare({ title, subtitle, order }) {
                        return {
                            title: `${order ? order + '. ' : ''}${title}`,
                            subtitle: subtitle
                        }
                    }
                }
            }]
        }),
        defineField({
            name: 'gallery',
            title: 'Service Gallery',
            description: 'Showcase specific work for this service',
            type: 'array',
            of: [{ type: 'accessibleImage' }],
            options: { layout: 'grid' }
        }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'question', type: 'string', title: 'Question' }),
                    defineField({ name: 'answer', type: 'text', title: 'Answer', rows: 3 }),
                ]
            }]
        }),
        defineField({
            name: 'seo',
            type: 'seo',
        }),
    ],
})

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'aboutPage',
    type: 'document',
    title: 'About Page',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Page Title',
            initialValue: 'About Us',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'hero',
            type: 'object',
            title: 'Hero Section',
            fields: [
                defineField({
                    name: 'headline',
                    type: 'string',
                    title: 'Headline',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'subheadline',
                    type: 'text',
                    title: 'Subheadline',
                    rows: 3,
                }),
                defineField({
                    name: 'backgroundImage',
                    type: 'accessibleImage',
                    title: 'Background Image',
                }),
            ],
        }),
        defineField({
            name: 'founderStory',
            type: 'object',
            title: "Founder's Story Section",
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',
                    title: 'Section Title',
                }),
                defineField({
                    name: 'content',
                    type: 'array',
                    title: 'Story Content',
                    of: [{ type: 'block' }],
                }),
                defineField({
                    name: 'image',
                    type: 'accessibleImage',
                    title: 'Story Image',
                }),
            ],
        }),
        defineField({
            name: 'philosophy',
            type: 'object',
            title: 'PEAC Philosophy Section',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',
                    title: 'Section Title',
                }),
                defineField({
                    name: 'subtitle',
                    type: 'text',
                    title: 'Subtitle',
                    rows: 2,
                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    title: 'Philosophy Items',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'letter', type: 'string', title: 'Letter (e.g., P)' },
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'text', title: 'Description', rows: 2 },
                            ],
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'specialization',
            type: 'object',
            title: 'Specialization Section',
            fields: [
                defineField({
                    name: 'title',
                    type: 'string',
                    title: 'Section Title',
                }),
                defineField({
                    name: 'description',
                    type: 'text',
                    title: 'Description',
                    rows: 2,
                }),
                defineField({
                    name: 'items',
                    type: 'array',
                    title: 'Specialty Items',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string', title: 'Title' },
                                { name: 'description', type: 'text', title: 'Description', rows: 2 },
                            ],
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'cta',
            type: 'object',
            title: 'CTA Section',
            fields: [
                defineField({
                    name: 'headline',
                    type: 'string',
                    title: 'Headline',
                }),
                defineField({
                    name: 'buttonText',
                    type: 'string',
                    title: 'Button Text',
                }),
                defineField({
                    name: 'buttonLink',
                    type: 'string',
                    title: 'Button Link',
                }),
            ],
        }),
        defineField({
            name: 'faqs',
            type: 'array',
            title: 'FAQ Section',
            description: 'Common questions and answers for the About page',
            of: [
                {
                    type: 'object',
                    title: 'Question & Answer',
                    fields: [
                        { name: 'question', type: 'string', title: 'Question' },
                        { name: 'answer', type: 'text', title: 'Answer', rows: 4 },
                    ],
                    preview: {
                        select: {
                            title: 'question',
                            subtitle: 'answer',
                        },
                    },
                },
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
        },
    },
})

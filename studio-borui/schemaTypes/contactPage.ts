import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contactPage',
    type: 'document',
    title: 'Contact Page',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Page Title',
            initialValue: 'Contact Us',
        }),
        defineField({
            name: 'hero',
            type: 'object',
            title: 'Hero Section',
            fields: [
                defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                defineField({ name: 'subheadline', type: 'text', title: 'Subheadline', rows: 2 }),
            ],
        }),
        defineField({
            name: 'serviceAreas',
            type: 'object',
            title: 'Service Areas Section',
            fields: [
                defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Service Areas' }),
                defineField({ name: 'content', type: 'text', title: 'Description', rows: 4 }),
            ],
        }),
        defineField({
            name: 'seo',
            type: 'seo',
        }),
    ],
})

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'legalPage',
    type: 'document',
    title: 'Legal Page',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Page Title', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'content', type: 'array', title: 'Content', of: [{ type: 'block' }] }),
        defineField({ name: 'seo', type: 'seo' }),
    ],
})

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'projectsPage',
    type: 'document',
    title: 'Projects Page Settings',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Our Portfolio' }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
        defineField({ name: 'seo', type: 'seo' }),
    ],
})

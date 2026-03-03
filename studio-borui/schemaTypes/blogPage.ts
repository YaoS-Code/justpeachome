import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'blogPage',
    type: 'document',
    title: 'Blog Page Settings',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'The Design Journal' }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
        defineField({ name: 'seo', type: 'seo' }),
    ],
})

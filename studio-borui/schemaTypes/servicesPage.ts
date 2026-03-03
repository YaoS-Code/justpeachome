import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'servicesPage',
    type: 'document',
    title: 'Services Page Settings',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Page Title', initialValue: 'Our Services' }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
        defineField({ name: 'seo', type: 'seo' }),
    ],
})

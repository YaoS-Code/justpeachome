import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'processStep',
    type: 'document',
    title: 'Process Step',
    fields: [
        defineField({ name: 'order', type: 'number', title: 'Order', validation: (Rule) => Rule.required() }),
        defineField({ name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() }),
        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3, validation: (Rule) => Rule.required() }),
        defineField({ name: 'icon', type: 'string', title: 'Icon (Lucide name)', description: 'e.g., MessageSquare, Hammer' }),
        defineField({
            name: 'highlights',
            type: 'array',
            title: 'Highlights',
            of: [{ type: 'string' }],
        }),
    ],
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
    ],
})

import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'testimonial',
    type: 'document',
    title: 'Testimonial',
    fields: [
        defineField({ name: 'clientName', type: 'string', title: 'Client Name', validation: (Rule) => Rule.required() }),
        defineField({ name: 'projectType', type: 'string', title: 'Project Type', description: 'e.g., Kitchen Renovation' }),
        defineField({ name: 'location', type: 'string', title: 'Location', description: 'e.g., Altadore' }),
        defineField({ name: 'quote', type: 'text', title: 'Quote', validation: (Rule) => Rule.required() }),
        defineField({ name: 'rating', type: 'number', title: 'Rating', validation: (Rule) => Rule.min(1).max(5), initialValue: 5 }),
        defineField({ name: 'date', type: 'date', title: 'Date' }),
    ],
})

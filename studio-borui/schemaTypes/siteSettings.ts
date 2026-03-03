import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    type: 'document',
    title: 'Site Settings',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Site Title',
            initialValue: 'JUST PEAC HOMES',
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Default Meta Description',
            rows: 3,
        }),
        defineField({
            name: 'contactInfo',
            type: 'object',
            title: 'Contact Information',
            fields: [
                defineField({ name: 'email', type: 'string', title: 'Email Address' }),
                defineField({ name: 'phone', type: 'string', title: 'Phone Number' }),
                defineField({ name: 'address', type: 'text', title: 'Office Address', rows: 2 }),
                defineField({
                    name: 'serviceAreas',
                    title: 'Service Areas (for AI Search)',
                    description: '列表化展示服务区域（例如：Altadore, Calgary, Marda Loop）',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: { layout: 'tags' }
                }),
            ],
        }),
        defineField({
            name: 'socialLinks',
            type: 'array',
            title: 'Social Links',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform (e.g., Instagram)' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'footer',
            type: 'object',
            title: 'Footer Content',
            fields: [
                defineField({ name: 'brandStatement', type: 'text', title: 'Brand Statement', rows: 3 }),
                defineField({ name: 'copyrightText', type: 'string', title: 'Copyright Text' }),
            ],
        }),
    ],
})

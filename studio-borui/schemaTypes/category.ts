import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'category',
    title: '文章分类 (Category)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '分类名称',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: '网址路径 (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: '描述',
            type: 'text',
            rows: 3,
        }),
    ],
})

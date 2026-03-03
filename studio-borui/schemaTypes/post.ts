import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: '博客文章 (Blog Post)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '文章标题',
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
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3,
      description: '在列表页显示的简短描述',
    }),
    defineField({
      name: 'readingTime',
      title: '阅读时间 (分钟)',
      type: 'number',
      description: '手动覆盖自动计算的阅读时间',
    }),
    defineField({
      name: 'mainImage',
      title: '封面图',
      type: 'accessibleImage',
    }),
    defineField({
      name: 'publishedAt',
      title: '发布日期',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categories',
      title: '分类',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'author',
      title: '作者',
      type: 'string',
      initialValue: 'Just Peac Homes Team',
    }),
    defineField({
      name: 'content',
      title: '文章内容',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'accessibleImage' },
        defineField({
          name: 'gallery',
          type: 'object',
          title: '图片集 (Gallery)',
          fields: [
            {
              name: 'images',
              type: 'array',
              of: [{ type: 'accessibleImage' }],
              options: { layout: 'grid' }
            },
            {
              name: 'layout',
              type: 'string',
              title: '布局方式',
              options: {
                list: [
                  { title: '两张并排 (Two Columns)', value: 'two-cols' },
                  { title: '三张并排 (Three Columns)', value: 'three-cols' },
                  { title: '瀑布流 (Masonry)', value: 'masonry' },
                ],
                layout: 'radio'
              },
              initialValue: 'two-cols'
            }
          ]
        }),
        defineField({
          name: 'tipBox',
          type: 'object',
          title: '专家建议 (Tip Box)',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: '标题',
              initialValue: 'Pro Tip'
            },
            {
              name: 'content',
              type: 'text',
              title: '内容'
            },
            {
              name: 'type',
              type: 'string',
              options: {
                list: [
                  { title: '建议 (Tip)', value: 'tip' },
                  { title: '警告 (Warning)', value: 'warning' },
                  { title: '注意 (Note)', value: 'note' }
                ],
                layout: 'radio'
              },
              initialValue: 'tip'
            }
          ]
        }),
        defineField({
          name: 'productMention',
          type: 'object',
          title: '产品推荐 (Product Mention)',
          fields: [
            { name: 'name', type: 'string', title: '产品名称' },
            { name: 'link', type: 'url', title: '链接' },
            { name: 'description', type: 'string', title: '简短描述' }
          ]
        }),
        defineField({
          name: 'beforeAfter',
          type: 'object',
          title: '前后对比 (Before/After)',
          fields: [
            { name: 'beforeImage', type: 'accessibleImage', title: 'Before Image' },
            { name: 'afterImage', type: 'accessibleImage', title: 'After Image' },
            { name: 'description', type: 'string', title: '描述' }
          ]
        })
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
      media: 'mainImage',
      subtitle: 'publishedAt',
    },
  },
})

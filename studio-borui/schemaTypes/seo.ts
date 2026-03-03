import { defineField } from 'sanity'

export const seo = {
    name: 'seo',
    type: 'object',
    title: 'SEO & AI Optimization',
    fields: [
        defineField({
            name: 'metaTitle',
            type: 'string',
            title: 'Meta Title',
            description: 'Optimal: 50-60 characters (针对搜索意图编写)',
            validation: (Rule) => Rule.max(60),
        }),
        defineField({
            name: 'breadcrumbTitle',
            type: 'string',
            title: 'Breadcrumb Title',
            description: '用于导航路径的简短标题（例如 "Kitchens" 而不是 "Luxury Kitchen Renovation"）',
        }),
        defineField({
            name: 'metaDescription',
            type: 'text',
            title: 'Meta Description',
            rows: 3,
            description: 'Optimal: 150-160 characters (必须是“结论先行”的句子)',
            validation: (Rule) => Rule.max(160),
        }),
        defineField({
            name: 'socialImage',
            type: 'image',
            title: 'Social Image (Open Graph)',
            description: '用于社交媒体分享（微信/Twitter/LinkedIn）',
        }),
        defineField({
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'aiSummary',
            type: 'text',
            title: 'AI Summary/Context',
            rows: 3,
            description: '供 AI 搜索引擎 (RAG) 理解页面核心内容的简短摘要',
        }),
    ],
}

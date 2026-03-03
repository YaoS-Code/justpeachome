import { defineField } from 'sanity'

export const accessibleImage = {
    name: 'accessibleImage',
    type: 'image',
    title: 'Accessible Image',
    options: {
        hotspot: true,
    },
    fields: [
        defineField({
            name: 'alt',
            type: 'string',
            title: 'Alternative Text (必填)',
            description: '协助 AI 和屏幕阅读器理解图片内容',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            type: 'string',
            title: 'Caption (选填)',
            description: '图片说明，增加语义权重',
        }),
        defineField({
            name: 'contextTag',
            type: 'string',
            title: 'Context Tag',
            description: '决定前端如何渲染以及 AI 如何处理此图片',
            options: {
                list: [
                    { title: 'Product (产品图)', value: 'product' },
                    { title: 'Mood (氛围/背景)', value: 'mood' },
                    { title: 'Diagram (图表/流程)', value: 'diagram' },
                    { title: 'UI (界面)', value: 'ui' },
                ],
                layout: 'radio',
            },
            initialValue: 'mood',
        }),
        defineField({
            name: 'usageType',
            type: 'string',
            title: 'Usage Type (Use Case)',
            description: 'Categorize for specific gallery filters (e.g. Rental vs Personal)',
            options: {
                list: [
                    { title: 'All / Generic', value: 'all' },
                    { title: 'Rental / Income', value: 'rental' },
                    { title: 'Personal / Luxury', value: 'personal' },
                ],
                layout: 'radio',
            },
            initialValue: 'all',
        }),
    ],
}

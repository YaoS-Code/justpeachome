import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'designSystem',
    type: 'document',
    title: 'Design System',
    description: 'Global design tokens for colors, typography, and spacing',
    fields: [
        // ========== COLORS ==========
        defineField({
            name: 'colors',
            type: 'object',
            title: '🎨 Color Palette',
            description: 'Global color scheme for the entire website',
            fields: [
                // Background Colors
                {
                    name: 'backgrounds',
                    type: 'object',
                    title: 'Background Colors',
                    fields: [
                        { name: 'warm', type: 'string', title: 'Warm Background', description: 'Main page background', initialValue: '#FAF8F5' },
                        { name: 'cream', type: 'string', title: 'Cream Background', description: 'Alternate sections', initialValue: '#F5F3EF' },
                        { name: 'white', type: 'string', title: 'White Background', initialValue: '#FFFFFF' },
                    ]
                },
                // Text Colors
                {
                    name: 'text',
                    type: 'object',
                    title: 'Text Colors',
                    fields: [
                        { name: 'primary', type: 'string', title: 'Primary Text', description: 'Main body text', initialValue: '#1A1A1A' },
                        { name: 'secondary', type: 'string', title: 'Secondary Text', description: 'Subtitles, captions', initialValue: '#2D3748' },
                        { name: 'muted', type: 'string', title: 'Muted Text', description: 'Less important text', initialValue: '#4A5568' },
                        { name: 'olive', type: 'string', title: 'Olive Text', description: 'Headings on light backgrounds', initialValue: '#2C3E2D' },
                        { name: 'white', type: 'string', title: 'White Text', description: 'Text on dark backgrounds', initialValue: '#FFFFFF' },
                    ]
                },
                // Accent Colors
                {
                    name: 'accents',
                    type: 'object',
                    title: 'Accent Colors',
                    fields: [
                        { name: 'clay', type: 'string', title: 'Clay (Primary)', description: 'Primary brand color', initialValue: '#B8653E' },
                        { name: 'clayDark', type: 'string', title: 'Clay Dark', description: 'Hover state for clay', initialValue: '#9A5528' },
                        { name: 'taupe', type: 'string', title: 'Taupe (Secondary)', description: 'Secondary accent', initialValue: '#8B7355' },
                        { name: 'wood', type: 'string', title: 'Wood', description: 'Tertiary accent', initialValue: '#6B5D4F' },
                    ]
                },
                // Border Colors
                {
                    name: 'borders',
                    type: 'object',
                    title: 'Border Colors',
                    fields: [
                        { name: 'light', type: 'string', title: 'Light Border', initialValue: '#E8E4DF' },
                        { name: 'medium', type: 'string', title: 'Medium Border', initialValue: '#D1CCC4' },
                        { name: 'dark', type: 'string', title: 'Dark Border', initialValue: '#2D3748' },
                    ]
                },
            ]
        }),

        // ========== TYPOGRAPHY ==========
        defineField({
            name: 'typography',
            type: 'object',
            title: '📝 Typography',
            description: 'Font families and text sizes',
            fields: [
                // Font Families
                {
                    name: 'fonts',
                    type: 'object',
                    title: 'Font Families',
                    fields: [
                        { 
                            name: 'display', 
                            type: 'string', 
                            title: 'Display Font (Headings)', 
                            description: 'Used for h1, h2, h3, etc.',
                            initialValue: 'Cormorant Garamond, serif',
                            options: {
                                list: [
                                    { title: 'Cormorant Garamond (Serif)', value: 'Cormorant Garamond, serif' },
                                    { title: 'Playfair Display (Serif)', value: 'Playfair Display, serif' },
                                    { title: 'Lora (Serif)', value: 'Lora, serif' },
                                    { title: 'Crimson Text (Serif)', value: 'Crimson Text, serif' },
                                ]
                            }
                        },
                        { 
                            name: 'body', 
                            type: 'string', 
                            title: 'Body Font (Text)', 
                            description: 'Used for paragraphs and body text',
                            initialValue: 'Manrope, sans-serif',
                            options: {
                                list: [
                                    { title: 'Manrope (Sans-serif)', value: 'Manrope, sans-serif' },
                                    { title: 'Inter (Sans-serif)', value: 'Inter, sans-serif' },
                                    { title: 'Open Sans (Sans-serif)', value: 'Open Sans, sans-serif' },
                                    { title: 'Lato (Sans-serif)', value: 'Lato, sans-serif' },
                                ]
                            }
                        },
                    ]
                },
                // Heading Sizes
                {
                    name: 'headingSizes',
                    type: 'object',
                    title: 'Heading Sizes',
                    fields: [
                        { name: 'h1', type: 'string', title: 'H1 Size', description: 'e.g., 3.5rem or 56px', initialValue: '3.5rem' },
                        { name: 'h2', type: 'string', title: 'H2 Size', description: 'e.g., 2.5rem or 40px', initialValue: '2.5rem' },
                        { name: 'h3', type: 'string', title: 'H3 Size', description: 'e.g., 2rem or 32px', initialValue: '2rem' },
                        { name: 'h4', type: 'string', title: 'H4 Size', description: 'e.g., 1.5rem or 24px', initialValue: '1.5rem' },
                    ]
                },
                // Body Text Sizes
                {
                    name: 'textSizes',
                    type: 'object',
                    title: 'Body Text Sizes',
                    fields: [
                        { name: 'base', type: 'string', title: 'Base Text', description: 'Default paragraph size', initialValue: '1rem' },
                        { name: 'large', type: 'string', title: 'Large Text', description: 'Lead paragraphs', initialValue: '1.125rem' },
                        { name: 'small', type: 'string', title: 'Small Text', description: 'Captions, footnotes', initialValue: '0.875rem' },
                    ]
                },
            ]
        }),

        // ========== SPACING ==========
        defineField({
            name: 'spacing',
            type: 'object',
            title: '📏 Spacing Scale',
            description: 'Consistent spacing for margins, padding, and gaps',
            fields: [
                { name: 'xs', type: 'string', title: 'Extra Small', description: 'Tight spacing', initialValue: '0.5rem' },
                { name: 'sm', type: 'string', title: 'Small', description: 'Component padding', initialValue: '1rem' },
                { name: 'md', type: 'string', title: 'Medium', description: 'Card padding', initialValue: '1.5rem' },
                { name: 'lg', type: 'string', title: 'Large', description: 'Section spacing', initialValue: '2rem' },
                { name: 'xl', type: 'string', title: 'Extra Large', description: 'Major sections', initialValue: '3rem' },
                { name: 'xxl', type: 'string', title: '2X Large', description: 'Hero sections', initialValue: '4rem' },
            ]
        }),
    ],
})


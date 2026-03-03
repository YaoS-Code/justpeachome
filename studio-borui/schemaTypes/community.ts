import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'community',
    title: 'Community',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Community Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'accessibleImage'
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'zoningTypes',
            title: 'Zoning Types',
            type: 'array',
            description: 'Common zoning designations in this community (e.g., R-C1, R-C2, R-CG)',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'code',
                        title: 'Zoning Code',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'R-C1 (Contextual One Dwelling)', value: 'R-C1' },
                                { title: 'R-C2 (Contextual One/Two Dwelling)', value: 'R-C2' },
                                { title: 'R-CG (Contextual Grade-Oriented)', value: 'R-CG' },
                                { title: 'M-C1 (Multi-Residential Contextual Low Profile)', value: 'M-C1' },
                                { title: 'M-C2 (Multi-Residential Contextual Medium Profile)', value: 'M-C2' }
                            ]
                        }
                    },
                    {
                        name: 'description',
                        title: 'Description',
                        type: 'text',
                        rows: 2
                    },
                    {
                        name: 'allowsSecondarysuites',
                        title: 'Allows Secondary Suites',
                        type: 'boolean',
                        initialValue: false
                    },
                    {
                        name: 'allowsBackyardSuites',
                        title: 'Allows Backyard Suites',
                        type: 'boolean',
                        initialValue: false
                    }
                ]
            }]
        }),
        defineField({
            name: 'characteristics',
            title: 'Neighborhood Characteristics',
            type: 'object',
            description: 'Key features and demographics of this community',
            fields: [
                {
                    name: 'era',
                    title: 'Development Era',
                    type: 'string',
                    description: 'When was this neighborhood primarily developed?',
                    options: {
                        list: [
                            { title: 'Pre-1950s (Heritage)', value: 'heritage' },
                            { title: '1950s-1970s (Established)', value: 'established' },
                            { title: '1980s-2000s (Mature)', value: 'mature' },
                            { title: '2000s+ (New)', value: 'new' }
                        ]
                    }
                },
                {
                    name: 'lotSizes',
                    title: 'Typical Lot Sizes',
                    type: 'string',
                    description: 'e.g., "25\' x 120\' to 50\' x 120\'"'
                },
                {
                    name: 'homeStyles',
                    title: 'Common Home Styles',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: {
                        list: [
                            { title: 'Bungalow', value: 'bungalow' },
                            { title: 'Two-Storey', value: 'two-storey' },
                            { title: 'Split-Level', value: 'split-level' },
                            { title: 'Heritage/Character', value: 'heritage' },
                            { title: 'Modern Infill', value: 'modern-infill' },
                            { title: 'Craftsman', value: 'craftsman' }
                        ]
                    }
                },
                {
                    name: 'walkScore',
                    title: 'Walk Score',
                    type: 'number',
                    description: 'Walkability score (0-100)',
                    validation: Rule => Rule.min(0).max(100)
                },
                {
                    name: 'transitAccess',
                    title: 'Transit Access',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Excellent (LRT + Bus)', value: 'excellent' },
                            { title: 'Good (Multiple Bus Routes)', value: 'good' },
                            { title: 'Moderate (Some Bus Routes)', value: 'moderate' },
                            { title: 'Limited', value: 'limited' }
                        ]
                    }
                },
                {
                    name: 'proximityToDowntown',
                    title: 'Distance to Downtown',
                    type: 'string',
                    description: 'e.g., "5 km" or "10 minutes by car"'
                }
            ]
        }),
        defineField({
            name: 'amenities',
            title: 'Local Amenities',
            type: 'array',
            description: 'Schools, parks, shopping, etc.',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'investmentPotential',
            title: 'Investment Potential',
            type: 'object',
            description: 'Information for investment-focused clients',
            fields: [
                {
                    name: 'rentalDemand',
                    title: 'Rental Demand',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Very High', value: 'very-high' },
                            { title: 'High', value: 'high' },
                            { title: 'Moderate', value: 'moderate' },
                            { title: 'Low', value: 'low' }
                        ]
                    }
                },
                {
                    name: 'averageRent',
                    title: 'Average Rental Rate',
                    type: 'string',
                    description: 'e.g., "$1,500-1,800/month for 1BR suite"'
                },
                {
                    name: 'propertyAppreciation',
                    title: 'Property Appreciation Trend',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Strong Growth', value: 'strong' },
                            { title: 'Steady Growth', value: 'steady' },
                            { title: 'Stable', value: 'stable' }
                        ]
                    }
                }
            ]
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo'
        })
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage'
        }
    }
})

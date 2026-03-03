import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singletons
            S.listItem()
                .title('Site Settings')
                .id('siteSettings')
                .child(S.document().schemaType('siteSettings').documentId('singleton-siteSettings')),
            S.listItem()
                .title('🎨 Design System')
                .id('designSystem')
                .child(S.document().schemaType('designSystem').documentId('singleton-designSystem')),
            S.divider(),
            S.listItem()
                .title('Home Page')
                .id('homePage')
                .child(S.document().schemaType('homePage').documentId('ae8dd291-d52f-4a80-969a-c7f931e0229c')),
            S.listItem()
                .title('About Page')
                .id('aboutPage')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
                .title('Contact Page')
                .id('contactPage')
                .child(S.document().schemaType('contactPage').documentId('singleton-contactPage')),
            S.listItem()
                .title('Blog Page Settings')
                .id('blogPage')
                .child(S.document().schemaType('blogPage').documentId('singleton-blogPage')),
            S.listItem()
                .title('Services Page Settings')
                .id('servicesPage')
                .child(S.document().schemaType('servicesPage').documentId('singleton-servicesPage')),
            S.listItem()
                .title('Projects Page Settings')
                .id('projectsPage')
                .child(S.document().schemaType('projectsPage').documentId('singleton-projectsPage')),
            S.divider(),
            // Document Lists
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('community').title('Communities'),
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('processStep').title('Process Steps'),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
        ])

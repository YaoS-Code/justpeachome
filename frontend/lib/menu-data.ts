interface MenuItem {
  title: string
  href: string
  image: string
  description: string
}

interface MenuCategory {
  title: string
  items: MenuItem[]
}

export const megamenuData: Record<string, MenuCategory> = {
  services: {
    title: 'Our Services',
    items: [
      {
        title: 'Kitchen Renovation',
        href: '/services/kitchen',
        image: '/images/menu/kitchen-renovation.jpg',
        description: 'Custom cabinets, countertops & islands',
      },
      {
        title: 'Bathroom Renovation',
        href: '/services/bathroom-renovation',
        image: '/images/menu/bathroom-renovation.jpg',
        description: 'Luxury vanities, tiles & fixtures',
      },
      {
        title: 'Basement Development',
        href: '/services/basement-development',
        image: '/images/services/basement-suites.png',
        description: 'Legal suites & luxury living spaces',
      },
      {
        title: 'Backyard Suites',
        href: '/services/backyard-suites',
        image: '/images/services/backyard-suites.png',
        description: 'Custom laneway houses & garden suites',
      },
      {
        title: 'Infill Development',
        href: '/services/infill-development',
        image: '/images/services/infill-development.png',
        description: 'R-CG zoning custom homes',
      },
      {
        title: 'Heritage Restoration',
        href: '/services/heritage-restoration',
        image: '/images/menu/heritage-restoration.jpg',
        description: 'Preserving Calgary\'s character homes',
      },
      {
        title: 'Whole Home Renovation',
        href: '/services/whole-home-renovation',
        image: '/images/menu/whole-home-renovation.jpg',
        description: 'Complete transformations',
      },
    ],
  },
  projects: {
    title: 'Featured Projects',
    items: [
      {
        title: 'Altadore Modern',
        href: '/projects/altadore-modern',
        image: '/images/menu/project-altadore.jpg',
        description: 'Complete home transformation',
      },
      {
        title: 'Lake Bonavista Estate',
        href: '/projects/lake-bonavista-estate',
        image: '/images/menu/project-lake-bonavista.jpg',
        description: 'Luxury infill development',
      },
      {
        title: 'Marda Loop Heritage',
        href: '/projects/marda-loop-heritage',
        image: '/images/menu/project-marda-loop.jpg',
        description: 'Historic home restoration',
      },
      {
        title: 'Killarney Kitchen',
        href: '/projects/killarney-kitchen',
        image: '/images/menu/project-killarney.jpg',
        description: 'Modern kitchen redesign',
      },
    ],
  },
  communities: {
    title: 'Communities We Serve',
    items: [
      {
        title: 'Altadore',
        href: '/communities/altadore',
        image: '/images/menu/community-altadore.jpg',
        description: 'Inner-city luxury renovations',
      },
      {
        title: 'Lake Bonavista',
        href: '/communities/lake-bonavista',
        image: '/images/menu/community-lake-bonavista.jpg',
        description: 'Estate & infill specialists',
      },
      {
        title: 'Marda Loop',
        href: '/communities/marda-loop',
        image: '/images/menu/community-marda-loop.jpg',
        description: 'Heritage & modern fusion',
      },
      {
        title: 'Killarney',
        href: '/communities/killarney',
        image: '/images/menu/community-killarney.jpg',
        description: 'Family-friendly renovations',
      },
    ],
  },
}

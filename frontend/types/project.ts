export interface Project {
  _id: string;
  title: string;
  slug: string;
  coverImage: any;
  heroImage?: any;
  imageUrl?: string;
  imageAlt?: string;
  completionDate?: string;
  description?: any;
  content?: any;
  shortDescription?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: any;
    breadcrumbTitle?: string;
  };
  tags?: string[];
  features?: string[];
  role?: string;
  concept?: any;
  environment?: any;
  beforeAfter?: Array<{
    _key?: string;
    description?: string;
    beforeImage: any;
    afterImage: any;
  }>;
  projectCategory?: 'investment' | 'luxury' | 'both' | 'legal-suite' | 'backyard-suite' | 'luxury-renovation' | 'kitchen-bath';
  rentalIncome?: string;
  roi?: string;
  materialFocus?: string;
  complianceBadges?: string[];
  permitInfo?: {
    developmentPermit?: boolean;
    buildingPermit?: boolean;
    approvalDate?: string;
    notes?: string;
  };
  materialSpecs?: Array<{
    category: string;
    material: string;
    brand?: string;
    reason?: string;
  }>;
  hoverImage?: any;
  projectStory?: {
    vision?: any;
    process?: any;
    outcome?: any;
  };
  timeline?: Array<{
    _key?: string;
    phase: string;
    duration?: string;
    description?: string;
    date?: string;
  }>;
  challengesSolved?: Array<{
    _key?: string;
    challenge: string;
    solution?: string;
  }>;
  clientQuote?: {
    quote?: string;
    clientName?: string;
    clientRole?: string;
  };
}

export interface ProjectDetail extends Project {
  gallery?: Array<{
    _key: string;
    url?: string;
    alt?: string;
  }>;
  detailedGallery?: Array<{
    _key: string;
    url?: string;
    alt?: string;
  }>;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt: string;
  categories?: any[];
  author?: string;
  readTime?: number;
  readingTime?: number;
  content?: any;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    socialImage?: any;
    breadcrumbTitle?: string;
  };
}

export interface PostDetail extends Post {
  content: any;
}

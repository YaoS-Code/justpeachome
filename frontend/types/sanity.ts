import { PortableTextBlock as SanityPortableTextBlock } from "sanity";

export interface SanityImage {
    _type: "image";
    asset: {
        _ref?: string;
        _type: "reference";
        _id?: string;
        url?: string;
    };
    alt?: string;
    caption?: string;
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface Category {
    _id: string;
    _type: "category";
    title: string;
    slug: {
        current: string;
    };
    description?: string;
}

export interface Author {
    name: string;
    image?: SanityImage;
}

export interface GalleryBlock {
    _type: "gallery";
    images: SanityImage[];
    layout: "two-cols" | "three-cols" | "masonry";
}

export interface TipBoxBlock {
    _type: "tipBox";
    title: string;
    content: string;
    type: "tip" | "warning" | "note";
}

export interface ProductMentionBlock {
    _type: "productMention";
    name: string;
    link: string;
    description?: string;
}

export interface BeforeAfterBlock {
    _type: "beforeAfter";
    beforeImage: SanityImage;
    afterImage: SanityImage;
    description?: string;
}

export type PortableTextBlock =
    | SanityPortableTextBlock
    | SanityImage
    | GalleryBlock
    | TipBoxBlock
    | ProductMentionBlock
    | BeforeAfterBlock;

export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    slug: {
        current: string;
    };
    excerpt?: string;
    readingTime?: number;
    mainImage?: SanityImage;
    publishedAt: string;
    categories: Category[];
    author: string;
    content: PortableTextBlock[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
}

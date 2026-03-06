export type PortableTextBlock = Record<string, unknown>;

export type SanityImage = {
  _type?: "image";
  alt?: string;
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
};

export type CategoryReference = {
  _id: string;
  title: string;
  description?: string;
  slug: string;
};

export type AuthorReference = {
  _id: string;
  name: string;
  slug: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
};

export type NewsPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  body: PortableTextBlock[];
  mainImage?: SanityImage;
  excerpt: string;
  author?: AuthorReference;
  categories: CategoryReference[];
};

export type Department = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  postCount: number;
  latestPost?: NewsPost;
  posts: NewsPost[];
};

export type Doctor = {
  _id: string;
  name: string;
  slug: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
  specialties: string[];
  postCount: number;
  latestPost?: NewsPost;
  posts: NewsPost[];
};

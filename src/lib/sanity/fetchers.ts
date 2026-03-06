import { excerpt, plainTextFromPortableText, slugify } from "../format";
import { sanityClient } from "./client";
import { AUTHORS_QUERY, CATEGORIES_QUERY, NEWS_POSTS_QUERY } from "./queries";
import type { AuthorReference, CategoryReference, Department, Doctor, NewsPost, PortableTextBlock } from "./types";

type RawPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  body?: PortableTextBlock[];
  mainImage?: NewsPost["mainImage"];
  author?: AuthorReference;
  categories?: Array<{ _id: string; title: string; description?: string }>;
};

type RawAuthor = {
  _id: string;
  name: string;
  slug?: string;
  image?: Doctor["image"];
  bio?: PortableTextBlock[];
};

type RawCategory = {
  _id: string;
  title: string;
  description?: string;
};

function mapCategory(raw: RawCategory): CategoryReference {
  return {
    _id: raw._id,
    title: raw.title,
    description: raw.description,
    slug: slugify(raw.title, raw._id),
  };
}

function mapPost(raw: RawPost): NewsPost {
  const body = raw.body ?? [];
  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug,
    publishedAt: raw.publishedAt,
    body,
    mainImage: raw.mainImage,
    excerpt: excerpt(plainTextFromPortableText(body), 120),
    author: raw.author
      ? {
          ...raw.author,
          slug: raw.author.slug || slugify(raw.author.name, raw.author._id),
        }
      : undefined,
    categories: (raw.categories ?? []).map(mapCategory),
  };
}

export async function fetchNewsPosts() {
  const posts = await sanityClient.fetch<RawPost[]>(NEWS_POSTS_QUERY);
  return posts.map(mapPost);
}

export async function fetchNewsPostBySlug(slug: string) {
  const posts = await fetchNewsPosts();
  return posts.find((post) => post.slug === slug);
}

export async function fetchDepartments(): Promise<Department[]> {
  const [categories, posts] = await Promise.all([
    sanityClient.fetch<RawCategory[]>(CATEGORIES_QUERY),
    fetchNewsPosts(),
  ]);

  return categories.map((category) => {
    const mappedCategory = mapCategory(category);
    const relatedPosts = posts.filter((post) => post.categories.some((item) => item._id === category._id));
    return {
      _id: category._id,
      title: category.title,
      slug: mappedCategory.slug,
      description: category.description ?? "診療内容の詳細は現在準備中です。",
      postCount: relatedPosts.length,
      latestPost: relatedPosts[0],
      posts: relatedPosts,
    };
  });
}

export async function fetchDepartmentBySlug(slug: string) {
  const departments = await fetchDepartments();
  return departments.find((department) => department.slug === slug);
}

export async function fetchDoctors(): Promise<Doctor[]> {
  const [authors, posts] = await Promise.all([
    sanityClient.fetch<RawAuthor[]>(AUTHORS_QUERY),
    fetchNewsPosts(),
  ]);

  return authors.map((author) => {
    const relatedPosts = posts.filter((post) => post.author?._id === author._id);
    const specialties = [...new Set(relatedPosts.flatMap((post) => post.categories.map((category) => category.title)))];

    return {
      _id: author._id,
      name: author.name,
      slug: author.slug || slugify(author.name, author._id),
      image: author.image,
      bio: author.bio,
      specialties,
      postCount: relatedPosts.length,
      latestPost: relatedPosts[0],
      posts: relatedPosts,
    };
  });
}

export async function fetchDoctorBySlug(slug: string) {
  const doctors = await fetchDoctors();
  return doctors.find((doctor) => doctor.slug === slug);
}

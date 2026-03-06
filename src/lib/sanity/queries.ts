export const NEWS_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    body,
    mainImage,
    "author": author->{
      _id,
      name,
      "slug": coalesce(slug.current, ""),
      image,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      description
    }
  }
`;

export const AUTHORS_QUERY = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    "slug": coalesce(slug.current, ""),
    image,
    bio
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    description
  }
`;

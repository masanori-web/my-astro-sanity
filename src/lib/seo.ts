import { siteConfig } from "./site";

export type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

export function buildSeo(input: SeoInput = {}) {
  const pageTitle = input.title ? `${input.title} | ${siteConfig.name}` : siteConfig.name;
  const description = input.description ?? siteConfig.description;
  const canonical = new URL(input.path ?? "/", `${siteConfig.url}/`).toString();
  const image = input.image ? new URL(input.image, `${siteConfig.url}/`).toString() : `${siteConfig.url}/images/og-default.jpg`;

  return {
    title: pageTitle,
    description,
    canonical,
    image,
    noindex: input.noindex ?? false,
  };
}

import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder(sanityClient);

export function imageUrl(source?: SanityImage) {
  return source?.asset?._ref ? builder.image(source) : null;
}

export function imageUrlOrFallback(source: SanityImage | undefined, fallback: string) {
  return imageUrl(source)?.auto("format").fit("crop").url() ?? fallback;
}

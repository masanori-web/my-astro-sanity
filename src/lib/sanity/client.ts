import { createClient } from "@sanity/client";
import { siteConfig } from "../site";

if (!siteConfig.sanity.projectId) {
  console.warn("SANITY project id is not configured. Check src/lib/site.ts and environment variables.");
}

export const sanityClient = createClient({
  projectId: siteConfig.sanity.projectId,
  dataset: siteConfig.sanity.dataset,
  apiVersion: siteConfig.sanity.apiVersion,
  useCdn: siteConfig.sanity.useCdn,
});

import { createClient } from "@sanity/client";
export const client = createClient({
 projectId: import.meta.env.SANITY_PROJECT_ID,
 dataset: import.meta.env.SANITY_DATASET,
 apiVersion: "2026-03-04",
 useCdn: true,
});
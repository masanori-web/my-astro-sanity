export type AppEnvironment = "development" | "staging" | "production";

function resolveAppEnvironment(): AppEnvironment {
  const env = (import.meta.env.PUBLIC_APP_ENV ?? import.meta.env.MODE ?? "development").toLowerCase();
  if (env === "production" || env === "staging") return env;
  return "development";
}

function resolveDataset(appEnv: AppEnvironment) {
  if (import.meta.env.PUBLIC_SANITY_DATASET) return import.meta.env.PUBLIC_SANITY_DATASET;
  if (appEnv === "production" && import.meta.env.PUBLIC_SANITY_DATASET_PRODUCTION) {
    return import.meta.env.PUBLIC_SANITY_DATASET_PRODUCTION;
  }
  if (appEnv === "staging" && import.meta.env.PUBLIC_SANITY_DATASET_STAGING) {
    return import.meta.env.PUBLIC_SANITY_DATASET_STAGING;
  }
  return import.meta.env.SANITY_DATASET ?? "production";
}

const appEnv = resolveAppEnvironment();
const sanityProjectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? import.meta.env.SANITY_PROJECT_ID ?? "";

export const siteConfig = {
  appEnv,
  name: import.meta.env.PUBLIC_SITE_NAME ?? "Medical Center",
  description:
    import.meta.env.PUBLIC_SITE_DESCRIPTION ??
    "地域医療と専門外来の情報をわかりやすく届けるための病院サイトです。",
  url: (import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321").replace(/\/$/, ""),
  sanity: {
    projectId: sanityProjectId,
    dataset: resolveDataset(appEnv),
    apiVersion: import.meta.env.SANITY_API_VERSION ?? "2026-03-04",
    useCdn: appEnv === "production",
  },
  contact: {
    phone: "075-000-0000",
    hours: "平日 9:00-17:00",
    address: "京都市 00-00",
  },
  navigation: [
    { href: "/news/", label: "お知らせ" },
    { href: "/departments/", label: "診療科" },
    { href: "/doctors/", label: "医師紹介" },
    { href: "/recruit/", label: "採用情報" },
    { href: "/access", label: "アクセス" },
    { href: "/contact", label: "お問い合わせ" },
  ],
} as const;

# Web

Astro + Sanity で構築する病院サイトのフロントエンドです。`index.astro` にクエリやスタイルを詰め込まず、Sanity 依存は `src/lib/site.ts` と `src/lib/sanity/` に集約しています。

## Structure

```text
web/
├─ public/
├─ src/
│  ├─ components/
│  ├─ layouts/
│  ├─ lib/
│  │  ├─ sanity/
│  │  ├─ seo.ts
│  │  ├─ site.ts
│  │  └─ format.ts
│  ├─ pages/
│  └─ styles/
├─ astro.config.mjs
├─ netlify.toml
├─ package.json
└─ tsconfig.json
```

## Environment

`.env` に全部を書くだけではなく、配信時の参照先は `src/lib/site.ts` で一元管理します。`PUBLIC_APP_ENV` と dataset 関連値をここから解決するので、staging / production の切り替え先をページ側に散らさない構成です。

Required values:

```env
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_APP_ENV=development
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
PUBLIC_SANITY_DATASET_STAGING=staging
PUBLIC_SANITY_DATASET_PRODUCTION=production
```

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

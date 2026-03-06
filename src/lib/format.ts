export function formatDate(value?: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function excerpt(text: string, maxLength = 120) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}...`;
}

export function slugify(value: string, fallback = "") {
  const normalized = value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return normalized || fallback;
}

export function plainTextFromPortableText(blocks: unknown[] = []) {
  return blocks
    .filter((block): block is { _type?: string; children?: unknown[] } => typeof block === "object" && block !== null)
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .flatMap((block) => block.children ?? [])
    .filter((child): child is { _type?: string; text?: string } => typeof child === "object" && child !== null)
    .filter((child) => child._type === "span" && typeof child.text === "string")
    .map((child) => child.text?.trim() ?? "")
    .filter(Boolean)
    .join(" ");
}

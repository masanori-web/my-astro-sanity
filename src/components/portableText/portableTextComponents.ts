import React from "react";
import { imageUrl } from "../../lib/sanity/image";

export const portableTextComponents = {
  block: {
    h2: ({ children }: { children: React.ReactNode }) => React.createElement("h2", null, children),
    h3: ({ children }: { children: React.ReactNode }) => React.createElement("h3", null, children),
    h4: ({ children }: { children: React.ReactNode }) => React.createElement("h4", null, children),
    blockquote: ({ children }: { children: React.ReactNode }) =>
      React.createElement("blockquote", null, children),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href?: string } }) =>
      React.createElement(
        "a",
        {
          href: value?.href ?? "#",
          target: "_blank",
          rel: "noreferrer",
        },
        children,
      ),
  },
  types: {
    image: ({ value }: { value?: Parameters<typeof imageUrl>[0] }) =>
      React.createElement("img", {
        src: imageUrl(value)?.width(1200).auto("format").url() ?? "/images/placeholders/news.svg",
        alt: value?.alt ?? "",
      }),
  },
};

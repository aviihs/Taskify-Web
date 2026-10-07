import type { Metadata } from "next";

import site from "@/data/site.json";

// Absolute origin used for canonical URLs, the sitemap, Open Graph and
// structured data. Set NEXT_PUBLIC_SITE_URL in production; on Vercel the
// production domain is picked up automatically.
function resolveSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "http://localhost:3000";
  return configuredUrl.replace(/\/$/, "");
}

export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

// Every public route, in the order it should appear in the sitemap and llms.txt.
export const PUBLIC_ROUTES = [
  {
    path: "/",
    title: "Home",
    summary: "What Taskify is, its features, workflow and download links.",
    priority: 1,
  },
  {
    path: "/about",
    title: "About",
    summary: `Why Taskify exists, its values, and its creator ${site.creator.name}.`,
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Contact",
    summary:
      "How to reach the Taskify team for support, feedback or privacy requests.",
    priority: 0.7,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    summary: "What data Taskify collects, how it is used and your rights.",
    priority: 0.5,
  },
] as const;

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

// Per-page metadata: canonical URL plus matching Open Graph / Twitter cards.
// The Open Graph image comes from each route's opengraph-image.tsx.
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords: [...keywords, ...site.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: `${title} · ${site.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

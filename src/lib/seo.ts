import type { Metadata } from "next";

import site from "@/data/site.json";

// Keep canonical URLs on the official domain, including preview deployments.
// NEXT_PUBLIC_SITE_URL can override the origin for a deliberate domain change.
function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;
  return new URL(configuredUrl).origin;
}

export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

// Every public route, in the order it should appear in the sitemap and llms.txt.
// Update lastModified when content, metadata or links materially change.
export const PUBLIC_ROUTES = [
  {
    path: "/",
    title: "Home",
    summary: "What Taskify is, its features, workflow and download links.",
    priority: 1,
    lastModified: "2026-10-14",
  },
  {
    path: "/help/getting-started",
    title: "Getting started with Taskify",
    summary:
      "How to create an account, set up a project, assign tasks and follow progress in the Android and iOS app.",
    priority: 0.8,
    lastModified: "2026-10-14",
  },
  {
    path: "/about",
    title: "About",
    summary: `Why Taskify exists, its values, and its creator ${site.creator.name}.`,
    priority: 0.8,
    lastModified: "2026-10-14",
  },
  {
    path: "/contact",
    title: "Contact",
    summary:
      "How to reach the Taskify team for support, feedback or privacy requests.",
    priority: 0.7,
    lastModified: "2026-10-14",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    summary: "What data Taskify collects, how it is used and your rights.",
    priority: 0.5,
    lastModified: "2026-10-14",
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
    title: { absolute: title },
    description,
    keywords: [...keywords, ...site.keywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

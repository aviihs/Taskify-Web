// schema.org JSON-LD builders. Search engines and AI assistants read these to
// understand who made Taskify and what each page is about.
import site from "@/data/site.json";

import { absoluteUrl, SITE_URL } from "./seo";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const CREATOR_ID = `${SITE_URL}/#creator`;
export const APP_ID = `${SITE_URL}/#app`;

export function buildCreatorSchema() {
  return {
    "@type": "Person",
    "@id": CREATOR_ID,
    name: site.creator.name,
    jobTitle: site.creator.role,
    image: absoluteUrl(site.creator.image),
    url: site.creator.url,
    sameAs: site.creator.sameAs,
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

// Site-wide graph rendered once in the root layout.
export function buildSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: site.name,
        legalName: site.legalName,
        url: SITE_URL,
        logo: absoluteUrl("/icon.png"),
        email: site.contactEmail,
        description: site.description,
        founder: { "@id": CREATOR_ID },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.contactEmail,
          url: absoluteUrl("/contact"),
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: site.name,
        url: SITE_URL,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": ORGANIZATION_ID },
        creator: { "@id": CREATOR_ID },
      },
      buildCreatorSchema(),
    ],
  };
}

export function buildAppSchema(features: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: site.name,
    description: site.description,
    url: SITE_URL,
    image: absoluteUrl("/opengraph-image"),
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Task management",
    operatingSystem: "Android, iOS",
    featureList: features,
    author: { "@id": CREATOR_ID },
    creator: { "@id": CREATOR_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

interface WebPageSchemaOptions {
  type: "WebPage" | "AboutPage" | "ContactPage";
  path: string;
  title: string;
  description: string;
  dateModified?: string;
}

// A page entry plus its breadcrumb trail back to the home page.
export function buildWebPageSchema({
  type,
  path,
  title,
  description,
  dateModified,
}: WebPageSchemaOptions) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": type === "AboutPage" ? CREATOR_ID : ORGANIZATION_ID },
        ...(dateModified && { dateModified }),
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

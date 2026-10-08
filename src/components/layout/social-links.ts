import site from "@/data/site.json";

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  isExternal: boolean;
}

// Shared by the top bar and the footer so the two never drift apart.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Email",
    href: `mailto:${site.contactEmail}`,
    icon: "lucide:mail",
    isExternal: false,
  },
  {
    label: "GitHub",
    href: site.creator.github,
    icon: "mdi:github",
    isExternal: true,
  },
  {
    label: `${site.creator.name}'s website`,
    href: site.creator.url,
    icon: "lucide:globe",
    isExternal: true,
  },
];

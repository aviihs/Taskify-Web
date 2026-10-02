import Link from "next/link";

import Icon from "@/components/common/icon";
import BrandLogo from "@/components/reusable/BrandLogo";
import site from "@/data/site.json";

const FOOTER_LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Workflow", href: "/#workflow" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Download", href: "/#download" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Data deletion", href: "/privacy-policy#retention" },
      { label: "Your rights", href: "/privacy-policy#your-rights" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-taskify-surface border-taskify-border/60 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-xs">
          <BrandLogo />
          <p className="text-taskify-text-secondary mt-3 text-sm leading-relaxed">
            {site.tagline}
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-taskify-link mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            <Icon name="lucide:mail" className="cursor-pointer text-sm" />
            {site.contactEmail}
          </a>
        </div>

        {FOOTER_LINK_GROUPS.map(group => (
          <div key={group.title}>
            <p className="text-taskify-text text-sm font-semibold">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {group.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-taskify-text-secondary hover:text-taskify-link text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-taskify-border/60 border-t">
        <div className="text-taskify-text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Made with care for teams that get things done.</p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

import Icon from "@/components/common/icon";
import BrandLogo from "@/components/reusable/BrandLogo";
import site from "@/data/site.json";

import { SOCIAL_LINKS } from "../social-links";

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
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Security", href: "/#security" },
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
    <footer className="bg-taskify-surface border-taskify-border/60 relative overflow-hidden border-t">
      <div
        aria-hidden
        className="via-taskify-accent/50 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 pt-14 pb-10 sm:grid-cols-3 sm:px-4 sm:pt-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:max-w-xs">
          <BrandLogo />
          <p className="text-taskify-text-secondary mt-4 max-w-sm text-sm leading-relaxed">
            {site.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group border-taskify-border/80 text-taskify-text hover:border-taskify-accent interactive-button inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium"
            >
              <Icon
                name="lucide:message-circle"
                className="text-taskify-link text-sm lg:text-sm"
              />
              Talk to us
              <Icon
                name="lucide:arrow-right"
                className="text-sm transition-transform group-hover:translate-x-0.5 lg:text-sm"
              />
            </Link>
            <ul className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener" : undefined}
                    aria-label={link.label}
                    className="border-taskify-border/80 text-taskify-text-secondary hover:border-taskify-accent hover:text-taskify-link interactive-button flex size-9 items-center justify-center rounded-full border"
                  >
                    <Icon name={link.icon} className="text-sm lg:text-sm" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {FOOTER_LINK_GROUPS.map(group => (
          <div key={group.title}>
            <p className="text-taskify-text-muted text-xs font-semibold tracking-[0.16em] uppercase">
              {group.title}
            </p>
            <ul className="mt-4 space-y-1 sm:mt-5 sm:space-y-3">
              {group.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-taskify-text-secondary hover:text-taskify-text block py-1.5 text-sm transition-colors sm:inline sm:py-0"
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
        <div className="text-taskify-text-muted mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 py-6 text-center text-sm sm:flex-row sm:justify-between sm:px-4 sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights
            reserved.
          </p>
          <p>
            Built by{" "}
            <a
              href={site.creator.url}
              target="_blank"
              rel="author noopener"
              className="text-taskify-text-secondary hover:text-taskify-link font-medium transition-colors"
            >
              {site.creator.name}
            </a>
          </p>
        </div>
      </div>

      <p
        aria-hidden
        className="from-taskify-surface-variant pointer-events-none -mb-4 bg-linear-to-b to-transparent bg-clip-text text-center text-[22vw] leading-none font-black tracking-tighter text-transparent select-none sm:-mb-6 lg:-mb-12 lg:text-[16rem]"
      >
        {site.name}
      </p>
    </footer>
  );
}

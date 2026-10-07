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

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-12 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="max-w-xs sm:col-span-3 lg:col-span-1">
          <BrandLogo />
          <p className="text-taskify-text-secondary mt-4 text-sm leading-relaxed">
            {site.tagline}
          </p>
          <Link
            href="/contact"
            className="group border-taskify-border/80 text-taskify-text hover:border-taskify-accent mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
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
        </div>

        {FOOTER_LINK_GROUPS.map(group => (
          <div key={group.title}>
            <p className="text-taskify-text-muted text-xs font-semibold tracking-[0.16em] uppercase">
              {group.title}
            </p>
            <ul className="mt-5 space-y-3">
              {group.links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-taskify-text-secondary hover:text-taskify-text text-sm transition-colors"
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
        <div className="text-taskify-text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. Built by{" "}
            <Link
              href="/about#creator"
              rel="author"
              className="text-taskify-text-secondary hover:text-taskify-link font-medium transition-colors"
            >
              {site.creator.name}
            </Link>
            .
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="hover:text-taskify-link inline-flex items-center gap-2 transition-colors"
          >
            <Icon name="lucide:mail" className="text-sm lg:text-sm" />
            {site.contactEmail}
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="from-taskify-surface-variant pointer-events-none -mb-6 bg-linear-to-b to-transparent bg-clip-text text-center text-[22vw] leading-none font-black tracking-tighter text-transparent select-none lg:-mb-12 lg:text-[16rem]"
      >
        {site.name}
      </p>
    </footer>
  );
}

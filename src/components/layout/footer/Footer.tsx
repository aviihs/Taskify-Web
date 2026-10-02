import Link from "next/link";

import BrandLogo from "@/components/reusable/BrandLogo";

const FOOTER_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Download", href: "/#download" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-taskify-surface border-taskify-border/60 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xs">
          <BrandLogo />
          <p className="text-taskify-text-secondary mt-3 text-sm leading-relaxed">
            Plan projects, assign tasks and finish work together.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-taskify-text-secondary hover:text-taskify-link text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-taskify-border/60 text-taskify-text-muted border-t py-5 text-center text-sm">
        © {new Date().getFullYear()} Taskify. All rights reserved.
      </p>
    </footer>
  );
}

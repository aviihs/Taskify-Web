import Link from "next/link";

import BrandLogo from "@/components/reusable/BrandLogo";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Security", href: "/#security" },
  { label: "Privacy", href: "/privacy-policy" },
];

export default function Navbar() {
  return (
    <header className="bg-taskify-surface/80 border-taskify-border/60 sticky top-0 z-50 border-b backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <BrandLogo />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-taskify-text-secondary hover:bg-taskify-surface-variant hover:text-taskify-text rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#download"
          className="from-taskify-primary to-taskify-secondary rounded-xl bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#585c83]/25 transition-transform hover:-translate-y-0.5"
        >
          Get the app
        </Link>
      </nav>
    </header>
  );
}

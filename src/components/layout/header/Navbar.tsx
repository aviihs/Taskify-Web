import Link from "next/link";

import Icon from "@/components/common/icon";
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

        <div className="flex items-center gap-2">
          <Link
            href="/#download"
            className="from-taskify-primary to-taskify-secondary shadow-taskify-primary/25 rounded-xl bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            Get the app
          </Link>

          {/* Mobile menu — <details> keeps this a Server Component */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Open menu"
              className="text-taskify-text hover:bg-taskify-surface-variant flex size-10 cursor-pointer list-none items-center justify-center rounded-xl"
            >
              <Icon
                name="lucide:menu"
                className="text-xl group-open:hidden lg:text-xl"
              />
              <Icon
                name="lucide:x"
                className="hidden text-xl group-open:flex lg:text-xl"
              />
            </summary>
            <ul className="bg-taskify-surface border-taskify-border/70 absolute top-12 right-0 w-52 rounded-2xl border p-2 shadow-xl shadow-black/10">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-taskify-text-secondary hover:bg-taskify-surface-variant hover:text-taskify-text block rounded-lg px-3 py-2.5 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}

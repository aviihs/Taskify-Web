"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { motion, useMotionValueEvent, useScroll } from "motion/react";

import Icon from "@/components/common/icon";
import BrandLogo from "@/components/reusable/BrandLogo";
import { cn } from "@/lib/utils";

import MobileMenu from "./MobileMenu";
import { isNavLinkActive, NAV_LINKS } from "./nav-links";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", latest => {
    setIsScrolled(latest > 8);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow]",
        isScrolled
          ? "bg-taskify-surface/75 border-taskify-border/60 shadow-[0_8px_30px_-12px_rgb(31_36_53/0.15)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-taskify-surface/90 border-transparent backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <MobileMenu pathname={pathname} />
          <BrandLogo />
        </div>

        <ul
          className="hidden items-center md:flex"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {NAV_LINKS.map(link => {
            const isActive = isNavLinkActive(link.href, pathname);
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className={cn(
                    "relative z-10 block px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-taskify-text"
                      : "text-taskify-text-secondary hover:text-taskify-text"
                  )}
                >
                  {link.label}
                </Link>
                {hoveredHref === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    aria-hidden
                    className="bg-taskify-surface-variant/70 absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden
                    className="bg-taskify-primary absolute -bottom-[13px] left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <Link
          href="/#download"
          className="group bg-taskify-text hover:bg-taskify-primary-dark interactive-button inline-flex items-center gap-1.5 rounded-full py-2 pr-3 pl-4 text-sm font-semibold text-white shadow-sm"
        >
          Get the app
          <Icon
            name="lucide:arrow-up-right"
            className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:text-sm"
          />
        </Link>
      </nav>
    </header>
  );
}

import Link from "next/link";

import Icon from "@/components/common/icon";
import site from "@/data/site.json";

import { SOCIAL_LINKS } from "../social-links";

// Slim utility strip above the navbar; sticks with it as one header.
export default function TopBar() {
  const iconLinks = SOCIAL_LINKS.filter(link => link.isExternal);

  return (
    <div className="bg-taskify-primary text-xs text-white/80">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href={`mailto:${site.contactEmail}`}
            className="inline-flex min-w-0 items-center gap-2 transition-colors hover:text-white"
          >
            <Icon
              name="lucide:mail"
              className="shrink-0 text-xs text-white lg:text-xs"
            />
            <span className="truncate">{site.contactEmail}</span>
          </a>
          <span aria-hidden className="hidden h-3 w-px bg-white/25 md:block" />
          <span className="hidden items-center gap-2 md:inline-flex">
            <Icon
              name="lucide:smartphone"
              className="cursor-default text-xs text-white lg:text-xs"
            />
            Coming soon to Android and iOS
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/contact"
            className="hidden transition-colors hover:text-white sm:inline"
          >
            Support
          </Link>
          <span aria-hidden className="hidden h-3 w-px bg-white/25 sm:block" />
          <ul className="flex items-center gap-1">
            {iconLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.label}
                  className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-white/15 hover:text-white"
                >
                  <Icon name={link.icon} className="text-sm lg:text-sm" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

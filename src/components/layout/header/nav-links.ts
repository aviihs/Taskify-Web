export interface NavLink {
  label: string;
  href: string;
  icon: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: "lucide:house" },
  { label: "About", href: "/about", icon: "lucide:sparkles" },
  { label: "Privacy", href: "/privacy-policy", icon: "lucide:shield-check" },
  { label: "Contact", href: "/contact", icon: "lucide:mail" },
];

// Hash links ("/#features") point into a page, so they never count as the
// active route — only exact page paths do.
export function isNavLinkActive(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return href === pathname;
}

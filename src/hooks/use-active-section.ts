import { useEffect, useState } from "react";

// Returns the id of the section currently crossing the upper part of the
// viewport, for highlighting the matching table-of-contents link.
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionIdsKey = sectionIds.join(",");

  useEffect(() => {
    const sections = sectionIdsKey
      .split(",")
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) setActiveId(visibleEntry.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIdsKey]);

  return activeId;
}

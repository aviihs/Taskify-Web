"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import type { PolicySection } from "@/types/PrivacyPolicy";

const CONTACT_SECTION_ID = "contact";

interface TocLinksProps {
  sections: PolicySection[];
  activeId: string | null;
  layoutGroupId: string;
  onNavigate?: () => void;
}

function TocLinks({
  sections,
  activeId,
  layoutGroupId,
  onNavigate,
}: TocLinksProps) {
  return (
    <ol className="space-y-0.5">
      {sections.map((section, index) => {
        const isActive = activeId === section.id;
        return (
          <li key={section.id} className="relative">
            {isActive && (
              <motion.span
                layoutId={layoutGroupId}
                aria-hidden
                className="bg-taskify-surface-variant absolute inset-0 rounded-xl"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <a
              href={`#${section.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                isActive
                  ? "text-taskify-text font-medium"
                  : "text-taskify-text-secondary hover:text-taskify-text"
              )}
            >
              <span
                className={cn(
                  "w-5 text-xs font-semibold tabular-nums transition-colors",
                  isActive ? "text-taskify-link" : "text-taskify-text-muted"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          </li>
        );
      })}
      <li className="pt-2">
        <a
          href={`#${CONTACT_SECTION_ID}`}
          onClick={onNavigate}
          className="text-taskify-link hover:bg-taskify-surface-variant flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors"
        >
          <Icon name="lucide:mail" className="w-5 text-sm lg:text-sm" />
          Contact us
        </a>
      </li>
    </ol>
  );
}

interface PolicyTocProps {
  sections: PolicySection[];
}

export default function PolicyToc({ sections }: PolicyTocProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeId = useActiveSection([
    ...sections.map(section => section.id),
    CONTACT_SECTION_ID,
  ]);
  const activeIndex = sections.findIndex(section => section.id === activeId);
  const progress =
    activeId === CONTACT_SECTION_ID
      ? 1
      : Math.max(activeIndex + 1, 0) / sections.length;

  return (
    <>
      {/* Mobile: collapsible list */}
      <div className="bg-taskify-surface border-taskify-border/70 overflow-hidden rounded-3xl border lg:hidden">
        <button
          type="button"
          aria-expanded={isMobileOpen}
          aria-controls="policy-toc-mobile"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="text-taskify-text flex w-full items-center justify-between px-5 py-4 font-semibold"
        >
          <span className="flex items-center gap-3">
            <Icon name="lucide:list" className="text-taskify-link" />
            On this page
          </span>
          <motion.span animate={{ rotate: isMobileOpen ? 180 : 0 }}>
            <Icon name="lucide:chevron-down" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isMobileOpen && (
            <motion.div
              id="policy-toc-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="overflow-hidden"
            >
              <div className="px-2 pb-3">
                <TocLinks
                  sections={sections}
                  activeId={activeId}
                  layoutGroupId="toc-active-mobile"
                  onNavigate={() => setIsMobileOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Privacy policy sections"
        className="sticky top-32 hidden lg:block"
      >
        <div className="mb-4 flex items-center justify-between px-3">
          <p className="text-taskify-text-muted text-xs font-semibold tracking-[0.16em] uppercase">
            On this page
          </p>
          <span className="text-taskify-text-muted text-xs tabular-nums">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="bg-taskify-surface-variant mx-3 mb-4 h-1 overflow-hidden rounded-full">
          <motion.div
            className="from-taskify-primary to-taskify-accent h-full rounded-full bg-linear-to-r"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          />
        </div>
        <TocLinks
          sections={sections}
          activeId={activeId}
          layoutGroupId="toc-active-desktop"
        />
      </nav>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { createPortal } from "react-dom";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import BrandLogo from "@/components/reusable/BrandLogo";
import site from "@/data/site.json";
import { cn } from "@/lib/utils";

import { isNavLinkActive, NAV_LINKS } from "./nav-links";

const LINK_LIST_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const LINK_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

const subscribeNoop = () => () => {};

// True only after hydration, so the portal never renders on the server.
function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

interface MobileMenuProps {
  pathname: string;
}

export default function MobileMenu({ pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isClient = useIsClient();

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(true)}
        className="text-taskify-text hover:bg-taskify-surface-variant -ml-2 flex size-10 flex-col items-center justify-center gap-[5px] rounded-full transition-colors md:hidden"
      >
        <span className="h-[1.5px] w-[18px] rounded-full bg-current" />
        <span className="h-[1.5px] w-[12px] self-center rounded-full bg-current" />
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                className="fixed inset-0 z-[100] md:hidden"
              >
                <motion.div
                  aria-hidden
                  className="absolute inset-0 bg-[#121522]/40 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleClose}
                />

                <motion.aside
                  id="mobile-menu"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Main menu"
                  className="bg-taskify-surface absolute inset-y-0 left-0 flex w-[84%] max-w-sm flex-col shadow-2xl shadow-black/30"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 36 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={{ left: 0.4, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80 || info.velocity.x < -400) {
                      handleClose();
                    }
                  }}
                >
                  <div className="border-taskify-border/60 flex h-16 items-center justify-between border-b px-5">
                    <BrandLogo />
                    <button
                      type="button"
                      aria-label="Close menu"
                      autoFocus
                      onClick={handleClose}
                      className="text-taskify-text-secondary hover:bg-taskify-surface-variant hover:text-taskify-text flex size-10 items-center justify-center rounded-full transition-colors"
                    >
                      <Icon name="lucide:x" className="text-xl lg:text-xl" />
                    </button>
                  </div>

                  <motion.ul
                    className="flex-1 space-y-1 overflow-y-auto px-3 py-6"
                    variants={LINK_LIST_VARIANTS}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.li
                      variants={LINK_ITEM_VARIANTS}
                      className="text-taskify-text-muted px-3 pb-3 text-[11px] font-semibold tracking-[0.18em] uppercase"
                    >
                      Navigate
                    </motion.li>
                    {NAV_LINKS.map(link => {
                      const isActive = isNavLinkActive(link.href, pathname);
                      return (
                        <motion.li
                          key={link.href}
                          variants={LINK_ITEM_VARIANTS}
                        >
                          <Link
                            href={link.href}
                            onClick={handleClose}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                              "group flex items-center gap-4 rounded-2xl px-3 py-3 text-base font-medium transition-colors",
                              isActive
                                ? "bg-taskify-surface-variant text-taskify-text"
                                : "text-taskify-text-secondary hover:bg-taskify-surface-variant/60 hover:text-taskify-text"
                            )}
                          >
                            <span
                              className={cn(
                                "flex size-10 items-center justify-center rounded-xl border transition-colors",
                                isActive
                                  ? "from-taskify-primary to-taskify-secondary border-transparent bg-linear-to-br text-white"
                                  : "border-taskify-border/70 bg-taskify-surface text-taskify-link"
                              )}
                            >
                              <Icon name={link.icon} />
                            </span>
                            {link.label}
                            <Icon
                              name="lucide:chevron-right"
                              className="text-taskify-text-muted ml-auto text-sm transition-transform group-hover:translate-x-0.5 lg:text-sm"
                            />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  <motion.div
                    className="border-taskify-border/60 space-y-3 border-t p-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.35,
                      ease: EASE_OUT_EXPO,
                    }}
                  >
                    <Link
                      href="/#download"
                      onClick={handleClose}
                      className="bg-taskify-text flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white"
                    >
                      <Icon name="lucide:download" />
                      Get the app
                    </Link>
                    <a
                      href={`mailto:${site.contactEmail}`}
                      className="text-taskify-text-secondary hover:text-taskify-link flex items-center justify-center gap-2 text-sm transition-colors"
                    >
                      <Icon
                        name="lucide:at-sign"
                        className="text-sm lg:text-sm"
                      />
                      {site.contactEmail}
                    </a>
                  </motion.div>
                </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import type { ContactPageContent } from "@/types/ContactPage";

interface ContactFaqProps {
  faq: ContactPageContent["faq"];
}

export default function ContactFaq({ faq }: ContactFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <p className="text-taskify-link inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
        <span aria-hidden className="bg-taskify-accent h-px w-6" />
        {faq.eyebrow}
      </p>
      <h2 className="text-taskify-text mt-4 text-3xl font-semibold tracking-[-0.03em]">
        {faq.title}
      </h2>

      <ul className="divide-taskify-border/70 border-taskify-border/70 mt-8 divide-y border-y">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <li key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="text-taskify-text hover:text-taskify-link flex w-full items-center justify-between gap-4 py-5 text-left font-medium transition-colors"
              >
                {item.question}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                  className="border-taskify-border/80 text-taskify-text-secondary flex size-8 shrink-0 items-center justify-center rounded-full border"
                >
                  <Icon name="lucide:plus" className="text-sm lg:text-sm" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                    className="overflow-hidden"
                  >
                    <p className="text-taskify-text-secondary pr-12 pb-5 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

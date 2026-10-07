"use client";

import { motion } from "motion/react";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import { TONE_DOT_CLASSES } from "../tone-classes";

interface PriorityLevelsProps {
  caption: string;
  priorities: HomeContent["workflow"]["priorities"];
}

// Each priority shows a signal-strength meter: Low fills one bar, Critical all.
export default function PriorityLevels({
  caption,
  priorities,
}: PriorityLevelsProps) {
  const barCount = priorities.length;

  return (
    <div>
      <p className="text-center text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">
        {caption}
      </p>
      <Stagger as="ul" className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {priorities.map((priority, index) => (
          <StaggerItem as="li" key={priority.label}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <span className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    TONE_DOT_CLASSES[priority.tone]
                  )}
                />
                {priority.label}
              </span>
              <span aria-hidden className="flex items-end gap-[3px]">
                {Array.from({ length: barCount }, (_, barIndex) => (
                  <span
                    key={barIndex}
                    className={cn(
                      "w-1 rounded-full transition-transform duration-300 group-hover:scale-y-110",
                      barIndex <= index
                        ? TONE_DOT_CLASSES[priority.tone]
                        : "bg-white/15"
                    )}
                    style={{ height: 6 + barIndex * 4 }}
                  />
                ))}
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

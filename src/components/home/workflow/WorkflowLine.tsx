"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { cn } from "@/lib/utils";

interface WorkflowLineProps {
  className?: string;
  style?: React.CSSProperties;
}

// The connector between stages: draws itself in once when scrolled into view.
export default function WorkflowLine({ className, style }: WorkflowLineProps) {
  return (
    <div
      aria-hidden
      style={style}
      className={cn("bg-taskify-border/70 absolute h-px", className)}
    >
      <motion.div
        className="from-taskify-accent to-taskify-primary absolute inset-0 origin-left bg-linear-to-r"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.2 }}
      />
    </div>
  );
}

"use client";

import { motion, type Variants } from "motion/react";

import { EASE_OUT_EXPO } from "./easing";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  offsetY?: number;
  // Animate on mount (above-the-fold content) instead of on scroll into view.
  isImmediate?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  offsetY = 24,
  isImmediate = false,
}: RevealProps) {
  const visibleState = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offsetY, filter: "blur(6px)" }}
      animate={isImmediate ? visibleState : undefined}
      whileInView={isImmediate ? undefined : visibleState}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const STAGGER_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const MOTION_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof MOTION_TAGS;
  isImmediate?: boolean;
}

// Children wrapped in <StaggerItem> fade up one after another.
export function Stagger({
  children,
  className,
  as = "div",
  isImmediate = false,
}: StaggerProps) {
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={STAGGER_CONTAINER_VARIANTS}
      initial="hidden"
      animate={isImmediate ? "visible" : undefined}
      whileInView={isImmediate ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof MOTION_TAGS;
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const MotionTag = MOTION_TAGS[as] as typeof motion.div;

  return (
    <MotionTag className={className} variants={STAGGER_ITEM_VARIANTS}>
      {children}
    </MotionTag>
  );
}

interface FloatProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}

// Gentle, endless vertical bob for decorative cards.
export function Float({
  children,
  className,
  distance = 10,
  duration = 6,
  delay = 0,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

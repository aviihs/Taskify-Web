"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin bar under the navbar that fills as the reader scrolls the page.
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="from-taskify-primary via-taskify-secondary to-taskify-accent fixed inset-x-0 top-[101px] z-40 h-0.5 origin-left bg-linear-to-r"
    />
  );
}

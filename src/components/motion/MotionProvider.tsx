"use client";

import { MotionConfig } from "motion/react";

// Respects the OS "reduce motion" setting for every animation on the site.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

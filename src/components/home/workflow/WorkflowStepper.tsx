"use client";

import { motion } from "motion/react";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

interface WorkflowStepperProps {
  stages: HomeContent["workflow"]["stages"];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function WorkflowStepper({
  stages,
  activeIndex,
  onSelect,
}: WorkflowStepperProps) {
  const lastIndex = stages.length - 1;
  // Each column is 1/n wide, so node centres sit half a column in from each edge.
  const edgeInset = `${50 / stages.length}%`;
  const trackProgress = activeIndex / lastIndex;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute top-5 h-px bg-white/10"
        style={{ left: edgeInset, right: edgeInset }}
      />
      <motion.div
        aria-hidden
        className="from-taskify-accent absolute top-5 h-px origin-left bg-linear-to-r to-white shadow-[0_0_12px_rgb(140_147_217/0.9)]"
        style={{ left: edgeInset, right: edgeInset }}
        initial={false}
        animate={{ scaleX: trackProgress }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      />

      <ol
        className="relative grid"
        style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}
      >
        {stages.map((stage, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;
          return (
            <li key={stage.label} className="flex justify-center">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? "step" : undefined}
                className="group flex flex-col items-center gap-3 px-1 outline-none"
              >
                <span className="relative flex size-10 items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId="workflow-active-node"
                      aria-hidden
                      className="bg-taskify-accent/20 ring-taskify-accent/60 absolute -inset-1.5 rounded-full ring-1"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative flex size-10 items-center justify-center rounded-full border transition-colors duration-500 group-focus-visible:ring-2 group-focus-visible:ring-white/60",
                      isActive &&
                        "text-taskify-primary-dark border-white bg-white",
                      isDone &&
                        "border-taskify-accent/60 bg-taskify-accent/20 text-white",
                      !isActive &&
                        !isDone &&
                        "border-white/15 bg-[#1a1d2e] text-white/50 group-hover:border-white/30 group-hover:text-white/80"
                    )}
                  >
                    <Icon
                      name={isDone ? "lucide:check" : stage.icon}
                      className="text-base lg:text-base"
                    />
                  </span>
                </span>
                <span
                  className={cn(
                    "text-center text-[11px] leading-tight font-medium transition-colors duration-500 sm:text-sm",
                    isActive ? "text-white" : "text-white/50"
                  )}
                >
                  {stage.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

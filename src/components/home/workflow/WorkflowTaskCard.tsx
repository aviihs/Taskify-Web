"use client";

import { AnimatePresence, motion } from "motion/react";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import { TONE_BADGE_ON_DARK_CLASSES } from "../tone-classes";

interface WorkflowTaskCardProps {
  task: HomeContent["workflow"]["demoTask"];
  stage: HomeContent["workflow"]["stages"][number];
  progress: number;
  isComplete: boolean;
}

const SWAP_TRANSITION = { duration: 0.45, ease: EASE_OUT_EXPO };

export default function WorkflowTaskCard({
  task,
  stage,
  progress,
  isComplete,
}: WorkflowTaskCardProps) {
  const progressPercent = Math.round(progress * 100);

  return (
    <div className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          <Icon
            name="lucide:folder-kanban"
            className="cursor-default text-xs lg:text-xs"
          />
          {task.project}
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold ring-1",
            TONE_BADGE_ON_DARK_CLASSES[task.priorityTone]
          )}
        >
          {task.priority}
        </span>

        <div className="relative ml-auto h-7 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={stage.label}
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -28, opacity: 0 }}
              transition={SWAP_TRANSITION}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs font-semibold",
                isComplete
                  ? "bg-green-400/15 text-green-300"
                  : "text-taskify-primary-dark bg-white"
              )}
            >
              <Icon
                name={stage.icon}
                className="cursor-default text-xs lg:text-xs"
              />
              {stage.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        <span
          className={cn(
            "bg-[length:0%_2px] bg-left bg-no-repeat transition-[background-size] duration-700",
            "bg-linear-to-r from-green-300 to-green-300",
            isComplete && "bg-[length:100%_2px] text-white/70"
          )}
          style={{ backgroundPositionY: "55%" }}
        >
          {task.title}
        </span>
      </h3>

      <div className="relative mt-3 min-h-[3.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={stage.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="leading-relaxed text-white/60"
          >
            {stage.description}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-8">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">Progress</span>
          <span className="font-semibold text-white tabular-nums">
            {progressPercent}%
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className={cn(
              "h-full rounded-full bg-linear-to-r",
              isComplete
                ? "from-green-400 to-emerald-300"
                : "from-taskify-accent to-white"
            )}
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex -space-x-1">
            {task.assignees.map(assignee => (
              <span
                key={assignee.initials}
                title={assignee.name}
                className="from-taskify-secondary to-taskify-accent flex size-8 items-center justify-center rounded-full bg-linear-to-br text-[11px] font-semibold text-white ring-2 ring-[#1a1d2e]"
              >
                {assignee.initials}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm text-white/50">
            <Icon
              name="lucide:calendar"
              className="cursor-default text-sm lg:text-sm"
            />
            {task.due}
          </span>
        </div>
      </div>
    </div>
  );
}

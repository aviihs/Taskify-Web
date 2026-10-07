"use client";

import { AnimatePresence, motion } from "motion/react";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import type { HomeContent } from "@/types/Home";

const MAX_VISIBLE_ENTRIES = 4;

interface WorkflowActivityProps {
  task: HomeContent["workflow"]["demoTask"];
  stages: HomeContent["workflow"]["stages"];
  activeIndex: number;
}

// A live-looking timeline: one entry per stage reached so far, newest first.
export default function WorkflowActivity({
  task,
  stages,
  activeIndex,
}: WorkflowActivityProps) {
  const entries = stages
    .slice(0, activeIndex + 1)
    .map((stage, index) => ({
      stage,
      assignee: task.assignees[index % task.assignees.length],
    }))
    .reverse()
    .slice(0, MAX_VISIBLE_ENTRIES);

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{task.activityLabel}</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-green-400" />
          </span>
          Live
        </span>
      </div>

      <ul className="relative mt-6 space-y-1">
        <AnimatePresence initial={false} mode="popLayout">
          {entries.map((entry, position) => (
            <motion.li
              key={entry.stage.label}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1 - position * 0.18, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="flex items-start gap-3 rounded-2xl p-2.5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                <Icon
                  name={entry.stage.icon}
                  className="cursor-default text-sm lg:text-sm"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white">
                  <span className="font-semibold">{entry.assignee.name}</span>{" "}
                  <span className="text-white/60">moved it to</span>{" "}
                  <span className="font-semibold">{entry.stage.label}</span>
                </p>
                <p className="mt-0.5 text-xs text-white/40">
                  {task.activityTimes[position]}
                </p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

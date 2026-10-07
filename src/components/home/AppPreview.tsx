"use client";

import { motion } from "motion/react";

import Icon from "@/components/common/icon";
import { EASE_OUT_EXPO } from "@/components/motion/easing";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import { TONE_BADGE_CLASSES, TONE_DOT_CLASSES } from "./tone-classes";

interface AppPreviewProps {
  preview: HomeContent["hero"]["preview"];
}

// A static, HTML-built picture of the Taskify app's home screen.
export default function AppPreview({ preview }: AppPreviewProps) {
  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[320px] rounded-[2.5rem] bg-[#1f2435] p-3 shadow-2xl ring-1 shadow-black/40 ring-white/10"
    >
      <div className="bg-taskify-background overflow-hidden rounded-[2rem]">
        {/* App bar */}
        <div className="from-taskify-primary to-taskify-secondary bg-linear-to-br px-5 pt-8 pb-14 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70">{preview.greeting}</p>
              <p className="font-semibold">{preview.summary}</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-white/20">
              <Icon name="lucide:bell" className="cursor-default" />
            </span>
          </div>
        </div>

        {/* Project progress card */}
        <div className="bg-taskify-surface relative mx-4 -mt-9 rounded-2xl p-4 shadow-lg shadow-black/10">
          <div className="flex items-center justify-between">
            <p className="text-taskify-text text-sm font-semibold">
              {preview.project}
            </p>
            <p className="text-taskify-link text-sm font-bold">
              {preview.progress}%
            </p>
          </div>
          <div className="bg-taskify-surface-variant mt-3 h-2 rounded-full">
            <motion.div
              className="from-taskify-primary to-taskify-accent h-2 rounded-full bg-linear-to-r"
              initial={{ width: 0 }}
              animate={{ width: `${preview.progress}%` }}
              transition={{ duration: 1.4, delay: 0.6, ease: EASE_OUT_EXPO }}
            />
          </div>
        </div>

        {/* Task list */}
        <ul className="space-y-2.5 px-4 pt-4 pb-6">
          {preview.tasks.map((task, index) => (
            <motion.li
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.12 }}
              key={task.title}
              className="bg-taskify-surface border-taskify-border/60 rounded-xl border p-3"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    TONE_DOT_CLASSES[task.tone]
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-taskify-text truncate text-sm font-medium">
                    {task.title}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 font-semibold",
                        TONE_BADGE_CLASSES[task.tone]
                      )}
                    >
                      {task.priority}
                    </span>
                    <span className="bg-taskify-surface-variant text-taskify-text-secondary rounded-md px-1.5 py-0.5 font-medium">
                      {task.status}
                    </span>
                    <span className="text-taskify-text-muted ml-auto">
                      {task.due}
                    </span>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

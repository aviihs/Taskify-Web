"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useInView, useReducedMotion } from "motion/react";

import Icon from "@/components/common/icon";
import { Reveal } from "@/components/motion/Reveal";
import type { HomeContent } from "@/types/Home";

import PriorityLevels from "./workflow/PriorityLevels";
import WorkflowActivity from "./workflow/WorkflowActivity";
import WorkflowStepper from "./workflow/WorkflowStepper";
import WorkflowTaskCard from "./workflow/WorkflowTaskCard";

const AUTOPLAY_INTERVAL_MS = 2800;

interface WorkflowSectionProps {
  workflow: HomeContent["workflow"];
}

export default function WorkflowSection({ workflow }: WorkflowSectionProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stageCount = workflow.stages.length;
  const isAutoplaying = isInView && !isPaused && !shouldReduceMotion;
  const activeStage = workflow.stages[activeIndex];
  const isComplete = activeIndex === stageCount - 1;

  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % stageCount);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [isAutoplaying, stageCount]);

  const handleSelectStage = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
    <section id="workflow" className="mx-auto max-w-6xl scroll-mt-24 px-4">
      <Reveal>
        <div
          ref={panelRef}
          className="relative isolate overflow-hidden rounded-[2rem] bg-[#141726] px-5 py-16 text-white sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="bg-grid-white mask-fade-b absolute inset-0 -z-10 opacity-60"
          />
          <div
            aria-hidden
            className="bg-taskify-secondary/30 absolute -top-48 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full blur-3xl"
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-40 left-[60%] -z-10 size-96 rounded-full bg-green-400/10 blur-3xl"
            initial={false}
            animate={{ opacity: isComplete ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-taskify-accent inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
              <span aria-hidden className="bg-taskify-accent h-px w-6" />
              {workflow.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
              {workflow.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-white/60">
              {workflow.description}
            </p>
          </div>

          <div className="mt-14">
            <WorkflowStepper
              stages={workflow.stages}
              activeIndex={activeIndex}
              onSelect={handleSelectStage}
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={
                isPaused ? "Play workflow demo" : "Pause workflow demo"
              }
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <Icon
                name={isPaused ? "lucide:play" : "lucide:pause"}
                className="text-xs lg:text-xs"
              />
              {isPaused ? "Play demo" : "Auto-playing"}
            </button>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <WorkflowTaskCard
              task={workflow.demoTask}
              stage={activeStage}
              progress={activeIndex / (stageCount - 1)}
              isComplete={isComplete}
            />
            <WorkflowActivity
              task={workflow.demoTask}
              stages={workflow.stages}
              activeIndex={activeIndex}
            />
          </div>

          <div className="mt-12">
            <PriorityLevels
              caption={workflow.priorityCaption}
              priorities={workflow.priorities}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

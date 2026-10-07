import Icon from "@/components/common/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import { TONE_BADGE_CLASSES, TONE_DOT_CLASSES } from "./tone-classes";

interface WorkflowSectionProps {
  workflow: HomeContent["workflow"];
}

export default function WorkflowSection({ workflow }: WorkflowSectionProps) {
  const lastStageIndex = workflow.stages.length - 1;

  return (
    <section id="workflow" className="mx-auto max-w-6xl scroll-mt-24 px-4">
      <div className="bg-taskify-surface border-taskify-border/70 relative isolate overflow-hidden rounded-[2rem] border px-6 py-16 sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="bg-taskify-accent/15 absolute -top-40 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full blur-3xl"
        />
        <SectionIntro {...workflow} />

        <Stagger as="ol" className="mt-14 grid gap-3 sm:grid-cols-5">
          {workflow.stages.map((stage, index) => {
            const isFinalStage = index === lastStageIndex;
            return (
              <StaggerItem as="li" key={stage.label} className="relative">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-4 transition-transform duration-500 hover:-translate-y-1 sm:flex-col sm:py-6 sm:text-center",
                    isFinalStage
                      ? "from-taskify-primary to-taskify-secondary border-transparent bg-linear-to-br text-white shadow-[0_20px_40px_-20px_rgb(88_92_131/0.7)]"
                      : "border-taskify-border/70 bg-taskify-background text-taskify-text"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      isFinalStage
                        ? "bg-white/20"
                        : "bg-taskify-surface text-taskify-link ring-taskify-border/70 ring-1"
                    )}
                  >
                    <Icon
                      name={stage.icon}
                      className="cursor-default text-lg lg:text-lg"
                    />
                  </span>
                  <span className="text-sm font-semibold">{stage.label}</span>
                  <span
                    className={cn(
                      "ml-auto text-xs font-medium tabular-nums sm:ml-0",
                      isFinalStage ? "text-white/70" : "text-taskify-text-muted"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                {!isFinalStage && (
                  <Icon
                    name="lucide:chevron-right"
                    className="text-taskify-text-muted absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 cursor-default sm:flex"
                  />
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal
          delay={0.2}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <p className="text-taskify-text-secondary text-sm font-medium">
            Prioritise with four levels
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {workflow.priorities.map(priority => (
              <li
                key={priority.label}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
                  TONE_BADGE_CLASSES[priority.tone]
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    TONE_DOT_CLASSES[priority.tone]
                  )}
                />
                {priority.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

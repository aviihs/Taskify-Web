import Icon from "@/components/common/icon";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import SectionIntro from "./SectionIntro";
import { TONE_BADGE_CLASSES, TONE_DOT_CLASSES } from "./tone-classes";

interface WorkflowSectionProps {
  workflow: HomeContent["workflow"];
}

export default function WorkflowSection({ workflow }: WorkflowSectionProps) {
  const lastStageIndex = workflow.stages.length - 1;

  return (
    <section id="workflow" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      <div className="bg-taskify-surface border-taskify-border/70 rounded-3xl border px-6 py-14 sm:px-12">
        <SectionIntro {...workflow} />

        <ol className="mt-12 grid gap-3 sm:grid-cols-5">
          {workflow.stages.map((stage, index) => {
            const isFinalStage = index === lastStageIndex;
            return (
              <li key={stage.label} className="relative">
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-4 sm:flex-col sm:text-center",
                    isFinalStage
                      ? "from-taskify-primary to-taskify-secondary border-transparent bg-linear-to-br text-white"
                      : "border-taskify-border/70 bg-taskify-background text-taskify-text"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full",
                      isFinalStage
                        ? "bg-white/20"
                        : "bg-taskify-surface-variant text-taskify-link"
                    )}
                  >
                    <Icon
                      name={stage.icon}
                      className="cursor-default text-lg lg:text-lg"
                    />
                  </span>
                  <span className="text-sm font-semibold">{stage.label}</span>
                </div>
                {!isFinalStage && (
                  <Icon
                    name="lucide:chevron-right"
                    className="text-taskify-text-muted absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 cursor-default sm:flex"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <p className="text-taskify-text-secondary text-sm font-medium">
            Prioritise with four levels:
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
        </div>
      </div>
    </section>
  );
}

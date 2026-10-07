import Icon from "@/components/common/icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import PriorityLevels from "./workflow/PriorityLevels";
import WorkflowLine from "./workflow/WorkflowLine";

interface WorkflowSectionProps {
  workflow: HomeContent["workflow"];
}

export default function WorkflowSection({ workflow }: WorkflowSectionProps) {
  const lastStageIndex = workflow.stages.length - 1;
  // Node centres sit half a column in from each edge on the desktop row.
  const edgeInset = `${50 / workflow.stages.length}%`;

  return (
    <section id="workflow" className="mx-auto max-w-6xl scroll-mt-24 px-4">
      <div className="bg-taskify-surface border-taskify-border/70 rounded-[2rem] border px-6 py-16 sm:px-12 sm:py-20">
        <SectionIntro
          eyebrow={workflow.eyebrow}
          title={workflow.title}
          description={workflow.description}
        />

        <div className="relative mt-16">
          <WorkflowLine
            className="top-6 hidden lg:block"
            style={{ left: edgeInset, right: edgeInset }}
          />

          {/* One row on desktop, a vertical timeline on smaller screens. */}
          <Stagger
            as="ol"
            className="relative grid gap-8 lg:grid-cols-5 lg:gap-4"
          >
            {workflow.stages.map((stage, index) => {
              const isFinalStage = index === lastStageIndex;
              return (
                <StaggerItem
                  as="li"
                  key={stage.label}
                  className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  {!isFinalStage && (
                    <span
                      aria-hidden
                      className="bg-taskify-border absolute top-12 -bottom-8 left-6 w-px lg:hidden"
                    />
                  )}
                  <span
                    className={cn(
                      "relative flex size-12 shrink-0 items-center justify-center rounded-full border transition group-hover:-translate-y-0.5",
                      isFinalStage
                        ? "from-taskify-primary to-taskify-secondary border-transparent bg-linear-to-br text-white shadow-[0_8px_24px_-8px_rgb(88_92_131/0.6)]"
                        : "border-taskify-border bg-taskify-surface text-taskify-link group-hover:border-taskify-accent"
                    )}
                  >
                    <Icon
                      name={stage.icon}
                      className="cursor-default text-lg lg:text-lg"
                    />
                  </span>
                  <div className="pt-1 lg:mt-5 lg:px-2 lg:pt-0">
                    <p className="text-taskify-text-muted text-xs font-medium tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-taskify-text mt-1 font-semibold tracking-tight">
                      {stage.label}
                    </h3>
                    <p className="text-taskify-text-secondary mt-2 text-sm leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <div className="mt-16">
          <PriorityLevels
            caption={workflow.priorityCaption}
            priorities={workflow.priorities}
          />
        </div>
      </div>
    </section>
  );
}

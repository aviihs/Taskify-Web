import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import type { HomeContent } from "@/types/Home";

interface StepsSectionProps {
  steps: HomeContent["steps"];
}

export default function StepsSection({ steps }: StepsSectionProps) {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-4">
      <SectionIntro {...steps} />

      <Stagger as="ol" className="mt-16 grid gap-4 md:grid-cols-3">
        {steps.items.map((step, index) => (
          <StaggerItem
            as="li"
            key={step.title}
            className="group bg-taskify-surface border-taskify-border/70 relative overflow-hidden rounded-3xl border p-8"
          >
            <span
              aria-hidden
              className="from-taskify-surface-variant pointer-events-none absolute -top-6 -right-2 bg-linear-to-b to-transparent bg-clip-text text-[9rem] leading-none font-semibold tracking-tighter text-transparent select-none"
            >
              {index + 1}
            </span>
            <span className="from-taskify-primary to-taskify-secondary relative flex size-11 items-center justify-center rounded-2xl bg-linear-to-br text-base font-semibold text-white shadow-lg shadow-black/10">
              {index + 1}
            </span>
            <h3 className="text-taskify-text relative mt-8 text-lg font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="text-taskify-text-secondary relative mt-2 leading-relaxed">
              {step.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

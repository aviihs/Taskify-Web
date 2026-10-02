import type { HomeContent } from "@/types/Home";

import SectionIntro from "./SectionIntro";

interface StepsSectionProps {
  steps: HomeContent["steps"];
}

export default function StepsSection({ steps }: StepsSectionProps) {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      <SectionIntro {...steps} />

      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.items.map((step, index) => (
          <li key={step.title} className="relative text-center">
            {index > 0 && (
              <span
                aria-hidden
                className="bg-taskify-border absolute top-7 right-1/2 hidden h-px w-full md:block"
              />
            )}
            <span className="from-taskify-primary to-taskify-secondary relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-linear-to-br text-xl font-extrabold text-white shadow-lg shadow-black/10">
              {index + 1}
            </span>
            <h3 className="text-taskify-text mt-5 text-lg font-semibold">
              {step.title}
            </h3>
            <p className="text-taskify-text-secondary mx-auto mt-2 max-w-xs leading-relaxed">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import type { AboutContent } from "@/types/About";

interface AboutPrinciplesProps {
  principles: AboutContent["principles"];
}

export default function AboutPrinciples({ principles }: AboutPrinciplesProps) {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
      <SectionIntro
        {...principles}
        align="left"
        className="lg:sticky lg:top-36 lg:self-start"
      />

      <Stagger
        as="ol"
        className="divide-taskify-border/70 border-taskify-border/70 divide-y border-y"
      >
        {principles.items.map((principle, index) => (
          <StaggerItem
            as="li"
            key={principle.title}
            className="group grid grid-cols-[3rem_1fr] gap-4 py-8"
          >
            <span className="text-taskify-accent group-hover:text-taskify-primary text-sm font-semibold tabular-nums transition-colors">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-taskify-text text-xl font-semibold tracking-tight">
                {principle.title}
              </h3>
              <p className="text-taskify-text-secondary mt-2 leading-relaxed">
                {principle.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

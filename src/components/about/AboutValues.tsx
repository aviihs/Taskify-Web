import Icon from "@/components/common/icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import type { AboutContent } from "@/types/About";

interface AboutValuesProps {
  values: AboutContent["values"];
}

export default function AboutValues({ values }: AboutValuesProps) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <SectionIntro {...values} />

      <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2">
        {values.items.map((value, index) => (
          <StaggerItem
            as="li"
            key={value.title}
            className="group bg-taskify-surface border-taskify-border/70 interactive-card relative overflow-hidden rounded-3xl border p-8"
          >
            <div
              aria-hidden
              className="bg-taskify-accent/20 absolute -top-24 -right-24 size-56 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
            />
            <div className="relative flex items-start justify-between">
              <span className="from-taskify-primary to-taskify-secondary flex size-12 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg shadow-black/10 transition-transform group-hover:scale-105 group-hover:-rotate-3">
                <Icon
                  name={value.icon}
                  className="cursor-default text-xl lg:text-xl"
                />
              </span>
              <span className="text-taskify-text-muted text-sm font-medium tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-taskify-text relative mt-8 text-xl font-semibold tracking-tight">
              {value.title}
            </h3>
            <p className="text-taskify-text-secondary relative mt-3 leading-relaxed">
              {value.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

import Icon from "@/components/common/icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import type { HomeContent } from "@/types/Home";

interface FeatureGridProps {
  features: HomeContent["features"];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4">
      <SectionIntro {...features} />

      <Stagger
        as="ul"
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.items.map(feature => (
          <StaggerItem
            as="li"
            key={feature.title}
            className="group bg-taskify-surface border-taskify-border/70 hover:border-taskify-accent/50 relative overflow-hidden rounded-3xl border p-7 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgb(88_92_131/0.45)]"
          >
            <div
              aria-hidden
              className="from-taskify-surface-variant/0 to-taskify-surface-variant/70 absolute inset-0 bg-linear-to-b opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="bg-taskify-surface-variant text-taskify-link group-hover:from-taskify-primary group-hover:to-taskify-secondary relative flex size-12 items-center justify-center rounded-2xl transition-colors duration-500 group-hover:bg-linear-to-br group-hover:text-white">
              <Icon
                name={feature.icon}
                className="cursor-default text-xl lg:text-xl"
              />
            </span>
            <h3 className="text-taskify-text relative mt-6 text-lg font-semibold tracking-tight">
              {feature.title}
            </h3>
            <p className="text-taskify-text-secondary relative mt-2 leading-relaxed">
              {feature.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

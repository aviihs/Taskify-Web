import Icon from "@/components/common/icon";
import type { HomeContent } from "@/types/Home";

import SectionIntro from "./SectionIntro";

interface FeatureGridProps {
  features: HomeContent["features"];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      <SectionIntro {...features} />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.items.map(feature => (
          <li
            key={feature.title}
            className="bg-taskify-surface border-taskify-border/70 group hover:border-taskify-accent/60 rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
          >
            <span className="bg-taskify-surface-variant text-taskify-link group-hover:from-taskify-primary group-hover:to-taskify-secondary flex size-12 items-center justify-center rounded-xl transition-colors group-hover:bg-linear-to-br group-hover:text-white">
              <Icon
                name={feature.icon}
                className="cursor-default text-2xl lg:text-2xl"
              />
            </span>
            <h3 className="text-taskify-text mt-5 text-lg font-semibold">
              {feature.title}
            </h3>
            <p className="text-taskify-text-secondary mt-2 leading-relaxed">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

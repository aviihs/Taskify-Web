import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { HomeContent } from "@/types/Home";

interface StatsStripProps {
  stats: HomeContent["stats"];
}

export default function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="relative mx-auto -mt-16 max-w-6xl px-4 sm:-mt-20">
      <Stagger
        as="dl"
        className="bg-taskify-border/70 border-taskify-border/70 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border shadow-[0_30px_80px_-40px_rgb(31_36_53/0.35)] md:grid-cols-4"
      >
        {stats.map(stat => (
          <StaggerItem
            key={stat.label}
            className="bg-taskify-surface flex flex-col p-6 sm:p-8"
          >
            <dt className="text-taskify-text-secondary order-2 mt-2 text-sm leading-snug">
              {stat.label}
            </dt>
            <dd className="from-taskify-primary-dark to-taskify-secondary order-1 bg-linear-to-br bg-clip-text text-4xl font-semibold tracking-tighter text-transparent sm:text-5xl">
              {stat.value}
            </dd>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

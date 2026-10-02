import type { HomeContent } from "@/types/Home";

interface StatsStripProps {
  stats: HomeContent["stats"];
}

export default function StatsStrip({ stats }: StatsStripProps) {
  return (
    <section className="relative mx-auto -mt-10 max-w-6xl px-4">
      <dl className="bg-taskify-surface border-taskify-border/70 divide-taskify-border/70 grid grid-cols-2 divide-y rounded-2xl border shadow-xl shadow-black/5 md:grid-cols-4 md:divide-x md:divide-y-0">
        {stats.map(stat => (
          <div key={stat.label} className="p-6 text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="from-taskify-primary to-taskify-secondary bg-linear-to-r bg-clip-text text-3xl font-extrabold text-transparent">
              {stat.value}
            </dd>
            <dd className="text-taskify-text-secondary mt-1 text-sm leading-snug">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

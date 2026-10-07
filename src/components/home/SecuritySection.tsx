import Link from "next/link";

import Icon from "@/components/common/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import type { HomeContent } from "@/types/Home";

interface SecuritySectionProps {
  security: HomeContent["security"];
}

export default function SecuritySection({ security }: SecuritySectionProps) {
  return (
    <section id="security" className="mx-auto max-w-6xl scroll-mt-24 px-4">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionIntro
            eyebrow={security.eyebrow}
            title={security.title}
            description={security.description}
            align="left"
          />
          <Reveal delay={0.1}>
            <Link
              href="/privacy-policy"
              className="group border-taskify-border/80 text-taskify-text hover:border-taskify-accent mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition-colors"
            >
              {security.linkLabel}
              <Icon
                name="lucide:arrow-right"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <Stagger as="ul" className="space-y-3">
          {security.items.map(item => (
            <StaggerItem
              as="li"
              key={item.title}
              className="group bg-taskify-surface border-taskify-border/70 hover:border-taskify-accent/50 flex gap-5 rounded-3xl border p-6 transition-colors duration-500"
            >
              <span className="from-taskify-primary to-taskify-secondary flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg shadow-black/10 transition-transform duration-500 group-hover:scale-105">
                <Icon
                  name={item.icon}
                  className="cursor-default text-xl lg:text-xl"
                />
              </span>
              <div>
                <h3 className="text-taskify-text font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-taskify-text-secondary mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

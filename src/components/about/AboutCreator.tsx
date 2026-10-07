import Icon from "@/components/common/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import site from "@/data/site.json";
import type { AboutContent } from "@/types/About";

interface AboutCreatorProps {
  creator: AboutContent["creator"];
}

export default function AboutCreator({ creator }: AboutCreatorProps) {
  const initials = site.creator.name
    .split(" ")
    .map(part => part[0])
    .join("");

  return (
    <section
      id="creator"
      className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-12 px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-20"
    >
      <Reveal className="relative">
        <div className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br p-8 text-white sm:p-10">
          <div
            aria-hidden
            className="bg-grid-white mask-fade-b absolute inset-0 -z-10"
          />
          <div
            aria-hidden
            className="bg-taskify-accent/50 absolute -right-20 -bottom-20 -z-10 size-72 rounded-full blur-3xl"
          />

          <span className="flex size-20 items-center justify-center rounded-3xl bg-white/15 text-2xl font-semibold tracking-tight ring-1 ring-white/25 backdrop-blur">
            {initials}
          </span>
          <p className="mt-8 text-3xl font-semibold tracking-[-0.03em]">
            {site.creator.name}
          </p>
          <p className="mt-1 text-white/70">{site.creator.role}</p>

          <Stagger as="ul" className="mt-8 flex flex-wrap gap-2">
            {creator.highlights.map(highlight => (
              <StaggerItem
                as="li"
                key={highlight.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm ring-1 ring-white/20"
              >
                <Icon
                  name={highlight.icon}
                  className="cursor-default text-sm lg:text-sm"
                />
                {highlight.label}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      <div>
        <SectionIntro
          eyebrow={creator.eyebrow}
          title={creator.title}
          align="left"
        />
        <Reveal delay={0.1} className="mt-6 space-y-5">
          {creator.paragraphs.map(paragraph => (
            <p
              key={paragraph}
              className="text-taskify-text-secondary text-lg leading-relaxed text-pretty"
            >
              {paragraph}
            </p>
          ))}
          <a
            href={site.creator.url}
            target="_blank"
            rel="noopener noreferrer me"
            className="group border-taskify-border/80 text-taskify-text hover:border-taskify-accent interactive-button mt-3 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold"
          >
            <Icon name="mdi:github" />
            {creator.linkLabel}
            <Icon
              name="lucide:arrow-up-right"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

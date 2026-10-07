import Image from "next/image";

import Icon from "@/components/common/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import site from "@/data/site.json";
import type { AboutContent } from "@/types/About";

interface AboutCreatorProps {
  creator: AboutContent["creator"];
}

export default function AboutCreator({ creator }: AboutCreatorProps) {
  return (
    <section
      id="creator"
      className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-12 px-4 lg:grid-cols-[1fr_1.2fr] lg:gap-20"
    >
      <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
        <figure className="group relative aspect-3/4 overflow-hidden rounded-[2rem] bg-[#141726] shadow-[0_30px_80px_-40px_rgb(31_36_53/0.6)]">
          <Image
            src={site.creator.image}
            alt={`${site.creator.name}, ${site.creator.role}`}
            fill
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 448px, 100vw"
            className="origin-[50%_28%] scale-125 object-cover object-[50%_28%] transition-[scale] group-hover:scale-[1.29]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#141726] from-5% via-[#141726]/50 via-30% to-transparent to-55%"
          />

          <figcaption className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
            <a
              href={site.creator.url}
              target="_blank"
              rel="author noopener"
              className="group/name inline-flex items-center gap-2 text-3xl font-semibold tracking-[-0.03em] transition-opacity hover:opacity-85"
            >
              {site.creator.name}
              <Icon
                name="lucide:arrow-up-right"
                className="text-xl opacity-60 transition group-hover/name:translate-x-0.5 group-hover/name:-translate-y-0.5 group-hover/name:opacity-100 lg:text-xl"
              />
            </a>
            <p className="mt-1 text-white/70">{site.creator.role}</p>

            <Stagger as="ul" className="mt-6 flex flex-wrap gap-2">
              {creator.highlights.map(highlight => (
                <StaggerItem
                  as="li"
                  key={highlight.label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm ring-1 ring-white/20 backdrop-blur"
                >
                  <Icon
                    name={highlight.icon}
                    className="cursor-default text-sm lg:text-sm"
                  />
                  {highlight.label}
                </StaggerItem>
              ))}
            </Stagger>
          </figcaption>
        </figure>
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
            href={site.creator.github}
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

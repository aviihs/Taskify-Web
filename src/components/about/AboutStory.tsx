import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import type { AboutContent } from "@/types/About";

interface AboutStoryProps {
  story: AboutContent["story"];
}

export default function AboutStory({ story }: AboutStoryProps) {
  return (
    <section className="relative mx-auto -mt-20 max-w-6xl px-4 sm:-mt-24">
      <div className="bg-taskify-surface border-taskify-border/70 grid gap-12 rounded-[2rem] border p-6 shadow-[0_30px_80px_-40px_rgb(31_36_53/0.35)] sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <SectionIntro
            eyebrow={story.eyebrow}
            title={story.title}
            align="left"
          />
          <Reveal delay={0.1} className="mt-8 space-y-5">
            {story.paragraphs.map(paragraph => (
              <p
                key={paragraph}
                className="text-taskify-text-secondary text-lg leading-relaxed text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Stagger
          as="dl"
          className="grid grid-cols-2 content-center gap-3 self-center"
        >
          {story.facts.map(fact => (
            <StaggerItem
              key={fact.label}
              className="bg-taskify-background border-taskify-border/60 flex aspect-square flex-col justify-between rounded-3xl border p-5 sm:p-6"
            >
              <dt className="text-taskify-text-secondary order-2 text-sm leading-snug">
                {fact.label}
              </dt>
              <dd className="from-taskify-primary-dark to-taskify-secondary order-1 bg-linear-to-br bg-clip-text text-5xl font-semibold tracking-tighter text-transparent sm:text-6xl">
                {fact.value}
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

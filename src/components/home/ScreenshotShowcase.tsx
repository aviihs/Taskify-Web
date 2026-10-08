import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import SectionIntro from "@/components/reusable/SectionIntro";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

// Source screenshots are 1242x2688 (iPhone portrait).
const SCREEN_WIDTH = 1242;
const SCREEN_HEIGHT = 2688;

// Desktop fan: outer screens tilt away and sit lower than the centre one.
const DESKTOP_POSE_CLASSES = [
  "lg:-rotate-3 lg:translate-y-10",
  "lg:z-10 lg:scale-105",
  "lg:rotate-3 lg:translate-y-10",
];

interface ScreenshotShowcaseProps {
  showcase: HomeContent["showcase"];
}

export default function ScreenshotShowcase({
  showcase,
}: ScreenshotShowcaseProps) {
  return (
    <section id="screens" className="relative scroll-mt-32 overflow-hidden">
      <div
        aria-hidden
        className="bg-taskify-accent/15 absolute top-1/2 left-1/2 -z-10 size-[44rem] -translate-1/2 rounded-full blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4">
        <SectionIntro
          eyebrow={showcase.eyebrow}
          title={showcase.title}
          description={showcase.description}
        />
      </div>

      {/* Mobile: swipeable row. Desktop: three screens fanned out. */}
      <Stagger
        as="ul"
        className="mx-auto mt-14 flex max-w-6xl snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-[14%] pb-16 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden"
      >
        {showcase.screens.map((screen, index) => (
          <StaggerItem
            as="li"
            key={screen.src}
            className="w-[72%] shrink-0 snap-center sm:w-[44%] lg:w-auto"
          >
            <figure
              className={cn(
                "group transition lg:hover:-translate-y-3 lg:hover:rotate-0",
                DESKTOP_POSE_CLASSES[index % DESKTOP_POSE_CLASSES.length]
              )}
            >
              <div className="ring-taskify-border/70 overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_80px_-40px_rgb(31_36_53/0.45)] ring-1 transition-shadow group-hover:shadow-[0_50px_90px_-40px_rgb(88_92_131/0.6)]">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 44vw, 72vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="text-taskify-text-secondary mt-5 text-center text-sm font-medium">
                {screen.caption}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

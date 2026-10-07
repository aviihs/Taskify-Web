import Link from "next/link";

import Icon from "@/components/common/icon";
import { Float, Reveal } from "@/components/motion/Reveal";
import type { HomeContent } from "@/types/Home";

import AppPreview from "./AppPreview";

interface HomeHeroProps {
  hero: HomeContent["hero"];
}

export default function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative isolate overflow-hidden bg-linear-to-br text-white">
      <div
        aria-hidden
        className="bg-grid-white mask-fade-b absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="bg-taskify-accent/40 absolute -top-40 right-0 -z-10 size-[32rem] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-32 -z-10 size-[28rem] rounded-full bg-white/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 pt-16 pb-28 sm:pt-24 sm:pb-36 lg:grid-cols-[1.15fr_1fr]">
        <div className="text-center lg:text-left">
          <Reveal isImmediate>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 py-1 pr-4 pl-1 text-sm font-medium ring-1 ring-white/20 backdrop-blur">
              <span className="text-taskify-primary-dark flex size-7 items-center justify-center rounded-full bg-white">
                <Icon
                  name="lucide:sparkles"
                  className="cursor-default text-sm lg:text-sm"
                />
              </span>
              {hero.badge}
            </span>
          </Reveal>

          <Reveal isImmediate delay={0.08}>
            <h1 className="mt-7 text-5xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
              {hero.title}{" "}
              <span className="bg-linear-to-r from-white via-[#dde1f8] to-[#b9bff0] bg-clip-text text-transparent">
                {hero.highlight}
              </span>
            </h1>
          </Reveal>

          <Reveal isImmediate delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-pretty text-white/75 lg:mx-0">
              {hero.description}
            </p>
          </Reveal>

          <Reveal
            isImmediate
            delay={0.24}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <Link
              href={hero.primaryCta.href}
              className="group text-taskify-primary-dark inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold shadow-[0_10px_40px_-10px_rgb(0_0_0/0.4)] transition-transform hover:-translate-y-0.5"
            >
              <Icon name="lucide:download" />
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-7 py-3.5 font-semibold ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
            >
              {hero.secondaryCta.label}
              <Icon
                name="lucide:arrow-right"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <Reveal isImmediate delay={0.2} offsetY={40} className="relative">
          <AppPreview preview={hero.preview} />

          <Float
            distance={14}
            drift={6}
            duration={6}
            className="absolute top-44 -left-2 hidden sm:block lg:-left-16"
          >
            <div className="bg-taskify-surface text-taskify-text flex items-center gap-3 rounded-2xl py-2.5 pr-4 pl-2.5 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.35)] ring-1 ring-black/5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-green-500/15 text-green-600">
                <Icon name="lucide:check-check" className="cursor-default" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold">Task completed</p>
                <p className="text-taskify-text-muted text-xs">Just now</p>
              </div>
            </div>
          </Float>

          <Float
            distance={12}
            drift={-6}
            duration={7}
            delay={1.2}
            className="absolute -right-2 bottom-20 hidden sm:block lg:-right-8"
          >
            <div className="bg-taskify-surface text-taskify-text flex items-center gap-3 rounded-2xl py-2.5 pr-4 pl-2.5 shadow-[0_20px_50px_-12px_rgb(0_0_0/0.35)] ring-1 ring-black/5">
              <span className="bg-taskify-surface-variant text-taskify-link flex size-9 items-center justify-center rounded-xl">
                <Icon name="lucide:users-round" className="cursor-default" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold">Team synced</p>
                <p className="text-taskify-text-muted text-xs">4 members</p>
              </div>
            </div>
          </Float>
        </Reveal>
      </div>
    </section>
  );
}

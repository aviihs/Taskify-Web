import Link from "next/link";

import Icon from "@/components/common/icon";
import type { HomeContent } from "@/types/Home";

import AppPreview from "./AppPreview";

interface HomeHeroProps {
  hero: HomeContent["hero"];
}

export default function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative overflow-hidden bg-linear-to-br text-white">
      <div
        aria-hidden
        className="bg-taskify-accent/40 absolute -top-32 right-0 size-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 size-96 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20">
            <Icon name="lucide:sparkles" className="cursor-default" />
            {hero.badge}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            {hero.title}{" "}
            <span className="bg-linear-to-r from-white to-[#dde1f8] bg-clip-text text-transparent">
              {hero.highlight}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/80 lg:mx-0">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href={hero.primaryCta.href}
              className="text-taskify-primary-dark inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              <Icon name="lucide:download" className="cursor-pointer" />
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 font-semibold ring-1 ring-white/25 transition-colors hover:bg-white/20"
            >
              {hero.secondaryCta.label}
              <Icon name="lucide:arrow-right" className="cursor-pointer" />
            </Link>
          </div>
        </div>

        <AppPreview preview={hero.preview} />
      </div>
    </section>
  );
}

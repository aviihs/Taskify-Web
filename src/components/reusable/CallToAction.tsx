import Link from "next/link";

import Icon from "@/components/common/icon";
import { Reveal } from "@/components/motion/Reveal";
import type { Link as LinkContent } from "@/types/Home";

interface CallToActionProps {
  title: string;
  description: string;
  primaryCta: LinkContent;
  secondaryCta?: LinkContent;
}

export default function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CallToActionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <Reveal>
        <div className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="bg-grid-white mask-fade-b absolute inset-0 -z-10"
          />
          <div
            aria-hidden
            className="bg-taskify-accent/50 absolute -right-24 -bottom-24 -z-10 size-80 rounded-full blur-3xl"
          />

          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            {description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="group text-taskify-primary-dark inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              {primaryCta.label}
              <Icon
                name="lucide:arrow-right"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-semibold ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/20"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

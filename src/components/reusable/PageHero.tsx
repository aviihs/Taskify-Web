import Icon from "@/components/common/icon";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

// Dark brand header shared by the inner pages (About, Contact, Privacy).
// Leaves extra bottom padding so the next block can overlap it.
export default function PageHero({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <header className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative isolate overflow-hidden bg-linear-to-br px-4 pt-16 pb-32 text-white sm:pt-24 sm:pb-40">
      <div
        aria-hidden
        className="bg-grid-white mask-fade-b absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="bg-taskify-accent/40 absolute -top-32 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal isImmediate>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20 backdrop-blur">
            <Icon
              name={eyebrowIcon}
              className="cursor-default text-sm lg:text-sm"
            />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal isImmediate delay={0.08}>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
            {title}
          </h1>
        </Reveal>

        <Reveal isImmediate delay={0.16}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/75 sm:text-lg">
            {description}
          </p>
        </Reveal>

        {children && (
          <Reveal isImmediate delay={0.24} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}

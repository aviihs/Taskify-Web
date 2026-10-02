import Image from "next/image";

import taskifyLogo from "@/assets/taskify-logo.png";
import Icon from "@/components/common/icon";

interface PolicyHeroProps {
  appName: string;
  lastUpdated: string;
  intro: string;
}

export default function PolicyHero({
  appName,
  lastUpdated,
  intro,
}: PolicyHeroProps) {
  return (
    <header className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative overflow-hidden bg-linear-to-br px-4 pt-14 pb-28 text-white sm:pt-20 sm:pb-36">
      <div
        aria-hidden
        className="bg-taskify-accent/40 absolute -top-24 -right-16 size-72 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 size-80 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white/10 py-2 pr-5 pl-2 ring-1 ring-white/20 backdrop-blur">
          <Image
            src={taskifyLogo}
            alt={`${appName} logo`}
            className="size-10 rounded-xl bg-white p-1"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            {appName}
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          {intro}
        </p>

        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20">
          <Icon name="lucide:calendar-check" className="cursor-default" />
          Last updated {lastUpdated}
        </span>
      </div>
    </header>
  );
}

import Icon from "@/components/common/icon";
import { Reveal } from "@/components/motion/Reveal";
import site from "@/data/site.json";
import type { HomeContent } from "@/types/Home";

interface DownloadSectionProps {
  download: HomeContent["download"];
}

export default function DownloadSection({ download }: DownloadSectionProps) {
  return (
    <section id="download" className="mx-auto max-w-6xl scroll-mt-32 px-4">
      <Reveal className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative isolate overflow-hidden rounded-[2rem] bg-linear-to-br px-6 py-16 text-center text-white sm:px-12 sm:py-24">
        <div
          aria-hidden
          className="bg-grid-white mask-fade-b absolute inset-0 -z-10"
        />
        <div
          aria-hidden
          className="bg-taskify-accent/50 absolute -top-24 -right-24 -z-10 size-80 rounded-full blur-3xl"
        />
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
            {download.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            {download.description}
          </p>

          <ul className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {download.stores.map(store => {
              const isAvailable = store.href !== "";
              const badge = (
                <>
                  <Icon name={store.icon} className="text-2xl lg:text-2xl" />
                  <span className="text-left leading-tight">
                    <span className="block text-[11px] text-white/70">
                      {isAvailable ? store.caption : download.comingSoonLabel}
                    </span>
                    <span className="block font-semibold">{store.label}</span>
                  </span>
                </>
              );
              const badgeClassName =
                "inline-flex min-w-52 items-center justify-center gap-3 rounded-2xl bg-black/85 px-5 py-3.5 ring-1 ring-white/15 backdrop-blur";

              return (
                <li key={store.label}>
                  {isAvailable ? (
                    <a
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${badgeClassName} interactive-button`}
                    >
                      {badge}
                    </a>
                  ) : (
                    <span className={`${badgeClassName} opacity-80`}>
                      {badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-sm text-white/70">
            {download.contactPrompt}{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {site.contactEmail}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}

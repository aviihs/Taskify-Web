import Icon from "@/components/common/icon";
import type { HomeContent } from "@/types/Home";

interface DownloadSectionProps {
  download: HomeContent["download"];
}

export default function DownloadSection({ download }: DownloadSectionProps) {
  return (
    <section id="download" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      <div className="from-taskify-primary-dark via-taskify-primary to-taskify-secondary relative overflow-hidden rounded-3xl bg-linear-to-br px-6 py-16 text-center text-white sm:px-12">
        <div
          aria-hidden
          className="bg-taskify-accent/50 absolute -top-20 -right-20 size-72 rounded-full blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {download.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            {download.description}
          </p>

          <ul className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            {download.stores.map(store => {
              const isAvailable = store.href !== "";
              const badge = (
                <>
                  <Icon name={store.icon} className="text-2xl" />
                  <span className="text-left leading-tight">
                    <span className="block text-[11px] text-white/70">
                      {isAvailable ? store.caption : download.comingSoonLabel}
                    </span>
                    <span className="block font-semibold">{store.label}</span>
                  </span>
                </>
              );
              const badgeClassName =
                "inline-flex min-w-48 items-center justify-center gap-3 rounded-xl bg-black/80 px-5 py-3 ring-1 ring-white/15";

              return (
                <li key={store.label}>
                  {isAvailable ? (
                    <a
                      href={store.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${badgeClassName} transition-transform hover:-translate-y-0.5`}
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
        </div>
      </div>
    </section>
  );
}

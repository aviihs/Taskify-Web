import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import JsonLd from "@/components/reusable/JsonLd";
import PageHero from "@/components/reusable/PageHero";
import guideContent from "@/data/getting-started.json";
import { buildPageMetadata } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import type { GettingStartedContent } from "@/types/GettingStarted";

const guide: GettingStartedContent = guideContent;
const GUIDE_TITLE = "Getting Started with Taskify | Set Up Your First Project";
const GUIDE_PATH = "/help/getting-started";

export const metadata: Metadata = buildPageMetadata({
  title: GUIDE_TITLE,
  description: guide.description,
  path: GUIDE_PATH,
  keywords: [
    "how to use Taskify",
    "Taskify getting started",
    "Taskify create project",
    "Taskify assign tasks",
  ],
});

export default function GettingStartedPage() {
  return (
    <main className="bg-taskify-background pb-28">
      <JsonLd
        data={buildWebPageSchema({
          type: "WebPage",
          path: GUIDE_PATH,
          title: guide.title,
          description: guide.description,
          dateModified: guide.lastUpdated,
        })}
      />
      <PageHero
        eyebrow="Taskify guide"
        eyebrowIcon="lucide:book-open"
        title={guide.title}
        description={guide.description}
      >
        <nav aria-label="Breadcrumb" className="text-sm text-white/80">
          <Link href="/" className="underline-offset-4 hover:underline">
            Home
          </Link>
          <span aria-hidden="true" className="mx-3">
            /
          </span>
          <span aria-current="page">Getting started</span>
        </nav>
      </PageHero>

      <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-4 lg:grid-cols-[220px_1fr] lg:gap-14">
        <aside>
          <nav
            aria-label="On this page"
            className="border-taskify-border/70 bg-taskify-surface rounded-2xl border p-6 lg:sticky lg:top-36"
          >
            <p className="text-taskify-text font-semibold">On this page</p>
            <ol className="mt-4 space-y-3">
              {guide.steps.map((step, index) => (
                <li key={step.id}>
                  <a
                    href={`#${step.id}`}
                    className="text-taskify-text-secondary hover:text-taskify-link text-sm leading-relaxed"
                  >
                    {index + 1}. {step.title}
                  </a>
                </li>
              ))}
            </ol>
            <a
              href="#troubleshooting"
              className="text-taskify-link mt-5 inline-block text-sm font-medium underline underline-offset-4"
            >
              Common setup questions
            </a>
          </nav>
        </aside>

        <article className="min-w-0 space-y-10">
          <div className="border-taskify-border/70 bg-taskify-surface space-y-4 rounded-3xl border p-6 sm:p-8">
            <h2 className="text-taskify-text text-2xl font-semibold tracking-tight">
              Before you start
            </h2>
            <p className="text-taskify-text-secondary leading-relaxed">
              This guide covers the Android and iOS apps. Check the{" "}
              <Link
                href="/#download"
                className="text-taskify-link underline underline-offset-4"
              >
                official Taskify app availability
              </Link>{" "}
              for store links as they go live, or{" "}
              <Link
                href="/contact"
                className="text-taskify-link underline underline-offset-4"
              >
                contact support
              </Link>{" "}
              if you need help accessing the app. Taskify Web is planned;
              browser access will be linked from the homepage when it launches.
            </p>
            <p className="text-taskify-text-secondary leading-relaxed">
              {guide.introduction}
            </p>
          </div>

          <ol className="space-y-10">
            {guide.steps.map((step, index) => (
              <li key={step.id}>
                <section
                  id={step.id}
                  className="border-taskify-border/70 bg-taskify-surface scroll-mt-36 rounded-3xl border p-6 sm:p-8"
                >
                  <p className="text-taskify-link text-xs font-semibold tracking-widest uppercase">
                    Step {index + 1}
                  </p>
                  <h2 className="text-taskify-text mt-3 text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h2>
                  <p className="text-taskify-text-secondary mt-4 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="text-taskify-text-secondary mt-5 list-disc space-y-3 pl-5 leading-relaxed">
                    {step.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {step.image && (
                    <figure className="mx-auto mt-8 max-w-72">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={1242}
                        height={2688}
                        sizes="(min-width: 400px) 288px, 75vw"
                        className="h-auto w-full rounded-2xl"
                      />
                      <figcaption className="text-taskify-text-muted mt-3 text-center text-sm leading-relaxed">
                        {step.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </section>
              </li>
            ))}
          </ol>

          <section
            id="troubleshooting"
            className="border-taskify-border/70 bg-taskify-surface scroll-mt-36 space-y-6 rounded-3xl border p-6 sm:p-8"
          >
            <h2 className="text-taskify-text text-2xl font-semibold tracking-tight">
              Common setup questions
            </h2>
            {guide.troubleshooting.map(item => (
              <div key={item.title}>
                <h3 className="text-taskify-text font-semibold">
                  {item.title}
                </h3>
                <p className="text-taskify-text-secondary mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
            <p>
              <Link
                href="/contact"
                className="text-taskify-link font-semibold underline underline-offset-4"
              >
                Contact Taskify support
              </Link>
            </p>
            <p className="text-taskify-text-secondary text-sm leading-relaxed">
              For account deletion and data requests, read{" "}
              <Link
                href="/privacy-policy#your-rights"
                className="text-taskify-link underline underline-offset-4"
              >
                your privacy choices
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}

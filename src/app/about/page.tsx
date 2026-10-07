import type { Metadata } from "next";

import AboutCreator from "@/components/about/AboutCreator";
import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import CallToAction from "@/components/reusable/CallToAction";
import JsonLd from "@/components/reusable/JsonLd";
import PageHero from "@/components/reusable/PageHero";
import aboutContent from "@/data/about.json";
import site from "@/data/site.json";
import { buildPageMetadata } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import type { AboutContent } from "@/types/About";

const about: AboutContent = aboutContent;

const ABOUT_TITLE = `About ${site.name} and ${site.creator.name}`;
const ABOUT_DESCRIPTION = `${site.name} is a task and project manager for teams, designed and built by ${site.creator.name}. Learn why it exists and the principles behind it.`;

export const metadata: Metadata = buildPageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  keywords: ["about Taskify", "who made Taskify", "Taskify creator"],
});

export default function AboutPage() {
  return (
    <main className="bg-taskify-background space-y-28 pb-28 sm:space-y-36">
      <JsonLd
        data={buildWebPageSchema({
          type: "AboutPage",
          path: "/about",
          title: ABOUT_TITLE,
          description: ABOUT_DESCRIPTION,
        })}
      />
      <div>
        <PageHero
          eyebrow={about.hero.eyebrow}
          eyebrowIcon="lucide:sparkles"
          title={about.hero.title}
          description={about.hero.description}
        />
        <AboutStory story={about.story} />
      </div>
      <AboutCreator creator={about.creator} />
      <AboutValues values={about.values} />
      <AboutPrinciples principles={about.principles} />
      <CallToAction {...about.cta} />
    </main>
  );
}

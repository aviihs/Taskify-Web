import type { Metadata } from "next";

import AboutPrinciples from "@/components/about/AboutPrinciples";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import CallToAction from "@/components/reusable/CallToAction";
import PageHero from "@/components/reusable/PageHero";
import aboutContent from "@/data/about.json";
import site from "@/data/site.json";
import type { AboutContent } from "@/types/About";

const about: AboutContent = aboutContent;

export const metadata: Metadata = {
  title: "About",
  description: `Why we built ${site.name} and the principles behind it.`,
};

export default function AboutPage() {
  return (
    <main className="bg-taskify-background space-y-28 pb-28 sm:space-y-36">
      <div>
        <PageHero
          eyebrow={about.hero.eyebrow}
          eyebrowIcon="lucide:sparkles"
          title={about.hero.title}
          description={about.hero.description}
        />
        <AboutStory story={about.story} />
      </div>
      <AboutValues values={about.values} />
      <AboutPrinciples principles={about.principles} />
      <CallToAction {...about.cta} />
    </main>
  );
}

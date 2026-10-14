import type { Metadata } from "next";

import DownloadSection from "@/components/home/DownloadSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import HomeHero from "@/components/home/HomeHero";
import ProductFaq from "@/components/home/ProductFaq";
import ScreenshotShowcase from "@/components/home/ScreenshotShowcase";
import SecuritySection from "@/components/home/SecuritySection";
import StatsStrip from "@/components/home/StatsStrip";
import StepsSection from "@/components/home/StepsSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import JsonLd from "@/components/reusable/JsonLd";
import homeContent from "@/data/home.json";
import site from "@/data/site.json";
import { buildPageMetadata } from "@/lib/seo";
import { buildAppSchema, buildFaqSchema } from "@/lib/structured-data";
import type { HomeContent } from "@/types/Home";

const home = homeContent as HomeContent;

export const metadata: Metadata = buildPageMetadata({
  title: "Taskify | Task & Project Management App for Teams",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <main className="bg-taskify-background space-y-28 pb-28 sm:space-y-36">
      <JsonLd
        data={buildAppSchema(home.features.items.map(feature => feature.title))}
      />
      <JsonLd data={buildFaqSchema(home.faq.items)} />
      <div>
        <HomeHero hero={home.hero} />
        <StatsStrip stats={home.stats} />
      </div>
      <FeatureGrid features={home.features} />
      <ScreenshotShowcase showcase={home.showcase} />
      <WorkflowSection workflow={home.workflow} />
      <SecuritySection security={home.security} />
      <StepsSection steps={home.steps} />
      <ProductFaq faq={home.faq} />
      <DownloadSection download={home.download} />
    </main>
  );
}

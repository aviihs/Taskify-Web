import DownloadSection from "@/components/home/DownloadSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import HomeHero from "@/components/home/HomeHero";
import SecuritySection from "@/components/home/SecuritySection";
import StatsStrip from "@/components/home/StatsStrip";
import StepsSection from "@/components/home/StepsSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import JsonLd from "@/components/reusable/JsonLd";
import homeContent from "@/data/home.json";
import { buildAppSchema } from "@/lib/structured-data";
import type { HomeContent } from "@/types/Home";

const home = homeContent as HomeContent;

export default function HomePage() {
  return (
    <main className="bg-taskify-background space-y-28 pb-28 sm:space-y-36">
      <JsonLd
        data={buildAppSchema(home.features.items.map(feature => feature.title))}
      />
      <div>
        <HomeHero hero={home.hero} />
        <StatsStrip stats={home.stats} />
      </div>
      <FeatureGrid features={home.features} />
      <WorkflowSection workflow={home.workflow} />
      <SecuritySection security={home.security} />
      <StepsSection steps={home.steps} />
      <DownloadSection download={home.download} />
    </main>
  );
}

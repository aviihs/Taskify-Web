import type { Metadata } from "next";

import Icon from "@/components/common/icon";
import PolicyContact from "@/components/privacy-policy/PolicyContact";
import PolicyHighlights from "@/components/privacy-policy/PolicyHighlights";
import PolicySectionCard from "@/components/privacy-policy/PolicySectionCard";
import PolicyToc from "@/components/privacy-policy/PolicyToc";
import ReadingProgress from "@/components/privacy-policy/ReadingProgress";
import JsonLd from "@/components/reusable/JsonLd";
import PageHero from "@/components/reusable/PageHero";
import privacyPolicyContent from "@/data/privacy-policy.json";
import site from "@/data/site.json";
import { buildPageMetadata } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import type { PrivacyPolicy } from "@/types/PrivacyPolicy";

const privacyPolicy: PrivacyPolicy = privacyPolicyContent;

const PRIVACY_TITLE = "Privacy Policy";
const PRIVACY_DESCRIPTION = `How the ${site.name} app and website collect, use and protect your information. No ads, no trackers, and your data is never sold.`;

export const metadata: Metadata = buildPageMetadata({
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  path: "/privacy-policy",
  keywords: ["Taskify privacy policy", "Taskify data deletion"],
});

export default function PrivacyPolicyPage() {
  const { lastUpdated, intro, highlights, sections } = privacyPolicy;

  return (
    <main className="bg-taskify-background text-taskify-text pb-28">
      <JsonLd
        data={buildWebPageSchema({
          type: "WebPage",
          path: "/privacy-policy",
          title: PRIVACY_TITLE,
          description: PRIVACY_DESCRIPTION,
          dateModified: new Date(lastUpdated).toISOString().slice(0, 10),
        })}
      />
      <ReadingProgress />
      <PageHero
        eyebrow={`${site.name} Privacy`}
        eyebrowIcon="lucide:shield-check"
        title="Privacy Policy"
        description={intro}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20">
          <Icon
            name="lucide:calendar-check"
            className="cursor-default text-sm lg:text-sm"
          />
          Last updated {lastUpdated}
        </span>
      </PageHero>
      <PolicyHighlights highlights={highlights} />

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 px-4 lg:grid-cols-[250px_1fr] lg:gap-12">
        <aside>
          <PolicyToc sections={sections} />
        </aside>

        <div className="space-y-5">
          {sections.map((section, index) => (
            <PolicySectionCard
              key={section.id}
              section={section}
              number={index + 1}
            />
          ))}
          <PolicyContact appName={site.name} contactEmail={site.contactEmail} />
        </div>
      </div>
    </main>
  );
}

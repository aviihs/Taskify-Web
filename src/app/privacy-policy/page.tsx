import type { Metadata } from "next";

import PolicyContact from "@/components/privacy-policy/PolicyContact";
import PolicyHero from "@/components/privacy-policy/PolicyHero";
import PolicyHighlights from "@/components/privacy-policy/PolicyHighlights";
import PolicySectionCard from "@/components/privacy-policy/PolicySectionCard";
import PolicyToc from "@/components/privacy-policy/PolicyToc";
import privacyPolicyContent from "@/data/privacy-policy.json";
import site from "@/data/site.json";
import type { PrivacyPolicy } from "@/types/PrivacyPolicy";

const privacyPolicy: PrivacyPolicy = privacyPolicyContent;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects your information.`,
};

export default function PrivacyPolicyPage() {
  const { lastUpdated, intro, highlights, sections } = privacyPolicy;

  return (
    <main className="bg-taskify-background text-taskify-text pb-20">
      <PolicyHero appName={site.name} lastUpdated={lastUpdated} intro={intro} />
      <PolicyHighlights highlights={highlights} />

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 px-4 lg:grid-cols-[230px_1fr]">
        <aside>
          <PolicyToc sections={sections} />
        </aside>

        <div className="space-y-6">
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

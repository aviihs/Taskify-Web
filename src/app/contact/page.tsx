import type { Metadata } from "next";

import ContactChannels from "@/components/contact/ContactChannels";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactForm from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import JsonLd from "@/components/reusable/JsonLd";
import PageHero from "@/components/reusable/PageHero";
import contactContent from "@/data/contact.json";
import site from "@/data/site.json";
import { buildPageMetadata } from "@/lib/seo";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/structured-data";
import type { ContactPageContent } from "@/types/ContactPage";

const contact: ContactPageContent = contactContent;

const CONTACT_TITLE = `Contact ${site.name}`;
const CONTACT_DESCRIPTION = `Get in touch with ${site.creator.name} and the ${site.name} team for product support, feedback, partnerships or privacy requests. Email ${site.contactEmail}.`;

export const metadata: Metadata = buildPageMetadata({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  path: "/contact",
  keywords: ["Taskify support", "contact Taskify", "Taskify help"],
});

export default function ContactPage() {
  return (
    <main className="bg-taskify-background pb-28">
      <JsonLd
        data={buildWebPageSchema({
          type: "ContactPage",
          path: "/contact",
          title: CONTACT_TITLE,
          description: CONTACT_DESCRIPTION,
        })}
      />
      <JsonLd data={buildFaqSchema(contact.faq.items)} />
      <PageHero
        eyebrow={contact.hero.eyebrow}
        eyebrowIcon="lucide:message-circle"
        title={contact.hero.title}
        description={contact.hero.description}
      >
        <a
          href={`mailto:${site.contactEmail}`}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          {site.contactEmail}
        </a>
      </PageHero>

      <ContactChannels
        channels={contact.channels}
        contactEmail={site.contactEmail}
      />

      <section className="mx-auto mt-24 grid max-w-6xl gap-14 px-4 sm:mt-32 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal>
          <ContactForm form={contact.form} contactEmail={site.contactEmail} />
        </Reveal>
        <Reveal delay={0.1} className="lg:pt-10">
          <ContactFaq faq={contact.faq} />
        </Reveal>
      </section>
    </main>
  );
}

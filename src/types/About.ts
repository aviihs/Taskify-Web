import type { IconCard, Link, SectionIntro } from "./Home";

export interface AboutContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  story: SectionIntro & {
    paragraphs: string[];
    facts: { value: string; label: string }[];
  };
  creator: SectionIntro & {
    paragraphs: string[];
    highlights: { icon: string; label: string }[];
    linkLabel: string;
  };
  values: SectionIntro & { items: IconCard[] };
  principles: SectionIntro & {
    items: { title: string; description: string }[];
  };
  cta: {
    title: string;
    description: string;
    primaryCta: Link;
    secondaryCta: Link;
  };
}

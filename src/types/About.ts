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

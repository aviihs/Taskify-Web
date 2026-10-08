export type Tone = "info" | "success" | "warning" | "error";

export interface Link {
  label: string;
  href: string;
}

export interface IconCard {
  icon: string;
  title: string;
  description: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface PreviewTask {
  title: string;
  status: string;
  priority: string;
  tone: Tone;
  due: string;
}

export interface HomeContent {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: Link;
    secondaryCta: Link;
    preview: {
      greeting: string;
      summary: string;
      project: string;
      progress: number;
      tasks: PreviewTask[];
    };
  };
  stats: { value: string; label: string }[];
  features: SectionIntro & { items: IconCard[] };
  showcase: SectionIntro & {
    screens: { src: string; alt: string; caption: string }[];
  };
  workflow: SectionIntro & {
    stages: { label: string; icon: string; description: string }[];
    priorities: { label: string; tone: Tone }[];
    priorityCaption: string;
  };
  security: SectionIntro & { linkLabel: string; items: IconCard[] };
  steps: SectionIntro & { items: { title: string; description: string }[] };
  download: {
    title: string;
    description: string;
    stores: { icon: string; caption: string; label: string; href: string }[];
    comingSoonLabel: string;
    contactPrompt: string;
  };
}

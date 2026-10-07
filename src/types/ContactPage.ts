export interface ContactChannel {
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  // "mailto" opens an email with `subject`; anything else is a site path.
  href: string;
  subject?: string;
}

export interface ContactPageContent {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  channels: ContactChannel[];
  form: {
    title: string;
    description: string;
    topics: string[];
    submitLabel: string;
    successTitle: string;
    successDescription: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
}

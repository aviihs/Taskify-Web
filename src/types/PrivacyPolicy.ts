export interface PolicyHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface PolicyGroup {
  title: string;
  items: string[];
}

export interface PolicySection {
  id: string;
  icon: string;
  title: string;
  paragraphs?: string[];
  groups?: PolicyGroup[];
  items?: string[];
  note?: string;
}

export interface PrivacyPolicy {
  appName: string;
  lastUpdated: string;
  contactEmail: string;
  intro: string;
  highlights: PolicyHighlight[];
  sections: PolicySection[];
}

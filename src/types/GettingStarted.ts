export interface GettingStartedContent {
  title: string;
  description: string;
  lastUpdated: string;
  introduction: string;
  steps: {
    id: string;
    title: string;
    description: string;
    items: string[];
    image?: { src: string; alt: string; caption: string };
  }[];
  troubleshooting: { title: string; description: string }[];
}

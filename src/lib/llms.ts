// Builds /llms.txt (short map of the site) and /llms-full.txt (all page
// content) from the same JSON the pages render, so they never drift apart.
// Format: https://llmstxt.org
import aboutContent from "@/data/about.json";
import contactContent from "@/data/contact.json";
import homeContent from "@/data/home.json";
import privacyPolicyContent from "@/data/privacy-policy.json";
import site from "@/data/site.json";
import type { AboutContent } from "@/types/About";
import type { ContactPageContent } from "@/types/ContactPage";
import type { HomeContent } from "@/types/Home";
import type { PrivacyPolicy } from "@/types/PrivacyPolicy";

import { absoluteUrl, PUBLIC_ROUTES } from "./seo";

const home = homeContent as HomeContent;
const about: AboutContent = aboutContent;
const contact: ContactPageContent = contactContent;
const privacyPolicy: PrivacyPolicy = privacyPolicyContent;

function buildKeyFacts() {
  return [
    `- Name: ${site.name}`,
    `- What it is: a task and project management app for teams`,
    `- Created by: ${site.creator.name} (${site.creator.role}), ${site.creator.url}`,
    `- Platforms: Android and iOS, plus this website`,
    `- Contact: ${site.contactEmail}`,
    `- Privacy: no ads, no third-party trackers, data is never sold`,
  ].join("\n");
}

export function buildLlmsTxt() {
  const pageLinks = PUBLIC_ROUTES.map(
    route => `- [${route.title}](${absoluteUrl(route.path)}): ${route.summary}`
  ).join("\n");

  const featureLines = home.features.items
    .map(feature => `- ${feature.title}: ${feature.description}`)
    .join("\n");

  return `# ${site.name}

> ${site.description}

${buildKeyFacts()}

## Pages

${pageLinks}

## Features

${featureLines}

## Optional

- [Full site content](${absoluteUrl("/llms-full.txt")}): every page as plain text
`;
}

export function buildLlmsFullTxt() {
  const featureLines = home.features.items
    .map(feature => `- ${feature.title}: ${feature.description}`)
    .join("\n");
  const stageNames = home.workflow.stages.map(stage => stage.label).join(" → ");
  const priorityNames = home.workflow.priorities
    .map(priority => priority.label)
    .join(", ");
  const securityLines = home.security.items
    .map(item => `- ${item.title}: ${item.description}`)
    .join("\n");
  const valueLines = about.values.items
    .map(value => `- ${value.title}: ${value.description}`)
    .join("\n");
  const faqLines = contact.faq.items
    .map(item => `### ${item.question}\n\n${item.answer}`)
    .join("\n\n");
  const policySections = privacyPolicy.sections
    .map(section => {
      const parts = [`### ${section.title}`];
      section.paragraphs?.forEach(paragraph => parts.push(paragraph));
      section.groups?.forEach(group =>
        parts.push(
          `${group.title}:\n${group.items.map(item => `- ${item}`).join("\n")}`
        )
      );
      if (section.items) {
        parts.push(section.items.map(item => `- ${item}`).join("\n"));
      }
      if (section.note) parts.push(`Note: ${section.note}`);
      return parts.join("\n\n");
    })
    .join("\n\n");

  return `# ${site.name}

> ${site.description}

${buildKeyFacts()}

## Home (${absoluteUrl("/")})

${home.hero.title} ${home.hero.highlight}

${home.hero.description}

### Features

${featureLines}

### Workflow

Tasks move through: ${stageNames}. Priority levels: ${priorityNames}.

### Privacy and security

${securityLines}

## About (${absoluteUrl("/about")})

${about.hero.description}

${about.story.paragraphs.join("\n\n")}

### ${about.creator.title}

${about.creator.paragraphs.join("\n\n")}

### Values

${valueLines}

## Contact (${absoluteUrl("/contact")})

${contact.hero.description}

Email: ${site.contactEmail}

${faqLines}

## Privacy Policy (${absoluteUrl("/privacy-policy")})

Last updated ${privacyPolicy.lastUpdated}.

${privacyPolicy.intro}

${policySections}
`;
}

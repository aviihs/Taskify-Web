import site from "@/data/site.json";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = `Contact the ${site.name} team`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "We would love to hear from you",
    description: `Support, feedback and privacy requests: ${site.contactEmail}`,
  });
}

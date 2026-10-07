import site from "@/data/site.json";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = `${site.name} by ${site.creator.name}, task and project manager for teams`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Task manager for teams",
    title: "Plan it. Assign it. Get it done.",
    description: site.tagline,
  });
}

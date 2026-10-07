import site from "@/data/site.json";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = `About ${site.name} and its creator ${site.creator.name}`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: `Designed and built by ${site.creator.name}`,
    description: "Calm software for teams with a lot to do.",
  });
}

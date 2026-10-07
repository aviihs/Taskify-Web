import site from "@/data/site.json";
import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = `${site.name} privacy policy`;
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Privacy Policy",
    title: "Your work stays yours",
    description: "No ads, no trackers, and your data is never sold.",
  });
}

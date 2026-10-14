import {
  OG_IMAGE_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  renderOgImage,
} from "@/lib/og-image";

export const alt = "Getting started with Taskify on Android and iOS";
export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Getting started",
    title: "Set up your first project with Taskify.",
    description:
      "Create an account, invite your team, assign tasks and follow progress.",
  });
}

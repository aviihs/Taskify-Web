import type { MetadataRoute } from "next";

import site from "@/data/site.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} · Task and project manager for teams`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7fb",
    theme_color: site.themeColor,
    categories: ["productivity", "business"],
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

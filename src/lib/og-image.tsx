import { ImageResponse } from "next/og";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import site from "@/data/site.json";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";

interface OgImageOptions {
  eyebrow: string;
  title: string;
  description: string;
}

// Branded 1200x630 social card shared by every route's opengraph-image.tsx.
export async function renderOgImage({
  eyebrow,
  title,
  description,
}: OgImageOptions) {
  const logo = await readFile(
    join(process.cwd(), "src/assets/taskify-logo.png")
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "white",
        backgroundColor: "#3e425f",
        backgroundImage:
          "radial-gradient(circle at 85% 10%, rgba(140,147,217,0.55), transparent 45%), linear-gradient(135deg, #3e425f 0%, #585c83 55%, #686fb1 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 18,
            backgroundColor: "white",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img> */}
          <img src={logoSrc} width={44} height={44} alt="" />
        </div>
        <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          {site.name}
        </span>
        <span
          style={{
            marginLeft: 12,
            padding: "8px 18px",
            borderRadius: 999,
            fontSize: 22,
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 940,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        <span>{`Built by ${site.creator.name}`}</span>
        <span>Android · iOS · Web</span>
      </div>
    </div>,
    OG_IMAGE_SIZE
  );
}

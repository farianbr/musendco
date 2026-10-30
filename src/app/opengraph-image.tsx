import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { site } from "@/content/site";

const { lead, emphasis } = home.hero.headline;

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card for every route without its own image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#ecece7",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 700, letterSpacing: "-0.04em" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#3ddc97" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1, letterSpacing: "-0.045em", maxWidth: 980 }}>
            {`${lead} ${emphasis}`}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              paddingTop: 20,
              borderTop: "1px solid rgba(236,236,231,0.18)",
              fontSize: 26,
              color: "#8a8a84",
            }}
          >
            {site.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

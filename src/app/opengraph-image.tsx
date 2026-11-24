import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { BRAND_ORANGE, LOGO_LETTERS, LOGO_MARK, LOGO_VIEWBOX } from "@/components/ui/Brand";

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
          backgroundImage:
            "radial-gradient(circle at 92% 30%, rgba(255,89,49,0.55), transparent 42%), radial-gradient(circle at 70% 95%, rgba(73,0,234,0.45), transparent 40%), radial-gradient(circle at 98% 85%, rgba(171,91,212,0.4), transparent 35%)",
          color: "#ecece7",
          padding: "64px 72px",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
      >
        <svg width="198" height="57" viewBox={LOGO_VIEWBOX}>
          <g fill="#ecece7">
            {LOGO_LETTERS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <polygon fill={BRAND_ORANGE} points={LOGO_MARK} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 92, lineHeight: 0.95, letterSpacing: "-0.05em", maxWidth: 960 }}>
            <span>{lead}&nbsp;</span>
            <span style={{ color: BRAND_ORANGE }}>{emphasis}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 40,
              paddingTop: 20,
              borderTop: "1px solid rgba(236,236,231,0.18)",
              fontSize: 26,
              color: "#b5b5af",
            }}
          >
            <span>{site.tagline}</span>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

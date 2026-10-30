const FALLBACK_SITE_URL = "https://musendco.com";

/**
 * Production origin used for canonical URLs, Open Graph and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL per environment; invalid values fall back so a
 * typo can never emit malformed canonical tags.
 */
function resolveSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      const url = new URL(raw);
      if (url.protocol === "https:" || url.protocol === "http:") {
        return new URL(url.origin);
      }
    } catch {
      // fall through to the default
    }
    console.warn(`Ignoring invalid NEXT_PUBLIC_SITE_URL: "${raw}"`);
  }
  return new URL(FALLBACK_SITE_URL);
}

export const siteUrl = resolveSiteUrl();

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

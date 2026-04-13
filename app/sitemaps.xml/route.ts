import { LOCATION_PAGES, SERVICE_ORDER, getStates } from "@/lib/hvac-data";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const nowIso = new Date().toISOString();

  const urls = new Set<string>([
    `${siteUrl}/`,
    `${siteUrl}/services`,
    ...SERVICE_ORDER.map((service) => `${siteUrl}/services/${service}`),
    ...getStates().flatMap((state) => SERVICE_ORDER.map((service) => `${siteUrl}/${state.slug}/services/${service}`)),
    ...LOCATION_PAGES.flatMap((location) =>
      SERVICE_ORDER.map((service) => `${siteUrl}/${location.stateSlug}/${location.citySlug}/${service}`),
    ),
  ]);

  const xmlItems = [...urls]
    .map(
      (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${nowIso}</lastmod>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

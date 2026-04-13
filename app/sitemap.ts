import type { MetadataRoute } from "next";
import { LOCATION_PAGES, SERVICE_ORDER, getStates } from "@/lib/hvac-data";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl().replace(/\/+$/, "").replace(/\.ca(?=\/|$)/, ".com");
  const now = new Date();

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  const serviceHubs: MetadataRoute.Sitemap = SERVICE_ORDER.map((service) => ({
    url: `${siteUrl}/services/${service}`,
    lastModified: now,
    ...(service === "ac-repair" ? { changeFrequency: "weekly" as const, priority: 0.93 } : {}),
  }));

  const provinceRoutes: MetadataRoute.Sitemap = getStates().flatMap((state) =>
    SERVICE_ORDER.map((service) => ({
      url: `${siteUrl}/${state.slug}/services/${service}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: service === "ac-repair" ? 0.9 : 0.8,
    })),
  );

  const locationRoutes: MetadataRoute.Sitemap = LOCATION_PAGES.flatMap((location) =>
    SERVICE_ORDER.map((service) => ({
      url: `${siteUrl}/${location.stateSlug}/${location.citySlug}/${service}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: service === "ac-repair" ? 0.88 : 0.76,
    })),
  );

  const allRoutes = [...baseRoutes, ...serviceHubs, ...provinceRoutes, ...locationRoutes];
  const deduped = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const route of allRoutes) {
    deduped.set(route.url, route);
  }

  return [...deduped.values()];
}

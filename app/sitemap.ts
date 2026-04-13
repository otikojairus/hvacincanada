import type { MetadataRoute } from "next";
import { LOCATION_PAGES, SERVICE_ORDER, getStates } from "@/lib/hvac-data";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
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
    changeFrequency: "weekly",
    priority: service === "ac-repair" ? 0.93 : 0.83,
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

  return [...baseRoutes, ...serviceHubs, ...provinceRoutes, ...locationRoutes];
}

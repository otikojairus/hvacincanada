import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LOCATION_PAGES, SERVICE_ORDER, SERVICES } from "@/lib/hvac-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "HVAC Service Hubs",
  description:
    "Browse all HVAC repair and replacement service hubs for Ontario rollout: AC, furnace, heat pump, boiler, ductwork, thermostat, and more.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${SITE_NAME} Service Hubs`,
    description: "Central directory for HVAC service intent pages with Ontario and city-level linking.",
    url: absoluteUrl("/services"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function ServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "HVAC Service Hubs",
    itemListElement: SERVICE_ORDER.map((serviceSlug, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: SERVICES[serviceSlug].name,
      url: absoluteUrl(`/services/${serviceSlug}`),
    })),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={schema} />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <p className="frost-kicker">Service Directory</p>
          <h1>
            HVAC Service Hubs
            <span>Ontario First. Canada Next.</span>
          </h1>
          <p className="mt-4">
            Each service hub includes province pages, city pages, metadata-ready structure, and internal links designed
            for scalable pSEO growth.
          </p>
          <a href={`tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`} className="frost-btn frost-btn-primary mt-6">
            Call {EMERGENCY_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container">
          <h2 className="frost-title">All HVAC Pages By Service</h2>
          <p className="frost-subtitle">
            Current rollout includes {LOCATION_PAGES.length} Ontario city pages for each service type.
          </p>

          <div className="frost-grid frost-cards-4 mt-6">
            {SERVICE_ORDER.map((serviceSlug) => {
              const service = SERVICES[serviceSlug];
              return (
                <article key={service.slug} className="frost-card">
                  <p className="frost-chip">{service.seo.focusKeyphrase}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{service.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href={`/services/${service.slug}`} className="frost-btn frost-btn-primary">
                      Open Hub
                    </Link>
                    <Link href={`/ontario/services/${service.slug}`} className="frost-btn border border-[#bfd1ea] bg-white text-[#1e467c]">
                      Ontario Page
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

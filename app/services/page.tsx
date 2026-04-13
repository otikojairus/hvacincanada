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
          <p className="frost-kicker">Find The Right HVAC Service</p>
          <h1>
            HVAC Services For Repairs And Replacements
            <span>Built Around Real Customer Problems</span>
          </h1>
          <p className="mt-4">
            This page helps you quickly find the service that matches your issue, whether you have no heat, weak
            cooling, uneven airflow, unusual noise, or rising energy costs. Each service includes what to expect, how
            issues are diagnosed, and when replacement may be the better long-term option.
          </p>
          <p className="mt-3 text-sm text-[#dbe7ff]">
            If you are not sure which service to choose, call us and we will route you to the right support based on
            your system type and urgency.
          </p>
          <a href={`tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`} className="frost-btn frost-btn-primary mt-6">
            Call {EMERGENCY_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container">
          <h2 className="frost-title">All HVAC Services</h2>
          <p className="frost-subtitle">
            Every service page includes Ontario-wide coverage and city-level support details for {LOCATION_PAGES.length}{" "}
            locations.
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

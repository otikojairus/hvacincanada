import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LOCATION_PAGES, SERVICE_ORDER, SERVICES } from "@/lib/hvac-data";
import {
  EMERGENCY_PHONE_DISPLAY,
  EMERGENCY_PHONE_E164,
  SITE_NAME,
  absoluteUrl,
  serviceLocationKeyword,
} from "@/lib/seo";

const featuredServices = SERVICE_ORDER.slice(0, 6);
const featuredLocations = LOCATION_PAGES.slice(0, 10);

export const metadata: Metadata = {
  title: "HVAC Services Across Ontario",
  description:
    "Ontario-first HVAC repair and replacement pages for AC, furnace, heat pump, boiler, and duct systems across major cities.",
  alternates: { canonical: "/" },
  keywords: [
    "hvac ontario",
    "ac repair ontario",
    "furnace repair ontario",
    ...featuredLocations.map((location) => serviceLocationKeyword("AC Repair", location.cityName)),
  ],
  openGraph: {
    title: `${SITE_NAME} | Ontario HVAC Service Coverage`,
    description: "Built for Ontario indexing first, with service hubs and city-level HVAC landing pages.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: EMERGENCY_PHONE_E164,
        contactType: "customer service",
        areaServed: ["CA-ON"],
        availableLanguage: ["en"],
      },
    ],
  };

  const itemListSchema = {
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
      <JsonLd data={organizationSchema} />
      <JsonLd data={itemListSchema} />

      <section className="frost-hero frost-section">
        <div className="frost-container relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="frost-kicker">Reliable HVAC Help Across Ontario</p>
            <h1>
              HVAC In Canada
              <span>Fast Service. Clear Answers. No Guesswork.</span>
            </h1>
            <p className="mt-4">
              When your heating or cooling system fails, you need quick support and a plan you can trust. We help
              homeowners and businesses across Ontario with AC, furnace, heat pump, boiler, and airflow problems using
              practical diagnostics and clear recommendations.
            </p>
            <p className="mt-3 text-sm text-[#dbe7ff]">
              From urgent breakdowns to planned replacements, our goal is simple: restore comfort safely, explain every
              step in plain language, and help you make the right decision for your property and budget.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`} className="frost-btn frost-btn-primary">
                Call {EMERGENCY_PHONE_DISPLAY}
              </a>
              <Link href="/services" className="frost-btn frost-btn-ghost">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="frost-panel-dark">
            <p className="frost-chip">Why Customers Choose Us</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">What You Can Expect On Every Visit</h2>
            <ul className="mt-4 grid gap-2 text-sm text-[#d7e2fa]">
              <li>Prompt response for urgent heating and cooling problems</li>
              <li>Step-by-step diagnostics before any repair recommendation</li>
              <li>Clear explanation of repair vs. replacement options</li>
              <li>Service support for homes, condos, and light commercial spaces</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container">
          <h2 className="frost-title">Popular HVAC Services</h2>
          <p className="frost-subtitle">
            Explore detailed service pages to understand symptoms, likely causes, and what our team checks first during
            a visit.
          </p>
          <div className="frost-grid frost-cards-3 mt-6">
            {featuredServices.map((serviceSlug) => {
              const service = SERVICES[serviceSlug];
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="frost-card">
                  <p className="frost-chip">{service.navLabel}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{service.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="frost-section pt-0">
        <div className="frost-container">
          <div className="frost-highlight">
            <h2 className="frost-title text-2xl">Local Service In Ontario Cities</h2>
            <p className="frost-subtitle">
              Choose your city to see locally relevant service details, practical next steps, and a direct contact path
              for immediate help.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {featuredLocations.map((location) => (
                <Link
                  key={`${location.stateSlug}-${location.citySlug}`}
                  href={`/${location.stateSlug}/${location.citySlug}/ac-repair`}
                  className="rounded-xl border border-[#c7d9f3] bg-white px-3 py-2 text-sm font-semibold text-[#234177]"
                >
                  {location.cityName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

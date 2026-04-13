import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LOCATION_PAGES, SERVICE_ORDER, getServiceBySlug } from "@/lib/hvac-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, serviceLocationKeyword } from "@/lib/seo";

type PageProps = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return SERVICE_ORDER.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = `${service.name} Ontario Service Hub`;
  const description = `${service.name} in Ontario with province-level and city-level pages. Call ${EMERGENCY_PHONE_DISPLAY} for immediate support.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    keywords: [
      service.name,
      service.seo.focusKeyphrase,
      ...LOCATION_PAGES.slice(0, 8).map((location) => serviceLocationKeyword(service.name, location.cityName)),
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/services/${service.slug}`),
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const provincePath = `/ontario/services/${service.slug}`;
  const relatedCities = LOCATION_PAGES.slice(0, 24);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} Ontario`,
    serviceType: service.name,
    description: service.shortDescription,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ontario",
    },
    url: absoluteUrl(`/services/${service.slug}`),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={schema} />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <p className="frost-kicker">{service.seo.focusKeyphrase}</p>
          <h1>
            {service.name}
            <span>Professional Support Across Ontario</span>
          </h1>
          <p className="mt-4">
            {service.shortDescription} We focus on safe operation, reliable performance, and clear recommendations so
            you can move forward with confidence.
          </p>
          <p className="mt-3 text-sm text-[#dbe7ff]">
            Whether you are dealing with a sudden breakdown or recurring comfort issues, this guide explains how the
            service works, what our team checks first, and how to get local help quickly.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={provincePath} className="frost-btn frost-btn-primary">
              Open Ontario Page
            </Link>
            <a href={`tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`} className="frost-btn frost-btn-ghost">
              Call {EMERGENCY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <div className="frost-highlight">
            <h2 className="frost-title text-2xl">How This Service Helps You</h2>
            <p className="frost-subtitle">
              Every appointment follows a practical process: identify the root issue, correct what is needed, verify
              performance, and explain your options in plain language.
            </p>
          </div>

          <div className="frost-grid frost-cards-3">
            {service.processSteps.map((step, index) => (
              <div key={step} className="frost-card">
                <p className="frost-chip">Step {index + 1}</p>
                <p className="mt-3 text-sm text-slate-700">{step}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="frost-title text-2xl">Find {service.name} Near You</h2>
            <p className="frost-subtitle">
              Select your city to view local service details, response guidance, and direct contact options for fast
              support.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCities.map((location) => (
                <Link
                  key={`${location.stateSlug}-${location.citySlug}`}
                  href={`/${location.stateSlug}/${location.citySlug}/${service.slug}`}
                  className="rounded-xl border border-[#c6d8f4] bg-white px-3 py-2 text-sm font-semibold text-[#224071]"
                >
                  {service.name} {location.cityName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

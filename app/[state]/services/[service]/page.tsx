import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SERVICE_ORDER, getLocationsByState, getServiceBySlug, getStates } from "@/lib/hvac-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME, absoluteUrl, serviceLocationKeyword } from "@/lib/seo";

type PageProps = {
  params: Promise<{ state: string; service: string }>;
};

export async function generateStaticParams() {
  return getStates().flatMap((state) => SERVICE_ORDER.map((service) => ({ state: state.slug, service })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const locations = getLocationsByState(state);

  if (!service || locations.length === 0) {
    return { title: "Page Not Found" };
  }

  const stateName = locations[0].stateName;
  const title = `${service.name} ${stateName}`;
  const description = `${service.name} service coverage across ${stateName}, including city landing pages and fast call-to-action routing.`;

  return {
    title,
    description,
    alternates: { canonical: `/${state}/services/${service.slug}` },
    keywords: [
      serviceLocationKeyword(service.name, stateName),
      service.seo.focusKeyphrase,
      ...locations.slice(0, 10).map((location) => serviceLocationKeyword(service.name, location.cityName)),
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/${state}/services/${service.slug}`),
      type: "article",
      siteName: SITE_NAME,
      locale: "en_CA",
    },
  };
}

export default async function StateServicePage({ params }: PageProps) {
  const { state, service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const locations = getLocationsByState(state);

  if (!service || locations.length === 0) {
    notFound();
  }

  const stateName = locations[0].stateName;
  const primaryKeyword = `${service.name} ${stateName}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: primaryKeyword,
    serviceType: service.name,
    description: `${service.shortDescription} Province-level page for ${stateName}.`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: stateName,
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    url: absoluteUrl(`/${state}/services/${service.slug}`),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={schema} />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <div className="text-xs uppercase tracking-[0.16em] text-[#dbe7ff]">
            <Link href="/services" className="hover:text-white">Services</Link> / <span>{stateName}</span>
          </div>
          <h1 className="mt-4">
            {primaryKeyword}
            <span>Province Service Page</span>
          </h1>
          <p className="mt-4">
            This page targets province-level intent and routes users into city-specific {service.name.toLowerCase()} pages
            where local context and support details are available.
          </p>
          <div className="mt-6">
            <a href={`tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`} className="frost-btn frost-btn-primary">
              Call {EMERGENCY_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <div className="frost-highlight">
            <h2 className="frost-title text-2xl">Where We Serve In {stateName}</h2>
            <p className="frost-subtitle">
              Click a city to open its local service page for {service.name.toLowerCase()}.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <Link
                key={location.citySlug}
                href={`/${location.stateSlug}/${location.citySlug}/${service.slug}`}
                className="rounded-xl border border-[#c6d8f4] bg-white px-3 py-2 text-sm font-semibold text-[#224071]"
              >
                {service.name} {location.cityName}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LOCATION_PAGES, SERVICE_ORDER, getLocation, getServiceBySlug } from "@/lib/hvac-data";
import {
  EMERGENCY_PHONE_DISPLAY,
  EMERGENCY_PHONE_E164,
  SITE_NAME,
  absoluteUrl,
  serviceLocationKeyword,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ state: string; city: string; service: string }>;
};

const LOCAL_VALUE_POINTS = [
  "Province and city-intent targeting with natural keyword placement",
  "Clear CTA hierarchy for calls and service route selection",
  "Repeatable section order across all service-location pages",
  "JSON-LD, metadata, and internal links aligned with route depth",
] as const;

export const revalidate = 86400;

export async function generateStaticParams() {
  return LOCATION_PAGES.flatMap((location) =>
    SERVICE_ORDER.map((service) => ({ state: location.stateSlug, city: location.citySlug, service })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city, service: serviceSlug } = await params;
  const location = getLocation(state, city);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    return { title: "Page Not Found" };
  }

  const keyword = serviceLocationKeyword(service.name, location.cityName);
  const description = `${service.name} in ${location.cityName}, ${location.stateName}. Fast support, practical diagnostics, and service planning for local residential and commercial properties.`;

  return {
    title: keyword,
    description,
    alternates: { canonical: `/${location.stateSlug}/${location.citySlug}/${service.slug}` },
    keywords: [keyword, service.seo.focusKeyphrase, ...service.seo.relatedTerms],
    openGraph: {
      title: `${keyword} | ${SITE_NAME}`,
      description,
      url: absoluteUrl(`/${location.stateSlug}/${location.citySlug}/${service.slug}`),
      type: "article",
      siteName: SITE_NAME,
      locale: "en_CA",
    },
  };
}

export default async function LocalServicePage({ params }: PageProps) {
  const { state, city, service: serviceSlug } = await params;
  const location = getLocation(state, city);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    notFound();
  }

  const keyword = serviceLocationKeyword(service.name, location.cityName);
  const phoneHref = `tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: absoluteUrl("/services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${service.name} ${location.stateName}`,
        item: absoluteUrl(`/${location.stateSlug}/services/${service.slug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: keyword,
        item: absoluteUrl(`/${location.stateSlug}/${location.citySlug}/${service.slug}`),
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyword,
    serviceType: service.name,
    description: `${service.shortDescription} Local service route for ${location.cityName}.`,
    areaServed: {
      "@type": "City",
      name: location.cityName,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.stateName,
      },
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      telephone: EMERGENCY_PHONE_E164,
      url: absoluteUrl("/"),
    },
    url: absoluteUrl(`/${location.stateSlug}/${location.citySlug}/${service.slug}`),
  };

  return (
    <main className="frost-shell">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <section className="frost-hero frost-section py-14">
        <div className="frost-container relative z-10">
          <div className="text-xs uppercase tracking-[0.16em] text-[#dbe7ff]">
            <Link href="/">Home</Link> / <Link href={`/services/${service.slug}`}>{service.name}</Link> / <span>{location.cityName}</span>
          </div>
          <h1 className="mt-4">
            {keyword}
            <span>Local HVAC Service Page</span>
          </h1>
          <p className="mt-4">
            If you need {service.name.toLowerCase()} in {location.cityName}, this page gives you direct action steps,
            process expectations, and a live contact route.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={phoneHref} className="frost-btn frost-btn-primary">Call {EMERGENCY_PHONE_DISPLAY}</a>
            <Link href={`/${location.stateSlug}/services/${service.slug}`} className="frost-btn frost-btn-ghost">
              {service.name} {location.stateName}
            </Link>
          </div>
        </div>
      </section>

      <section className="frost-section">
        <div className="frost-container space-y-6">
          <div className="frost-highlight">
            <h2 className="frost-title text-2xl">What {service.name} Means In {location.cityName}</h2>
            <p className="frost-subtitle">
              {service.name} combines diagnostics, targeted corrections, and performance verification. The objective is
              stable operation, safe performance, and clear next-step planning.
            </p>
          </div>

          <div className="frost-grid frost-cards-3">
            {service.processSteps.map((step, idx) => (
              <article key={step} className="frost-card">
                <p className="frost-chip">Phase {idx + 1}</p>
                <p className="mt-3 text-sm text-slate-700">{step}</p>
              </article>
            ))}
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">Why This Page Structure Works</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {LOCAL_VALUE_POINTS.map((point) => (
                <p key={point} className="rounded-xl border border-[#d4e2f4] bg-[#f9fbff] px-3 py-2 text-sm text-slate-700">
                  {point}
                </p>
              ))}
            </div>
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">{keyword} FAQs</h2>
            <div className="mt-4 space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.q} className="rounded-xl border border-[#d4e2f4] bg-[#f9fbff] px-3 py-2">
                  <summary className="cursor-pointer font-semibold text-[#1f3f73]">{faq.q}</summary>
                  <p className="mt-2 text-sm text-slate-700">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

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
  "Local technicians who understand common HVAC issues in this area",
  "Clear diagnosis before recommending repairs or replacement work",
  "Straightforward communication on options, timing, and priorities",
  "Support for both urgent breakdowns and planned system upgrades",
] as const;

const SERVICE_CONTENT_BLOCKS: Partial<
  Record<
    string,
    {
      intro: string[];
      problemsSolved: string[];
      visitIncludes: string[];
      localUseCases: string[];
      maintenanceTips: string[];
    }
  >
> = {
  "ac-repair": {
    intro: [
      "Air conditioning issues in Toronto often start small: rooms that never fully cool, longer run times, or airflow that feels weaker than usual. Left unresolved, those early warning signs can increase monthly operating cost and create avoidable component wear.",
      "A complete AC repair visit should do more than replace a single failed part. It should identify root-cause problems across electrical controls, airflow, refrigerant performance, and thermostat communication so cooling can be restored with confidence.",
      "Our AC repair workflow is designed to restore comfort quickly while giving you a practical view of system condition, expected reliability, and whether repair or replacement is the better long-term move.",
    ],
    problemsSolved: [
      "AC running but blowing warm or room-temperature air",
      "Weak airflow from vents in one or multiple zones",
      "Frequent on/off short cycling and inconsistent temperature control",
      "Outdoor unit humming, hard starting, or tripping breakers",
      "Water leaks around the indoor unit or condensate line",
      "Frozen evaporator coils, icing lines, or sudden performance drops",
      "Unusual noises including buzzing, rattling, grinding, or clicking",
      "Thermostat not communicating correctly with cooling equipment",
    ],
    visitIncludes: [
      "Full symptom review and operating history intake",
      "Electrical safety checks on contactors, capacitors, and wiring",
      "Cooling cycle performance checks including temperature split validation",
      "Refrigerant-side diagnostics when pressure/performance indicate issues",
      "Airflow and filter-path review to identify hidden restrictions",
      "Drainage and condensate management checks to prevent water damage",
      "Post-repair verification and practical next-step recommendations",
    ],
    localUseCases: [
      "Condo units with restricted airflow and uneven cooling between rooms",
      "Single-family homes with upper-floor hot spots during summer peaks",
      "Retail or office suites where cooling downtime impacts operations",
      "Rental properties needing documented repair actions for records",
    ],
    maintenanceTips: [
      "Replace or clean filters on schedule to protect airflow and coil condition.",
      "Keep the outdoor condenser clear of debris and obstructions.",
      "Book preseason inspections before peak summer load periods.",
      "Address odd sounds or longer run cycles early to avoid major failures.",
    ],
  },
};

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
  const contentBlock = SERVICE_CONTENT_BLOCKS[service.slug];
  const introParagraphs = contentBlock?.intro ?? [
    `${service.name} in ${location.cityName} starts with complete diagnostics, then moves into focused corrections that prioritize system reliability and safe operation.`,
    `For most properties, the right service plan includes both immediate stabilization and clear recommendations that prevent repeat breakdowns.`,
  ];
  const problemsSolved = contentBlock?.problemsSolved ?? [
    `Intermittent ${service.name.toLowerCase()} performance changes`,
    "Unexpected shutdowns or unstable runtime behavior",
    "Reduced comfort consistency between rooms or zones",
    "Electrical or control-related faults affecting operation",
    "Persistent noise, vibration, or startup concerns",
    "Efficiency loss caused by unresolved system restrictions",
  ];
  const visitIncludes = contentBlock?.visitIncludes ?? [
    "Symptom review and system behavior confirmation",
    "Safety-focused component testing",
    "Targeted repair steps based on diagnostic findings",
    "Post-repair verification and performance checks",
    "Clear summary of system condition and priorities",
  ];
  const localUseCases = contentBlock?.localUseCases ?? [
    "Residential systems with comfort or reliability complaints",
    "Condo and multi-unit properties with space-specific HVAC concerns",
    "Light commercial sites that need predictable service timelines",
  ];
  const maintenanceTips = contentBlock?.maintenanceTips ?? [
    "Schedule regular tune-ups to reduce unplanned system downtime.",
    "Address early warning signs before they become major failures.",
    "Keep airflow paths clear and controls calibrated seasonally.",
  ];

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
            <span>Local HVAC Support You Can Count On</span>
          </h1>
          <p className="mt-4">
            If you need {service.name.toLowerCase()} in {location.cityName}, this page gives you direct action steps,
            process expectations, and a live contact route.
          </p>
          <p className="mt-3 text-sm text-[#dbe7ff]">
            Our team focuses on solving the root issue, confirming safe system performance, and helping you understand
            the best next step for your home or business.
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
              stable operation, safe performance, and clear next-step planning so you can avoid repeat problems.
            </p>
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">Detailed {service.name} Information For {location.cityName}</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-700">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">Common {service.name} Problems We Solve</h2>
            <p className="mt-3 text-sm text-slate-700">
              This service is built around complete problem resolution, not temporary fixes. During your visit, we
              isolate and correct the issues that are limiting performance.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {problemsSolved.map((problem) => (
                <p key={problem} className="rounded-xl border border-[#d4e2f4] bg-[#f9fbff] px-3 py-2 text-sm text-slate-700">
                  {problem}
                </p>
              ))}
            </div>
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
            <h2 className="frost-title text-2xl">Why Customers In {location.cityName} Trust This Process</h2>
            <p className="mt-3 text-sm text-slate-700">
              HVAC problems can feel urgent and uncertain. This process is built to reduce stress: quick contact, clear
              troubleshooting, and recommendations that match your system condition and budget.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {LOCAL_VALUE_POINTS.map((point) => (
                <p key={point} className="rounded-xl border border-[#d4e2f4] bg-[#f9fbff] px-3 py-2 text-sm text-slate-700">
                  {point}
                </p>
              ))}
            </div>
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">What Is Included In A Typical Service Visit</h2>
            <div className="mt-4 space-y-2">
              {visitIncludes.map((item) => (
                <p key={item} className="rounded-xl border border-[#d4e2f4] bg-[#f9fbff] px-3 py-2 text-sm text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="frost-grid frost-cards-3">
            <article className="frost-card">
              <h3 className="frost-title text-xl">Who We Serve In {location.cityName}</h3>
              <div className="mt-3 space-y-2">
                {localUseCases.map((item) => (
                  <p key={item} className="text-sm text-slate-700">{item}</p>
                ))}
              </div>
            </article>

            <article className="frost-card">
              <h3 className="frost-title text-xl">Repair vs. Replacement Guidance</h3>
              <p className="mt-3 text-sm text-slate-700">
                If we find major wear, repeat breakdowns, or escalating operating costs, we provide side-by-side
                options. You will see what to repair now, what can wait, and when replacement becomes the smarter
                investment.
              </p>
            </article>

            <article className="frost-card">
              <h3 className="frost-title text-xl">How To Reduce Future Breakdowns</h3>
              <div className="mt-3 space-y-2">
                {maintenanceTips.map((tip) => (
                  <p key={tip} className="text-sm text-slate-700">{tip}</p>
                ))}
              </div>
            </article>
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">{keyword} FAQs</h2>
            <p className="mt-3 text-sm text-slate-700">
              Review common questions before booking service. If your issue is urgent, call now for immediate help.
            </p>
            <div className="mt-4 space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.q} className="rounded-xl border border-[#d4e2f4] bg-[#f9fbff] px-3 py-2">
                  <summary className="cursor-pointer font-semibold text-[#1f3f73]">{faq.q}</summary>
                  <p className="mt-2 text-sm text-slate-700">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="frost-card">
            <h2 className="frost-title text-2xl">Book {service.name} In {location.cityName}</h2>
            <p className="mt-3 text-sm text-slate-700">
              Speak with our team to describe your HVAC symptoms, confirm urgency, and schedule service. We will help
              you choose the fastest route based on your system condition and property type.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={phoneHref} className="frost-btn frost-btn-primary">Call {EMERGENCY_PHONE_DISPLAY}</a>
              <Link href={`/${location.stateSlug}/services/${service.slug}`} className="frost-btn frost-btn-ghost">
                Explore {service.name} In {location.stateName}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

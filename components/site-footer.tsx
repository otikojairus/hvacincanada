import Link from "next/link";
import { SERVICE_ORDER, SERVICES } from "@/lib/hvac-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME } from "@/lib/seo";

const phoneHref = `tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`;

export function SiteFooter() {
  return (
    <footer className="frost-footer">
      <div className="frost-container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="frost-footer-title">{SITE_NAME}</p>
            <p className="mt-3 text-sm text-slate-300">
              Ontario-first HVAC response pages built for service intent, local relevance, and conversion-ready CTAs.
            </p>
            <a href={phoneHref} className="frost-btn frost-btn-primary mt-4">
              Call {EMERGENCY_PHONE_DISPLAY}
            </a>
          </div>

          <div>
            <p className="frost-footer-title">Services</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300">
              {SERVICE_ORDER.slice(0, 8).map((slug) => {
                const service = SERVICES[slug];
                return (
                  <li key={slug}>
                    <Link href={`/services/${slug}`} className="hover:text-white">
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="frost-footer-title">Navigation</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white">Service Hubs</Link>
              </li>
              <li>
                <a href={phoneHref} className="hover:text-white">Emergency Intake</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICE_ORDER, SERVICES } from "@/lib/hvac-data";
import { EMERGENCY_PHONE_DISPLAY, SITE_NAME } from "@/lib/seo";

const phoneHref = `tel:${EMERGENCY_PHONE_DISPLAY.replace(/[^0-9]/g, "")}`;

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showMobileCallBar, setShowMobileCallBar] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!servicesRef.current) {
        return;
      }

      if (!servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1024px)");

    function onScroll() {
      const isMobileViewport = mobileQuery.matches;
      setShowMobileCallBar(isMobileViewport && window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mobileQuery.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mobileQuery.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <>
      <header className="frost-header">
        <div className="frost-container frost-nav-shell">
          <Link href="/" className="frost-logo-block" onClick={() => setOpen(false)}>
            <span className="frost-logo-mark">H</span>
            <span>
              <strong className="frost-logo">{SITE_NAME}</strong>
            </span>
          </Link>

          <nav className="frost-nav hidden lg:flex">
            <Link href="/" className="frost-nav-link">
              Home
            </Link>
            <div className="frost-services-wrap" ref={servicesRef}>
              <button
                type="button"
                className="frost-nav-link frost-nav-button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
              >
                Services
              </button>
              <div className={`frost-services-popover ${servicesOpen ? "frost-services-popover-open" : ""}`}>
                <p className="frost-services-title">All Service Hubs</p>
                <div className="frost-services-grid">
                  {SERVICE_ORDER.map((slug) => {
                    const service = SERVICES[slug];
                    return (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="frost-services-link"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <a href={phoneHref} className="frost-btn frost-btn-primary">
              Call 24/7
            </a>
            <Link href="/services" className="frost-btn frost-btn-ghost">
              Browse
            </Link>
          </div>

          <button
            type="button"
            className="frost-mobile-menu-btn lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </header>

      <div className={`frost-drawer ${open ? "frost-drawer-open" : ""}`} aria-hidden={!open}>
        <button type="button" className="frost-drawer-backdrop" onClick={() => setOpen(false)} aria-label="Close" />
        <div className="frost-drawer-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Quick Navigation</p>
          <div className="mt-4 grid gap-2">
            <Link href="/" className="frost-drawer-link" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/services" className="frost-drawer-link" onClick={() => setOpen(false)}>
              All Services
            </Link>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Service Hubs</p>
          <nav className="mt-3 grid gap-2">
            {SERVICE_ORDER.map((slug) => {
              const service = SERVICES[slug];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="frost-drawer-link"
                  onClick={() => setOpen(false)}
                >
                  {service.name}
                </Link>
              );
            })}
          </nav>
          <a href={phoneHref} className="frost-btn frost-btn-primary mt-5">
            Call {EMERGENCY_PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div className={`frost-mobile-callbar ${showMobileCallBar ? "frost-mobile-callbar-visible" : ""}`}>
        <a href={phoneHref} className="frost-mobile-callbar-btn">
          Call Us Now
        </a>
      </div>
    </>
  );
}

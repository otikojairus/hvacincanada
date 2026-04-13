import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | HVAC Repair & Replacement`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Programmatic HVAC service pages for Ontario and city-level intent including AC repair, furnace repair, heat pump services, and replacements.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | HVAC Repair & Replacement`,
    description:
      "Ontario-first HVAC service coverage with city landing pages and conversion-focused content architecture.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | HVAC Repair & Replacement`,
    description: "Local HVAC intent pages for Ontario repair and replacement services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

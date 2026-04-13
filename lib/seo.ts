export const SITE_NAME = "HVAC In Canada";
export const DEFAULT_SITE_URL = "https://hvacincanada.com";
export const EMERGENCY_PHONE_DISPLAY = "+1 866-907-4822";
export const EMERGENCY_PHONE_E164 = "+18669074822";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${path}`;
}

export function serviceLocationKeyword(serviceName: string, locationName: string) {
  return `${serviceName} ${locationName}`;
}

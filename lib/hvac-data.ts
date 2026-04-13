import { RAW_LOCATION_ROWS } from "./location-data";
export { SERVICE_ORDER, SERVICES, getServiceBySlug, type ServiceContent, type ServiceSlug } from "./services-data";

export type LocationContent = {
  stateSlug: string;
  stateName: string;
  citySlug: string;
  cityName: string;
  regionName: string;
  countryName: "Canada";
};

function slugifyLocationSegment(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const LOCATION_PAGES: LocationContent[] = (() => {
  const pages: LocationContent[] = [];
  const seen = new Set<string>();

  for (const { countryName, stateName, cities } of RAW_LOCATION_ROWS) {
    const stateSlug = slugifyLocationSegment(stateName);

    for (const cityName of cities) {
      const citySlug = slugifyLocationSegment(cityName);
      const key = `${stateSlug}::${citySlug}`;

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      pages.push({
        stateSlug,
        stateName,
        citySlug,
        cityName,
        regionName: stateName,
        countryName,
      });
    }
  }

  return pages;
})();

export function getLocation(state: string, city: string) {
  return LOCATION_PAGES.find((location) => location.stateSlug === state && location.citySlug === city) ?? null;
}

export function getLocationsByState(state: string) {
  return LOCATION_PAGES.filter((location) => location.stateSlug === state);
}

export function getStates() {
  return Array.from(new Map(LOCATION_PAGES.map((location) => [location.stateSlug, location.stateName]))).map(
    ([slug, name]) => ({ slug, name }),
  );
}

/**
 * Central company configuration.
 *
 * Fields that are `null` have no verified value yet and MUST NOT be rendered.
 * Never replace a `null` here with an invented number, address, or ID.
 */
export const companyConfig = {
  name: "Ship Smart Solutions",
  legalName: "Ship Smart Solutions",
  headquarters: "Naperville, Illinois",
  coverage: "48 states",
  /** Update when the production domain is confirmed. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shipsmartsolutions.com",
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  dotNumber: null as string | null,
  mcNumber: null as string | null,
  fleetSize: null as number | null,
  warehouseSquareFeet: null as number | null,
  yearsInOperation: null as number | null,
  onTimePercentage: null as number | null,
  loadsDelivered: null as number | null,
  claimsRatio: null as number | null,
};

/** Feature flags for content that must never ship in an unfinished state. */
export const contentFlags = {
  /** No verified client testimonials exist yet — keep hidden until they do. */
  showTestimonials: false,
};

export const seo = {
  title: "Ship Smart Solutions | Asset-Based Trucking & Logistics",
  description:
    "Ship Smart Solutions is an asset-based trucking company and 3PL delivering reefer, dry van, open deck, warehousing, and nationwide logistics services.",
};

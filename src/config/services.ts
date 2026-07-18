export type Service = {
  id: string;
  index: string;
  title: string;
  equipment: string;
  description: string;
  /** Small camera/rotation nudge applied to the truck scene when active. */
  scene: { rotY: number; camX: number; camY: number };
};

export const services: Service[] = [
  {
    id: "reefer",
    index: "01",
    title: "Dedicated Reefer Trucking",
    equipment: "Temperature-controlled reefer trailers",
    description:
      "Cold-chain freight moved on temperature-controlled equipment with monitored set points from pickup through delivery. Built for product that cannot sit, spoil, or ride on a trailer you can't verify.",
    scene: { rotY: 0.0, camX: 0, camY: 0 },
  },
  {
    id: "dry-van",
    index: "02",
    title: "Dry Van Freight Services",
    equipment: "53' dry van trailers",
    description:
      "Full-truckload dry van capacity for palletized and packaged freight. Company equipment runs your committed lanes, so the trailer that's promised is the trailer that shows up.",
    scene: { rotY: -0.22, camX: 0.6, camY: 0.1 },
  },
  {
    id: "open-deck",
    index: "03",
    title: "Specialized Open Deck & Flatbed",
    equipment: "Flatbeds, step decks, securement gear",
    description:
      "Flatbed and step-deck service for steel, lumber, machinery, and building products — with drivers who understand tarping, securement, and jobsite delivery windows.",
    scene: { rotY: 0.28, camX: -0.7, camY: 0.2 },
  },
  {
    id: "heavy-haul",
    index: "04",
    title: "Heavy Haul & Oversized",
    equipment: "RGNs, multi-axle configurations, permits",
    description:
      "Over-dimensional and overweight project freight planned end to end: route surveys, permits, escorts, and equipment matched to the load — managed by one accountable team.",
    scene: { rotY: 0.5, camX: -1.2, camY: 0.45 },
  },
  {
    id: "expedited",
    index: "05",
    title: "Expedited Freight",
    equipment: "Team drivers, priority dispatch",
    description:
      "Time-critical shipments dispatched on priority equipment with team drivers where the clock demands it. Direct communication from tender to proof of delivery.",
    scene: { rotY: -0.4, camX: 1.1, camY: -0.15 },
  },
  {
    id: "warehousing",
    index: "06",
    title: "Warehousing, Distribution & Fulfillment",
    equipment: "Midwest warehousing & cross-dock",
    description:
      "Storage, cross-dock, distribution, and fulfillment support from our Midwest hub — so inventory, transportation, and final delivery run under one operation instead of three vendors.",
    scene: { rotY: 0.14, camX: 0.3, camY: 0.3 },
  },
  {
    id: "dedicated",
    index: "07",
    title: "Dedicated Capacity",
    equipment: "Committed trucks & drivers on your lanes",
    description:
      "Trucks, trailers, and drivers committed to your freight on a schedule you control. Dedicated capacity removes the weekly scramble for trucks and stabilizes your cost per mile.",
    scene: { rotY: -0.1, camX: 0.4, camY: 0.15 },
  },
  {
    id: "managed",
    index: "08",
    title: "Managed Transportation",
    equipment: "Planning, tendering, visibility, reporting",
    description:
      "Outsource the daily grind of routing, tendering, tracking, and exception management to a 3PL that also owns trucks — and understands what execution actually takes.",
    scene: { rotY: 0.22, camX: -0.4, camY: 0.25 },
  },
  {
    id: "brokerage",
    index: "09",
    title: "Freight Brokerage for Overflow Capacity",
    equipment: "Vetted partner carriers — overflow only",
    description:
      "When volume exceeds our fleet, vetted partner carriers cover the overflow under the same tracking and the same accountable team. Our own equipment always loads first.",
    scene: { rotY: -0.3, camX: 0.9, camY: -0.1 },
  },
];

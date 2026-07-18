export type Industry = {
  id: string;
  name: string;
  freight: string;
  equipment: string;
  timing: string;
  handling: string;
  whyAssetBased: string;
};

export const industries: Industry[] = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    freight: "Perishables, frozen goods, beverages, packaged food",
    equipment: "Reefer with verified set points, food-grade dry van",
    timing: "Hard appointment windows at DCs and grocery networks",
    handling: "Cold-chain integrity, washout standards, seal control",
    whyAssetBased:
      "Rejected cold-chain loads are expensive. Company reefers with monitored temperatures — and a driver we dispatch ourselves — protect the product and the appointment.",
  },
  {
    id: "retail-ecommerce",
    name: "Retail & E-commerce",
    freight: "Palletized retail goods, promotional volume, returns",
    equipment: "53' dry van, drop trailers, fulfillment support",
    timing: "Retail routing guides, peak-season surges, OTIF pressure",
    handling: "Labeling compliance, clean PODs, DC appointment discipline",
    whyAssetBased:
      "When the routing guide tightens, brokered capacity disappears first. Committed company trucks keep peak-season freight moving at the rate you planned.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    freight: "Inbound components, finished goods, line-critical parts",
    equipment: "Dry van, flatbed, expedited for line-down events",
    timing: "Just-in-time schedules where an idle line costs by the minute",
    handling: "Sequenced deliveries, consistent drivers, plant procedures",
    whyAssetBased:
      "A production line doesn't wait for a load board. Dedicated equipment and direct dispatch mean inbound freight arrives when the schedule says it will.",
  },
  {
    id: "construction",
    name: "Construction",
    freight: "Steel, lumber, aggregates, building products",
    equipment: "Flatbed, step deck, tarps and securement gear",
    timing: "Jobsite windows tied to crews, cranes, and weather",
    handling: "Tarping, load securement, jobsite access coordination",
    whyAssetBased:
      "A missed jobsite window idles a crew. Drivers who run open-deck freight daily — on equipment we maintain — deliver when the site is ready.",
  },
  {
    id: "automotive",
    name: "Automotive",
    freight: "Parts, assemblies, aftermarket, plant-to-plant moves",
    equipment: "Dry van, expedited, dedicated round-trip lanes",
    timing: "Sequenced production windows with zero slack",
    handling: "Returnable containers, dunnage, plant check-in rules",
    whyAssetBased:
      "Automotive schedules punish variability. One accountable carrier running the same lane daily beats a rotating cast of unknown trucks.",
  },
  {
    id: "industrial",
    name: "Industrial & Machinery",
    freight: "Machinery, oversized equipment, project cargo",
    equipment: "RGN, multi-axle heavy haul, riggers coordination",
    timing: "Permit-driven schedules, escort and route constraints",
    handling: "Dimensional surveys, securement engineering, permits",
    whyAssetBased:
      "Oversized freight has no room for hand-offs. Planning, permits, equipment, and the driver all sit with one team that owns the outcome.",
  },
];

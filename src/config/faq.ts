export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Single source of truth for the FAQ accordion AND the FAQ JSON-LD.
 * The structured data must always match this visible content exactly.
 */
export const faqItems: FaqItem[] = [
  {
    id: "carrier-or-broker",
    question: "Is Ship Smart Solutions a trucking company or freight broker?",
    answer:
      "Ship Smart Solutions is an asset-based trucking company first. We own and operate our own trucks and trailers, and your freight loads on our equipment before anything else. Freight brokerage exists only as supplementary overflow capacity, handled by vetted partner carriers under our management and tracking.",
  },
  {
    id: "what-is-asset-based",
    question: "What is an asset-based carrier?",
    answer:
      "An asset-based carrier owns the physical equipment that moves your freight — the tractors, trailers, and drivers — rather than reselling capacity from other companies. That means committed capacity, direct control over service, and one accountable team from dispatch to delivery.",
  },
  {
    id: "freight-modes",
    question: "What freight modes do you offer?",
    answer:
      "We provide dedicated reefer trucking, dry van freight, specialized open deck and flatbed, heavy haul and oversized, expedited freight, warehousing, distribution and fulfillment, dedicated capacity, and managed transportation. Overflow volume can be covered through vetted brokerage capacity.",
  },
  {
    id: "nationwide",
    question: "Do you ship nationwide?",
    answer:
      "Yes. From our headquarters in Naperville, Illinois, we serve all 48 contiguous states with both regional Midwest lanes and coast-to-coast coverage.",
  },
  {
    id: "temperature-controlled",
    question: "Can you handle temperature-controlled freight?",
    answer:
      "Yes. Temperature-controlled reefer service is a core offering. Loads run on refrigerated equipment with monitored set points, protecting cold-chain integrity from pickup through delivery.",
  },
  {
    id: "warehousing",
    question: "Do you provide warehousing and fulfillment?",
    answer:
      "Yes. We support warehousing, distribution, and fulfillment from our Midwest hub, so storage, cross-dock, and transportation can run under a single operation.",
  },
  {
    id: "get-quote",
    question: "How do I get a freight quote?",
    answer:
      "Use the quote form on this page. Tell us your origin, destination, pickup date, equipment type, and commodity details, and our team will follow up with pricing and available capacity.",
  },
  {
    id: "track-shipment",
    question: "How do I track a shipment?",
    answer:
      "Active shipments are tracked in real time. Use the tracking section on this page with your shipment reference number to view pickup status, current location, ETA, and delivery documents.",
  },
  {
    id: "industries-served",
    question: "Which industries do you serve?",
    answer:
      "We serve food and beverage, retail and e-commerce, manufacturing, construction, automotive, and industrial and machinery shippers — each with equipment and processes matched to that freight.",
  },
  {
    id: "double-brokering",
    question: "How do you protect against double brokering?",
    answer:
      "Most of our freight never touches a broker chain because it moves on our own equipment. When overflow requires partner capacity, we tender directly to vetted carriers we have qualified ourselves, prohibit re-brokering in our carrier agreements, and keep tracking and accountability in-house.",
  },
];

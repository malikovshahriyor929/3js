/**
 * Freight quote submission — intentionally isolated so a real CRM/email
 * integration can replace `submitQuote` without touching the form UI.
 *
 * There is NO backend yet. This validates on the client and reports a clear
 * development status instead of faking a successful server submission.
 */

export type QuoteFields = {
  company: string;
  contact: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  pickupDate: string;
  equipment: string;
  commodity: string;
  weight: string;
  temperature: string;
  instructions: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

export const equipmentOptions = [
  "Reefer",
  "Dry Van",
  "Flatbed",
  "Step Deck",
  "RGN",
  "Heavy Haul",
  "Expedited",
  "Warehousing",
  "Managed Transportation",
  "Other",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!fields.company.trim()) errors.company = "Enter your company name.";
  if (!fields.contact.trim()) errors.contact = "Enter a contact name.";
  if (!fields.email.trim()) errors.email = "Enter an email address.";
  else if (!EMAIL_RE.test(fields.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!fields.phone.trim()) errors.phone = "Enter a phone number.";
  else if (!PHONE_RE.test(fields.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!fields.origin.trim()) errors.origin = "Enter a pickup city and state.";
  if (!fields.destination.trim())
    errors.destination = "Enter a delivery city and state.";
  if (!fields.pickupDate) errors.pickupDate = "Choose a pickup date.";
  if (!fields.equipment) errors.equipment = "Select an equipment type.";
  if (!fields.commodity.trim())
    errors.commodity = "Describe the commodity being shipped.";
  if (fields.weight.trim() && !/^[\d,.\s]+$/.test(fields.weight.trim()))
    errors.weight = "Weight should be a number, in pounds.";
  return errors;
}

export type QuoteResult = {
  ok: boolean;
  message: string;
};

/**
 * Replace the body of this function with the real CRM / email service call.
 * Keep the same signature so the form does not need to change.
 */
export async function submitQuote(fields: QuoteFields): Promise<QuoteResult> {
  void fields;
  // Simulate request latency so the loading state is honest about async work.
  await new Promise((r) => setTimeout(r, 900));
  return {
    ok: true,
    message:
      "Your quote information has been validated. Connect this form to the company CRM or email service before production.",
  };
}

"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";
import {
  equipmentOptions,
  submitQuote,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from "@/lib/quote";

const initialFields: QuoteFields = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  origin: "",
  destination: "",
  pickupDate: "",
  equipment: "",
  commodity: "",
  weight: "",
  temperature: "",
  instructions: "",
};

function Field({
  id,
  label,
  error,
  required = false,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.78rem] font-semibold tracking-[0.02em] text-white/80"
      >
        {label}
        {required && (
          <span className="text-blue-bright" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-[0.78rem] font-medium text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function GroupLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="index-num text-[0.7rem] text-blue-bright/80">{n}</span>
      <span className="label text-[0.62rem]! text-white/45">{children}</span>
    </div>
  );
}

export function QuoteForm() {
  const [fields, setFields] = useState<QuoteFields>(initialFields);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [resultMessage, setResultMessage] = useState("");
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);

  const set =
    (key: keyof QuoteFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const aria = (key: keyof QuoteFields, id: string) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${id}-error` : undefined,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateQuote(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      errorSummaryRef.current?.focus();
      return;
    }
    setStatus("submitting");
    const result = await submitQuote(fields);
    setResultMessage(result.message);
    setStatus("done");
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="scroll-mt-20 bg-navy-deep py-28 lg:py-40"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Intro column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="label text-blue-bright">Freight Quote</p>
              <h2
                id="quote-heading"
                className="display mt-6 text-[clamp(2.2rem,4vw,3.8rem)] text-white"
              >
                <MaskLines lines={["Tell us what you", "need to move"]} />
              </h2>
              <p className="mt-7 max-w-[22rem] text-[0.95rem] leading-relaxed text-muted-dark">
                Share the lane and the freight. Our team responds with pricing
                and the equipment we can commit.
              </p>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-8">
            {status === "done" ? (
              <div role="status" className="border-l-2 border-success py-2 pl-6">
                <p className="flex items-center gap-3 font-display text-xl font-extrabold text-white">
                  <CheckCircle2
                    className="size-6 text-success"
                    aria-hidden="true"
                  />
                  Quote request validated
                </p>
                <p className="mt-3 max-w-[36rem] leading-relaxed text-muted-dark">
                  {resultMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFields(initialFields);
                    setStatus("idle");
                  }}
                  className="mt-6 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-blue-bright underline-offset-4 hover:underline"
                >
                  Start another quote
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p
                  ref={errorSummaryRef}
                  tabIndex={-1}
                  role="alert"
                  className={`mb-8 border-l-2 border-red-400 py-1 pl-5 text-[0.9rem] font-medium text-red-300 ${
                    errorCount > 0 ? "" : "hidden"
                  }`}
                >
                  {errorCount > 0 &&
                    `Please fix ${errorCount} ${
                      errorCount === 1 ? "field" : "fields"
                    } below to continue.`}
                </p>

                {/* Group 1 — Contact */}
                <GroupLabel n="01">Contact</GroupLabel>
                <div className="mb-12 mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <Field id="q-company" label="Company name" required error={errors.company}>
                    <input id="q-company" type="text" autoComplete="organization" value={fields.company} onChange={set("company")} className="field-dark" {...aria("company", "q-company")} />
                  </Field>
                  <Field id="q-contact" label="Contact name" required error={errors.contact}>
                    <input id="q-contact" type="text" autoComplete="name" value={fields.contact} onChange={set("contact")} className="field-dark" {...aria("contact", "q-contact")} />
                  </Field>
                  <Field id="q-email" label="Email" required error={errors.email}>
                    <input id="q-email" type="email" autoComplete="email" value={fields.email} onChange={set("email")} className="field-dark" {...aria("email", "q-email")} />
                  </Field>
                  <Field id="q-phone" label="Phone" required error={errors.phone}>
                    <input id="q-phone" type="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} className="field-dark" {...aria("phone", "q-phone")} />
                  </Field>
                </div>

                {/* Group 2 — Lane */}
                <GroupLabel n="02">Lane &amp; timing</GroupLabel>
                <div className="mb-12 mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <Field id="q-origin" label="Origin (city, state)" required error={errors.origin}>
                    <input id="q-origin" type="text" placeholder="Naperville, IL" value={fields.origin} onChange={set("origin")} className="field-dark" {...aria("origin", "q-origin")} />
                  </Field>
                  <Field id="q-destination" label="Destination (city, state)" required error={errors.destination}>
                    <input id="q-destination" type="text" placeholder="Atlanta, GA" value={fields.destination} onChange={set("destination")} className="field-dark" {...aria("destination", "q-destination")} />
                  </Field>
                  <Field id="q-pickup" label="Pickup date" required error={errors.pickupDate}>
                    <input id="q-pickup" type="date" value={fields.pickupDate} onChange={set("pickupDate")} className="field-dark" {...aria("pickupDate", "q-pickup")} />
                  </Field>
                  <Field id="q-equipment" label="Equipment type" required error={errors.equipment}>
                    <select id="q-equipment" value={fields.equipment} onChange={set("equipment")} className="field-dark" {...aria("equipment", "q-equipment")}>
                      <option value="">Select equipment…</option>
                      {equipmentOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Group 3 — Freight */}
                <GroupLabel n="03">Freight details</GroupLabel>
                <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <Field id="q-commodity" label="Commodity" required error={errors.commodity}>
                    <input id="q-commodity" type="text" placeholder="e.g. Palletized packaged food" value={fields.commodity} onChange={set("commodity")} className="field-dark" {...aria("commodity", "q-commodity")} />
                  </Field>
                  <Field id="q-weight" label="Weight (lbs)" error={errors.weight}>
                    <input id="q-weight" type="text" inputMode="numeric" placeholder="e.g. 42000" value={fields.weight} onChange={set("weight")} className="field-dark" {...aria("weight", "q-weight")} />
                  </Field>
                  <Field id="q-temp" label="Temperature requirements" error={errors.temperature}>
                    <input id="q-temp" type="text" placeholder="e.g. 34°F continuous" value={fields.temperature} onChange={set("temperature")} className="field-dark" />
                  </Field>
                  <Field id="q-instructions" label="Special instructions" error={errors.instructions} className="sm:col-span-2">
                    <textarea id="q-instructions" rows={4} value={fields.instructions} onChange={set("instructions")} placeholder="Appointments, accessorials, handling notes…" className="field-dark min-h-28 py-3" />
                  </Field>
                </div>

                <div className="mt-10">
                  <RuleGrow tone="dark" />
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn btn-primary min-w-56 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                          Validating…
                        </>
                      ) : (
                        "Request Freight Quote"
                      )}
                    </button>
                    <p className="text-[0.78rem] text-white/40">
                      Fields marked{" "}
                      <span className="text-blue-bright">*</span> are required.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

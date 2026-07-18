"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";

/**
 * Tracking demo — client-side only, ready for a real tracking API.
 * Replace `lookupShipment` with the production endpoint call; the UI states
 * (validating / loading / found / not-found) already cover the real flow.
 */

const DEMO_REFERENCE = "SS-DEMO-2481";
const REFERENCE_RE = /^[A-Za-z0-9][A-Za-z0-9-]{4,24}$/;

type LookupState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "loading" }
  | { status: "found" }
  | { status: "not-found"; reference: string };

async function lookupShipment(
  reference: string
): Promise<"found" | "not-found"> {
  await new Promise((r) => setTimeout(r, 1100));
  return reference.trim().toUpperCase() === DEMO_REFERENCE
    ? "found"
    : "not-found";
}

export function TrackingDemo() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<LookupState>({ status: "idle" });
  const inputId = useId();
  const hintId = useId();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = value.trim();
    if (!ref) {
      setState({ status: "error", message: "Enter a shipment reference number." });
      return;
    }
    if (!REFERENCE_RE.test(ref)) {
      setState({
        status: "error",
        message:
          "That doesn't look like a valid reference. Use 5–25 letters, numbers, or dashes.",
      });
      return;
    }
    setState({ status: "loading" });
    const result = await lookupShipment(ref);
    setState(
      result === "found"
        ? { status: "found" }
        : { status: "not-found", reference: ref }
    );
  };

  return (
    <div id="tracking" className="scroll-mt-28">
      <h3 className="display text-[1.7rem] text-white lg:text-[2rem]">
        Track a shipment
      </h3>
      <p className="mt-3 max-w-[34rem] text-[0.92rem] leading-relaxed text-muted-dark">
        Enter your shipment reference to check status. This is a working
        interface demo — try the sample reference{" "}
        <button
          type="button"
          className="font-semibold text-blue-bright underline decoration-blue-bright/40 underline-offset-4 hover:decoration-blue-bright"
          onClick={() => setValue(DEMO_REFERENCE)}
        >
          {DEMO_REFERENCE}
        </button>{" "}
        to see a sample result.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-7">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor={inputId} className="sr-only">
              Shipment reference number
            </label>
            <input
              id={inputId}
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="e.g. SS-DEMO-2481"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (state.status === "error") setState({ status: "idle" });
              }}
              aria-describedby={hintId}
              aria-invalid={state.status === "error"}
              className="field-dark"
            />
          </div>
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="btn btn-primary min-w-36 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {state.status === "loading" ? (
              <>
                <Loader2
                  className="size-4 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
                Tracking…
              </>
            ) : (
              "Track"
            )}
          </button>
        </div>
        <p id={hintId} className="sr-only">
          Reference numbers are 5 to 25 characters: letters, numbers, and
          dashes.
        </p>
      </form>

      {/* Live status region */}
      <div role="status" aria-live="polite" className="mt-5">
        <AnimatePresence mode="wait">
          {state.status === "error" && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[0.9rem] font-medium text-red-300"
            >
              {state.message}
            </motion.p>
          )}

          {state.status === "not-found" && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-l-2 border-white/25 py-1 pl-5"
            >
              <p className="text-[0.95rem] font-semibold text-white">
                No shipment found for “{state.reference}”.
              </p>
              <p className="mt-1.5 max-w-[32rem] text-[0.88rem] leading-relaxed text-white/60">
                Live tracking is available for active Ship Smart shipments. In
                this demo, only the sample reference {DEMO_REFERENCE} returns a
                result.
              </p>
            </motion.div>
          )}

          {state.status === "found" && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-l-2 border-success py-1 pl-5"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="text-[0.95rem] font-semibold text-white">
                  {DEMO_REFERENCE} — In transit
                </p>
                <span className="label text-[0.58rem]! text-white/40">
                  Sample data
                </span>
              </div>
              <div className="mt-3 grid gap-x-8 gap-y-1.5 text-[0.88rem] text-white/70 sm:grid-cols-2">
                <p>Current location: Louisville, KY</p>
                <p>ETA: Tomorrow, 09:40 ET</p>
                <p>Pickup: Naperville, IL — completed</p>
                <p>Delivery: Atlanta, GA — appointment confirmed</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

interface ConsentCheckboxesProps {
  consents: { terms: boolean; credit: boolean };
  onChange: (field: "terms" | "credit", checked: boolean) => void;
}

export default function ConsentCheckboxes({
  consents,
  onChange,
}: ConsentCheckboxesProps) {
  return (
    <div className="space-y-3" data-analytics-section="checkout-consents">
      <label className="flex items-start gap-3 text-sm text-dark">
        <input
          type="checkbox"
          checked={consents.terms}
          onChange={(event) => onChange("terms", event.target.checked)}
          aria-required="true"
          className="mt-1 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          Jag godkänner{" "}
          <a
            href="#"
            className="font-semibold text-primary underline"
            onClick={(event) => event.stopPropagation()}
          >
            villkoren
          </a>{" "}
          för 36 mån delbetalning
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-dark">
        <input
          type="checkbox"
          checked={consents.credit}
          onChange={(event) => onChange("credit", event.target.checked)}
          aria-required="true"
          className="mt-1 h-4 w-4 shrink-0 accent-primary"
        />
        <span>Jag godkänner kreditupplysning</span>
      </label>
    </div>
  );
}

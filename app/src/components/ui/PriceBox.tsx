import { INSTALMENT_MONTHS } from "@/lib/pricing";

interface PriceBoxProps {
  instalmentPrice: number;
  totalCost: number;
  cheapestPlanPrice: number;
}

/**
 * Price box showing instalment breakdown.
 *
 * Displays:
 * - Monthly instalment (large text)
 * - "i 36 månader" label
 * - Total device cost (instalment × 36) — BR-103
 * - Cheapest subscription price hint
 *
 * Uses aria-live="polite" for screen reader price announcements — ux.md accessibility.
 *
 * Traces to: FR-205, US-202 AC-3, BR-103, NFR-103, NFR-304, Drop 2 AC #6
 */
export default function PriceBox({
  instalmentPrice,
  totalCost,
  cheapestPlanPrice,
}: PriceBoxProps) {
  return (
    <div
      className="rounded-2xl bg-gray-50 p-5 space-y-2"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className="text-3xl font-extrabold text-dark">
        {instalmentPrice} kr/mån
      </p>
      <p className="text-sm text-muted">
        i {INSTALMENT_MONTHS} månader
      </p>
      <p className="text-sm text-muted">
        Totalt: {totalCost.toLocaleString("sv-SE")} kr
      </p>
      <p className="text-sm text-muted">
        + abonnemang fr.{" "}
        <span className="font-semibold text-dark">
          {cheapestPlanPrice} kr/mån
        </span>
      </p>
    </div>
  );
}

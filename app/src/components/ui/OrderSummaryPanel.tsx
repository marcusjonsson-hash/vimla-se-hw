"use client";

import type { Phone, PhoneVariant } from "@/data/phones";
import type { Plan } from "@/data/plans";
import { calculateCombinedMonthly, INSTALMENT_MONTHS } from "@/lib/pricing";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface OrderSummaryPanelProps {
  phone: Phone;
  variant: PhoneVariant;
  plan: Plan | null;
  isSubmitEnabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

function SummaryContent({
  phone,
  variant,
  plan,
  isSubmitEnabled,
  isSubmitting,
  onSubmit,
}: OrderSummaryPanelProps) {
  const subscriptionPrice = plan?.price ?? 0;
  const totalMonthly = calculateCombinedMonthly(
    variant.instalmentPrice,
    subscriptionPrice
  );

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold text-dark">Din beställning</h3>

      <div className="space-y-2 text-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-muted">{phone.name} {variant.storage}</p>
          <p className="font-semibold text-dark">{variant.instalmentPrice} kr/mån</p>
        </div>
        <div className="flex items-start justify-between gap-3">
          <p className="text-muted">{plan ? `${plan.name} ${plan.dataAmount}` : "Välj abonnemang"}</p>
          <p className="font-semibold text-dark">{subscriptionPrice} kr/mån</p>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div aria-live="polite" className="space-y-1">
        <p className="text-sm text-muted">Totalt per månad</p>
        <p className="text-2xl font-bold text-dark">{totalMonthly} kr/mån</p>
        <p className="text-xs text-muted">(i {INSTALMENT_MONTHS} månader)</p>
      </div>

      <p className="text-sm text-muted">Frakt: 0 kr</p>

      {isSubmitting ? (
        <LoadingSpinner message="Vi kontrollerar dina uppgifter…" />
      ) : (
        <Button
          type="button"
          variant="primary"
          className="w-full disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
          onClick={onSubmit}
          disabled={!isSubmitEnabled}
          aria-disabled={!isSubmitEnabled}
          data-analytics-section="order-summary"
          data-analytics-action="submit-credit-check"
        >
          Genomför kreditkontroll och beställ →
        </Button>
      )}
    </div>
  );
}

export default function OrderSummaryPanel(props: OrderSummaryPanelProps) {
  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-8" data-analytics-section="checkout-order-summary">
        <SummaryContent {...props} />
      </aside>

      <details className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
        <summary className="cursor-pointer list-none text-center text-sm font-semibold text-dark">
          Visa beställning
        </summary>
        <div className="mt-3">
          <SummaryContent {...props} />
        </div>
      </details>
    </>
  );
}

import Link from "next/link";
import type { PhoneColour, PhoneVariant } from "@/data/phones";
import type { Plan } from "@/data/plans";
import { calculateCombinedMonthly } from "@/lib/pricing";
import Button from "@/components/ui/Button";

type CreditResultVariant = "approved" | "declined" | "error";

interface CreditResultScreenProps {
  variant: CreditResultVariant;
  message?: string;
  showBackToPhones?: boolean;
  orderSummary?: {
    phoneName: string;
    colour: PhoneColour;
    variant: PhoneVariant;
    plan: Plan;
  };
  onConfirm?: () => void;
  onRetry?: () => void;
}

export default function CreditResultScreen({
  variant,
  message,
  showBackToPhones = false,
  orderSummary,
  onConfirm,
  onRetry,
}: CreditResultScreenProps) {
  if (variant === "approved" && orderSummary) {
    const totalMonthly = calculateCombinedMonthly(
      orderSummary.variant.instalmentPrice,
      orderSummary.plan.price
    );

    return (
      <section
        role="alert"
        className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
        data-analytics-section="credit-result-approved"
      >
        <p className="text-4xl">✅</p>
        <h2 className="mt-3 text-2xl font-bold text-dark">Din kreditkontroll är godkänd!</h2>

        <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-dark">
          <p className="font-semibold">{orderSummary.phoneName} · {orderSummary.colour.name} · {orderSummary.variant.storage}</p>
          <p className="mt-1">Abonnemang: {orderSummary.plan.name} {orderSummary.plan.dataAmount}</p>
          <p className="mt-1">Totalt per månad: {totalMonthly} kr/mån</p>
          <p className="mt-1">Beräknad leverans: 1–3 arbetsdagar</p>
        </div>

        <Button
          type="button"
          variant="primary"
          className="mt-6"
          onClick={onConfirm}
          data-analytics-action="confirm-order"
        >
          Bekräfta beställning →
        </Button>
      </section>
    );
  }

  if (variant === "declined") {
    return (
      <section
        role="alert"
        className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
        data-analytics-section="credit-result-declined"
      >
        <p className="text-4xl">❌</p>
        <h2 className="mt-3 text-2xl font-bold text-dark">
          Tyvärr blev din kreditansökan inte godkänd.
        </h2>
        <p className="mt-3 text-muted">
          Om du har frågor är du välkommen att kontakta vår kundservice.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="mailto:hej@vimla.se" className="text-sm font-semibold text-primary underline">
            Kontakta kundservice
          </a>
          <Link href="/phones" className="text-sm font-semibold text-primary underline" data-analytics-action="back-to-phones">
            Tillbaka till telefoner
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      role="alert"
      className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
      data-analytics-section="credit-result-error"
    >
      <p className="text-4xl">⚠️</p>
      <h2 className="mt-3 text-2xl font-bold text-dark">Något gick fel.</h2>
      <p className="mt-3 text-muted">{message ?? "Försök igen om en stund."}</p>

      {onRetry ? (
        <Button
          type="button"
          variant="primary"
          className="mt-6"
          onClick={onRetry}
          data-analytics-action="retry-credit-check"
        >
          Försök igen
        </Button>
      ) : null}

      {showBackToPhones ? (
        <div className="mt-4">
          <Link
            href="/phones"
            className="text-sm font-semibold text-primary underline"
            data-analytics-action="stock-unavailable-back-to-phones"
          >
            Tillbaka till telefoner
          </Link>
        </div>
      ) : null}
    </section>
  );
}

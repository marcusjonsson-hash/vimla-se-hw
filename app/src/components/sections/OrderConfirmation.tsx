import type { Order } from "@/lib/order";
import Button from "@/components/ui/Button";

interface OrderConfirmationProps {
  order: Order;
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8" data-analytics-section="confirmation">
      <p className="text-4xl">🎉</p>
      <h1 className="mt-3 text-3xl font-extrabold text-dark">Tack för din beställning!</h1>

      <p className="mt-2 text-sm text-muted">Ordernummer</p>
      <p className="text-lg font-bold text-dark">{order.orderId}</p>

      <div className="mt-6 space-y-2 rounded-xl bg-gray-50 p-4 text-sm text-dark">
        <p className="font-semibold">
          {order.phone.name} · {order.colour.name} · {order.variant.storage}
        </p>
        <p>Abonnemang: {order.plan.name} {order.plan.dataAmount}</p>
        <p>Telefon: {order.monthlyInstalment} kr/mån × 36 mån</p>
        <p>Totalt: {order.totalDeviceCost} kr</p>
        <p>Abonnemang: {order.monthlySubscription} kr/mån</p>
        <p className="font-semibold">Totalt/mån: {order.totalMonthly} kr/mån</p>
      </div>

      <div className="mt-6 space-y-1 text-sm text-muted">
        <p>Leveransadress: {order.personalDetails.address}</p>
        <p>Beräknad leverans: {order.deliveryEstimate}</p>
        <p>Vi har skickat en bekräftelse till {order.personalDetails.email}</p>
        <p>Du har 14 dagars ångerrätt enligt distansavtalslagen.</p>
      </div>

      <div className="mt-8">
        <Button
          href="#"
          variant="primary"
          data-analytics-action="go-to-mitt-vimla"
        >
          Gå till Mitt Vimla →
        </Button>
      </div>
    </section>
  );
}

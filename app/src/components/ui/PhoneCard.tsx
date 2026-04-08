import { getStartingPrice } from "@/lib/catalogue";
import type { Phone } from "@/data/phones";
import { ArrowRight } from "lucide-react";

interface PhoneCardProps {
  phone: Phone;
}

/**
 * Phone product card for the listing page.
 *
 * Displays: product image, model name, starting instalment price, "Välj →" CTA.
 *
 * Traces to: FR-102, FR-103, ux.md phone card interaction states
 */
export default function PhoneCard({ phone }: PhoneCardProps) {
  const startingPrice = getStartingPrice(phone);

  return (
    <a
      href={`/phones/${phone.slug}`}
      className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {/* Product image */}
      <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 mb-5 aspect-square overflow-hidden">
        <img
          src={phone.imageUrl}
          alt={phone.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Model name */}
      <h3 className="text-lg font-bold text-dark leading-snug">
        {phone.name}
      </h3>

      {/* Starting instalment price — BR-102 */}
      <p className="mt-2 text-muted text-sm">
        <span className="text-xl font-bold text-dark">
          fr. {startingPrice} kr
        </span>
        <span className="text-muted"> /mån</span>
      </p>

      {/* CTA button — FR-103 */}
      <span className="mt-auto pt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-colors group-hover:bg-primary-hover">
        Välj
        <ArrowRight className="h-4 w-4" />
      </span>
    </a>
  );
}

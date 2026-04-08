import Image from "next/image";
import Link from "next/link";
import type { Phone, PhoneColour, PhoneVariant } from "@/data/phones";

interface PhoneSummaryProps {
  phone: Phone;
  colour: PhoneColour;
  variant: PhoneVariant;
  detailPageUrl: string;
}

export default function PhoneSummary({
  phone,
  colour,
  variant,
  detailPageUrl,
}: PhoneSummaryProps) {
  return (
    <section
      className="rounded-2xl border border-gray-200 bg-white p-4"
      data-analytics-section="checkout-phone-summary"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={colour.imageUrl || phone.imageUrl}
            alt={`${phone.name} i ${colour.name}, framsida`}
            fill
            sizes="64px"
            className="object-contain p-2"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-dark">{phone.name}</p>
          <p className="truncate text-sm text-muted">
            {colour.name} · {variant.storage}
          </p>
          <p className="text-sm font-semibold text-dark">{variant.instalmentPrice} kr/mån</p>
        </div>

        <Link
          href={detailPageUrl}
          className="text-sm font-semibold text-primary hover:underline"
          data-analytics-action="change-phone-config"
        >
          Ändra
        </Link>
      </div>
    </section>
  );
}

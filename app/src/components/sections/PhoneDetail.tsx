"use client";

import { useState, useMemo } from "react";
import type { Phone } from "@/data/phones";
import ImageGallery from "@/components/ui/ImageGallery";
import ColourPicker from "@/components/ui/ColourPicker";
import StoragePicker from "@/components/ui/StoragePicker";
import PriceBox from "@/components/ui/PriceBox";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface PhoneDetailProps {
  phone: Phone;
  cheapestPlanPrice: number;
}

/**
 * Client component for the phone detail page.
 *
 * Manages state for:
 * - Selected colour (defaults to first)
 * - Selected storage (defaults to first / cheapest)
 *
 * Composes: ImageGallery, ColourPicker, StoragePicker, PriceBox, CTA button.
 *
 * Traces to: US-201, US-202, US-203, FR-201–FR-208
 */
export default function PhoneDetail({
  phone,
  cheapestPlanPrice,
}: PhoneDetailProps) {
  const [activeColour, setActiveColour] = useState(phone.colours[0]?.name ?? "");
  const [activeStorage, setActiveStorage] = useState(phone.variants[0]?.storage ?? "");

  // Derive current colour object
  const currentColour = useMemo(
    () => phone.colours.find((c) => c.name === activeColour) ?? phone.colours[0],
    [phone.colours, activeColour]
  );

  // Derive current variant (storage + price)
  const currentVariant = useMemo(
    () => phone.variants.find((v) => v.storage === activeStorage) ?? phone.variants[0],
    [phone.variants, activeStorage]
  );

  // Build gallery images from current colour — FR-202, F-06 fix
  // Uses colour.gallery when available (3–5 angles), falling back to primary image
  const galleryImages = useMemo(() => {
    if (!currentColour) return [];

    const angleLabels = ["framsida", "baksida", "sida", "vinkel", "detalj"];

    if (currentColour.gallery && currentColour.gallery.length > 0) {
      return currentColour.gallery.map((url, i) => ({
        url,
        alt: `${phone.name} i ${currentColour.name}, ${angleLabels[i] ?? `bild ${i + 1}`}`,
      }));
    }

    // Fallback: single colour image + model default
    return [
      {
        url: currentColour.imageUrl,
        alt: `${phone.name} i ${currentColour.name}, framsida`,
      },
    ];
  }, [phone.name, currentColour]);

  // CTA URL preserves colour + storage selection — FR-208
  const checkoutUrl = `/phones/${phone.slug}/checkout?colour=${encodeURIComponent(activeColour)}&storage=${encodeURIComponent(activeStorage)}`;

  if (!currentVariant || !currentColour) return null;

  return (
    <>
      {/* Back link — FR-207, US-203 */}
      <Link
        href="/phones"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Tillbaka till alla telefoner
      </Link>

      {/* Product section — side-by-side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Image gallery */}
        <ImageGallery images={galleryImages} />

        {/* Right: Product info */}
        <div className="flex flex-col gap-6">
          {/* Model name */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark">
            {phone.name}
          </h1>

          {/* Colour picker — FR-203 */}
          <ColourPicker
            colours={phone.colours}
            activeColour={activeColour}
            onColourChange={setActiveColour}
          />

          {/* Storage picker — FR-204 */}
          <StoragePicker
            variants={phone.variants}
            activeStorage={activeStorage}
            onStorageChange={setActiveStorage}
          />

          {/* Price box — FR-205 */}
          <PriceBox
            instalmentPrice={currentVariant.instalmentPrice}
            totalCost={currentVariant.totalCost}
            cheapestPlanPrice={cheapestPlanPrice}
          />

          {/* CTA — FR-208 (links to checkout, 404 until Drop 3) */}
          <Button
            variant="primary"
            href={checkoutUrl}
            className="w-full md:w-auto"
            data-analytics-section="phone-detail"
            data-analytics-action="start-checkout"
          >
            Välj denna telefon →
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

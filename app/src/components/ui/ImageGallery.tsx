"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/phones/placeholder.svg";

interface ImageGalleryProps {
  images: { url: string; alt: string }[];
}

/**
 * Image gallery with a main image and thumbnail strip.
 *
 * Click a thumbnail to swap the main image (FR-202).
 * Supports 3–5 images per colour variant.
 * Resets to the first image when the images array changes (colour switch).
 *
 * Traces to: FR-202, FR-203, US-201 AC-2, Drop 2 AC #3, ux.md image gallery
 */
export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first image when images change (e.g. colour switch) — FR-203
  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (images.length === 0) return null;

  const mainImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative flex items-center justify-center bg-gray-50 rounded-2xl aspect-square overflow-hidden">
        <Image
          src={mainImage.url}
          alt={mainImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6"
          priority
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center">
          {images.map((img, index) => (
            <button
              key={`${img.url}__${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Visa bild ${index + 1}: ${img.alt}`}
              className={`relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                index === activeIndex
                  ? "ring-2 ring-primary"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="64px"
                className="object-contain p-1"
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

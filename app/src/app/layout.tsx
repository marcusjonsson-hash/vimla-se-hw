import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vimla – Mobilabonnemang utan krångel",
  description:
    "Vimla erbjuder enkla och prisvärda mobilabonnemang utan bindningstid. Byt när du vill, behåll ditt nummer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Navbar from "@/components/sections/Navbar";
import CheckoutFlow from "@/components/sections/CheckoutFlow";
import { phones } from "@/data/phones";
import { plans } from "@/data/plans";
import { findBySlug } from "@/lib/catalogue";

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    colour?: string | string[];
    storage?: string | string[];
  }>;
}

function getSingleValue(value?: string | string[]): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CheckoutPage({
  params,
  searchParams,
}: CheckoutPageProps) {
  const { slug } = await params;
  const query = await searchParams;

  const phone = findBySlug(phones, slug);
  if (!phone || phone.status !== "active") {
    notFound();
  }

  const queryColour = getSingleValue(query.colour);
  const queryStorage = getSingleValue(query.storage);

  const initialColour =
    phone.colours.find((colour) => colour.name === queryColour) ?? phone.colours[0];
  const initialVariant =
    phone.variants.find((variant) => variant.storage === queryStorage) ??
    phone.variants[0];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50">
        <Container>
          <CheckoutFlow
            phone={phone}
            initialColour={initialColour}
            initialVariant={initialVariant}
            plans={plans}
          />
        </Container>
      </main>
    </>
  );
}

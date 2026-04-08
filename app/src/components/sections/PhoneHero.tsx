import Container from "@/components/ui/Container";

interface PhoneHeroProps {
  lowestPrice: number;
}

/**
 * Hero section for the phone listing page.
 *
 * Displays page title and instalment value-proposition subtitle
 * with dynamic starting price computed from the catalogue.
 *
 * Traces to: FR-002, US-001 AC-3, US-001 AC-4
 */
export default function PhoneHero({ lowestPrice }: PhoneHeroProps) {
  return (
    <section className="bg-primary-light py-16 md:py-24">
      <Container className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-dark">
          Telefoner
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Köp mobil med Vimla — betala från{" "}
          <span className="font-bold text-dark">{lowestPrice} kr/mån</span>{" "}
          med 36 månaders delbetalning
        </p>
      </Container>
    </section>
  );
}

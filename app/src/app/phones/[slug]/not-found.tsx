import Navbar from "@/components/sections/Navbar";
import Container from "@/components/ui/Container";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

/**
 * Custom 404 for /phones/[slug] — invalid or inactive phone slug.
 *
 * Shows an empathetic message with a link back to the listing.
 *
 * Traces to: US-201 edge case, Drop 2 AC #8
 */
export default function PhoneNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20 md:py-32">
        <Container className="text-center">
          <p className="text-6xl mb-6">📱</p>
          <h1 className="text-3xl font-extrabold text-dark">
            Telefonen hittades inte
          </h1>
          <p className="mt-4 text-lg text-muted max-w-md mx-auto">
            Vi kunde inte hitta den telefon du letade efter. Den kan ha tagits
            bort eller är inte längre tillgänglig.
          </p>
          <div className="mt-8">
            <Button variant="primary" href="/phones">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till alla telefoner
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

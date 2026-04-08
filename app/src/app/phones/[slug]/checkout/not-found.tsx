import Navbar from "@/components/sections/Navbar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CheckoutNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-20 md:py-28">
        <Container className="text-center">
          <p className="text-6xl">🛒</p>
          <h1 className="mt-4 text-3xl font-extrabold text-dark">Kassan hittades inte</h1>
          <p className="mt-3 text-muted">
            Telefonen finns inte eller är inte längre tillgänglig.
          </p>
          <div className="mt-8">
            <Button href="/phones" variant="primary">
              Tillbaka till telefoner
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}

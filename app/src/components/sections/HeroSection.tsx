import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="bg-primary-light py-20 md:py-32">
      <Container className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-dark">
          Hej! Vi är{" "}
          <span className="text-primary">Vimla.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Mobilabonnemang utan krångel. Inga bindningstider, inga dolda
          avgifter — bara bra mobilt till ett schysst pris som dessutom
          sjunker ju längre du stannar.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="#planer">
            Se våra abonnemang
          </Button>
          <Button variant="secondary" href="#om-vimla">
            Läs mer om Vimla
          </Button>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";
import Navbar from "@/components/sections/Navbar";

export default function LoadingCheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8 md:py-12">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-4">
              <div className="h-10 animate-pulse rounded-xl bg-gray-200" />
              <div className="h-24 animate-pulse rounded-2xl bg-gray-200" />
              <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
            </div>
            <div className="hidden h-64 animate-pulse rounded-2xl bg-gray-200 lg:block" />
          </div>
        </Container>
      </main>
    </>
  );
}

import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Container from "@/components/ui/Container";
import OrderConfirmation from "@/components/sections/OrderConfirmation";
import { getOrder } from "@/lib/order";

interface ConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 py-8 md:py-12">
        <Container>
          <OrderConfirmation order={order} />
        </Container>
      </main>
    </>
  );
}

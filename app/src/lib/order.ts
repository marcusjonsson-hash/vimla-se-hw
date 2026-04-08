import type { Phone, PhoneColour, PhoneVariant } from "@/data/phones";
import type { Plan } from "@/data/plans";
import { calculateCombinedMonthly, calculateTotalCost } from "@/lib/pricing";

export interface OrderDetails {
  phone: Phone;
  variant: PhoneVariant;
  colour: PhoneColour;
  plan: Plan;
  personalDetails: {
    personnummer: string;
    name: string;
    address: string;
    email: string;
    phone: string;
  };
}

export interface Order extends OrderDetails {
  orderId: string;
  createdAt: Date;
  monthlyInstalment: number;
  monthlySubscription: number;
  totalMonthly: number;
  totalDeviceCost: number;
  deliveryEstimate: string;
}

type GlobalOrderStore = {
  __orderStore?: Map<string, Order>;
  __orderCounters?: Map<string, number>;
};

const globalStore = globalThis as unknown as GlobalOrderStore;
globalStore.__orderStore ??= new Map<string, Order>();
globalStore.__orderCounters ??= new Map<string, number>();

const orderStore = globalStore.__orderStore;
const orderCounters = globalStore.__orderCounters;

function formatDateStamp(date: Date): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export function generateOrderId(): string {
  const stamp = formatDateStamp(new Date());
  const current = orderCounters.get(stamp) ?? 0;
  const next = current + 1;
  orderCounters.set(stamp, next);

  const suffix = String(next).padStart(3, "0");
  return `VH-${stamp}-${suffix}`;
}

export function createOrder(details: OrderDetails): Order {
  const orderId = generateOrderId();
  const monthlyInstalment = details.variant.instalmentPrice;
  const monthlySubscription = details.plan.price;
  const totalMonthly = calculateCombinedMonthly(
    monthlyInstalment,
    monthlySubscription
  );

  const order: Order = {
    ...details,
    orderId,
    createdAt: new Date(),
    monthlyInstalment,
    monthlySubscription,
    totalMonthly,
    totalDeviceCost: calculateTotalCost(monthlyInstalment),
    deliveryEstimate: "1–3 arbetsdagar",
  };

  orderStore.set(orderId, order);
  return order;
}

export function getOrder(orderId: string): Order | undefined {
  return orderStore.get(orderId);
}

import { beforeEach, describe, expect, it } from "vitest";
import { phones } from "@/data/phones";
import { plans } from "@/data/plans";
import { createOrder, generateOrderId, getOrder } from "./order";

beforeEach(() => {
  (globalThis as { __orderStore?: Map<string, unknown> }).__orderStore?.clear();
  (globalThis as { __orderCounters?: Map<string, number> }).__orderCounters?.clear();
});

describe("generateOrderId", () => {
  it("follows VH-YYYYMMDD-NNN format", () => {
    const id = generateOrderId();
    expect(id).toMatch(/^VH-\d{8}-\d{3,}$/);
  });

  it("increments sequence for same date", () => {
    const first = generateOrderId();
    const second = generateOrderId();

    const firstNum = Number(first.split("-")[2]);
    const secondNum = Number(second.split("-")[2]);

    expect(secondNum).toBe(firstNum + 1);
  });
});

describe("order store", () => {
  it("creates and retrieves order with computed totals", () => {
    const phone = phones[0];
    const variant = phone.variants[0];
    const colour = phone.colours[0];
    const plan = plans[1];

    const created = createOrder({
      phone,
      variant,
      colour,
      plan,
      personalDetails: {
        personnummer: "19900101-1234",
        name: "Test Testsson",
        address: "Testgatan 1",
        email: "test@example.se",
        phone: "0701234567",
      },
    });

    expect(created.totalMonthly).toBe(variant.instalmentPrice + plan.price);
    expect(created.totalDeviceCost).toBe(variant.instalmentPrice * 36);
    expect(created.deliveryEstimate).toBe("1–3 arbetsdagar");

    const loaded = getOrder(created.orderId);
    expect(loaded).toBeDefined();
    expect(loaded?.orderId).toBe(created.orderId);
  });
});

"use server";

import { randomUUID } from "crypto";
import type { CreditCheckResult } from "@/lib/creditCheck";
import { performCreditCheck } from "@/lib/creditCheck";
import type { OrderDetails } from "@/lib/order";
import { createOrder } from "@/lib/order";
import { validateAge, validateCheckoutForm, validatePersonnummer } from "@/lib/validation";

interface CreditApprovalRecord {
  personnummer: string;
  expiresAt: number;
}

const APPROVAL_TTL_MS = 10 * 60 * 1000;

type GlobalCheckoutApprovals = {
  __checkoutCreditApprovals?: Map<string, CreditApprovalRecord>;
};

const globalApprovals = globalThis as unknown as GlobalCheckoutApprovals;
globalApprovals.__checkoutCreditApprovals ??= new Map<string, CreditApprovalRecord>();
const approvalStore = globalApprovals.__checkoutCreditApprovals;

function normalisePersonnummer(value: string): string {
  return value.replace(/\D/g, "");
}

function clearExpiredApprovals(now = Date.now()): void {
  for (const [token, record] of approvalStore.entries()) {
    if (record.expiresAt <= now) {
      approvalStore.delete(token);
    }
  }
}

function createApprovalToken(personnummer: string): string {
  clearExpiredApprovals();
  const token = randomUUID();

  approvalStore.set(token, {
    personnummer: normalisePersonnummer(personnummer),
    expiresAt: Date.now() + APPROVAL_TTL_MS,
  });

  return token;
}

function consumeApprovalToken(token: string, personnummer: string): boolean {
  clearExpiredApprovals();

  const record = approvalStore.get(token);
  if (!record) {
    return false;
  }

  const samePersonnummer =
    record.personnummer === normalisePersonnummer(personnummer);

  if (!samePersonnummer) {
    return false;
  }

  approvalStore.delete(token);
  return true;
}

export async function submitCreditCheck(
  personnummer: string
): Promise<CreditCheckResult & { approvalToken?: string }> {
  const formatValidation = validatePersonnummer(personnummer);
  if (!formatValidation.valid) {
    return {
      status: "error",
      message: formatValidation.error,
    };
  }

  const ageValidation = validateAge(personnummer);
  if (!ageValidation.valid) {
    return {
      status: "error",
      message: ageValidation.error,
    };
  }

  const result = await performCreditCheck(personnummer);

  if (result.status === "approved") {
    return {
      ...result,
      approvalToken: createApprovalToken(personnummer),
    };
  }

  return result;
}

export async function confirmOrder(
  details: OrderDetails,
  approvalToken: string
): Promise<{ orderId: string }> {
  if (!approvalToken) {
    throw new Error("Kreditkontrollen är inte verifierad. Försök igen.");
  }

  const hasValidApproval = consumeApprovalToken(
    approvalToken,
    details.personalDetails.personnummer
  );

  if (!hasValidApproval) {
    throw new Error("Kreditkontrollen är inte verifierad. Försök igen.");
  }

  const validation = validateCheckoutForm(details.personalDetails);
  const hasValidationErrors = Object.values(validation).some(
    (result) => !result.valid
  );

  if (hasValidationErrors) {
    throw new Error("Ogiltiga personuppgifter.");
  }

  const order = createOrder(details);
  return { orderId: order.orderId };
}

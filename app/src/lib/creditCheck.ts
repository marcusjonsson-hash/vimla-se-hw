import {
  DECLINED_PERSONNUMMER,
  ERROR_PERSONNUMMER,
} from "@/data/testPersonnummer";

export type CreditCheckStatus = "approved" | "declined" | "error";

export interface CreditCheckResult {
  status: CreditCheckStatus;
  message?: string;
}

function normalisePersonnummer(value: string): string {
  return value.replace(/\D/g, "");
}

export async function performCreditCheck(
  personnummer: string
): Promise<CreditCheckResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const normalised = normalisePersonnummer(personnummer);

  if (normalised === DECLINED_PERSONNUMMER) {
    return {
      status: "declined",
      message: "Tyvärr blev din kreditansökan inte godkänd.",
    };
  }

  if (normalised === ERROR_PERSONNUMMER) {
    return {
      status: "error",
      message: "Något gick fel. Försök igen om en stund.",
    };
  }

  return { status: "approved" };
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Phone, PhoneColour, PhoneVariant } from "@/data/phones";
import type { Plan } from "@/data/plans";
import type { CheckoutFormFields } from "@/lib/validation";
import {
  validateAge,
  validateCheckoutForm,
  validateEmail,
  validatePersonnummer,
  validatePhone,
  validateRequired,
} from "@/lib/validation";
import {
  confirmOrder,
  submitCreditCheck,
} from "@/app/phones/[slug]/checkout/actions";
import ProgressBar from "@/components/ui/ProgressBar";
import PhoneSummary from "@/components/ui/PhoneSummary";
import PlanSelector from "@/components/ui/PlanSelector";
import PersonalDetailsForm from "@/components/ui/PersonalDetailsForm";
import ConsentCheckboxes from "@/components/ui/ConsentCheckboxes";
import OrderSummaryPanel from "@/components/ui/OrderSummaryPanel";
import CreditResultScreen from "@/components/ui/CreditResultScreen";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";

type CheckoutStep = 2 | 3 | "submitting" | "approved" | "declined" | "error";

interface CheckoutFlowProps {
  phone: Phone;
  initialColour: PhoneColour;
  initialVariant: PhoneVariant;
  plans: Plan[];
}

const INITIAL_FORM_FIELDS: CheckoutFormFields = {
  personnummer: "",
  name: "",
  address: "",
  email: "",
  phone: "",
};

function getValidationForField(
  field: keyof CheckoutFormFields,
  value: string
): string | undefined {
  if (field === "personnummer") {
    const formatValidation = validatePersonnummer(value);
    if (!formatValidation.valid) {
      return formatValidation.error;
    }

    const ageValidation = validateAge(value);
    if (!ageValidation.valid) {
      return ageValidation.error;
    }

    return undefined;
  }

  if (field === "name") {
    return validateRequired(value, "ditt namn").error;
  }

  if (field === "address") {
    return validateRequired(value, "din adress").error;
  }

  if (field === "email") {
    return validateEmail(value).error;
  }

  return validatePhone(value).error;
}

export default function CheckoutFlow({
  phone,
  initialColour,
  initialVariant,
  plans,
}: CheckoutFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>(2);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formFields, setFormFields] =
    useState<CheckoutFormFields>(INITIAL_FORM_FIELDS);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CheckoutFormFields, string>>
  >({});
  const [consents, setConsents] = useState({ terms: false, credit: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [approvalToken, setApprovalToken] = useState<string | null>(null);
  const [resultErrorMessage, setResultErrorMessage] = useState<string | null>(
    null
  );
  const [isStockUnavailable, setIsStockUnavailable] = useState(false);

  const detailPageUrl = useMemo(
    () =>
      `/phones/${phone.slug}?colour=${encodeURIComponent(initialColour.name)}&storage=${encodeURIComponent(initialVariant.storage)}`,
    [phone.slug, initialColour.name, initialVariant.storage]
  );

  const fullValidation = useMemo(
    () => validateCheckoutForm(formFields),
    [formFields]
  );

  const isFormValid = useMemo(
    () => Object.values(fullValidation).every((validation) => validation.valid),
    [fullValidation]
  );

  const isSubmitEnabled =
    step === 3 &&
    selectedPlan !== null &&
    isFormValid &&
    consents.terms &&
    consents.credit &&
    !isSubmitting;

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [isSubmitting]);

  const completedSteps =
    step === 2
      ? [1]
      : step === 3
        ? [1, 2]
        : [1, 2, 3];

  const currentProgressStep =
    step === 2 ? 2 : step === 3 || step === "submitting" ? 3 : 4;

  function handleFieldChange(field: keyof CheckoutFormFields, value: string) {
    setFormFields((previous) => ({ ...previous, [field]: value }));
  }

  function handleFieldBlur(field: keyof CheckoutFormFields) {
    const error = getValidationForField(field, formFields[field]);
    setFormErrors((previous) => ({ ...previous, [field]: error }));
  }

  function applyAllFormErrors() {
    const nextErrors: Partial<Record<keyof CheckoutFormFields, string>> = {};

    (Object.keys(formFields) as Array<keyof CheckoutFormFields>).forEach(
      (field) => {
        const error = getValidationForField(field, formFields[field]);
        if (error) {
          nextErrors[field] = error;
        }
      }
    );

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function runCreditCheck() {
    setResultErrorMessage(null);
    setIsStockUnavailable(false);

    if (!selectedPlan) {
      setStep(2);
      return;
    }

    const hasNoErrors = applyAllFormErrors();
    const hasAllConsents = consents.terms && consents.credit;

    if (!hasNoErrors || !hasAllConsents) {
      setStep(3);
      return;
    }

    if (phone.status !== "active") {
      setIsStockUnavailable(true);
      setResultErrorMessage(
        `Tyvärr är ${phone.name} inte längre tillgänglig.`
      );
      setStep("error");
      return;
    }

    setIsSubmitting(true);
    setStep("submitting");

    try {
      const result = await submitCreditCheck(formFields.personnummer);

      if (result.status === "approved") {
        if (!result.approvalToken) {
          setResultErrorMessage("Kreditkontrollen kunde inte verifieras. Försök igen.");
          setStep("error");
        } else {
          setApprovalToken(result.approvalToken);
          setStep("approved");
        }
      } else if (result.status === "declined") {
        setStep("declined");
      } else {
        setResultErrorMessage(
          result.message ?? "Något gick fel. Försök igen om en stund."
        );
        setStep("error");
      }
    } catch {
      setResultErrorMessage("Något gick fel. Försök igen om en stund.");
      setStep("error");
    }

    setIsSubmitting(false);
  }

  async function handleConfirmOrder() {
    if (!selectedPlan) {
      return;
    }

    if (!approvalToken) {
      setResultErrorMessage("Kreditkontrollen är inte verifierad. Försök igen.");
      setStep("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await confirmOrder(
        {
          phone,
          colour: initialColour,
          variant: initialVariant,
          plan: selectedPlan,
          personalDetails: formFields,
        },
        approvalToken
      );

      router.push(`/order/confirmation/${response.orderId}`);
    } catch (error) {
      const fallbackMessage = "Något gick fel. Försök igen om en stund.";
      setResultErrorMessage(
        error instanceof Error && error.message.length > 0
          ? error.message
          : fallbackMessage
      );
      setStep("error");
      setIsSubmitting(false);
    }
  }

  const isResultStep =
    step === "approved" || step === "declined" || step === "error";

  return (
    <section className="py-8 md:py-12" data-analytics-section="checkout-flow">
      <div className="grid grid-cols-1 gap-8 pb-20 lg:grid-cols-[minmax(0,1fr)_360px] lg:pb-0">
        <div className="space-y-6">
          <ProgressBar
            currentStep={currentProgressStep}
            completedSteps={completedSteps}
            onStepClick={(targetStep) => {
              if (targetStep === 2 || targetStep === 3) {
                setStep(targetStep as CheckoutStep);
              }
            }}
          />

          <PhoneSummary
            phone={phone}
            colour={initialColour}
            variant={initialVariant}
            detailPageUrl={detailPageUrl}
          />

          {step === 2 ? (
            <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6" data-analytics-section="checkout-step-plan">
              <h2 className="text-xl font-bold text-dark">2. Abonnemang</h2>
              <PlanSelector
                plans={plans}
                selectedPlanId={selectedPlan?.id ?? null}
                onPlanChange={(plan) => setSelectedPlan(plan)}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStep(3)}
                disabled={!selectedPlan}
                className="disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-muted"
                data-analytics-action="continue-to-personal-details"
              >
                Fortsätt till personuppgifter →
              </Button>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6" data-analytics-section="checkout-step-details">
              <h2 className="text-xl font-bold text-dark">3. Dina uppgifter</h2>
              <PersonalDetailsForm
                fields={formFields}
                errors={formErrors}
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
              />
              <ConsentCheckboxes
                consents={consents}
                onChange={(field, checked) =>
                  setConsents((previous) => ({ ...previous, [field]: checked }))
                }
              />
            </section>
          ) : null}

          {step === "submitting" ? (
            <section className="rounded-2xl border border-gray-200 bg-white p-6" data-analytics-section="checkout-submitting">
              <LoadingSpinner message="Vi kontrollerar dina uppgifter…" />
            </section>
          ) : null}

          {isResultStep ? (
            <CreditResultScreen
              variant={step}
              message={resultErrorMessage ?? undefined}
              showBackToPhones={isStockUnavailable}
              orderSummary={
                step === "approved" && selectedPlan
                  ? {
                      phoneName: phone.name,
                      colour: initialColour,
                      variant: initialVariant,
                      plan: selectedPlan,
                    }
                  : undefined
              }
              onConfirm={step === "approved" ? handleConfirmOrder : undefined}
              onRetry={
                step === "error" && !isStockUnavailable
                  ? runCreditCheck
                  : undefined
              }
            />
          ) : null}
        </div>

        {!isResultStep ? (
          <OrderSummaryPanel
            phone={phone}
            variant={initialVariant}
            plan={selectedPlan}
            isSubmitEnabled={isSubmitEnabled}
            isSubmitting={isSubmitting}
            onSubmit={runCreditCheck}
          />
        ) : null}
      </div>
    </section>
  );
}

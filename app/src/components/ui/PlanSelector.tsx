"use client";

import type { Plan } from "@/data/plans";

interface PlanSelectorProps {
  plans: Plan[];
  selectedPlanId: string | null;
  onPlanChange: (plan: Plan) => void;
}

export default function PlanSelector({
  plans,
  selectedPlanId,
  onPlanChange,
}: PlanSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Välj abonnemang" className="space-y-3" data-analytics-section="checkout-plan-selector">
      {plans.map((plan) => {
        const checked = selectedPlanId === plan.id;

        return (
          <label
            key={plan.id}
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-colors ${
              checked ? "border-primary bg-primary-light" : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={checked}
                onChange={() => onPlanChange(plan)}
                role="radio"
                aria-checked={checked}
                className="h-4 w-4 accent-primary"
              />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-dark">{plan.name}</p>
                  {plan.popular ? (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-white">
                      Populärast
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-muted">{plan.dataAmount}</p>
              </div>
            </div>
            <p className="font-semibold text-dark">{plan.price} kr/mån</p>
          </label>
        );
      })}
    </div>
  );
}

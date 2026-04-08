interface ProgressBarProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

const STEPS = ["Välj telefon", "Abonnemang", "Dina uppgifter", "Bekräfta"];

export default function ProgressBar({
  currentStep,
  completedSteps,
  onStepClick,
}: ProgressBarProps) {
  return (
    <nav aria-label="Kassasteg" role="navigation" className="w-full" data-analytics-section="checkout-progress">
      <ol className="grid grid-cols-4 gap-2 md:gap-4">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = completedSteps.includes(stepNumber);
          const isUpcoming = stepNumber > currentStep;
          const isClickable = isCompleted && !!onStepClick;

          return (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <button
                type="button"
                className={`h-8 w-8 rounded-full border text-sm font-semibold ${
                  isActive || isCompleted
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 bg-white text-muted"
                } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                onClick={() => {
                  if (isClickable && onStepClick) {
                    onStepClick(stepNumber);
                  }
                }}
                aria-current={isActive ? "step" : undefined}
                aria-disabled={isUpcoming || !isClickable}
                disabled={!isClickable}
              >
                {isCompleted || isActive ? "●" : "○"}
              </button>
              <span
                className={`text-xs md:text-sm ${
                  isActive ? "font-semibold text-dark" : "text-muted"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

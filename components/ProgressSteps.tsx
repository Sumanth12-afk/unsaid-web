interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressSteps({ currentStep, totalSteps, steps }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="relative mb-4">
        <div className="h-1 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={index}
              className={`flex-1 text-center transition-all duration-200 ${
                isActive ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isCompleted
                      ? 'bg-accent text-white'
                      : isActive
                      ? 'bg-accent/20 text-accent ring-2 ring-accent'
                      : 'bg-surface-hover text-secondary'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
              </div>
              <p className="text-xs font-medium text-secondary hidden sm:block">{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


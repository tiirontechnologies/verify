
type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const steps = ["Organization", "Admin", "Branding", "Review"];

export default function SignupStepper({
  currentStep,
  setCurrentStep,
}: Props) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNo = index + 1;

          return (
            <div key={step} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(stepNo)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition sm:h-9 sm:w-9 lg:h-10 lg:w-10 lg:text-sm ${
                  currentStep >= stepNo
                    ? "bg-red-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {stepNo}
              </button>

              <div className="ml-2 hidden sm:block">
                <p
                  className={`text-xs font-semibold lg:text-sm ${
                    currentStep >= stepNo ? "text-red-600" : "text-slate-500"
                  }`}
                >
                  {step}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded-full sm:mx-3 lg:mx-5 ${
                    currentStep > stepNo ? "bg-red-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
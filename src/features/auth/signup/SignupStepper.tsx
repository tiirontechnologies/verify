type Props = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const steps = [
  "Organization",
  "Admin",
  "Branding",
  "Review",
];

export default function SignupStepper({
  currentStep,
  setCurrentStep,
}: Props) {
  return (
    <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNo = index + 1;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <button
                type="button"
                onClick={() => setCurrentStep(stepNo)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition ${
                  currentStep >= stepNo
                    ? "bg-red-600 text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {stepNo}
              </button>

              <div className="ml-4 hidden md:block">
                <p
                  className={`font-semibold ${
                    currentStep >= stepNo
                      ? "text-red-600"
                      : "text-slate-500"
                  }`}
                >
                  {step}
                </p>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`mx-5 h-1 flex-1 rounded-full ${
                    currentStep > stepNo
                      ? "bg-red-600"
                      : "bg-slate-200"
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
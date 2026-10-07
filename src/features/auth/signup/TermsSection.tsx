import {
  FileText,
  ShieldCheck,
  // Clock3,
  ArrowRight,
} from "lucide-react";

type TermsSectionProps = {
  formData: {
    companyName: string;
    industry: string;
    contactPerson: string;
    email: string;
    country: string;
  };

  logo: File | null;

  agreeTerms: boolean;
  agreePrivacy: boolean;
  newsletter: boolean;

  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  loading?: boolean;
};

export default function TermsSection({
  formData,
  logo,
  agreeTerms,
  agreePrivacy,
  newsletter,
  handleCheckboxChange,
  loading = false,
}: TermsSectionProps) {
  const canSubmit = agreeTerms && agreePrivacy;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-2.5">
            <FileText className="text-red-600" size={18} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Review & Submit
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Please review your registration before submitting.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-4 sm:p-5">
        {/* Registration Summary */}
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900 sm:text-base">
            Registration Summary
          </h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryItem title="Organization" value={formData.companyName || "-"} />
            <SummaryItem title="Industry" value={formData.industry || "-"} />
            <SummaryItem title="Administrator" value={formData.contactPerson || "-"} />
            <SummaryItem title="Official Email" value={formData.email || "-"} />
            <SummaryItem title="Country" value={formData.country || "-"} />
            <SummaryItem title="Logo" value={logo ? "Uploaded" : "Not Uploaded"} />
          </div>
        </div>

        {/* What Happens Next */}
        {/* <div className="rounded-2xl border border-red-100 bg-red-50 p-6"> */}
        <div className="flex items-center gap-3">
          {/* <Clock3 className="text-red-600" size={22} /> */}
          {/* <h3 className="text-lg font-semibold text-slate-900">What happens next?</h3> */}
        </div>
        {/* <div className="mt-6 space-y-5">
          <Step number={1} text="Your registration request is submitted." />
          <Step number={2} text="Our team verifies your organization." />
          <Step number={3} text="Approval usually takes 24–48 business hours." />
          <Step number={4} text="You'll receive an email to activate your organization account." />
        </div> */}
        {/* </div> */}

        {/* Checkboxes */}
        <div className="space-y-3">
          <Checkbox
            name="agreeTerms"
            checked={agreeTerms}
            onChange={handleCheckboxChange}
            label="I agree to the Terms & Conditions."
          />

          <Checkbox
            name="agreePrivacy"
            checked={agreePrivacy}
            onChange={handleCheckboxChange}
            label="I agree to the Privacy Policy."
          />

          <Checkbox
            name="newsletter"
            checked={newsletter}
            onChange={handleCheckboxChange}
            label="Send me product updates and platform news."
          />
        </div>

        {/* Security Notice */}
        <div className="flex gap-2.5 rounded-xl bg-slate-50 p-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-green-600" size={16} />

          <p className="text-xs leading-5 text-slate-600">
            Your information is encrypted during transmission and securely
            stored. Organization verification is performed manually to
            maintain the integrity of the Tiiron Verify platform.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          py-3
          text-sm
          font-semibold
          transition
          sm:text-base
          ${
            canSubmit && !loading
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
          }
          `}
        >
          {loading ? "Submitting..." : "Submit Registration"}
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

function SummaryItem({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{title}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

// function Step({ number, text }: { number: number; text: string }) {
//   return (
//     <div className="flex gap-4">
//       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
//         {number}
//       </div>
//       <p className="pt-1 text-slate-700">{text}</p>
//     </div>
//   );
// }

type CheckboxProps = {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

function Checkbox({ name, checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-red-600"
      />

      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

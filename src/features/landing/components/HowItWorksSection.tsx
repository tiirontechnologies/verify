import {
  Search,
  ShieldCheck,
  FileCheck,
  Download,
} from "lucide-react";

const steps = [
  {
    icon: <Search size={28} />,
    title: "Enter Verification ID",
    desc: "Provide the credential ID or scan the QR code to begin verification.",
    accent: "bg-red-50 text-red-600",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Validate Authenticity",
    desc: "Our platform securely checks the credential against trusted records.",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    icon: <FileCheck size={28} />,
    title: "View Credential Details",
    desc: "Access internship details, certificates and supporting documents.",
    accent: "bg-green-50 text-green-600",
  },
  {
    icon: <Download size={28} />,
    title: "Download Report",
    desc: "Generate a signed verification report instantly for your records.",
    accent: "bg-violet-50 text-violet-600",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-16">

          <p className="uppercase tracking-[0.3em] text-red-600 text-sm font-medium">
            Process
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">
            How Verification Works
          </h2>

          <p className="mt-6 text-gray-500 leading-8">
            A secure and seamless workflow designed for organizations,
            recruiters and educational institutions.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${step.accent}`}>
                {step.icon}
              </div>

              <div className="mt-8 text-red-500 text-sm font-semibold">STEP 0{index + 1}</div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-5 text-slate-500 leading-8">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
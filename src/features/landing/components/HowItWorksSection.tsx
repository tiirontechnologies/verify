import {
  Search,
  ShieldCheck,
  FileCheck,
  Download,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Enter Verification ID",
      desc: "Provide the credential ID or scan the QR code to begin verification.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Validate Authenticity",
      desc: "Our platform securely checks the credential against trusted records.",
    },
    {
      icon: <FileCheck size={28} />,
      title: "View Credential Details",
      desc: "Access internship details, certificates and supporting documents.",
    },
    {
      icon: <Download size={28} />,
      title: "Download Report",
      desc: "Generate a signed verification report instantly for your records.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border shadow-sm hover:shadow-xl transition"
            >

              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                {step.icon}
              </div>

              <div className="mt-8 text-red-500 text-sm font-semibold">
                STEP 0{index + 1}
              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-5 text-gray-500 leading-8">
                {step.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
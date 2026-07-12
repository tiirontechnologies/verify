import { ShieldCheck, Lock, BadgeCheck } from "lucide-react";

const features = [
  {
    title: "Authentic",
    description:
      "Every credential is digitally signed by issuing authorities, ensuring authenticity and trust.",
    icon: <ShieldCheck className="text-red-600" size={32} />,
    accent: "bg-red-50",
  },
  {
    title: "Tamper Proof",
    description:
      "Unauthorized modifications invalidate credentials, preventing fraud and ensuring integrity.",
    icon: <Lock className="text-blue-600" size={32} />,
    accent: "bg-blue-50",
  },
  {
    title: "Trusted",
    description:
      "Recruiters and organizations rely on Tiiron as the source of truth for digital credentials.",
    icon: <BadgeCheck className="text-green-600" size={32} />,
    accent: "bg-green-50",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-14 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-red-600 text-sm font-semibold uppercase tracking-[0.28em]">
            Features
          </p>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Why Verify with Tiiron?
          </h2>

          <p className="mt-6 text-slate-600 leading-8 text-base sm:text-lg">
            Secure, trusted and tamper-proof credential verification designed for organizations and recruiters worldwide.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-3xl ${feature.accent}`}>
                {feature.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-5 text-slate-500 leading-8">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
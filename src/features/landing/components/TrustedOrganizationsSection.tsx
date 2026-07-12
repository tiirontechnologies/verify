import {
  Building2,
  ShieldCheck,
  Globe2,
  Zap,
  CheckCircle2,
} from "lucide-react";

const companies = [
  { name: "Algo Junction", desc: "Hiring Partner", accent: "bg-red-50 text-red-600" },
  { name: "Tiiron Academy", desc: "Technology Partner", accent: "bg-blue-50 text-blue-600" },
  { name: "Grettech", desc: "Recruitment Partner", accent: "bg-orange-50 text-orange-600" },
  { name: "Inacademic", desc: "Training Partner", accent: "bg-green-50 text-green-600" },
];

const strengths = [
  {
    icon: <ShieldCheck size={32} className="text-red-600" />,
    title: "Enterprise Security",
    description: "End-to-end encryption and digitally signed credentials.",
  },
  {
    icon: <Zap size={32} className="text-blue-600" />,
    title: "Instant Verification",
    description: "Verify credentials within seconds from anywhere.",
  },
  {
    icon: <CheckCircle2 size={32} className="text-green-600" />,
    title: "Trusted Records",
    description: "Every certificate is validated from official records.",
  },
  {
    icon: <Globe2 size={32} className="text-purple-600" />,
    title: "Global Access",
    description: "Accessible worldwide for recruiters and institutions.",
  },
];

const stats = [
  { value: "5+", label: "Enterprise Clients", accent: "text-red-600" },
  { value: "98%", label: "Verification Accuracy", accent: "text-blue-600" },
  { value: "24/7", label: "Support Availability", accent: "text-green-600" },
  { value: "10+", label: "Trusted Partners", accent: "text-purple-600" },
];

export default function TrustedOrganizationsSection() {
  return (
    <section className="py-14 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-red-50 text-red-600 font-semibold text-sm tracking-wide">
            TRUSTED WORLDWIDE
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 leading-tight sm:text-5xl">
            Trusted By Leading <span className="text-red-600">Organizations</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500">
            Thousands of enterprises, educational institutions and recruiters rely on Tiiron to securely issue, manage and verify digital credentials.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-16 lg:grid-cols-4">
          {companies.map((company) => (
            <div key={company.name} className="group rounded-[32px] border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${company.accent}`}>
                <Building2 size={34} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{company.name}</h3>
              <p className="mt-2 text-slate-500">{company.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 mt-24 md:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item) => (
            <div key={item.title} className="text-center rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-50">
                {item.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-slate-500 leading-7">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-[36px] border border-slate-200 bg-white p-10 shadow-sm lg:p-14">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900">Trusted by Thousands</h2>
            <p className="mt-4 text-lg text-slate-500">
              Growing every day with organizations, institutions and recruiters.
            </p>
          </div>

          <div className="grid gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 p-8 text-center transition duration-300 hover:shadow-xl">
                <div className={`text-4xl font-bold ${item.accent}`}>{item.value}</div>
                <p className="mt-3 text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

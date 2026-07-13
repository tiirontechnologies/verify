import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  Lock,
} from "lucide-react";

import HeroIllustration from "./HeroIllustration";

export default function HeroSection() {
  const [credentialId, setCredentialId] = useState("");

  const navigate = useNavigate();

  const handleVerify = () => {
    if (!credentialId.trim()) return;
    navigate(`/verification/${credentialId.trim()}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#f8fafc]">
      <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-red-50 blur-[120px]" />
      <div className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-blue-50 blur-[140px]" />

      <div className="relative mx-auto max-w-[1650px] px-6 lg:px-8 pt-14 pb-20">
        <div className="grid gap-16 lg:grid-cols-[1.02fr_0.98fr] items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm">
              <ShieldCheck size={18} />
              Trusted by 10+ Organizations
            </div>

            <h1 className="mt-8 text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl md:text-[56px] xl:text-[62px]">
              Verify Credentials
              <br />
              <span className="text-red-600">Instantly</span>
              {" & "}
              <span className="text-blue-700">Securely</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Verify internship certificates, training credentials, employee records and academic achievements with enterprise-grade security. Trusted by institutions, recruiters and organizations worldwide.
            </p>

            <div className="mt-12">
              <div className="rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_40px_120px_-80px_rgba(15,23,42,0.15)]">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="flex min-w-0 flex-1 items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4">
                    <Search size={24} className="text-slate-400" />
                    <input
                      type="text"
                      value={credentialId}
                      onChange={(e) => setCredentialId(e.target.value)}
                    placeholder="Enter your Verification ID (e.g. TTINT202600000)"
                      className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>

                  <button
                    onClick={handleVerify}
                    className="inline-flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 text-base font-semibold text-white transition hover:bg-red-700 hover:shadow-xl md:w-auto"
                  >
                    Verify
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Authentic",
                  desc: "Digitally Verified",
                  icon: <BadgeCheck size={24} className="text-green-600" />,
                  style: "bg-green-50",
                },
                {
                  title: "Tamper Proof",
                  desc: "Secure Validation",
                  icon: <Lock size={24} className="text-blue-600" />,
                  style: "bg-blue-50",
                },
                {
                  title: "Trusted",
                  desc: "Enterprise Ready",
                  icon: <ShieldCheck size={24} className="text-red-600" />,
                  style: "bg-red-50",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.style}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[720px] overflow-hidden rounded-[40px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
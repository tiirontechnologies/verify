import { ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../landing/components/Navbar";

export default function SignupHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-red-50/40 to-white">
      {/* Background Blur */}
      <div className="pointer-events-none absolute -left-24 top-0 z-0 hidden h-64 w-64 rounded-full bg-red-100 opacity-60 blur-3xl sm:block" />
      <div className="pointer-events-none absolute right-0 top-10 z-0 hidden h-56 w-56 rounded-full bg-red-50 opacity-80 blur-3xl sm:block" />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-6 lg:px-8 lg:py-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-10">
          {/* LEFT */}
          <div className="w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-600 sm:text-sm">
              <ShieldCheck size={15} />
              Trusted Digital Verification Platform
            </div>

            <div className="mt-4 flex items-center gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md sm:h-16 sm:w-16 sm:rounded-2xl">
                <Building2 size={24} className="sm:h-8 sm:w-8" />
              </div>
              <h1 className="min-w-0 text-lg font-bold leading-tight text-slate-900 sm:text-3xl lg:text-5xl">
                <span className="block">Enterprise</span>
                <span className="block text-red-600">
                  Organization Registration
                </span>
              </h1>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Register your organization on Tiiron Verify and securely issue,
              manage and verify digital certificates with enterprise-grade
              security, QR authentication and centralized credential management.
            </p>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
              >
                Organization Login
                <ArrowRight size={16} />
              </Link>

              <div className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm sm:w-auto">
                Manual Approval Required
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <h2 className="text-lg font-bold text-red-600 sm:text-xl">
                  100%
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Secure Verification
                </p>
              </div>

              <div className="rounded-xl bg-white p-3 shadow-sm">
                <h2 className="text-lg font-bold text-red-600 sm:text-xl">
                  24–48h
                </h2>
                <p className="mt-1 text-xs text-slate-500">Approval Time</p>
              </div>

              <div className="rounded-xl bg-white p-3 shadow-sm">
                <h2 className="text-lg font-bold text-red-600 sm:text-xl">
                  24×7
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Platform Availability
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Why choose Tiiron Verify */}
          <div className="w-full max-w-sm lg:max-w-[400px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl sm:p-4">
              {/* Icon + Header side by side */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg sm:h-12 sm:w-12">
                  <Building2 size={22} />
                </div>

                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Why organizations choose Tiiron Verification Portal
                </h2>
              </div>

              <p className="mt-3 text-xs text-slate-500 sm:text-sm">
                A trusted platform built for educational institutions, training
                organizations and enterprises.
              </p>

              <div className="mt-4 space-y-2">
                {[
                  "Enterprise-grade security",
                  "Real-time QR verification",
                  "Centralized student management",
                  "Advanced analytics dashboard",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2.5 transition hover:border-red-200 hover:bg-red-50"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100">
                      <ShieldCheck size={14} className="text-red-600" />
                    </div>

                    <span className="text-xs font-medium text-slate-700 sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Information */}
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
                <p className="text-xs font-semibold leading-5 text-red-700 sm:text-sm">
                  Registration requests are reviewed manually before
                  organization access is granted.
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Approval Time
                    </p>
                    <p className="text-xs text-slate-500">
                      Usually within 24–48 Hours
                    </p>
                  </div>

                  <div className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-sm">
                    24–48h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

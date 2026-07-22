import {
  ShieldCheck,
  ArrowRight,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

// Change this path according to your project
import tiironLogo from "../../../assets/Tiiron_Technologies_Logo.png";

export default function SignupHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-red-50/40 to-white">

      {/* Background Blur */}

      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-red-100 blur-3xl opacity-60" />

      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-red-50 blur-3xl opacity-80" />

      <div className="mx-auto max-w-[1500px] px-5 py-6 lg:px-10">

        {/* Top Navigation */}

        <div className="mb-10 flex items-center justify-between">

          {/* Logo */}

          <div className="flex items-center gap-4">

            <img
              src={tiironLogo}
              alt="Tiiron Verify"
              className="h-12 w-auto sm:h-14"
            />

            {/* <div>

              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Tiiron Verify
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                Enterprise Credential Verification Platform
              </p>

            </div> */}

          </div>

          {/* Login Button */}

<div className="flex items-center gap-3">

  <Link
    to="/"
    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-500 hover:text-red-600"
  >
    Home
  </Link>

  <Link
    to="/login"
    className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
  >
    Login
  </Link>

</div>

        </div>

        <div className="flex flex-col items-center justify-between gap-14 lg:flex-row">

          {/* LEFT */}

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2 text-sm font-semibold text-red-600">

              <ShieldCheck size={18} />

              Trusted Digital Verification Platform

            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">

              Enterprise

              <span className="text-red-600">
                {" "}Organization Registration
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">

              Register your organization on Tiiron Verify and securely
              issue, manage and verify digital certificates with
              enterprise-grade security, QR authentication and centralized
              credential management.

            </p>

            {/* CTA */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-700 sm:w-auto"
              >
                Organization Login

                <ArrowRight size={20} />
              </Link>

              <div className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-medium text-slate-700 shadow-sm sm:w-auto">

                Manual Approval Required

              </div>

            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">

              <div className="rounded-2xl bg-white p-5 shadow-sm">

                <h2 className="text-3xl font-bold text-red-600">
                  100%
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Secure Verification
                </p>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">

                <h2 className="text-3xl font-bold text-red-600">
                  24–48h
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Approval Time
                </p>

              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">

                <h2 className="text-3xl font-bold text-red-600">
                  24×7
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Platform Availability
                </p>

              </div>

            </div>

          </div>
                    {/* RIGHT */}

          <div className="w-full max-w-md lg:max-w-lg">

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-600 text-white shadow-lg">

                <Building2 size={38} />

              </div>

              <h2 className="mt-8 text-2xl font-bold text-slate-900 sm:text-3xl">
                Why organizations choose Tiiron Verify
              </h2>

              <p className="mt-3 text-slate-500">
                A trusted platform built for educational institutions,
                training organizations and enterprises.
              </p>

              <div className="mt-8 space-y-4">

                {[
                  "Enterprise-grade security",
                  "Tamper-proof certificates",
                  "Real-time QR verification",
                  "Centralized student management",
                  "Advanced analytics dashboard",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">

                      <ShieldCheck
                        size={18}
                        className="text-red-600"
                      />

                    </div>

                    <span className="font-medium text-slate-700">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

              {/* Bottom Information */}

              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">

                <p className="font-semibold text-red-700">
                  Registration requests are reviewed manually before
                  organization access is granted.
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <div>

                    <p className="text-sm font-semibold text-slate-700">
                      Approval Time
                    </p>

                    <p className="text-sm text-slate-500">
                      Usually within 24–48 Hours
                    </p>

                  </div>

                  <div className="rounded-xl bg-white px-4 py-2 font-bold text-red-600 shadow-sm">
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
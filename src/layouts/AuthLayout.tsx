import type { ReactNode } from "react";

import HeroIllustration from "../features/auth/components/HeroIllustration";
import {
  ShieldCheck,
  Lock,
  Globe2,
  FileText,
  Landmark,
  Target,
} from "lucide-react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full flex items-center justify-center p-3 sm:p-4 lg:p-5">
      <div
        className="
        w-full
        max-w-[1200px]
        bg-white
        rounded-2xl
        shadow-[0_20px_60px_rgba(15,23,42,0.12)]
        border
        border-slate-200
        overflow-hidden
        "
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT PANEL */}
          <div
            className="
            relative
            px-5
            sm:px-8
            lg:px-8
            py-6
            bg-gradient-to-br
            from-white
            via-[#FFFDFD]
            to-[#FFF7F7]
            "
          >
            {/* Heading */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-[#0F172A]">
                Welcome Back!
              </h1>

              <p className="mt-2 text-sm sm:text-base leading-6 text-slate-500 max-w-sm mx-auto">
                Secure access to your dashboard to manage and verify
                credentials.
              </p>
            </div>

            {/* Illustration */}
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-[180px] sm:max-w-[200px]">
                <HeroIllustration />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 mt-5">
              <div className="text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center mx-auto">
                  {/* <span className="text-base">🛡️</span> */}
                  <ShieldCheck
                    size={18}
                    className="text-red-600"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  Trusted
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  by 10+ Organizations
                </p>
              </div>

              <div className="text-center border-x border-slate-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto">
                  {/* <span className="text-base">🔒</span> */}
                  <Lock size={18} className="text-blue-600" strokeWidth={2} />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  Secure
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">& Tamper-proof</p>
              </div>

              <div className="text-center">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 flex items-center justify-center mx-auto">
                  {/* <span className="text-base">🌐</span> */}
                  <Globe2
                    size={18}
                    className="text-purple-600"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  Instant
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">Verification</p>
              </div>
            </div>

            {/* Bottom Statistics */}
            <div
              className="
              mt-5
              bg-white
              border
              border-slate-200
              rounded-2xl
              shadow-sm
              p-4
              sm:p-5
              "
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 text-base">
                    {/* 📄 */}
                    <FileText size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-red-600">1000+</h3>
                    <p className="text-xs text-slate-500">Credentials Issued</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 text-base">
                    {/* 🏛️ */}
                    <Landmark size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-blue-600">10+</h3>
                    <p className="text-xs text-slate-500">Organizations</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 text-base">
                      <Target size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-purple-600">
                      99.9%
                    </h3>
                    <p className="text-xs text-slate-500">
                      Verification Accuracy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            className="
            bg-[#FCFCFD]
            border-l
            border-slate-200
            flex
            items-center
            justify-center
            p-5
            lg:p-6
            "
          >
            <div className="w-full max-w-[380px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

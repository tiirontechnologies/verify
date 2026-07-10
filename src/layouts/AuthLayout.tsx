import type { ReactNode } from "react";

import TiironLogo from "../assets/Tiiron_Technologies_Logo.png";

import HeroIllustration from "../features/auth/components/HeroIllustration";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 lg:p-8">

      <div
        className="
        w-full
        max-w-[1800px]
        bg-white
        rounded-[36px]
        shadow-[0_20px_60px_rgba(15,23,42,0.12)]
        border
        border-slate-200
        overflow-hidden
        "
      >

        <div className="grid lg:grid-cols-[1.25fr_0.75fr]">

          {/* LEFT PANEL */}

          <div
            className="
            relative
            px-8
            xl:px-12
            py-8
            bg-gradient-to-br
            from-white
            via-[#FFFDFD]
            to-[#FFF7F7]
            "
          >
            {/* Logo */}

<img
  src={TiironLogo}
  alt="Tiiron Technologies"
  className="h-14 w-auto"
/>

{/* Heading */}

<div className="mt-6">

  <h1 className="text-[48px] xl:text-[52px] font-bold leading-tight text-[#0F172A]">
    Welcome Back!
  </h1>

  <p className="mt-5 text-[19px] leading-8 text-slate-500 max-w-lg">
    Secure access to your dashboard to manage and verify
    credentials.
  </p>

</div>

{/* Illustration */}

<div className="mt-6 flex justify-center">

  <HeroIllustration />

</div>

{/* Features */}

<div className="grid grid-cols-3 mt-8">

  <div className="text-center">

    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">

      <span className="text-2xl">
        🛡️
      </span>

    </div>

    <h3 className="mt-5 text-xl font-semibold text-slate-900">
      Trusted
    </h3>

    <p className="mt-2 text-slate-500">
      by 10+ Organizations
    </p>

  </div>

  <div className="text-center border-x border-slate-200">

    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">

      <span className="text-2xl">
        🔒
      </span>

    </div>

    <h3 className="mt-5 text-xl font-semibold text-slate-900">
      Secure
    </h3>

    <p className="mt-2 text-slate-500">
      & Tamper-proof
    </p>

  </div>

  <div className="text-center">

    <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto">

      <span className="text-2xl">
        🌐
      </span>

    </div>

    <h3 className="mt-5 text-xl font-semibold text-slate-900">
      Instant
    </h3>

    <p className="mt-2 text-slate-500">
      Verification
    </p>

  </div>

</div>

{/* Bottom Statistics */}

<div
  className="
  mt-8
  bg-white
  border
  border-slate-200
  rounded-3xl
  shadow-sm
  p-8
  py-6
  "
>

  <div className="grid grid-cols-3 gap-6">

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 text-2xl">
        📄
      </div>

      <div>

        <h3 className="text-2xl font-bold text-red-600">
          1000+
        </h3>

        <p className="text-slate-500">
          Credentials Issued
        </p>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl">
        🏛️
      </div>

      <div>

        <h3 className="text-2xl font-bold text-blue-600">
          10+
        </h3>

        <p className="text-slate-500">
          Organizations
        </p>

      </div>

    </div>

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 text-2xl">
        🎯
      </div>

      <div>

        <h3 className="text-2xl font-bold text-purple-600">
          99.9%
        </h3>

        <p className="text-slate-500">
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
  p-6
  lg:p-8
  "
>

  <div className="w-full max-w-[520px]">
    {children}
  </div>

</div>

</div>

</div>

</div>
);
}
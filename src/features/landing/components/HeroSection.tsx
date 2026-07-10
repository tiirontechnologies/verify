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
    <section className="relative overflow-hidden bg-[#fafafa]">

      {/* Background Blur */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-red-50 blur-[140px]" />

      <div className="absolute right-0 top-20 w-[500px] h-[500px] rounded-full bg-blue-50 blur-[150px]" />

      <div className="relative max-w-[1650px] mx-auto px-6 lg:px-12 pt-20 lg:pt-24 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ================= LEFT CONTENT ================= */}

<div className="max-w-[680px]">

  {/* Badge */}

  <div
    className="
      inline-flex
      items-center
      gap-3
      bg-red-50
      border
      border-red-100
      text-red-600
      px-5
      py-2.5
      rounded-full
      text-sm
      font-semibold
      shadow-sm
    "
  >
    <ShieldCheck size={18} />
    Trusted by 10+ Organizations
  </div>

  {/* Heading */}

  <h1
    className="
      mt-8
      text-[42px]
      md:text-[58px]
      xl:text-[70px]
      font-black
      leading-[1.05]
      tracking-[-2px]
      text-slate-900
    "
  >
    Verify Credentials
    <br />

    <span className="text-red-600">
      Instantly
    </span>

    {" & "}

    <span className="text-blue-700">
      Securely
    </span>

  </h1>

  {/* Description */}

  <p
    className="
      mt-8
      text-lg
      xl:text-xl
      leading-9
      text-gray-500
      max-w-[620px]
    "
  >
    Verify internship certificates, training credentials,
    employee records and academic achievements with
    enterprise-grade security. Trusted by institutions,
    recruiters and organizations worldwide.
  </p>

  {/* Search Box */}

  <div className="mt-12">

    <div
      className="
        bg-white
        rounded-[28px]
        border
        border-gray-200
        shadow-xl
        p-3
      "
    >

      <div className="flex flex-col md:flex-row gap-3">

        {/* Input */}

        <div
          className="
            flex
            items-center
            flex-1
            bg-gray-50
            rounded-2xl
            px-6
            h-16
          "
        >

          <Search
            size={22}
            className="text-gray-400"
          />

          <input
            type="text"
            value={credentialId}
            onChange={(e) =>
              setCredentialId(e.target.value)
            }
            placeholder="Enter Verification ID"
            className="
              ml-4
              flex-1
              bg-transparent
              outline-none
              text-lg
              placeholder:text-gray-400
            "
          />

        </div>

        {/* Button */}

        <button
          onClick={handleVerify}
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-10
            rounded-2xl
            h-16
            flex
            items-center
            justify-center
            gap-3
            text-lg
            font-semibold
            transition-all
            duration-300
            shadow-lg
            hover:shadow-xl
          "
        >
          Verify

          <ChevronRight size={20} />

        </button>

      </div>

    </div>

  </div>
        {/* Trust Indicators */}

      <div className="mt-10 flex flex-wrap items-center gap-8">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

            <BadgeCheck
              size={22}
              className="text-green-600"
            />

          </div>

          <div>

            <h4 className="font-semibold text-slate-900">
              Authentic
            </h4>

            <p className="text-sm text-gray-500">
              Digitally Verified
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">

            <Lock
              size={22}
              className="text-blue-600"
            />

          </div>

          <div>

            <h4 className="font-semibold text-slate-900">
              Tamper Proof
            </h4>

            <p className="text-sm text-gray-500">
              Secure Validation
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">

            <ShieldCheck
              size={22}
              className="text-red-600"
            />

          </div>

          <div>

            <h4 className="font-semibold text-slate-900">
              Trusted
            </h4>

            <p className="text-sm text-gray-500">
              Enterprise Ready
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* ================= RIGHT SIDE ================= */}

    <div className="relative flex justify-center lg:justify-end mt-14 lg:mt-0">

      <HeroIllustration />

    </div>

  </div>

</div>

</section>

  );
}
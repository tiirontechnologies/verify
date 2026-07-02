import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [credentialId, setCredentialId] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!credentialId.trim()) return;

    const validIds = ["12345", "VT-9928-RS-2026"];

    if (validIds.includes(credentialId)) {
      navigate(`/verification/${credentialId}`);
    } else {
      navigate("/verification-failed");
    }
  };

  return (
    <section className="bg-[#fafafa] px-4 md:px-8 pt-20 md:pt-28 pb-24">

      <div className="max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full text-xs md:text-sm text-red-600">
          Trusted by 10+ Organizations
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          Trusted Credential
          <br />
          Verification Platform
        </h1>

        {/* Description */}
        <p className="mt-6 md:mt-8 text-base md:text-xl text-gray-500 max-w-3xl mx-auto leading-8">
          Verify certificates, internship records and professional
          achievements instantly with enterprise-grade security.
        </p>

{/* Search Box */}

<div className="max-w-3xl mx-auto mt-12">

  <div className="bg-white rounded-3xl shadow-xl border p-3">

    <div className="flex flex-col sm:flex-row gap-3">

      {/* Input */}

      <div className="flex items-center flex-1 px-5 h-14 rounded-2xl bg-gray-50">

        <Search
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          placeholder="Enter Verification ID"
          className="
            flex-1
            ml-3
            bg-transparent
            outline-none
            text-gray-700
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
          h-14
          px-8
          rounded-2xl
          flex
          items-center
          justify-center
          gap-2
          transition
          whitespace-nowrap
        "
      >
        Verify
        <ChevronRight size={18} />
      </button>

    </div>

  </div>

</div>

        {/* Feature Tags */}
        <div className="
          flex
          flex-col
          md:flex-row
          items-center
          justify-center
          gap-4
          md:gap-10
          mt-8
          text-gray-500
        ">

          {/* <div>✓ Blockchain Backed</div> */}

          {/* <div>✓ Instant Results</div> */}

          {/* <div>✓ Tamper Proof</div>  */}

        </div>

      </div>

    </section>
  );
}
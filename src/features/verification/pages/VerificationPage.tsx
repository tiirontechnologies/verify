import { useParams } from "react-router-dom";
import Footer from "../../../components/shared/Footer";

import CandidateCard from "../components/CandidateCard";
import StatusCard from "../components/StatusCard";
import AvailableCertificates from "../components/AvailableCertificates";
import VerificationSummary from "../components/VerificationSummary";


export default function VerificationPage() {
  const { id } = useParams();

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}

<section className="bg-gradient-to-r from-slate-900 via-[#7F1D1D] to-slate-900 border-b border-red-900/40">

  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

    <p className="uppercase tracking-[4px] text-red-300 text-sm font-medium">
      Verification Success
    </p>

    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-3 gap-6">

      <div>

        <h1 className="text-4xl lg:text-5xl font-bold text-white">
          Credential Verification
        </h1>

        <p className="mt-3 text-gray-300 text-lg max-w-2xl leading-7">
          This credential has been successfully verified against the official
          records maintained by Tiiron Technologies.
        </p>

      </div>

      <div className="inline-flex items-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3">

        <span className="text-red-300 font-semibold">
          Verification ID
        </span>

        <span className="mx-3 text-gray-400">
          |
        </span>

        <span className="text-white font-semibold tracking-wide">
          {id}
        </span>

      </div>

    </div>

  </div>

</section>

      {/* Main */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left */}

          <div className="lg:col-span-2 space-y-8">

            <CandidateCard />

            <AvailableCertificates />

            {/* Verification Notice */}

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

              <h2 className="text-2xl font-bold">

                Verification Notice

              </h2>

              <p className="mt-6 text-gray-600 leading-8">

                This credential has been successfully verified against
                Tiiron Technologies' official database.

              </p>

              <p className="mt-4 text-gray-600 leading-8">

                All certificates displayed above are digitally issued,
                authenticated and available for download.

              </p>

              <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-6">

                <h3 className="text-green-700 font-bold text-lg">

                  ✓ Credential Verified

                </h3>

                <p className="mt-2 text-green-700 leading-7">

                  The candidate's credentials are authentic and have
                  been successfully validated.

                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-8">

            <StatusCard />

            <VerificationSummary />

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}
import { useParams } from "react-router-dom";
import CandidateCard from "../components/CandidateCard";
import StatusCard from "../components/StatusCard";
// import DocumentSection from "../components/DocumentSection";
import ActivitySection from "../components/ActivitySection";
import VerificationSummary from "../components/VerificationSummary";
import Footer from "../../../components/shared/Footer";

export default function VerificationPage() {
  const { id } = useParams();

  return (
    <div className="bg-[#fafafa] min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}

        <p className="uppercase text-sm text-gray-400 tracking-widest">
          Verification Success
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          Credential Verification
        </h1>

        <p className="mt-4 text-gray-500 text-lg">
          Authenticated credential found for ID:
          <span className="text-red-600 font-semibold">
            {" "}
            {id}
          </span>
        </p>

        {/* Main Content */}

        <div className="grid lg:grid-cols-3 gap-8 mt-12">

          {/* Left */}

          <div className="lg:col-span-2 space-y-8">

            <CandidateCard />

            {/* <DocumentSection /> */}

            <ActivitySection />

            {/* Verification Notice */}

            <div className="bg-white rounded-3xl border shadow-sm p-8">

              <h2 className="text-2xl font-bold mb-6">
                Verification Notice
              </h2>

              <p className="text-gray-600 leading-8">

                This credential has been successfully verified and
                is authentic.

              </p>

              <p className="text-gray-600 leading-8 mt-4">

                The information displayed above matches the records
                maintained by Tiiron Verify.

              </p>

              <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">

                <h3 className="text-green-700 font-bold text-lg">
                  ✓ Verified Credential
                </h3>

                <p className="text-green-600 mt-2 leading-7">

                  This document has been issued by an authorized
                  institution and has passed the verification process.

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

      </div>

      <Footer />

    </div>
  );
}
export default function VerificationSummary() {
  return (
    <div className="bg-white border border-red-100 rounded-2xl p-8 mt-8">

      <h2 className="text-xl font-bold mb-8">
        Verification Summary
      </h2>

      <div className="space-y-6">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Verification ID
          </span>

          <span className="font-semibold">
            VT-9928-RS-2026
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Status
          </span>

          <span className="text-green-600 font-bold">
            VERIFIED
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Issued By
          </span>

          <span className="font-semibold">
            Tiiron Technologies
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Last Verified
          </span>

          <span className="font-semibold">
            Today
          </span>

        </div>

      </div>

    </div>
  );
}
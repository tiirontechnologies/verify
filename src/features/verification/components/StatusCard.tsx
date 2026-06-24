export default function StatusCard() {
  return (
    <div className="space-y-5">

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

        <h2 className="text-4xl font-bold text-green-700">
          VERIFIED
        </h2>

        <p className="text-green-600 mt-2">
          Authenticity Guaranteed
        </p>

      </div>

      <div className="bg-white border border-red-100 rounded-2xl p-6">

        <h3 className="font-bold text-xl">
          Tiiron Technologies
        </h3>

        <div className="flex justify-between mt-8">

          <div>
            <p className="text-gray-400 text-sm">
              Status
            </p>

            <h3 className="text-green-600 font-bold">
              Active
            </h3>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              Issue Date
            </p>

            <h3 className="font-semibold">
              01 Aug 2026
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
}
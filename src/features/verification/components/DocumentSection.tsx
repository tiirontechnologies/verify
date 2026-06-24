export default function DocumentSection() {
  return (
    <div className="bg-white border border-red-100 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-8">
        Associated Documents
      </h2>

      <div className="space-y-6">

        <div className="border rounded-xl p-6 flex items-center justify-between">

          <div>

            <h3 className="font-bold text-lg">
              Internship Completion Certificate
            </h3>

            <p className="text-gray-500 mt-1">
              Issued 01 Aug 2026
            </p>

          </div>

          <div className="flex gap-3">

            <button className="px-5 py-2 rounded-xl border">
              View
            </button>

            <button className="bg-red-600 text-white px-5 py-2 rounded-xl">
              Download
            </button>

          </div>

        </div>

        <div className="border rounded-xl p-6 flex items-center justify-between">

          <div>

            <h3 className="font-bold text-lg">
              Letter of Recommendation
            </h3>

            <p className="text-gray-500 mt-1">
              Issued 01 Aug 2026
            </p>

          </div>

          <div className="flex gap-3">

            <button className="px-5 py-2 rounded-xl border">
              View
            </button>

            <button className="bg-red-600 text-white px-5 py-2 rounded-xl">
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
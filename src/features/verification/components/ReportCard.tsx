export default function ReportCard() {
  return (
    <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 rounded-3xl p-10 shadow-xl">

      <h2 className="text-3xl font-bold">
        Generate Verification Report
      </h2>

      <p className="mt-4 text-red-100 leading-7">
        Download a signed PDF report containing
        all verified credentials and authenticity details.
      </p>

      <button className="bg-white text-red-600 px-6 py-3 rounded-2xl mt-8 font-semibold">
        Download Report
      </button>

    </div>
  );
}
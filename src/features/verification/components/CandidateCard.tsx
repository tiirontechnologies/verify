export default function CandidateCard() {
  return (
    <div className="bg-white border border-red-100 rounded-3xl p-10 flex gap-8">

      <img
        src="https://i.pravatar.cc/200"
        className="w-28 h-28 rounded-xl object-cover"
      />

      <div className="flex-1">

        <div className="grid md:grid-cols-3 gap-8 gap-10">

          <div>

            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Candidate Name
            </p>

            <h2 className="text-5xl font-bold text-slate-800 leading-tight">
              Rishabh
              <br />
              Kumar Singh
            </h2>

            <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Verified Candidate
            </div>

          </div>

          <div>

            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Program
            </p>

            <h3 className="font-bold text-2xl">
              Java Full Stack
            </h3>

            <p className="text-xl mt-1">
              Internship
            </p>

            <p className="text-gray-500 mt-5">
              Duration : 6 Months
            </p>

          </div>

          <div>

            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Batch ID
            </p>

            <h3 className="font-bold text-2xl">
              TI-JFS-2026-08
            </h3>

            <p className="text-gray-500 mt-5">
              Issued : 01 Aug 2026
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
import { UserCircle2 } from "lucide-react";

export default function CandidateCard() {
  return (
    <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm">

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Candidate Avatar */}

        <div className="flex justify-center lg:justify-start">

          <div className="w-32 h-32 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center">

            <UserCircle2
              size={72}
              className="text-red-500"
            />

          </div>

        </div>

        {/* Candidate Details */}

        <div className="flex-1">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Name */}

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Candidate Name
              </p>

              <h2 className="text-4xl font-bold leading-tight text-slate-800">
                Rishabh
                <br />
                Kumar Singh
              </h2>

              <span className="inline-flex items-center mt-5 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                Verified Candidate
              </span>

            </div>

            {/* Program */}

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Program
              </p>

              <h3 className="text-2xl font-bold">
                Java Full Stack
              </h3>

              <p className="mt-2 text-lg text-gray-700">
                Internship
              </p>

              <p className="mt-5 text-gray-500">
                Duration: <strong>6 Months</strong>
              </p>

            </div>

            {/* Batch */}

            <div>

              <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                Batch ID
              </p>

              <h3 className="text-2xl font-bold">
                TI-JFS-2026-08
              </h3>

              <p className="mt-5 text-gray-500">
                Issued: <strong>01 Aug 2026</strong>
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
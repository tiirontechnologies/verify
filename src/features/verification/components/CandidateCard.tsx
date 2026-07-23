import {
  User,
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";

import type { CertificateData } from "../../../types/certificate";

type Props = {
  certificate: CertificateData;
};

export default function CandidateCard({
  certificate,
}: Props) {
  return (
    <div className="bg-white rounded-[32px]  shadow-lg p-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">

        <div className="flex items-center gap-6">

          {/* Avatar */}

          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white shadow-lg">

            <User size={42} />

          </div>

          {/* Candidate */}

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-3xl font-bold text-slate-900">
                {certificate.studentName}
              </h2>

              <CheckCircle2
                size={26}
                className="text-green-600"
              />

            </div>

            <p className="mt-2 text-lg text-gray-500">
              Verified Candidate
            </p>

          </div>

        </div>

        {/* Status */}

        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4">

          <p className="uppercase tracking-wider text-sm text-green-600 font-semibold">
            Status
          </p>

          <h3 className="mt-1 text-xl font-bold text-green-700">
            Verified
          </h3>

        </div>

      </div>

      {/* Divider */}

      <div className="my-10 border-t border-gray-200" />

      {/* Details */}

      <div className="grid md:grid-cols-2 gap-x-14 gap-y-8">

        {/* Course */}

        <div className="flex gap-4">

          <GraduationCap
            size={22}
            className="text-red-600 mt-1"
          />

          <div>

            <p className="uppercase tracking-wider text-xs text-gray-400">
              Program
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {certificate.course}
            </h3>

          </div>

        </div>

        {/* Organization */}

        <div className="flex gap-4">

          <Building2
            size={22}
            className="text-red-600 mt-1"
          />

          <div>

            <p className="uppercase tracking-wider text-xs text-gray-400">
              Organization
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {certificate.organization}
            </h3>

          </div>

        </div>

        {/* Duration */}

        <div className="flex gap-4">

          <Calendar
            size={22}
            className="text-red-600 mt-1"
          />

          <div>

            <p className="uppercase tracking-wider text-xs text-gray-400">
              Duration
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {certificate.startDate} - {certificate.endDate}
            </h3>

          </div>

        </div>

        {/* Issue Date */}

        <div className="flex gap-4">

          <Calendar
            size={22}
            className="text-red-600 mt-1"
          />

          <div>

            <p className="uppercase tracking-wider text-xs text-gray-400">
              Issue Date
            </p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {certificate.issueDate}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}
import type { CertificateData } from "../../../types/certificate";

type Props = {
  certificate: CertificateData;
};

export default function VerificationSummary({
  certificate,
}: Props) {

  return (

    <div className="rounded-2xl bg-white p-5 shadow-lg sm:rounded-3xl sm:p-8">

      <h2 className="mb-6 text-xl font-bold sm:mb-8 sm:text-2xl">
        Verification Summary
      </h2>

      <div className="space-y-6">

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">

          <span className="text-gray-500">
            Verification ID
          </span>

          <span className="break-all font-semibold sm:text-right">
            {certificate.certificateId}
          </span>

        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">

          <span className="text-gray-500">
            Candidate
          </span>

          <span className="break-words font-semibold sm:text-right">
            {certificate.studentName}
          </span>

        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">

          <span className="text-gray-500">
            Course
          </span>

          <span className="break-words font-semibold sm:text-right">
            {certificate.course}
          </span>

        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">

          <span className="text-gray-500">
            Organization
          </span>

          <span className="break-words font-semibold sm:text-right">
            {certificate.organization}
          </span>

        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">

          <span className="text-gray-500">
            Status
          </span>

          <span className="text-green-600 font-bold">
            VERIFIED
          </span>

        </div>

        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">

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
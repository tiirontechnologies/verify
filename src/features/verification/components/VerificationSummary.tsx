import type { CertificateData } from "../../../types/certificate";

type Props = {
  certificate: CertificateData;
};

export default function VerificationSummary({
  certificate,
}: Props) {

  return (

    <div className="bg-white rounded-3xl  shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-8">
        Verification Summary
      </h2>

      <div className="space-y-6">

        <div className="flex justify-between">

          <span className="text-gray-500">
            Verification ID
          </span>

          <span className="font-semibold">
            {certificate.certificateId}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Candidate
          </span>

          <span className="font-semibold">
            {certificate.studentName}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Course
          </span>

          <span className="font-semibold text-right">
            {certificate.course}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Organization
          </span>

          <span className="font-semibold text-right">
            {certificate.organization}
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
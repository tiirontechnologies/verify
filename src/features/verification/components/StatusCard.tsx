import type { CertificateData } from "../../../types/certificate";

type Props = {
  certificate: CertificateData;
};

export default function StatusCard({
  certificate,
}: Props) {
  const verified = certificate.status === "active";

  return (
    <div className="space-y-6">

      {/* Main Status */}

      <div
        className={`rounded-3xl p-8 border shadow-lg ${
          verified
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <h2
          className={`text-5xl font-black tracking-wider ${
            verified ? "text-green-700" : "text-red-700"
          }`}
        >
          {verified ? "VERIFIED" : "REVOKED"}
        </h2>

        <p
          className={`mt-3 text-lg ${
            verified ? "text-green-600" : "text-red-600"
          }`}
        >
          {verified
            ? "Certificate authenticity successfully verified."
            : "This certificate has been revoked."}
        </p>
      </div>

      {/* Details */}

      <div className="bg-white rounded-3xl border shadow-lg p-8">

        <h3 className="text-2xl font-bold">
          {certificate.organization}
        </h3>

        <div className="mt-8 space-y-6">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Status
            </span>

            <span
              className={`font-bold ${
                verified
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {certificate.status}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Issue Date
            </span>

            <span className="font-semibold">
              {certificate.issueDate}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Certificate ID
            </span>

            <span className="font-semibold">
              {certificate.certificateId}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
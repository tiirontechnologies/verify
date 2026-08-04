import DashboardLayout from "../../../layouts/DashboardLayout";
import { Award, GraduationCap, CheckCircle2, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyCertificate } from "../../../api/certificate.api";

export default function GenerateCertificatePage() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await getMyCertificate();
        const list = Array.isArray(response.data) ? response.data : [response.data];
        setCertificates(list.filter(Boolean));
      } catch (err) {
        console.error("Failed to load certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const internshipCert = certificates.find(
    (c) => (c.certificateType || "").toLowerCase() === "internship"
  );
  const trainingCert = certificates.find(
    (c) => (c.certificateType || "").toLowerCase() === "training"
  );

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            My Certificates
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            View and download your official certificates issued by your organization.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Internship */}
          <div
            className={`rounded-3xl border p-8 transition relative flex flex-col justify-between ${
              internshipCert
                ? "bg-white border-red-200 hover:border-red-500 hover:shadow-xl"
                : "bg-gray-50/70 border-gray-200 opacity-80"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <Award className={internshipCert ? "text-red-600" : "text-gray-400"} size={52} />
                {internshipCert ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                    <CheckCircle2 size={14} /> Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 border border-gray-200">
                    <Lock size={14} /> Not Issued
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold mt-6 text-gray-900">
                Internship Certificate
              </h2>

              <p className="text-gray-500 mt-3 text-sm leading-6">
                {internshipCert
                  ? `Issued for ${internshipCert.course || "Internship"} • ID: ${internshipCert.certificateId}`
                  : "No internship certificate has been issued for your account yet."}
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/student/certificates/internship")}
                disabled={!internshipCert && !loading}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition ${
                  internshipCert
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {internshipCert ? "View Internship Certificate" : "Not Available"}
              </button>
            </div>
          </div>

          {/* Training */}
          <div
            className={`rounded-3xl border p-8 transition relative flex flex-col justify-between ${
              trainingCert
                ? "bg-white border-blue-200 hover:border-blue-500 hover:shadow-xl"
                : "bg-gray-50/70 border-gray-200 opacity-80"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <GraduationCap className={trainingCert ? "text-blue-600" : "text-gray-400"} size={52} />
                {trainingCert ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                    <CheckCircle2 size={14} /> Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 border border-gray-200">
                    <Lock size={14} /> Not Issued
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold mt-6 text-gray-900">
                Training Certificate
              </h2>

              <p className="text-gray-500 mt-3 text-sm leading-6">
                {trainingCert
                  ? `Issued for ${trainingCert.course || "Training"} • ID: ${trainingCert.certificateId}`
                  : "No training certificate has been issued for your account yet."}
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/student/certificates/training")}
                disabled={!trainingCert && !loading}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition ${
                  trainingCert
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {trainingCert ? "View Training Certificate" : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
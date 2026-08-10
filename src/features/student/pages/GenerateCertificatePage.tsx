import DashboardLayout from "../../../layouts/DashboardLayout";
import { Award, GraduationCap, CheckCircle2, Lock, FileText, AwardIcon, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyCertificate } from "../../../api/certificate.api";

interface CertCardProps {
  typeKey: string;
  title: string;
  description: string;
  icon: any;
  cert?: any;
  loading: boolean;
  themeColor: "red" | "blue" | "emerald" | "amber" | "purple" | "indigo";
  onView: () => void;
}

const colorMap = {
  red: {
    border: "border-red-200 hover:border-red-500",
    icon: "text-red-600",
    btn: "bg-red-600 hover:bg-red-700 shadow-red-200",
  },
  blue: {
    border: "border-blue-200 hover:border-blue-500",
    icon: "text-blue-600",
    btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
  },
  emerald: {
    border: "border-emerald-200 hover:border-emerald-500",
    icon: "text-emerald-600",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
  },
  amber: {
    border: "border-amber-200 hover:border-amber-500",
    icon: "text-amber-600",
    btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
  },
  purple: {
    border: "border-purple-200 hover:border-purple-500",
    icon: "text-purple-600",
    btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-200",
  },
  indigo: {
    border: "border-indigo-200 hover:border-indigo-500",
    icon: "text-indigo-600",
    btn: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200",
  },
};

function DocumentCard({
  title,
  description,
  icon: Icon,
  cert,
  loading,
  themeColor,
  onView,
}: CertCardProps) {
  const theme = colorMap[themeColor] || colorMap.red;

  return (
    <div
      className={`rounded-3xl border p-8 transition relative flex flex-col justify-between ${
        cert
          ? `bg-white ${theme.border} hover:shadow-xl`
          : "bg-gray-50/70 border-gray-200 opacity-80"
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <Icon className={cert ? theme.icon : "text-gray-400"} size={48} />
          {cert ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
              <CheckCircle2 size={14} /> Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 border border-gray-200">
              <Lock size={14} /> Not Issued
            </span>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-6 text-gray-900">{title}</h2>

        <p className="text-gray-500 mt-3 text-sm leading-6">
          {cert
            ? `Issued for ${cert.course || cert.role || "Program"} • ID: ${cert.certificateId}`
            : description}
        </p>
      </div>

      <div className="mt-8">
        <button
          onClick={onView}
          disabled={!cert && !loading}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition ${
            cert
              ? `${theme.btn} text-white shadow-md`
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {cert ? `View ${title}` : "Not Available"}
        </button>
      </div>
    </div>
  );
}

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

  const offerLetterCert = certificates.find(
    (c) => (c.certificateType || "").toLowerCase() === "offer-letter"
  );
  const internshipCert = certificates.find(
    (c) => (c.certificateType || "").toLowerCase() === "internship"
  );
  const trainingCert = certificates.find(
    (c) => (c.certificateType || "").toLowerCase() === "training"
  );
  const appreciationCert = certificates.find(
    (c) => (c.certificateType || "").toLowerCase() === "appreciation-letter"
  );

  // Other dynamic custom documents
  const standardTypes = ["offer-letter", "internship", "training", "appreciation-letter"];
  const otherCerts = certificates.filter(
    (c) => !standardTypes.includes((c.certificateType || "").toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            My Documents & Credentials
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Access and view all official offer letters, certificates, and documents issued to your account.
          </p>
        </div>

        {/* Standard Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Offer Letter */}
          <DocumentCard
            typeKey="offer-letter"
            title="Offer Letter"
            description="No offer letter has been assigned to your account yet."
            icon={FileText}
            cert={offerLetterCert}
            loading={loading}
            themeColor="emerald"
            onView={() => navigate(offerLetterCert ? `/student/certificates/doc/${offerLetterCert._id || offerLetterCert.certificateId}` : "/student/certificates/offer-letter")}
          />

          {/* Internship Certificate */}
          <DocumentCard
            typeKey="internship"
            title="Internship Certificate"
            description="No internship certificate has been issued for your account yet."
            icon={Award}
            cert={internshipCert}
            loading={loading}
            themeColor="red"
            onView={() => navigate("/student/certificates/internship")}
          />

          {/* Training Certificate */}
          <DocumentCard
            typeKey="training"
            title="Training Certificate"
            description="No training certificate has been issued for your account yet."
            icon={GraduationCap}
            cert={trainingCert}
            loading={loading}
            themeColor="blue"
            onView={() => navigate("/student/certificates/training")}
          />

          {/* Appreciation Letter */}
          {(appreciationCert || certificates.length === 0) && (
            <DocumentCard
              typeKey="appreciation-letter"
              title="Appreciation Letter"
              description="No letter of appreciation has been assigned yet."
              icon={AwardIcon}
              cert={appreciationCert}
              loading={loading}
              themeColor="amber"
              onView={() => navigate(`/student/certificates/doc/${appreciationCert._id || appreciationCert.certificateId}`)}
            />
          )}

          {/* Dynamic Custom Documents */}
          {otherCerts.map((cert) => {
            const formattedType = (cert.certificateType || "Custom Document")
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase());

            return (
              <DocumentCard
                key={cert._id || cert.certificateId}
                typeKey={cert.certificateType}
                title={formattedType}
                description={`Official document issued for ${cert.course}`}
                icon={FileCheck}
                cert={cert}
                loading={loading}
                themeColor="purple"
                onView={() => navigate(`/student/certificates/doc/${cert._id || cert.certificateId}`)}
              />
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
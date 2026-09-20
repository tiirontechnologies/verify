import DashboardLayout from "../../../layouts/DashboardLayout";
import { FileCheck, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyCertificate } from "../../../api/certificate.api";

interface Certificate {
  _id?: string;
  certificateId: string;
  certificateType?: string;
  course?: string;
  role?: string;
  [key: string]: any;
}

function formatType(type?: string) {
  return (type || "Document")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());
}

function DocumentCard({ cert, onView }: { cert: Certificate; onView: () => void }) {
  const title = formatType(cert.certificateType);

  return (
    <div className="group relative rounded-3xl border border-red-200 bg-white p-8 transition hover:border-red-500 hover:shadow-xl flex flex-col justify-between overflow-hidden">
      {/* folded corner */}
      <div
        className="absolute top-0 right-0 w-10 h-10 bg-red-50 border-b border-l border-red-200 transition group-hover:bg-red-100"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />

      <div>
        <div className="flex items-center justify-between">
          <FileCheck className="text-red-600" size={44} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <CheckCircle2 size={14} /> Available
          </span>
        </div>

        <h2 className="text-2xl font-bold mt-6 text-gray-900">{title}</h2>

        <p className="text-gray-500 mt-3 text-sm leading-6">
          Issued for {cert.course || cert.role || "Program"} • ID: {cert.certificateId}
        </p>
      </div>

      <div className="mt-8">
        <button
          onClick={onView}
          className="w-full py-3 px-6 rounded-xl font-semibold transition bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
        >
          View {title}
        </button>
      </div>
    </div>
  );
}

export default function GenerateCertificatePage() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
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

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            My Documents & Credentials
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Access and view all official certificates and documents issued to your account.
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading your documents...</p>
        ) : certificates.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
            No documents have been issued to your account yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <DocumentCard
                key={cert._id || cert.certificateId}
                cert={cert}
                onView={() =>
                  navigate(`/student/certificates/doc/${cert._id || cert.certificateId}`)
                }
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
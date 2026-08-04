import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import RecentActivity from "../components/RecentActivity";
import { useEffect, useState } from "react";
import { getMyCertificate } from "../../../api/certificate.api";
import { useNavigate } from "react-router-dom";
import { Award, GraduationCap, ArrowRight } from "lucide-react";

export default function StudentDashboard() {
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
        console.error("Failed to load student dashboard certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage and view your issued credentials.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Credentials"
            value={loading ? "..." : String(certificates.length)}
          />
          <StatsCard
            title="Verified Credentials"
            value={loading ? "..." : String(certificates.filter((c) => c.status === "active").length)}
          />
          <StatsCard
            title="Organization"
            value={certificates[0]?.organization || "Tiiron Technologies"}
          />
        </div>

        {/* Credentials list */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            My Credentials
          </h2>

          {loading ? (
            <div className="flex items-center justify-center p-8 bg-white rounded-2xl border">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
              <Award className="mx-auto text-gray-300 mb-3" size={48} />
              <h3 className="text-base font-bold text-gray-800">No Credentials Issued Yet</h3>
              <p className="text-xs text-gray-500 mt-1">Your organization has not assigned any certificates to your account.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {certificates.map((cert) => {
                const isInternship = (cert.certificateType || "").toLowerCase() === "internship";
                return (
                  <div
                    key={cert._id || cert.certificateId}
                    className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl ${isInternship ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                          {isInternship ? <Award size={26} /> : <GraduationCap size={26} />}
                        </div>
                        <span className="text-xs font-mono font-semibold bg-gray-100 px-2.5 py-1 rounded-md text-gray-700">
                          {cert.certificateId}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mt-4 capitalize">
                        {cert.certificateType || "Completion"} Certificate
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Course: <span className="font-medium text-gray-800">{cert.course}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Issued by: <span className="font-medium text-gray-800">{cert.organization}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => navigate(isInternship ? "/student/certificates/internship" : "/student/certificates/training")}
                      className={`mt-6 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white transition ${
                        isInternship ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      View Certificate <ArrowRight size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Activity */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}
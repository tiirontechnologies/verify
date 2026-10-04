import {
  CheckCircle2,
  UploadCloud,
  FileBadge2,
  Clock3,
  Ban,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecentActivityProps {
  certificates?: any[];
}

export default function RecentActivity({
  certificates = [],
}: RecentActivityProps) {
  const navigate = useNavigate();

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  // Build activity feed from certificates
  const activityList = certificates.slice(0, 5).map((cert) => {
    const certType = (cert.certificateType || "Certificate").toUpperCase();
    const isRevoked = cert.status === "revoked";

    return {
      title: `Certificate Issued (${certType})`,
      description: `Issued for ${cert.studentName || "Student"} (${cert.email || "No Email"}) • ID: ${cert.certificateId}`,
      time: formatDate(cert.createdAt),
      icon: isRevoked ? Ban : cert.status === "active" ? CheckCircle2 : FileBadge2,
      color: isRevoked
        ? "bg-red-100 text-red-600"
        : "bg-green-100 text-green-600",
    };
  });

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">
              Timeline
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>
          </div>

          <Clock3 className="text-gray-400" />
        </div>
      </div>

      <div className="p-6">
        {activityList.length === 0 ? (
          <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <UploadCloud size={36} className="text-slate-300" />
            <p className="text-sm font-medium text-slate-500">No recent certificate activity recorded yet.</p>
            <button
              onClick={() => navigate("/organization/upload-students")}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition"
            >
              Upload Student Data
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activityList.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div key={index} className="flex gap-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${activity.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {activity.title}
                      </h3>

                      <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> {activity.time}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => navigate("/organization/update-student")}
          className="mt-8 w-full rounded-2xl border border-gray-200 py-3 font-medium text-slate-700 transition hover:border-red-500 hover:bg-red-50 hover:text-red-700"
        >
          View Complete Student Records
        </button>
      </div>
    </section>
  );
}
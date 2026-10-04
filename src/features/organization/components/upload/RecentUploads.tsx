import { useEffect, useState } from "react";
import { Clock3, FileSpreadsheet, User, CheckCircle2 } from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";

interface RecentUploadsProps {
  refreshTrigger?: number;
}

export default function RecentUploads({ refreshTrigger }: RecentUploadsProps) {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    organizationApi
      .getRecentCertificates()
      .then((res) => {
        if (isMounted) {
          setCertificates(res.data?.certificates || []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch recent certificates:", err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]);

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Imported Student Certificates ({certificates.length})
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Live student records connected to your certificate templates.
          </p>
        </div>
        <Clock3 className="text-gray-400" size={24} />
      </div>

      {loading ? (
        <div className="p-8 text-center text-sm font-medium text-gray-500">
          Loading uploaded student certificates...
        </div>
      ) : certificates.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <FileSpreadsheet size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700">No student records imported yet.</p>
          <p className="text-xs text-gray-400 mt-1">Upload an Excel file above to see imported students here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-500 uppercase font-semibold">
              <tr>
                <th className="px-6 py-3.5">Student Name & Email</th>
                <th className="px-6 py-3.5">Course / Program</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Certificate ID</th>
                <th className="px-6 py-3.5">Issue Date</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {certificates.map((cert) => (
                <tr key={cert._id} className="hover:bg-gray-50/80 transition">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 font-bold">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{cert.studentName}</p>
                      <p className="text-gray-400">{cert.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{cert.course}</td>
                  <td className="px-6 py-4 text-gray-600">{cert.role}</td>
                  <td className="px-6 py-4 font-mono font-semibold text-red-600 bg-red-50/50 px-2.5 py-1 rounded-md inline-block my-3">
                    {cert.certificateId}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(cert.issueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
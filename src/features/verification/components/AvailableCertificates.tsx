import { FileBadge, Award, CalendarDays, User } from "lucide-react";

// API se aane wala raw certificate (jo bhi fields aaye, sab optional)
type ApiCertificate = {
  _id?: string;
  certificateId?: string;
  certificateType?: string;
  type?: string;
  organization?: string;
  course?: string;
  role?: string;
  issueDate?: string;
  studentName?: string;
  status?: string;
};

type Props = {
  // array, single object, ya poora API response ({ success, data }) - sab chalega
  certificates?: ApiCertificate[] | ApiCertificate | { data?: ApiCertificate | ApiCertificate[] } | null;
  isLoading?: boolean;
};

// Kisi bhi shape ko array me convert karo
const normalize = (input: Props["certificates"]): ApiCertificate[] => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  const obj = input as any;
  if (obj.data !== undefined) return normalize(obj.data);
  if (obj.certificateId || obj.certificateType || obj.type) return [obj];
  return [];
};

const formatCertificateTitle = (type?: string): string => {
  return (type || "")
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
};

// Type ke hisaab se color. Unknown type ka color type string se hi stable pick hoga
const PALETTE = [
  { icon: "text-red-600", bg: "bg-red-50" },
  { icon: "text-blue-600", bg: "bg-blue-50" },
  { icon: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: "text-purple-600", bg: "bg-purple-50" },
  { icon: "text-amber-600", bg: "bg-amber-50" },
  { icon: "text-pink-600", bg: "bg-pink-50" },
  { icon: "text-cyan-600", bg: "bg-cyan-50" },
];

const getColor = (type?: string) => {
  const t = (type || "").toLowerCase();
  let hash = 0;
  for (let i = 0; i < t.length; i++) hash = (hash * 31 + t.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
};

const formatDate = (iso?: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AvailableCertificates({ certificates, isLoading }: Props) {
  const list = normalize(certificates);

  return (
    <div className="bg-white shadow-lg rounded-3xl p-8 mt-8">
      <h2 className="text-2xl font-bold mb-8">Achieved Certificates</h2>

      {isLoading ? (
        <div className="space-y-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Award className="text-gray-400" size={32} />
          </div>
          <h3 className="font-semibold text-gray-700">No certificates yet</h3>
          <p className="text-sm text-gray-400 mt-1 max-w-xs">
            Certificates not available right now. Jaise hi koi certificate issue
            hoga, yahan dikhega.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {list.map((cert, index) => {
            const type = cert.certificateType || cert.type;
            const color = getColor(type);
            const issued = formatDate(cert.issueDate);

            return (
              <div
                key={cert.certificateId || cert._id || index}
                className="flex justify-between items-center gap-4 shadow-lg rounded-2xl px-6 py-5 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${color.bg}`}
                  >
                    <FileBadge className={color.icon} size={26} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      {formatCertificateTitle(type)}
                    </h3>

                    {cert.organization && <p className="text-sm text-gray-500 truncate">Issued by {cert.organization}</p>}

                    {(cert.course || cert.role || issued) && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-400">
                        {cert.course && (
                          <span className="truncate">{cert.course}</span>
                        )}
                        {cert.role && (
                          <span className="flex items-center gap-1">
                            <User size={12} /> {cert.role}
                          </span>
                        )}
                        {issued && (
                          <span className="flex items-center gap-1">
                            <CalendarDays size={12} /> {issued}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {cert.certificateId && (
                  <span className="hidden sm:inline-block shrink-0 px-3 py-1 rounded-full bg-gray-100 text-xs font-mono text-gray-500">
                    {cert.certificateId}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

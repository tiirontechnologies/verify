import DashboardLayout from "../../../layouts/DashboardLayout";
import { FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getMyCertificate } from "../../../api/certificate.api";

interface Certificate {
  _id?: string;
  certificateId: string;
  certificateType?: string;
  course?: string;
  role?: string;
  [key: string]: any;
}

/* ---------- Helpers ---------- */

function formatType(type?: string) {
  return (type || "Document")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());
}

/* ---------- Dynamic color per type ----------
   Type kuch bhi ho sakta hai, isliye type string ko hash karke
   palette me se ek color chunte hain. Same type = hamesha same color.
   Tailwind ke liye saare class names poore likhe hain (dynamic string nahi). */

const PALETTE = [
  { badge: "bg-blue-50 text-blue-700", dot: "bg-blue-500", bar: "bg-blue-500", icon: "text-blue-600" },
  { badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", bar: "bg-emerald-500", icon: "text-emerald-600" },
  { badge: "bg-amber-50 text-amber-700", dot: "bg-amber-500", bar: "bg-amber-500", icon: "text-amber-600" },
  { badge: "bg-violet-50 text-violet-700", dot: "bg-violet-500", bar: "bg-violet-500", icon: "text-violet-600" },
  { badge: "bg-teal-50 text-teal-700", dot: "bg-teal-500", bar: "bg-teal-500", icon: "text-teal-600" },
  { badge: "bg-pink-50 text-pink-700", dot: "bg-pink-500", bar: "bg-pink-500", icon: "text-pink-600" },
  { badge: "bg-indigo-50 text-indigo-700", dot: "bg-indigo-500", bar: "bg-indigo-500", icon: "text-indigo-600" },
  { badge: "bg-cyan-50 text-cyan-700", dot: "bg-cyan-500", bar: "bg-cyan-500", icon: "text-cyan-600" },
  { badge: "bg-lime-50 text-lime-700", dot: "bg-lime-500", bar: "bg-lime-500", icon: "text-lime-600" },
  { badge: "bg-orange-50 text-orange-700", dot: "bg-orange-500", bar: "bg-orange-500", icon: "text-orange-600" },
];

function getTypeStyle(type?: string) {
  const key = (type || "document").toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

/* ---------- Outline red button ---------- */

const outlineBtn =
  "w-full rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300";

/* ---------- Card ---------- */

function DocumentCard({ cert, onView }: { cert: Certificate; onView: () => void }) {
  const title = formatType(cert.certificateType);
  const style = getTypeStyle(cert.certificateType);

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className={`h-1 w-full ${style.bar}`} />

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <FileCheck className={style.icon} size={28} />
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
            {title}
          </span>
        </div>

        <div>
          <h2 className="line-clamp-2 text-base font-semibold text-gray-900">
            {cert.course || cert.role || "Program"}
          </h2>
          <p className="mt-1 break-all text-xs text-gray-400">
            ID: {cert.certificateId}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4">
        <button onClick={onView} className={outlineBtn}>
          View {title}
        </button>
      </div>
    </div>
  );
}

/* ---------- Skeleton ---------- */

function DocumentCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="h-1 w-full bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="h-7 w-7 rounded bg-gray-200" />
          <div className="h-5 w-24 rounded-full bg-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
      </div>

      <div className="border-t border-gray-100 p-4">
        <div className="h-9 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

/* ---------- Filter chip ---------- */

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- Page ---------- */

export default function GenerateCertificatePage() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await getMyCertificate();
        const list = Array.isArray(response.data) ? response.data : [response.data];
        setCertificates(list.filter(Boolean));
      } catch (err) {
        console.error("Failed to load certificates:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  // types jo user ke paas actually hain (hardcoded nahi)
  const types = useMemo(
    () =>
      Array.from(
        new Set(certificates.map((c) => c.certificateType || "document"))
      ),
    [certificates]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates
      .filter(
        (c) => filter === "all" || (c.certificateType || "document") === filter
      )
      .filter(
        (c) =>
          !q ||
          formatType(c.certificateType).toLowerCase().includes(q) ||
          (c.course || "").toLowerCase().includes(q) ||
          (c.role || "").toLowerCase().includes(q) ||
          (c.certificateId || "").toLowerCase().includes(q)
      );
  }, [certificates, filter, query]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              My Documents & Credentials
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Access and view all official certificates and documents issued to
              your account.
            </p>
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents"
            disabled={loading}
            className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 disabled:opacity-60 sm:w-64"
          />
        </div>

        {/* Type filters */}
        {(loading || types.length > 1) && (
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <>
                <div className="h-8 w-16 animate-pulse rounded-full bg-gray-200" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
                <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200" />
              </>
            ) : (
              <>
                <FilterChip
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  All ({certificates.length})
                </FilterChip>
                {types.map((t) => (
                  <FilterChip
                    key={t}
                    active={filter === t}
                    onClick={() => setFilter(t)}
                  >
                    <span
                      className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${getTypeStyle(t).dot}`}
                    />
                    {formatType(t)}
                  </FilterChip>
                ))}
              </>
            )}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <DocumentCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-dashed border-red-200 p-12 text-center text-sm text-gray-500">
            Could not load your documents. Please refresh and try again.
          </div>
        ) : certificates.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
            No documents have been issued to your account yet.
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-sm text-gray-500">
            No documents match your search.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((cert) => (
              <DocumentCard
                key={cert._id || cert.certificateId}
                cert={cert}
                onView={() =>
                  navigate(
                    `/student/certificates/doc/${cert._id || cert.certificateId}`
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
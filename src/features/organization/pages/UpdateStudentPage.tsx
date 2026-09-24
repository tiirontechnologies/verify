import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import UpdateStudentHero from "../components/updateStudent/UpdateStudentHero";
import StudentSearchFilters from "../components/updateStudent/StudentSearchFilters";
import StudentTable, { type GroupedStudent } from "../components/updateStudent/StudentTable";
import BulkActions from "../components/updateStudent/BulkActions";
import EditStudentModal from "../components/updateStudent/EditStudentModal";
import ViewStudentModal from "../components/updateStudent/ViewStudentModal";
import { organizationApi } from "../../../api/organization.api";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

// Sirf comparison ke liye: "Offer Letter" / "offer_letter" -> "offer-letter"
const normalizeType = (t?: string) =>
  (t || "").toLowerCase().trim().replace(/[\s_]+/g, "-");

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function UpdateStudentPage() {
  const [rawCertificates, setRawCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Modals state
  const [editingStudent, setEditingStudent] = useState<GroupedStudent | null>(null);
  const [viewingStudent, setViewingStudent] = useState<GroupedStudent | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<GroupedStudent | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Students / certificates fetch
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await organizationApi.getRecentCertificates();
        const list = res.data?.certificates || [];
        setRawCertificates(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Failed to fetch students for management:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [refreshKey]);

  // Group raw certificates by student email / identity
  const groupedStudents: GroupedStudent[] = useMemo(() => {
    const map = new Map<string, GroupedStudent>();

    for (const cert of rawCertificates) {
      const key = (cert.email || cert.studentName || cert._id).toLowerCase().trim();
      const cType = normalizeType(cert.certificateType || "internship");
      const certId = cert._id || cert.id;

      if (!map.has(key)) {
        // certificateId ke end se is cert ka apna type suffix hatao
        const baseCertId = cType
          ? (cert.certificateId || "").replace(new RegExp(`-${escapeRegex(cType)}$`, "i"), "")
          : cert.certificateId || "";

        map.set(key, {
          id: key,
          studentName: cert.studentName || "Student",
          email: cert.email || "",
          course: cert.course || "",
          role: cert.role || "",
          status: cert.status || "active",
          baseCertificateId: baseCertId || cert.certificateId || "",
          documents: [cert],
          allDocumentIds: [certId],
          certificateTypes: [cType],
          primaryRecord: cert,
        });
      } else {
        const existing = map.get(key)!;
        existing.documents.push(cert);
        if (!existing.allDocumentIds.includes(certId)) {
          existing.allDocumentIds.push(certId);
        }
        if (!existing.certificateTypes.includes(cType)) {
          existing.certificateTypes.push(cType);
        }
        if (cert.status === "active") {
          existing.status = "active";
        }
      }
    }

    return Array.from(map.values());
  }, [rawCertificates]);

  // Filter grouped students based on search and dropdowns
  const filteredStudents = groupedStudents.filter((student) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (student.studentName || "").toLowerCase().includes(q) ||
      (student.email || "").toLowerCase().includes(q) ||
      (student.baseCertificateId || "").toLowerCase().includes(q) ||
      (student.course || "").toLowerCase().includes(q) ||
      (student.role || "").toLowerCase().includes(q) ||
      student.documents.some((d) => (d.certificateId || "").toLowerCase().includes(q));

    const matchesType =
      typeFilter === "all" ||
      student.certificateTypes.includes(normalizeType(typeFilter));

    const matchesStatus =
      statusFilter === "all" ||
      (student.status || "active").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSelectRow = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedKeys(filteredStudents.map((s) => s.id));
    } else {
      setSelectedKeys([]);
    }
  };

  const handleDeleteSingle = async () => {
    if (!deletingStudent) return;
    try {
      setDeleting(true);
      await organizationApi.bulkDeleteStudents(deletingStudent.allDocumentIds);
      setSelectedKeys((prev) => prev.filter((k) => k !== deletingStudent.id));
      setDeletingStudent(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to delete student records:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  // Collect all certificate _ids of selected grouped students for bulk actions
  const selectedStudentDocumentIds = filteredStudents
    .filter((s) => selectedKeys.includes(s.id))
    .flatMap((s) => s.allDocumentIds);

  const selectedRawCertificates = filteredStudents
    .filter((s) => selectedKeys.includes(s.id))
    .flatMap((s) => s.documents);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Page Hero Header */}
        <UpdateStudentHero />

        {/* Search & Filter Controls */}
        <StudentSearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onReset={handleResetFilters}
        />

        {/* Interactive Student Table */}
        <StudentTable
          students={filteredStudents}
          loading={loading}
          selectedIds={selectedKeys}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          onEdit={(s) => setEditingStudent(s)}
          onView={(s) => setViewingStudent(s)}
          onDelete={(s) => setDeletingStudent(s)}
        />

        {/* Bulk Action Controls */}
        <BulkActions
          selectedIds={selectedStudentDocumentIds}
          selectedStudents={selectedRawCertificates}
          onSuccess={() => {
            setSelectedKeys([]);
            setRefreshKey((prev) => prev + 1);
          }}
        />

        {/* Edit Modal */}
        {editingStudent && (
          <EditStudentModal
            student={editingStudent.primaryRecord}
            allStudentTypes={editingStudent.certificateTypes}
              onClose={() => setEditingStudent(null)}
            onSuccess={() => setRefreshKey((prev) => prev + 1)}
          />
        )}

        {/* View Modal */}
        {viewingStudent && (
          <ViewStudentModal
            student={viewingStudent}
              onClose={() => setViewingStudent(null)}
            onSuccess={() => setRefreshKey((prev) => prev + 1)}
          />
        )}

        {/* Delete Single Confirmation Modal */}
        {deletingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in duration-200">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Delete Student & All Documents</h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete <strong className="text-slate-800">{deletingStudent.studentName}</strong> ({deletingStudent.documents.length} document{deletingStudent.documents.length > 1 ? "s" : ""})? This action cannot be undone.
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => setDeletingStudent(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSingle}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold shadow-md shadow-red-200 hover:bg-red-700 transition disabled:opacity-60"
                >
                  {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
import { Pencil, Trash2, Eye, ShieldCheck, FileText, Award, GraduationCap, AwardIcon, FileCheck } from "lucide-react";

export interface StudentDocumentItem {
  _id: string;
  id?: string;
  certificateId: string;
  certificateType: string;
  course: string;
  role?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  mentor?: string;
  director?: string;
  raw: any;
}

export interface GroupedStudent {
  id: string;
  studentName: string;
  email: string;
  course: string;
  role?: string;
  status: string;
  baseCertificateId: string;
  documents: StudentDocumentItem[];
  allDocumentIds: string[];
  certificateTypes: string[];
  primaryRecord: any;
}

interface StudentTableProps {
  students: GroupedStudent[];
  loading: boolean;
  selectedIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (student: GroupedStudent) => void;
  onView: (student: GroupedStudent) => void;
  onDelete: (student: GroupedStudent) => void;
}

export default function StudentTable({
  students,
  loading,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onEdit,
  onView,
  onDelete,
}: StudentTableProps) {
  const allSelected = students.length > 0 && selectedIds.length === students.length;

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-gray-100 p-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Student Records ({students.length})
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Search, update credentials, change document types, or revoke/delete entries.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-4 py-1 text-xs font-semibold text-red-700">
            {selectedIds.length} Student{selectedIds.length > 1 ? "s" : ""} Selected
          </span>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-100">
            <tr>
              <th className="px-5 py-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer h-4 w-4"
                />
              </th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Document Type</th>
              <th className="px-6 py-4">Course / Program</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-8 w-8 rounded-full border-2 border-red-100 border-t-red-600 animate-spin"></div>
                    <p className="mt-3 text-xs font-medium text-slate-500">Fetching student records...</p>
                  </div>
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-500 text-sm">
                  No matching student records found.
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const id = student.id;
                const isSelected = selectedIds.includes(id);

                return (
                  <tr
                    key={id}
                    className={`transition ${
                      isSelected ? "bg-red-50/40" : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-5 py-5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow(id)}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer h-4 w-4"
                      />
                    </td>

                    {/* Student Name & Email */}
                    <td className="px-6 py-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-base">
                            {student.studentName}
                          </span>
                          {student.documents && student.documents.length > 1 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                              {student.documents.length} Docs
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          {student.email}
                          {student.baseCertificateId ? ` • ID: ${student.baseCertificateId}` : ""}
                        </div>
                      </div>
                    </td>

                    {/* Document Type Badges */}
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {student.documents.map((doc, idx) => {
                          const type = doc.certificateType || "document";
                          const cType = type.toLowerCase();
                          const isRevoked = doc.status === "revoked";

                          let Icon = FileCheck;
                          let badgeClass = isRevoked
                            ? "bg-slate-100 text-slate-500 border-slate-200 line-through"
                            : "bg-purple-50 text-purple-700 border-purple-200";
                          let typeLabel = type
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l: string) => l.toUpperCase());

                          if (cType === "internship") {
                            Icon = Award;
                            badgeClass = isRevoked
                              ? "bg-red-50/60 text-red-600 border-red-200 line-through"
                              : "bg-red-50 text-red-700 border-red-200";
                            typeLabel = "Internship";
                          } else if (cType === "training") {
                            Icon = GraduationCap;
                            badgeClass = isRevoked
                              ? "bg-red-50/60 text-red-600 border-red-200 line-through"
                              : "bg-blue-50 text-blue-700 border-blue-200";
                            typeLabel = "Training";
                          } else if (cType === "offer-letter") {
                            Icon = FileText;
                            badgeClass = isRevoked
                              ? "bg-red-50/60 text-red-600 border-red-200 line-through"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200";
                            typeLabel = "Offer Letter";
                          } else if (cType === "appreciation-letter") {
                            Icon = AwardIcon;
                            badgeClass = isRevoked
                              ? "bg-red-50/60 text-red-600 border-red-200 line-through"
                              : "bg-amber-50 text-amber-700 border-amber-200";
                            typeLabel = "Appreciation";
                          }

                          return (
                            <span
                              key={doc._id || idx}
                              title={`${typeLabel}: ${isRevoked ? "Revoked" : "Active"}`}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}
                            >
                              <Icon size={13} /> {typeLabel}
                              {isRevoked && <span className="text-[10px] font-normal text-red-600 no-underline">(Revoked)</span>}
                            </span>
                          );
                        })}
                      </div>
                    </td>

                    {/* Course */}
                    <td className="px-6 py-5 text-slate-700 font-medium">
                      {student.course}
                      {student.role && (
                        <div className="text-xs text-slate-500 font-normal">{student.role}</div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {(() => {
                        const activeCount = student.documents.filter((d) => d.status === "active").length;
                        const totalCount = student.documents.length;

                        if (activeCount === totalCount) {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              <ShieldCheck size={13} /> Active
                            </span>
                          );
                        }
                        if (activeCount === 0) {
                          return (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                              <ShieldCheck size={13} /> Revoked
                            </span>
                          );
                        }
                        return (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            <ShieldCheck size={13} /> {activeCount}/{totalCount} Active
                          </span>
                        );
                      })()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onView(student)}
                          title="View Student Documents"
                          className="rounded-xl bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => onEdit(student)}
                          title="Edit Student Record"
                          className="rounded-xl bg-amber-50 p-2 text-amber-600 hover:bg-amber-100 transition"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(student)}
                          title="Delete Student Record"
                          className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
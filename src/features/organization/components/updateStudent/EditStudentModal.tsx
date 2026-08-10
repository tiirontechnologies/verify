import { useState } from "react";
import { X, Save, Loader2, UserCheck, CheckSquare, Square } from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";

interface EditStudentModalProps {
  student: any;
  allStudentTypes?: string[];
  onClose: () => void;
  onSuccess: () => void;
}

const AVAILABLE_DOC_TYPES = [
  { id: "offer-letter", label: "Offer Letter", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "internship", label: "Internship Certificate", color: "text-red-700 bg-red-50 border-red-200" },
  { id: "training", label: "Training Certificate", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { id: "appreciation-letter", label: "Appreciation Letter", color: "text-amber-700 bg-amber-50 border-amber-200" },
  { id: "custom", label: "Custom Document", color: "text-purple-700 bg-purple-50 border-purple-200" },
];

export default function EditStudentModal({
  student,
  allStudentTypes,
  onClose,
  onSuccess,
}: EditStudentModalProps) {
  // Initialize with all document types currently assigned to this student email
  const initialTypes = (() => {
    if (allStudentTypes && allStudentTypes.length > 0) {
      return Array.from(new Set(allStudentTypes.map((t) => t.toLowerCase())));
    }
    return [(student.certificateType || "internship").toLowerCase()];
  })();

  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);

  const [prevTypes, setPrevTypes] = useState(allStudentTypes);
  if (allStudentTypes !== prevTypes) {
    setPrevTypes(allStudentTypes);
    if (allStudentTypes && allStudentTypes.length > 0) {
      setSelectedTypes(Array.from(new Set(allStudentTypes.map((t) => t.toLowerCase()))));
    }
  }

  const [formData, setFormData] = useState({
    studentName: student.studentName || "",
    email: student.email || "",
    certificateId: student.certificateId || "",
    course: student.course || "",
    role: student.role || "",
    startDate: student.startDate
      ? new Date(student.startDate).toISOString().split("T")[0]
      : "",
    endDate: student.endDate
      ? new Date(student.endDate).toISOString().split("T")[0]
      : "",
    mentor: student.mentor || "",
    director: student.director || "",
    status: student.status || "active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleToggleType = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      if (selectedTypes.length === 1) {
        // Must keep at least 1 document type
        return;
      }
      setSelectedTypes(selectedTypes.filter((t) => t !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTypes.length === 0) {
      setError("Please select at least one document type for the student.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await organizationApi.updateStudent(student._id || student.id, {
        ...formData,
        certificateTypes: selectedTypes,
        certificateType: selectedTypes[0],
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Failed to update student:", err);
      setError(err?.response?.data?.message || "Failed to save student changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <UserCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Edit Student & Assigned Documents</h3>
              <p className="text-xs text-slate-500 font-mono">ID: {student.certificateId}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200">
              {error}
            </div>
          )}

          {/* Student Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Multi-Select Certificate/Document Types */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assigned Document Types ({selectedTypes.length} Selected)
            </label>
            <p className="text-[11px] text-slate-500 mb-3">
              Check all document types to issue for this student. Multiple document types can be assigned simultaneously.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_DOC_TYPES.map((doc) => {
                const checked = selectedTypes.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleToggleType(doc.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition ${
                      checked
                        ? `${doc.color} shadow-sm ring-1 ring-slate-300`
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {checked ? (
                      <CheckSquare size={16} className="text-red-600 shrink-0" />
                    ) : (
                      <Square size={16} className="text-slate-400 shrink-0" />
                    )}
                    <span>{doc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate ID & Course */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Base Certificate ID *
              </label>
              <input
                type="text"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none font-mono focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course / Program *
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>
          </div>

          {/* Role & Dates */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Role / Designation
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Software Developer Intern"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Mentor, Director, Status */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mentor Name
              </label>
              <input
                type="text"
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Director Name
              </label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-red-500"
              >
                <option value="active">Active / Verified</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold shadow-md shadow-red-200 hover:bg-red-700 transition disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving..." : `Save & Assign (${selectedTypes.length}) Document(s)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

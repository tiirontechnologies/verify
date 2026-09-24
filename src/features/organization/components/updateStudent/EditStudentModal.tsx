import { useState, useEffect } from "react";
import { X, Save, Loader2, UserCheck, CheckSquare, Square } from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";
import { documentTemplateApi } from "../../../../api/documentTemplateApi";

// Sirf comparison ke liye: "Offer Letter" / "offer_letter" -> "offer-letter"
const normalizeType = (t?: string) =>
  (t || "").toLowerCase().trim().replace(/[\s_]+/g, "-");

interface EditStudentModalProps {
  student: any;
  allStudentTypes?: string[];
  onClose: () => void;
  onSuccess: () => void;
}

// Sirf card ke colors (types nahi) - index ke hisaab se cycle honge
const TYPE_COLORS = [
  "text-emerald-700 bg-emerald-50 border-emerald-200",
  "text-red-700 bg-red-50 border-red-200",
  "text-blue-700 bg-blue-50 border-blue-200",
  "text-amber-700 bg-amber-50 border-amber-200",
  "text-purple-700 bg-purple-50 border-purple-200",
];

const toKeys = (types: string[]) =>
  Array.from(new Set(types.map((t) => normalizeType(t)).filter(Boolean)));

export default function EditStudentModal({
  student,
  allStudentTypes,
  onClose,
  onSuccess,
}: EditStudentModalProps) {
  // Document template API se aaye hue documentType naam (array of strings)
  const [docTypes, setDocTypes] = useState<string[]>([]);
  const [typesLoading, setTypesLoading] = useState(true);
  const [typesError, setTypesError] = useState("");

  // Modal khulte hi document template API trigger hoti hai
  useEffect(() => {
    let cancelled = false;

    const loadDocTypes = async () => {
      try {
        setTypesLoading(true);
        setTypesError("");

        const api: any = documentTemplateApi;
        // Template list wala method dhundho (naam alag ho sakta hai)
        const method = [
          "getAll",
          "getTemplates",
          "getAllTemplates",
          "getDocumentTemplates",
          "getAllDocumentTemplates",
          "list",
          "fetchAll",
        ].find((name) => typeof api?.[name] === "function");

        if (!method) {
          throw new Error(
            `documentTemplateApi me template list ka method nahi mila. Available: ${Object.keys(api || {}).join(", ")}`
          );
        }

        const res = await api[method]();
        console.log("Document templates response:", res);

        const payload = res?.data ?? res;
        const templates: any[] = Array.isArray(payload?.templates)
          ? payload.templates
          : Array.isArray(payload)
          ? payload
          : [];

        // Response se sirf documentType nikalo -> unique array
        const names: string[] = [];
        for (const t of templates) {
          const name = String(t?.documentType || "").trim();
          if (!name) continue;
          if (t?.status && t.status !== "active") continue;
          if (!names.some((n) => normalizeType(n) === normalizeType(name))) {
            names.push(name);
          }
        }

        if (!cancelled) setDocTypes(names);
      } catch (err: any) {
        console.error("Failed to load document types:", err);
        if (!cancelled) {
          setTypesError(err?.response?.data?.message || err?.message || "Failed to load document types.");
        }
      } finally {
        if (!cancelled) setTypesLoading(false);
      }
    };

    loadDocTypes();
    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize with all document types currently assigned to this student email
  const initialTypes: string[] = (() => {
    if (allStudentTypes && allStudentTypes.length > 0) {
      return toKeys(allStudentTypes);
    }
    return student.certificateType ? toKeys([student.certificateType]) : [];
  })();

  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes);

  const [prevTypes, setPrevTypes] = useState(allStudentTypes);
  if (allStudentTypes !== prevTypes) {
    setPrevTypes(allStudentTypes);
    if (allStudentTypes && allStudentTypes.length > 0) {
      setSelectedTypes(toKeys(allStudentTypes));
    }
  }

  // Options SIRF document template API se aate hain (koi hardcoded / purana type nahi)
  const options = docTypes.map((name) => ({
    key: normalizeType(name),
    value: name, // template ka exact documentType naam
    label: name,
  }));

  // Sirf wahi selected maane jayenge jinka template abhi exist karta hai
  const activeTypes = selectedTypes.filter((k) => options.some((o) => o.key === k));

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

  const handleToggleType = (typeKey: string) => {
    if (selectedTypes.includes(typeKey)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== typeKey));
    } else {
      setSelectedTypes([...selectedTypes, typeKey]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Zero document types bhi allowed hain. Backend ko template ka exact naam bhejo
    const assignedTypes = activeTypes.map(
      (key) => options.find((o) => o.key === key)!.value
    );

    try {
      setSaving(true);
      setError("");
      await organizationApi.updateStudent(student._id || student.id, {
        ...formData,
        // Agar document types load nahi hue to student ke existing types ko mat chhedo
        ...(typesError
          ? {}
          : {
              certificateTypes: assignedTypes,
              ...(assignedTypes.length > 0 ? { certificateType: assignedTypes[0] } : {}),
            }),
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

          {/* Multi-Select Certificate/Document Types (dynamic) */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Assigned Document Types ({activeTypes.length} Selected)
            </label>
            <p className="text-[11px] text-slate-500 mb-3">
              Check all document types to issue for this student. Multiple document types can be assigned simultaneously, or leave all unchecked to assign none.
            </p>

            {typesError ? (
              <p className="text-xs text-red-600 py-2 break-words">{typesError}</p>
            ) : typesLoading && options.length === 0 ? (
              <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
                <Loader2 size={14} className="animate-spin" /> Loading document types...
              </div>
            ) : options.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">
                No document templates found. Create a template first to assign document types.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {options.map((doc, index) => {
                  const checked = activeTypes.includes(doc.key);
                  return (
                    <button
                      key={doc.key}
                      type="button"
                      onClick={() => handleToggleType(doc.key)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition ${
                        checked
                          ? `${TYPE_COLORS[index % TYPE_COLORS.length]} shadow-sm ring-1 ring-slate-300`
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
            )}
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
              disabled={saving || typesLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold shadow-md shadow-red-200 hover:bg-red-700 transition disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving..." : `Save & Assign (${activeTypes.length}) Document(s)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
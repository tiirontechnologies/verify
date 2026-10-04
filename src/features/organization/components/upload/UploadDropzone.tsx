import { useEffect, useState } from "react";
import {
  CloudUpload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
  UserPlus,
  X,
  Plus,
} from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";
import { documentTemplateApi } from "../../../../api/documentTemplateApi";

interface UploadDropzoneProps {
  onUploadSuccess?: () => void;
}

// Sirf quick-add suggestions hain, koi bhi custom type bhi add ho sakta hai
const SUGGESTED_CERTIFICATE_TYPES = [
  "offer-letter",
  "training",
  "internship",
  "appreciation-letter",
];

const emptyForm = {
  name: "",
  email: "",
  certificateTypes: [] as string[],
  course: "",
  role: "",
  startDate: "",
  endDate: "",
  mentor: "",
  director: "",
  templateId: "",
};

const csvEscape = (val: string) => `"${String(val ?? "").replace(/"/g, '""')}"`;

// Type ko clean karta hai: trim + lowercase + spaces -> hyphen ("Offer Letter" => "offer-letter")
// Agar exact string chahiye to yahan sirf `.trim()` rakh do.
const normalizeType = (val: string) => val.trim().toLowerCase().replace(/[\s_]+/g, "-");

// "a, b, c" => ["a","b","c"] (clean + unique)
const parseCertTypes = (raw: string): string[] =>
  Array.from(new Set(raw.split(",").map(normalizeType).filter(Boolean)));

export default function UploadDropzone({ onUploadSuccess }: UploadDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [createdCredentials, setCreatedCredentials] = useState<any[]>([]);

  // Single student modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [certInput, setCertInput] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    let cancelled = false;

    const fetchTemplates = async () => {
      try {
        setTemplatesLoading(true);
        const response = await documentTemplateApi.getTemplates();
        const payload = response.data?.templates ?? response.data;
        const list = Array.isArray(payload) ? payload : [];
        if (!cancelled) setTemplates(list);
      } catch (error) {
        console.error("Failed to load templates for single-student assignment:", error);
        if (!cancelled) setTemplates([]);
      } finally {
        if (!cancelled) setTemplatesLoading(false);
      }
    };

    fetchTemplates();
    return () => {
      cancelled = true;
    };
  }, [showModal]);

  const singleTypeTemplates = form.certificateTypes.length === 1
    ? templates.filter(
        (template) =>
          normalizeType(String(template.documentType || "")) === form.certificateTypes[0] &&
          (!template.status || template.status === "active"),
      )
    : [];

  // Core upload (shared by file upload + single student form). Returns true on success.
  const uploadFile = async (file: File): Promise<boolean> => {
    setUploading(true);
    setMessage(null);
    setCreatedCredentials([]);

    try {
      const res = await organizationApi.uploadStudents(file);
      const data = res.data?.data;
      setMessage({
        type: "success",
        text: res.data?.message || "Students and certificate data imported successfully!",
      });

      if (data?.createdCredentials?.length) {
        setCreatedCredentials(data.createdCredentials);
      }

      if (onUploadSuccess) {
        onUploadSuccess();
      }
      return true;
    } catch (err: any) {
      console.error("Upload error:", err);
      const text = err.response?.data?.message || "Failed to upload student Excel file.";
      setMessage({ type: "error", text });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["xlsx", "xls", "csv"].includes(ext || "")) {
      setMessage({
        type: "error",
        text: "Invalid file format. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.",
      });
      return;
    }

    await uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // ---------- Single student modal handlers ----------
  const openModal = () => {
    setForm(emptyForm);
    setCertInput("");
    setFormError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    if (uploading) return;
    setShowModal(false);
  };

  const updateField = (key: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Typed input se type(s) add karo
  const addCertTypes = (raw: string) => {
    const parsed = parseCertTypes(raw);
    if (parsed.length === 0) return;
    setForm((prev) => ({
      ...prev,
      certificateTypes: Array.from(new Set([...prev.certificateTypes, ...parsed])),
    }));
    setCertInput("");
  };

  const removeCertType = (value: string) => {
    setForm((prev) => ({
      ...prev,
      certificateTypes: prev.certificateTypes.filter((t) => t !== value),
    }));
  };

  const toggleSuggestedType = (value: string) => {
    setForm((prev) => ({
      ...prev,
      certificateTypes: prev.certificateTypes.includes(value)
        ? prev.certificateTypes.filter((t) => t !== value)
        : [...prev.certificateTypes, value],
    }));
  };

  const handleCertKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Enter se form submit na ho
      addCertTypes(certInput);
    } else if (e.key === "Backspace" && !certInput && form.certificateTypes.length > 0) {
      // Input khaali ho to last chip hata do
      removeCertType(form.certificateTypes[form.certificateTypes.length - 1]);
    }
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Agar user ne type kiya but Enter nahi dabaya, to bhi include kar lo
    const finalTypes = Array.from(
      new Set([...form.certificateTypes, ...parseCertTypes(certInput)])
    );

    if (!form.name.trim()) return setFormError("Student name is required.");
    if (!form.email.trim()) return setFormError("Email is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return setFormError("Please enter a valid email address.");
    }
    if (finalTypes.length === 0) {
      return setFormError("Add at least one certificate type.");
    }
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      return setFormError("End date cannot be before start date.");
    }

    const headers = [
      "Student Name",
      "Email",
      "Certificate Type",
      "Course",
      "Role",
      "Start Date",
      "End Date",
      "Mentor",
      "Director",
      "templateId",
    ];
    const selectedTemplateId =
      finalTypes.length === 1 &&
      singleTypeTemplates.some(
        (template) => String(template._id || template.id) === form.templateId,
      )
        ? form.templateId
        : "";
    const row = [
      form.name.trim(),
      form.email.trim(),
      finalTypes.join(", "),
      form.course.trim(),
      form.role.trim(),
      form.startDate,
      form.endDate,
      form.mentor.trim(),
      form.director.trim(),
      selectedTemplateId,
    ]
      .map(csvEscape)
      .join(",");

    const csv = [headers.join(","), row].join("\n");
    const file = new File([csv], "single_student.csv", { type: "text/csv" });

    const ok = await uploadFile(file);
    if (ok) {
      setShowModal(false);
      setForm(emptyForm);
      setCertInput("");
    } else {
      setFormError("Failed to add student. Please check the details and try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100";
  const labelClass = "mb-1.5 block text-xs font-semibold text-gray-700";

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {message && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-2xl p-4 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {createdCredentials.length > 0 && (
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-blue-900">
              Generated Student Initial Credentials ({createdCredentials.filter(c => c.isNewUser).length} New Accounts)
            </h3>
            <span className="text-xs text-blue-700 font-medium">
              Share these credentials with students for portal login
            </span>
          </div>

          <div className="mt-3 max-h-48 overflow-y-auto rounded-xl border border-blue-200 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-blue-100/50 text-blue-900 sticky top-0 font-semibold">
                <tr>
                  <th className="p-2.5">Student Name</th>
                  <th className="p-2.5">Email (Login ID)</th>
                  <th className="p-2.5">Initial Password</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {createdCredentials.map((cred, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-medium text-gray-800">{cred.name}</td>
                    <td className="p-2.5 text-gray-600 font-mono">{cred.email}</td>
                    <td className="p-2.5 font-mono text-slate-800 font-bold">
                      {cred.initialPassword || "(Existing Account)"}
                    </td>
                    <td className="p-2.5">
                      {cred.isNewUser ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                          Created
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                          Linked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-3xl border-2 border-dashed px-8 py-16 text-center transition-all ${
          isDragging
            ? "border-red-500 bg-red-100/60 scale-[1.01]"
            : "border-red-200 bg-red-50/40 hover:border-red-400 hover:bg-red-50"
        }`}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
          {uploading ? (
            <Loader2 className="text-red-600 animate-spin" size={36} />
          ) : (
            <CloudUpload className="text-red-600" size={36} />
          )}
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          {uploading ? "Processing Excel File..." : "Drag & Drop your Excel file"}
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto text-sm">
          {uploading
            ? "Extracting student rows and populating MongoDB certificate records..."
            : "Upload your student roster sheet (.xlsx, .xls, .csv) to auto-generate certificate records."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <label
            className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-red-600 px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-red-700 ${
              uploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <FileSpreadsheet size={18} />
            {uploading ? "Uploading..." : "Browse Excel File"}

            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
                e.target.value = "";
              }}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={openModal}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-6 py-3.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-60 disabled:pointer-events-none"
          >
            <UserPlus size={18} /> Add Single Student
          </button>

          <button
            type="button"
            onClick={() => {
              const headers = [
                "Student Name",
                "Email",
                "Certificate Type",
                "Course",
                "Role",
                "Start Date",
                "End Date",
                "Mentor",
                "Director",
              ];
              const sampleRows = [
                '"Aarav Sharma","aarav.sharma@example.com","offer-letter, training, internship","Full Stack Development","Software Engineer Intern","2026-09-01","2026-12-01","Rahul Sharma","Nitesh Singh"',
                '"Priya Patel","priya.patel@example.com","offer-letter, internship","Data Science & AI","Data Analyst Intern","2026-05-01","2026-08-01","Anjali Gupta","Nitesh Singh"',
                '"Rohan Verma","rohan.verma@example.com","training","Python Programming","Trainee","2026-06-15","2026-07-15","Vikram Malhotra","Nitesh Singh"',
                '"Sneha Reddy","sneha.reddy@example.com","appreciation-letter","Cloud Architecture","Participant","2026-07-01","2026-07-31","Rahul Sharma","Nitesh Singh"',
              ];
              const csvContent =
                "data:text/csv;charset=utf-8," + [headers.join(","), ...sampleRows].join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "student_upload_sample_template.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 font-semibold transition text-sm"
          >
            <Download size={18} /> Download Sample CSV
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            .xlsx
          </span>

          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            .xls
          </span>

          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            .csv
          </span>

          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            Max Size: 15 MB
          </span>
        </div>
      </div>

      {/* ---------- Add Single Student Modal ---------- */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              disabled={uploading}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50">
                <UserPlus className="text-red-600" size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Add Single Student</h3>
                <p className="text-xs text-gray-500">Fill the details to generate certificate records.</p>
              </div>
            </div>

            {formError && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                <AlertCircle size={16} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSingleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Aarav Sharma"
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="aarav@example.com"
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>Course</label>
                  <input
                    type="text"
                    value={form.course}
                    onChange={(e) => updateField("course", e.target.value)}
                    placeholder="Full Stack Development"
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => updateField("role", e.target.value)}
                    placeholder="Software Engineer Intern"
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    min={form.startDate || undefined}
                    onChange={(e) => updateField("endDate", e.target.value)}
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>Mentor</label>
                  <input
                    type="text"
                    value={form.mentor}
                    onChange={(e) => updateField("mentor", e.target.value)}
                    placeholder="Rahul Sharma"
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className={labelClass}>Director</label>
                  <input
                    type="text"
                    value={form.director}
                    onChange={(e) => updateField("director", e.target.value)}
                    placeholder="Nitesh Singh"
                    className={inputClass}
                    disabled={uploading}
                  />
                </div>

              </div>

              {/* ---------- Dynamic Certificate Type ---------- */}
              <div>
                <label className={labelClass}>
                  Certificate Type <span className="text-red-500">*</span>
                </label>

                {/* Chips + input */}
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 transition focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100">
                  {form.certificateTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                    >
                      {type}
                      <button
                        type="button"
                        onClick={() => removeCertType(type)}
                        disabled={uploading}
                        className="rounded-full p-0.5 hover:bg-red-100"
                        aria-label={`Remove ${type}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    onKeyDown={handleCertKeyDown}
                    onBlur={() => addCertTypes(certInput)}
                    placeholder={
                      form.certificateTypes.length === 0
                        ? "Type certificate type & press Enter (e.g. offer-letter)"
                        : "Add more..."
                    }
                    disabled={uploading}
                    className="min-w-[160px] flex-1 bg-transparent px-2 py-1.5 text-sm text-gray-800 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => addCertTypes(certInput)}
                    disabled={uploading || !certInput.trim()}
                    className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-40"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                {/* Quick suggestions */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-medium text-gray-500">Quick add:</span>
                  {SUGGESTED_CERTIFICATE_TYPES.map((type) => {
                    const active = form.certificateTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleSuggestedType(type)}
                        disabled={uploading}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                          active
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:text-red-600"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {form.certificateTypes.length === 1 && (
                <div>
                  <label className={labelClass}>Certificate Template</label>
                  <select
                    value={form.templateId}
                    onChange={(event) => updateField("templateId", event.target.value)}
                    disabled={uploading || templatesLoading || singleTypeTemplates.length === 0}
                    className={inputClass}
                  >
                    <option value="">Use the default matching template</option>
                    {singleTypeTemplates.map((template) => (
                      <option key={template._id || template.id} value={template._id || template.id}>
                        {template.name || template.documentType}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Select one document type to attach its exact saved design.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={uploading}
                  className="rounded-2xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Adding...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} /> Add Student
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
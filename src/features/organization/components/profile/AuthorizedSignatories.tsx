import { Upload, Trash2, CheckCircle2 } from "lucide-react";

interface AuthorizedSignatoriesProps {
  directorName?: string;
  mentorName?: string;
  directorSignature?: string;
  mentorSignature?: string;
  onChange: (field: string, value: string) => void;
}

export default function AuthorizedSignatories({
  directorName = "",
  mentorName = "",
  directorSignature = "",
  mentorSignature = "",
  onChange,
}: AuthorizedSignatoriesProps) {
  const handleSignatureUpload = (field: "directorSignature" | "mentorSignature", file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(field, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Authorized Signatories & Digital Signatures
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Director Name */}
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Director Name
          </label>
          <input
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={directorName}
            onChange={(e) => onChange("directorName", e.target.value)}
            placeholder="Enter director name"
          />
        </div>

        {/* Mentor Name */}
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Mentor Name
          </label>
          <input
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={mentorName}
            onChange={(e) => onChange("mentorName", e.target.value)}
            placeholder="Enter mentor name"
          />
        </div>

        {/* Director Signature Upload */}
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Director Digital Signature
          </label>

          {directorSignature ? (
            <div className="relative flex items-center justify-between rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <img
                  src={directorSignature}
                  alt="Director Signature"
                  className="h-12 max-w-[140px] object-contain rounded border border-slate-200 bg-white p-1"
                />
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Signature Uploaded
                </span>
              </div>
              <button
                onClick={() => onChange("directorSignature", "")}
                className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition"
                title="Remove Signature"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <label className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-5 cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-slate-600">
              <Upload size={18} className="text-slate-400" />
              <span>Upload Director Signature (PNG/JPG)</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSignatureUpload("directorSignature", e.target.files?.[0] || null)}
              />
            </label>
          )}
        </div>

        {/* Mentor Signature Upload */}
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Mentor Digital Signature
          </label>

          {mentorSignature ? (
            <div className="relative flex items-center justify-between rounded-2xl border border-slate-200 p-4 bg-slate-50">
              <div className="flex items-center gap-3">
                <img
                  src={mentorSignature}
                  alt="Mentor Signature"
                  className="h-12 max-w-[140px] object-contain rounded border border-slate-200 bg-white p-1"
                />
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Signature Uploaded
                </span>
              </div>
              <button
                onClick={() => onChange("mentorSignature", "")}
                className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition"
                title="Remove Signature"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <label className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-5 cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-slate-600">
              <Upload size={18} className="text-slate-400" />
              <span>Upload Mentor Signature (PNG/JPG)</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSignatureUpload("mentorSignature", e.target.files?.[0] || null)}
              />
            </label>
          )}
        </div>
      </div>
    </section>
  );
}
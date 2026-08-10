import { ImagePlus, Trash2, CheckCircle2 } from "lucide-react";

interface BrandingSettingsProps {
  logo?: string;
  seal?: string;
  onChange: (field: string, value: string) => void;
}

export default function BrandingSettings({
  logo = "",
  seal = "",
  onChange,
}: BrandingSettingsProps) {
  const handleImageUpload = (field: "logo" | "seal", file: File | null) => {
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
        Branding & Assets
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Organization Logo */}
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Organization Logo
          </label>

          {logo ? (
            <div className="relative flex flex-col items-center justify-center rounded-3xl border border-slate-200 p-6 bg-slate-50 text-center">
              <img
                src={logo}
                alt="Organization Logo"
                className="h-20 max-w-[200px] object-contain rounded-xl border border-slate-200 bg-white p-2 mb-3"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Logo Uploaded
                </span>
                <button
                  onClick={() => onChange("logo", "")}
                  className="px-3 py-1 rounded-xl text-xs font-semibold text-red-600 border border-red-200 bg-white hover:bg-red-50 transition"
                >
                  <Trash2 size={14} className="inline mr-1" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 py-10 cursor-pointer transition hover:border-red-400 hover:bg-red-50 text-center">
              <ImagePlus className="mb-3 text-red-600" size={36} />
              <span className="font-semibold text-sm text-slate-800">Upload Organization Logo</span>
              <span className="mt-1 text-xs text-slate-400">PNG, SVG, JPG (Max 5MB)</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload("logo", e.target.files?.[0] || null)}
              />
            </label>
          )}
        </div>

        {/* Organization Seal / Stamp */}
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Organization Seal / Stamp
          </label>

          {seal ? (
            <div className="relative flex flex-col items-center justify-center rounded-3xl border border-slate-200 p-6 bg-slate-50 text-center">
              <img
                src={seal}
                alt="Organization Seal"
                className="h-20 max-w-[200px] object-contain rounded-xl border border-slate-200 bg-white p-2 mb-3"
              />
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Seal Uploaded
                </span>
                <button
                  onClick={() => onChange("seal", "")}
                  className="px-3 py-1 rounded-xl text-xs font-semibold text-red-600 border border-red-200 bg-white hover:bg-red-50 transition"
                >
                  <Trash2 size={14} className="inline mr-1" /> Remove
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 py-10 cursor-pointer transition hover:border-red-400 hover:bg-red-50 text-center">
              <ImagePlus className="mb-3 text-red-600" size={36} />
              <span className="font-semibold text-sm text-slate-800">Upload Organization Seal</span>
              <span className="mt-1 text-xs text-slate-400">Transparent PNG recommended</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload("seal", e.target.files?.[0] || null)}
              />
            </label>
          )}
        </div>
      </div>
    </section>
  );
}
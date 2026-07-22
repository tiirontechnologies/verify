import { ImagePlus } from "lucide-react";

export default function BrandingSettings() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Branding
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <button className="rounded-3xl border-2 border-dashed border-gray-300 py-10 transition hover:border-red-400 hover:bg-red-50">
          <ImagePlus className="mx-auto mb-4 text-red-600" size={34} />
          Upload Organization Logo
        </button>

        <button className="rounded-3xl border-2 border-dashed border-gray-300 py-10 transition hover:border-red-400 hover:bg-red-50">
          <ImagePlus className="mx-auto mb-4 text-red-600" size={34} />
          Upload Organization Seal
        </button>
      </div>
    </section>
  );
}
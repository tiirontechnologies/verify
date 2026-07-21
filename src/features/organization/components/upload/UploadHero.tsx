import { Download, UploadCloud } from "lucide-react";

export default function UploadHero() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            <UploadCloud size={16} />
            Student Data Import
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
            Upload Student Records
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
            Import internship or training students using Excel or CSV files.
            Every record is automatically validated before it is added to your
            organization.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-3 font-medium text-red-600 transition hover:bg-red-100">
          <Download size={18} />
          Download Sample Excel
        </button>
      </div>
    </section>
  );
}
import { CloudUpload, FileSpreadsheet } from "lucide-react";

export default function UploadDropzone() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="rounded-3xl border-2 border-dashed border-red-200 bg-red-50/40 px-8 py-16 text-center transition hover:border-red-400 hover:bg-red-50">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow">
          <CloudUpload className="text-red-600" size={36} />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Drag & Drop your Excel file
        </h2>

        <p className="mt-3 text-gray-500">
          or click below to browse your computer
        </p>

        <label className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700">
          <FileSpreadsheet size={18} />
          Choose Excel File

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />
        </label>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            .xlsx
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            .xls
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            .csv
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            Max Size: 10 MB
          </span>
        </div>
      </div>
    </section>
  );
}
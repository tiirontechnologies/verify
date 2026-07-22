import { Download, UploadCloud, Trash2 } from "lucide-react";

export default function BulkActions() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">
        Bulk Actions
      </h2>

      <p className="mt-2 text-gray-500">
        Perform actions on multiple student records at once.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 hover:bg-gray-50">
          <Download size={18} />
          Export Selected
        </button>

        <button className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 hover:bg-gray-50">
          <UploadCloud size={18} />
          Re-upload Data
        </button>

        <button className="flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
          <Trash2 size={18} />
          Delete Selected
        </button>
      </div>
    </section>
  );
}
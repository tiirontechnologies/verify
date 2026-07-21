import { Upload } from "lucide-react";

export default function AuthorizedSignatories() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Authorized Signatories
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Director Name
          </label>

          <input
            className="w-full rounded-2xl border border-gray-200 p-3"
            placeholder="Enter director name"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mentor Name
          </label>

          <input
            className="w-full rounded-2xl border border-gray-200 p-3"
            placeholder="Enter mentor name"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Director Signature
          </label>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-4 hover:bg-gray-50">
            <Upload size={18} />
            Upload Signature
          </button>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Mentor Signature
          </label>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 py-4 hover:bg-gray-50">
            <Upload size={18} />
            Upload Signature
          </button>
        </div>
      </div>
    </section>
  );
}
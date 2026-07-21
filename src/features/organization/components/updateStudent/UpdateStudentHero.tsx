import { PencilLine, UserPen } from "lucide-react";

export default function UpdateStudentHero() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            <UserPen size={16} />
            Student Management
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Update Student Data
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            Search, update and manage student records before generating
            certificates.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700">
          <PencilLine size={18} />
          Bulk Update
        </button>
      </div>
    </section>
  );
}
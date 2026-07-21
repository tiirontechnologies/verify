import { Search, Filter } from "lucide-react";

export default function StudentSearchFilters() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by student name, email or certificate ID..."
            className="w-full rounded-2xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-red-500"
          />
        </div>

        <select className="rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-red-500">
          <option>All Courses</option>
          <option>Internship</option>
          <option>Training</option>
        </select>

        <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 transition hover:bg-gray-50">
          <Filter size={18} />
          Filters
        </button>
      </div>
    </section>
  );
}
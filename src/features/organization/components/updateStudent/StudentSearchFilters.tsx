import { Search, RotateCcw } from "lucide-react";

interface StudentSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  typeFilter: string;
  documentTypes: string[];
  onTypeFilterChange: (t: string) => void;
  statusFilter: string;
  onStatusFilterChange: (s: string) => void;
  onReset: () => void;
}

export default function StudentSearchFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  documentTypes,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  onReset,
}: StudentSearchFiltersProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-12 items-center">
        {/* Search Bar */}
        <div className="relative lg:col-span-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student name, email, course or certificate ID..."
            className="w-full rounded-2xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>

        {/* Document Type Filter */}
        <div className="lg:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="all">All Document Types</option>
            {documentTypes.map((type) => <option key={type} value={type}>{type.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</option>)}
          </select>
        </div>

        {/* Verification Status Filter */}
        <div className="lg:col-span-2">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active / Verified</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="lg:col-span-1">
          <button
            onClick={onReset}
            title="Reset Filters"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

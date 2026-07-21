import {
  ArrowRight,
  CheckCircle2,
  FileBadge2,
} from "lucide-react";

const templates = [
  {
    name: "Internship Certificate",
    category: "Internship",
    updated: "18 Jul 2026",
    status: "Default",
  },
  {
    name: "Training Certificate",
    category: "Training",
    updated: "16 Jul 2026",
    status: "Active",
  },
  {
    name: "Workshop Certificate",
    category: "Workshop",
    updated: "12 Jul 2026",
    status: "Active",
  },
  {
    name: "Appreciation Certificate",
    category: "Recognition",
    updated: "10 Jul 2026",
    status: "Draft",
  },
];

export default function TemplateCards() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Templates
        </h2>

        <p className="mt-2 text-gray-500">
          Choose a certificate template to preview or edit.
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">
        {templates.map((template) => (
          <button
            key={template.name}
            className="group rounded-2xl border border-gray-200 p-6 text-left transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <FileBadge2 />
              </div>

              <CheckCircle2 className="text-green-500" />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              {template.name}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {template.category}
            </p>

            <div className="mt-5 rounded-xl bg-gray-50 p-3">
              <div className="text-xs uppercase tracking-wide text-gray-400">
                Last Updated
              </div>

              <div className="mt-1 font-medium text-gray-700">
                {template.updated}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {template.status}
              </span>

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
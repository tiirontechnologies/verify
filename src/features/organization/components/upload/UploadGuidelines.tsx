import {
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
  Database,
} from "lucide-react";

const guidelines = [
  {
    title: "Required Columns",
    description:
      "Student Name, Email, Course, Organization, Start Date and End Date are mandatory.",
    icon: FileSpreadsheet,
  },
  {
    title: "Supported Formats",
    description:
      "Upload Excel (.xlsx, .xls) or CSV files up to 10 MB.",
    icon: CheckCircle2,
  },
  {
    title: "Duplicate Detection",
    description:
      "Existing students are automatically detected before importing.",
    icon: Database,
  },
  {
    title: "Validation",
    description:
      "Every record is validated to prevent incomplete or invalid entries.",
    icon: ShieldCheck,
  },
];

export default function UploadGuidelines() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Upload Guidelines
      </h2>

      <p className="mt-2 text-gray-500">
        Follow these recommendations to ensure a successful upload.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {guidelines.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 p-6 transition hover:border-red-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
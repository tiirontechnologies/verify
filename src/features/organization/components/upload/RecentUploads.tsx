import { Clock3, FileSpreadsheet } from "lucide-react";

const uploads = [
  {
    file: "Internship_Students_July.xlsx",
    uploadedBy: "Ram Pandey",
    records: 120,
    date: "18 Jul 2026",
    status: "Completed",
  },
  {
    file: "Training_Batch_04.xlsx",
    uploadedBy: "Admin",
    records: 85,
    date: "17 Jul 2026",
    status: "Completed",
  },
];

export default function RecentUploads() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Uploads
          </h2>

          <p className="mt-2 text-gray-500">
            Previously imported student data.
          </p>
        </div>

        <Clock3 className="text-gray-400" />
      </div>

      <div className="divide-y divide-gray-100">
        {uploads.map((upload) => (
          <div
            key={upload.file}
            className="flex flex-col gap-5 p-6 transition hover:bg-gray-50 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <FileSpreadsheet />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  {upload.file}
                </h3>

                <p className="text-sm text-gray-500">
                  Uploaded by {upload.uploadedBy}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <span>{upload.records} Records</span>

              <span>{upload.date}</span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                {upload.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
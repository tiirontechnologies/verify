import {
  CalendarDays,
  FileBadge2,
  ScanLine,
  UserCircle2,
} from "lucide-react";

export default function TemplatePreview() {
  return (
    <section className="grid gap-8 xl:grid-cols-3">
      {/* Certificate Preview */}
      <div className="xl:col-span-2 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">
              Selected Template
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Internship Certificate
            </h2>
          </div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Default Template
          </span>
        </div>

        <div className="aspect-[1.414/1] rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-12 shadow-inner">
          <div className="flex h-full flex-col justify-between">
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <FileBadge2 size={40} className="text-red-600" />
              </div>

              <h3 className="text-4xl font-bold text-gray-900">
                CERTIFICATE
              </h3>

              <p className="mt-3 text-gray-500">
                OF COMPLETION
              </p>

              <p className="mt-12 text-lg text-gray-500">
                This certificate is proudly presented to
              </p>

              <h1 className="mt-6 text-5xl font-bold text-red-700">
                Student Name
              </h1>

              <p className="mx-auto mt-10 max-w-3xl leading-8 text-gray-600">
                For successfully completing the internship program
                with outstanding dedication and commitment.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 items-end">
              <div className="text-center">
                <div className="mx-auto w-40 border-t border-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Mentor
                </p>
              </div>

              <div className="flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-dashed border-gray-300">
                  <ScanLine className="text-gray-400" />
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto w-40 border-t border-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Information */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">
          Template Details
        </h2>

        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <UserCircle2 className="text-red-600" />
            <div>
              <p className="text-sm text-gray-400">Created By</p>
              <p className="font-medium">Administrator</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CalendarDays className="text-red-600" />
            <div>
              <p className="text-sm text-gray-400">Last Updated</p>
              <p className="font-medium">18 Jul 2026</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Certificate Size
            </p>

            <p className="mt-1 font-medium">
              A4 Landscape
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Dynamic Variables
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Student Name",
                "Certificate ID",
                "Course",
                "Organization",
                "Issue Date",
                "QR Code",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
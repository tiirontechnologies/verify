import { Building2, ArrowRight, FileSpreadsheet } from "lucide-react";

export default function OrganizationHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-50 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-10 p-6 md:p-8 lg:grid-cols-3 lg:items-center">
        {/* Left Content */}

        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2">
            <Building2 size={16} className="text-red-600" />

            <span className="text-sm font-medium text-red-600">
              Organization Dashboard
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl xl:text-5xl">
            Welcome back,
            <br />
            Gallantt Cement Ltd.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            Manage student records, upload certificate data, monitor
            verification requests and generate secure digital credentials from
            one centralized platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
              Upload Student Data

              <ArrowRight size={18} />
            </button>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
              <FileSpreadsheet size={18} />

              Manage Templates
            </button>
          </div>
        </div>

        {/* Right Card */}

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Today's Summary
            </h3>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Live
            </span>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Student Uploads
              </span>

              <span className="text-xl font-bold text-gray-900">
                142
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Certificates Generated
              </span>

              <span className="text-xl font-bold text-gray-900">
                86
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Verification Requests
              </span>

              <span className="text-xl font-bold text-gray-900">
                319
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Success Rate
              </span>

              <span className="text-xl font-bold text-green-600">
                98.7%
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-gray-600">
              Your organization processed
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">
              5,842
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              certificates this year
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Building2, ArrowRight, FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrganizationHeroProps {
  companyName?: string;
  totalStudents?: number;
  totalCertificates?: number;
  activeCount?: number;
  todayUploads?: number;
}

export default function OrganizationHero({
  companyName = "Organization Admin",
  totalStudents = 0,
  totalCertificates = 0,
  activeCount = 0,
  todayUploads = 0,
}: OrganizationHeroProps) {
  const navigate = useNavigate();

  const successRate = totalCertificates > 0 
    ? ((activeCount / totalCertificates) * 100).toFixed(1) + "%" 
    : "100%";

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
            {companyName}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600">
            Manage student records, upload certificate data, monitor
            verification requests, and generate secure digital credentials from
            one centralized platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/organization/upload-students")}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 shadow-md shadow-red-200"
            >
              Upload Student Data
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate("/organization/update-student")}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              <FileSpreadsheet size={18} />
              Manage Records
            </button>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="rounded-3xl border border-gray-200 bg-slate-50/80 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Live Summary
            </h3>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></span> Live
            </span>
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Today's Uploads</span>
              <span className="text-lg font-bold text-gray-900">{todayUploads}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Total Students</span>
              <span className="text-lg font-bold text-gray-900">{totalStudents}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Certificates Issued</span>
              <span className="text-lg font-bold text-gray-900">{totalCertificates}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Active Rate</span>
              <span className="text-lg font-bold text-green-600">{successRate}</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4">
            <p className="text-xs text-gray-600 font-medium">Your Organization Issued</p>
            <h2 className="mt-1 text-3xl font-bold text-red-600">{totalCertificates}</h2>
            <p className="mt-0.5 text-xs text-gray-500">Total credentials in database</p>
          </div>
        </div>
      </div>
    </section>
  );
}
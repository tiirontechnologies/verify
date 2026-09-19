import {
  CheckCircle2,
  FileSpreadsheet,
  Database,
  Download,
  FileText,
  Award,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const guidelines = [
  {
    title: "Required & Optional Columns",
    description:
      "Student Name, Email, Certificate Type, Course, Start Date, and End Date are required. Mentor, Director, and Role are optional.",
    icon: FileSpreadsheet,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Certificate / Document Types",
    description:
      "Use 'offer-letter' (or 'Offer Letter'), 'internship', 'training', 'appreciation-letter', or custom document types in the 'Certificate Type' column.",
    icon: Sparkles,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Supported File Formats",
    description:
      "Upload Excel (.xlsx, .xls) or CSV (.csv) spreadsheets up to 15 MB.",
    icon: CheckCircle2,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Auto Account Creation & Linking",
    description:
      "New student accounts are automatically generated with initial login credentials if they do not exist.",
    icon: Database,
    color: "from-blue-500 to-cyan-600",
  },
];

const sampleDataRows = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    certType: "offer-letter, training, internship",
    course: "Full Stack Web Development",
    role: "Software Engineer Intern",
    startDate: "2026-09-01",
    endDate: "2026-12-01",
    mentor: "Rahul Sharma",
    director: "Nitesh Singh",
  },
  {
    name: "Priya Patel",
    email: "priya.patel@example.com",
    certType: "offer-letter, internship",
    course: "Data Science & AI",
    role: "Data Analyst Intern",
    startDate: "2026-05-01",
    endDate: "2026-08-01",
    mentor: "Anjali Gupta",
    director: "Nitesh Singh",
  },
  {
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    certType: "training",
    course: "Python Programming & Analytics",
    role: "Trainee",
    startDate: "2026-06-15",
    endDate: "2026-07-15",
    mentor: "Vikram Malhotra",
    director: "Nitesh Singh",
  },
  {
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    certType: "appreciation-letter",
    course: "Cloud Architecture Masterclass",
    role: "Participant",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    mentor: "Rahul Sharma",
    director: "Nitesh Singh",
  },
];

export default function UploadGuidelines() {
  const handleDownloadSampleCSV = () => {
    const headers = [
      "Student Name",
      "Email",
      "Certificate Type",
      "Course",
      "Role",
      "Start Date",
      "End Date",
      "Mentor",
      "Director",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...sampleDataRows.map((r) =>
          [
            `"${r.name}"`,
            `"${r.email}"`,
            `"${r.certType}"`,
            `"${r.course}"`,
            `"${r.role}"`,
            `"${r.startDate}"`,
            `"${r.endDate}"`,
            `"${r.mentor}"`,
            `"${r.director}"`,
          ].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "student_upload_sample_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.5s ease-out both;
        }
      `}</style>

      {/* Upload Guidelines Cards */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/80 backdrop-blur-xl p-8 shadow-lg shadow-gray-200/50">
        {/* subtle background accent */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-red-200/40 to-orange-200/30 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 mb-2">
              <Sparkles size={12} /> Bulk Upload
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Excel / CSV Upload Guidelines
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Follow column rules below to issue Offer Letters, Internship Certificates, and Training Credentials in bulk.
            </p>
          </div>

          <button
            onClick={handleDownloadSampleCSV}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-300/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
            Download Sample Excel / CSV
          </button>
        </div>

        <div className="relative mt-8 grid gap-5 md:grid-cols-2">
          {guidelines.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                style={{ animationDelay: `${i * 90}ms` }}
                className="fade-in-up group relative rounded-2xl border border-gray-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-gray-200/70"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                <div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 rounded-b-2xl bg-gradient-to-r from-red-500 to-orange-500 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Excel Structure & Sample Roster Table */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/80 backdrop-blur-xl p-8 shadow-lg shadow-gray-200/50 space-y-6">
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-md shadow-red-200">
              <FileSpreadsheet size={18} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Excel Template Column Mapping
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-2 ml-11">
            Specify document types in the{" "}
            <code className="bg-slate-100 text-red-600 px-1.5 py-0.5 rounded font-mono font-semibold">
              Certificate Type
            </code>{" "}
            column so the student portal automatically displays the right letter or certificate.
          </p>
        </div>

        {/* Column Types Legend */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: FileText, label: "Offer Letter", code: "offer-letter", ring: "emerald" },
            { icon: Award, label: "Internship Certificate", code: "internship", ring: "red" },
            { icon: GraduationCap, label: "Training Certificate", code: "training", ring: "blue" },
            { icon: Sparkles, label: "Appreciation Letter", code: "appreciation-letter", ring: "amber" },
          ].map((c, i) => {
            const CIcon = c.icon;
            return (
              <div
                key={c.code}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`fade-in-up group p-4 border rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  c.ring === "emerald"
                    ? "bg-emerald-50 border-emerald-200"
                    : c.ring === "red"
                    ? "bg-red-50 border-red-200"
                    : c.ring === "blue"
                    ? "bg-blue-50 border-blue-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div
                  className={`flex justify-center mb-1.5 transition-transform duration-300 group-hover:scale-110 ${
                    c.ring === "emerald"
                      ? "text-emerald-600"
                      : c.ring === "red"
                      ? "text-red-600"
                      : c.ring === "blue"
                      ? "text-blue-600"
                      : "text-amber-600"
                  }`}
                >
                  <CIcon size={20} />
                </div>
                <p
                  className={`text-xs font-bold ${
                    c.ring === "emerald"
                      ? "text-emerald-900"
                      : c.ring === "red"
                      ? "text-red-900"
                      : c.ring === "blue"
                      ? "text-blue-900"
                      : "text-amber-900"
                  }`}
                >
                  {c.label}
                </p>
                <p
                  className={`text-[11px] font-mono mt-0.5 ${
                    c.ring === "emerald"
                      ? "text-emerald-700"
                      : c.ring === "red"
                      ? "text-red-700"
                      : c.ring === "blue"
                      ? "text-blue-700"
                      : "text-amber-700"
                  }`}
                >
                  {c.code}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sample Table Preview */}
        <div className="relative overflow-x-auto rounded-2xl border border-gray-200/70 shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold sticky top-0">
              <tr>
                <th className="p-3">Student Name *</th>
                <th className="p-3">Email *</th>
                <th className="p-3">Certificate Type</th>
                <th className="p-3">Course / Program *</th>
                <th className="p-3">Role</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">End Date</th>
                <th className="p-3">Mentor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {sampleDataRows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-200 hover:bg-red-50/50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <td className="p-3 font-sans font-semibold text-slate-900">{row.name}</td>
                  <td className="p-3 text-slate-600">{row.email}</td>
                  <td className="p-3 font-semibold">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] ${
                        row.certType === "offer-letter"
                          ? "bg-emerald-100 text-emerald-800"
                          : row.certType === "internship"
                          ? "bg-red-100 text-red-800"
                          : row.certType === "training"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {row.certType}
                    </span>
                  </td>
                  <td className="p-3 font-sans text-slate-800">{row.course}</td>
                  <td className="p-3 font-sans text-slate-600">{row.role}</td>
                  <td className="p-3 text-slate-500">{row.startDate}</td>
                  <td className="p-3 text-slate-500">{row.endDate}</td>
                  <td className="p-3 font-sans text-slate-600">{row.mentor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
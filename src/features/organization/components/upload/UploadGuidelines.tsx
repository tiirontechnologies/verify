import { useState } from "react";
import { CheckCircle2, Database, Download, FileSpreadsheet, Sparkles } from "lucide-react";

const guidelines = [
  {
    title: "Required & Optional Columns",
    description: "Student Name, Email, Certificate Type, Course, Start Date, and End Date are required. Mentor, Director, and Role are optional.",
    icon: FileSpreadsheet,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Certificate / Document Types",
    description: "Use document types configured for your organization in the Certificate Type column. The student portal displays the type supplied with each issued record.",
    icon: Sparkles,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Supported File Formats",
    description: "Upload Excel (.xlsx, .xls) or CSV (.csv) spreadsheets up to 15 MB.",
    icon: CheckCircle2,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Auto Account Creation & Linking",
    description: "New student accounts are automatically generated with initial login credentials if they do not exist.",
    icon: Database,
    color: "from-blue-500 to-cyan-600",
  },
];

export default function UploadGuidelines() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadSampleCSV = () => {
    const headers = ["Student Name", "Email", "Certificate Type", "Course", "Role", "Start Date", "End Date", "Mentor", "Director"];
    const csv = new Blob([headers.join(",")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(csv);
    const link = document.createElement("a");
    link.href = url;
    link.download = "student_upload_template.csv";
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-100/60 blur-3xl" />
      <div className="relative">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600">
              <Sparkles size={12} /> Bulk Upload
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Upload Guidelines</h2>
            <p className="mt-1 text-sm text-slate-500">Use your organization’s records and configured document types.</p>
          </div>
          <button onClick={handleDownloadSampleCSV} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
            <Download size={17} /> {downloaded ? "Template Downloaded" : "Download Empty CSV Template"}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {guidelines.map(({ title, description, icon: Icon, color }) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-5 transition hover:border-red-100 hover:bg-white hover:shadow-md">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-sm`}><Icon size={20} /></div>
              <div><h3 className="text-sm font-bold text-slate-900">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
          The downloaded CSV contains column headers only. Fill it with real student records and document types configured for your organization before uploading.
        </div>
      </div>
    </section>
  );
}

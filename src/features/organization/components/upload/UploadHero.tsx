import { useState } from "react";
import { Download, UploadCloud, Loader2 } from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";

export default function UploadHero() {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadSample = async () => {
    try {
      setDownloading(true);
      const response = await organizationApi.downloadSampleTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Student_Certificate_Import_Template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download sample template:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            <UploadCloud size={16} />
            Student Data Import
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
            Upload Student Records
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
            Import student and credential records using Excel or CSV files.
            Every record is automatically validated before it is added to your
            organization.
          </p>
        </div>

        <button
          onClick={handleDownloadSample}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 shadow-sm disabled:opacity-60"
        >
          {downloading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          {downloading ? "Downloading..." : "Download Sample Excel"}
        </button>
      </div>
    </section>
  );
}

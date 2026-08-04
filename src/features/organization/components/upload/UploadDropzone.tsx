import { useState } from "react";
import { CloudUpload, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";

interface UploadDropzoneProps {
  onUploadSuccess?: () => void;
}

export default function UploadDropzone({ onUploadSuccess }: UploadDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["xlsx", "xls", "csv"].includes(ext || "")) {
      setMessage({
        type: "error",
        text: "Invalid file format. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.",
      });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const res = await organizationApi.uploadStudents(file);
      setMessage({
        type: "success",
        text: res.data?.message || "Students and certificate data imported successfully!",
      });

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to upload student Excel file.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {message && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-2xl p-4 text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={20} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-3xl border-2 border-dashed px-8 py-16 text-center transition-all ${
          isDragging
            ? "border-red-500 bg-red-100/60 scale-[1.01]"
            : "border-red-200 bg-red-50/40 hover:border-red-400 hover:bg-red-50"
        }`}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
          {uploading ? (
            <Loader2 className="text-red-600 animate-spin" size={36} />
          ) : (
            <CloudUpload className="text-red-600" size={36} />
          )}
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          {uploading ? "Processing Excel File..." : "Drag & Drop your Excel file"}
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto text-sm">
          {uploading
            ? "Extracting student rows and populating MongoDB certificate records..."
            : "Upload your student roster sheet (.xlsx, .xls, .csv) to auto-generate certificate records."}
        </p>

        <label
          className={`mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-red-600 px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-red-700 ${
            uploading ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <FileSpreadsheet size={18} />
          {uploading ? "Uploading..." : "Browse Excel File"}

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            disabled={uploading}
            className="hidden"
          />
        </label>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            .xlsx
          </span>

          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            .xls
          </span>

          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            .csv
          </span>

          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
            Max Size: 15 MB
          </span>
        </div>
      </div>
    </section>
  );
}
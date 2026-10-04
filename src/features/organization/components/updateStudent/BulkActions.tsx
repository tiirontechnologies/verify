import { useState } from "react";
import { Download, Trash2, CheckCircle, Ban, Loader2 } from "lucide-react";
import { organizationApi } from "../../../../api/organization.api";

interface BulkActionsProps {
  selectedIds: string[];
  selectedStudents: any[];
  onSuccess: () => void;
}

export default function BulkActions({
  selectedIds,
  selectedStudents,
  onSuccess,
}: BulkActionsProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const disabled = selectedIds.length === 0 || loading;

  const handleBulkStatusChange = async (status: "active" | "revoked") => {
    if (disabled) return;
    try {
      setLoading(true);
      setMessage(null);
      const res = await organizationApi.bulkUpdateStatus(selectedIds, status);
      setMessage({ type: "success", text: res.data?.message || `Successfully marked ${selectedIds.length} records as ${status}.` });
      onSuccess();
    } catch (err: any) {
      console.error("Bulk status error:", err);
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update bulk status." });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (disabled) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} selected student records?`)) return;

    try {
      setLoading(true);
      setMessage(null);
      const res = await organizationApi.bulkDeleteStudents(selectedIds);
      setMessage({ type: "success", text: res.data?.message || `Successfully deleted ${selectedIds.length} records.` });
      onSuccess();
    } catch (err: any) {
      console.error("Bulk delete error:", err);
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to delete selected records." });
    } finally {
      setLoading(false);
    }
  };

  const handleExportSelected = () => {
    if (selectedStudents.length === 0) return;
    const headers = [
      "Student Name",
      "Email",
      "Certificate ID",
      "Certificate Type",
      "Course",
      "Role",
      "Status",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        headers.join(","),
        ...selectedStudents.map((s) =>
          [
            `"${s.studentName}"`,
            `"${s.email}"`,
            `"${s.certificateId}"`,
            `"${s.certificateType}"`,
            `"${s.course}"`,
            `"${s.role || ""}"`,
            `"${s.status}"`,
          ].join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `selected_students_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Bulk Operations ({selectedIds.length} Selected)
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Select rows in the table above to perform batch updates, status changes, or deletion.
          </p>
        </div>

        {message && (
          <div
            className={`text-xs font-semibold px-4 py-2 rounded-xl border ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => handleBulkStatusChange("active")}
          disabled={disabled}
          className="flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 text-green-700 px-5 py-3 text-sm font-semibold hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
          Mark Selected Active
        </button>

        <button
          onClick={() => handleBulkStatusChange("revoked")}
          disabled={disabled}
          className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 px-5 py-3 text-sm font-semibold hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Ban size={16} />}
          Mark Selected Revoked
        </button>

        <button
          onClick={handleExportSelected}
          disabled={disabled}
          className="flex items-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <Download size={16} />
          Export Selected CSV
        </button>

        <button
          onClick={handleBulkDelete}
          disabled={disabled}
          className="flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md shadow-red-200"
        >
          <Trash2 size={16} />
          Delete Selected Records
        </button>
      </div>
    </section>
  );
}
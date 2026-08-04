import { useEffect, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { documentTemplateApi } from "../../../../api/documentTemplateApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (template?: any) => void;
}

const initialForm = {
  name: "",
  documentType: "internship",
  status: "active",
};

export default function ImportTemplateModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [dragging, setDragging] =
    useState(false);

  const [form, setForm] =
    useState(initialForm);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
      setSelectedFile(null);
      setDragging(false);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (
    file: File
  ) => {
    if (
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      !file.name.endsWith(".docx")
    ) {
      alert("Only DOCX files are supported.");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    setDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(
        e.dataTransfer.files[0]
      );
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      alert("Template name is required.");
      return;
    }

    if (!selectedFile) {
      alert(
        "Please select a DOCX template."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await documentTemplateApi.createTemplate(
          form as any,
          selectedFile
        );

      onSuccess(response.data.template);

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to import template."
      );
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold">
              Import Template
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload a DOCX template and convert it into an editable certificate template.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-6">

          {/* Template Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Template Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Internship Certificate"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-red-500"
            />
          </div>

          {/* Document Type */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Document Type
            </label>

            <select
              name="documentType"
              value={form.documentType}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="internship">
                Internship
              </option>

              <option value="training">
                Training
              </option>

              <option value="offer-letter">
                Offer Letter
              </option>

              <option value="evaluation-letter">
                Evaluation Letter
              </option>

              <option value="experience-letter">
                Experience Letter
              </option>

              <option value="appreciation-letter">
                Appreciation Letter
              </option>

              <option value="custom">
                Custom
              </option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* Upload Area */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Template File
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`rounded-2xl border-2 border-dashed p-8 transition ${
                dragging
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex cursor-pointer flex-col items-center justify-center">

                <Upload
                  size={42}
                  className="mb-4 text-red-500"
                />

                <h3 className="text-lg font-semibold">
                  Upload DOCX Template
                </h3>

                <p className="mt-2 text-center text-sm text-gray-500">
                  Drag & Drop your DOCX file here
                  <br />
                  or click to browse
                </p>

                <input
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      handleFileSelect(
                        e.target.files[0]
                      );
                    }
                  }}
                />
              </label>

              {selectedFile && (
                <div className="mt-6 flex items-center rounded-xl border bg-gray-50 p-4">

                  <FileText
                    className="mr-3 text-blue-600"
                    size={26}
                  />

                  <div className="flex-1">

                    <p className="font-medium">
                      {selectedFile.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {(
                        selectedFile.size /
                        1024
                      ).toFixed(2)}{" "}
                      KB
                    </p>

                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Importing..."
              : "Import Template"}
          </button>

        </div>

      </div>
    </div>
  );
}